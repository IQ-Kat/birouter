import { existsSync, readFileSync } from "node:fs";

export const PUBLISHED_BUILD_PLATFORM = "linux";
export const PUBLISHED_BUILD_ARCH = "x64";

function mapElfMachine(machine) {
  switch (machine) {
    case 62:
      return "x64";
    case 183:
      return "arm64";
    default:
      return null;
  }
}

function mapMachCpuType(cpuType) {
  switch (cpuType) {
    case 0x01000007:
      return "x64";
    case 0x0100000c:
      return "arm64";
    default:
      return null;
  }
}

function mapPeMachine(machine) {
  switch (machine) {
    case 0x8664:
      return "x64";
    case 0xaa64:
      return "arm64";
    default:
      return null;
  }
}

function readUInt16(buffer, offset, littleEndian) {
  return littleEndian ? buffer.readUInt16LE(offset) : buffer.readUInt16BE(offset);
}

function readUInt32(buffer, offset, littleEndian) {
  return littleEndian ? buffer.readUInt32LE(offset) : buffer.readUInt32BE(offset);
}

function detectElfTarget(buffer) {
  if (buffer.length < 20) return null;
  if (buffer[0] !== 0x7f || buffer[1] !== 0x45 || buffer[2] !== 0x4c || buffer[3] !== 0x46) {
    return null;
  }

  const littleEndian = buffer[5] !== 2;
  const arch = mapElfMachine(readUInt16(buffer, 18, littleEndian));
  if (!arch) return null;

  return { platform: "linux", architectures: [arch] };
}

function detectMachTarget(buffer) {
  if (buffer.length < 8) return null;

  const magic = buffer.readUInt32BE(0);
  const thinMagic = new Map([
    [0xfeedface, false],
    [0xfeedfacf, false],
    [0xcefaedfe, true],
    [0xcffaedfe, true],
  ]);
  const fatMagic = new Map([
    [0xcafebabe, false],
    [0xcafebabf, false],
    [0xbebafeca, true],
    [0xbfbafeca, true],
  ]);

  if (thinMagic.has(magic)) {
    const littleEndian = thinMagic.get(magic);
    const arch = mapMachCpuType(readUInt32(buffer, 4, littleEndian));
    if (!arch) return null;
    return { platform: "darwin", architectures: [arch] };
  }

  if (!fatMagic.has(magic)) return null;

  const littleEndian = fatMagic.get(magic);
  const isFat64 = magic === 0xcafebabf || magic === 0xbfbafeca;
  const archCount = readUInt32(buffer, 4, littleEndian);
  const entrySize = isFat64 ? 32 : 20;
  const architectures = new Set();

  for (let index = 0; index < archCount; index += 1) {
    const offset = 8 + index * entrySize;
    if (offset + 4 > buffer.length) break;
    const arch = mapMachCpuType(readUInt32(buffer, offset, littleEndian));
    if (arch) architectures.add(arch);
  }

  if (architectures.size === 0) return null;
  return { platform: "darwin", architectures: [...architectures] };
}

function detectPeTarget(buffer) {
  if (buffer.length < 0x40) return null;
  if (buffer[0] !== 0x4d || buffer[1] !== 0x5a) return null;

  const peHeaderOffset = buffer.readUInt32LE(0x3c);
  if (peHeaderOffset + 6 > buffer.length) return null;
  if (
    buffer[peHeaderOffset] !== 0x50 ||
    buffer[peHeaderOffset + 1] !== 0x45 ||
    buffer[peHeaderOffset + 2] !== 0x00 ||
    buffer[peHeaderOffset + 3] !== 0x00
  ) {
    return null;
  }

  const arch = mapPeMachine(buffer.readUInt16LE(peHeaderOffset + 4));
  if (!arch) return null;
  return { platform: "win32", architectures: [arch] };
}

export function detectNativeBinaryTarget(buffer) {
  return detectElfTarget(buffer) ?? detectMachTarget(buffer) ?? detectPeTarget(buffer) ?? null;
}

export function readNativeBinaryTarget(binaryPath) {
  if (!existsSync(binaryPath)) return null;

  try {
    return detectNativeBinaryTarget(readFileSync(binaryPath));
  } catch {
    return null;
  }
}

export function isNativeBinaryCompatible(
  binaryPath,
  { runtimePlatform = process.platform, runtimeArch = process.arch, dlopen = process.dlopen } = {}
) {
  const target = readNativeBinaryTarget(binaryPath);

  if (target) {
    if (target.platform !== runtimePlatform || !target.architectures.includes(runtimeArch)) {
      return false;
    }
  } else if (runtimePlatform !== PUBLISHED_BUILD_PLATFORM || runtimeArch !== PUBLISHED_BUILD_ARCH) {
    // Unknown binary layout on a non-build platform is too risky to treat as compatible.
    return false;
  }

  try {
    dlopen({ exports: {} }, binaryPath);
    return true;
  } catch {
    return false;
  }
}

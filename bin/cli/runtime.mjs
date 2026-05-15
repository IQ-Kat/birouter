import { apiFetch, isServerUp } from "./api.mjs";
import { openOmniRouteDb } from "./sqlite.mjs";

export class ServerOfflineError extends Error {
  constructor(message = "Server is offline and operation requires HTTP runtime") {
    super(message);
    this.name = "ServerOfflineError";
    this.exitCode = 3;
  }
}

function makeHttpContext(opts) {
  return {
    kind: "http",
    api: (path, fetchOpts = {}) => apiFetch(path, { ...opts, ...fetchOpts }),
    baseUrl: opts.baseUrl,
  };
}

async function makeDbContext() {
  const { db, dataDir, dbPath } = await openOmniRouteDb();
  return {
    kind: "db",
    db,
    dataDir,
    dbPath,
    close: () => {
      try {
        db.close();
      } catch {
        // best-effort
      }
    },
  };
}

export async function withRuntime(fn, opts = {}) {
  const requireServer = opts.requireServer === true;
  const preferDb = opts.preferDb === true;

  if (!preferDb) {
    const up = await isServerUp(opts);
    if (up) {
      return await fn(makeHttpContext(opts));
    }
    if (requireServer) {
      throw new ServerOfflineError();
    }
  }

  const ctx = await makeDbContext();
  try {
    return await fn(ctx);
  } finally {
    ctx.close?.();
  }
}

export async function withHttp(fn, opts = {}) {
  const up = await isServerUp(opts);
  if (!up) throw new ServerOfflineError();
  return fn(makeHttpContext(opts));
}

export async function withDb(fn) {
  const ctx = await makeDbContext();
  try {
    return await fn(ctx);
  } finally {
    ctx.close?.();
  }
}

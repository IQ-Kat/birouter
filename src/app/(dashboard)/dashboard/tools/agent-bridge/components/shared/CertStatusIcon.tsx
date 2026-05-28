"use client";

interface CertStatusIconProps {
  trusted: boolean;
  size?: number;
}

export function CertStatusIcon({ trusted, size = 16 }: CertStatusIconProps) {
  return trusted ? (
    <span
      className="material-symbols-outlined text-emerald-500"
      style={{ fontSize: size }}
      title="Certificate trusted"
    >
      verified_user
    </span>
  ) : (
    <span
      className="material-symbols-outlined text-zinc-400"
      style={{ fontSize: size }}
      title="Certificate not trusted"
    >
      lock_open
    </span>
  );
}

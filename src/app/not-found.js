import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", fontFamily: "system-ui, sans-serif", background: "#0a0a0a", color: "#e5e5e5" }}>
      <div style={{ textAlign: "center", maxWidth: 480, padding: "2rem" }}>
        <div style={{ fontSize: 64, fontWeight: 700, color: "#3b82f6", marginBottom: 8 }}>404</div>
        <h1 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>Page not found</h1>
        <p style={{ fontSize: 14, color: "#a3a3a3", marginBottom: 24 }}>
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/dashboard"
          style={{ display: "inline-block", padding: "10px 24px", fontSize: 14, fontWeight: 500, background: "#3b82f6", color: "#fff", borderRadius: 8, textDecoration: "none" }}
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}

"use client";

export default function GlobalError({ error, reset }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif", background: "#0a0a0a", color: "#e5e5e5", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
        <div style={{ textAlign: "center", maxWidth: 480, padding: "2rem" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
          <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8 }}>Something went wrong</h1>
          <p style={{ fontSize: 14, color: "#a3a3a3", marginBottom: 24 }}>
            {error?.message || "An unexpected error occurred."}
          </p>
          <button
            onClick={reset}
            style={{ padding: "10px 24px", fontSize: 14, fontWeight: 500, background: "#3b82f6", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer" }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}

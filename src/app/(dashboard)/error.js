"use client";

export default function DashboardError({ error, reset }) {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center max-w-md px-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10 mb-4">
          <span className="material-symbols-outlined text-[32px] text-red-500">error</span>
        </div>
        <h1 className="text-xl font-semibold mb-2">Something went wrong</h1>
        <p className="text-sm text-text-muted mb-6">
          {error?.message || "An unexpected error occurred while loading this page."}
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="px-4 py-2 text-sm font-medium bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Try again
          </button>
          <a
            href="/dashboard"
            className="px-4 py-2 text-sm font-medium border border-border rounded-lg hover:bg-surface transition-colors"
          >
            Go to Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}

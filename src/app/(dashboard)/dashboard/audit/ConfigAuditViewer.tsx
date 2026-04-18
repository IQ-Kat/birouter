"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

interface AuditEntry {
  id: number;
  timestamp: string;
  action: string;
  actor: string;
  target?: string;
  resource_type?: string;
  ip_address?: string;
  status?: string;
  request_id?: string;
  details?: any;
  metadata?: any;
}

export default function ConfigAuditViewer() {
  const t = useTranslations("logs");
  const [entries, setEntries] = useState<AuditEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEntry, setSelectedEntry] = useState<AuditEntry | null>(null);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/audit");
      const data = await res.json();
      setEntries(data.entries || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const getActionColor = (action: string) => {
    const act = action.toLowerCase();
    if (act.includes("success") || act.includes("create")) {
      return "text-green-400 bg-green-400/10 border-green-500/20";
    }
    if (act.includes("update") || act.includes("modify")) {
      return "text-blue-400 bg-blue-400/10 border-blue-500/20";
    }
    if (act.includes("failed") || act.includes("delete")) {
      return "text-red-400 bg-red-400/10 border-red-500/20";
    }
    return "text-gray-400 bg-gray-400/10 border-gray-500/20";
  };

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <div className="w-6 h-6 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-[var(--text-muted,#666)]">
        <svg
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-12 h-12 mb-4 opacity-50"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <p>No Configuration Audit Logs found.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[var(--border,#333)] text-[var(--text-secondary,#aaa)] text-sm">
              <th className="px-6 py-4 font-medium">Timestamp</th>
              <th className="px-6 py-4 font-medium">Action</th>
              <th className="px-6 py-4 font-medium">Target</th>
              <th className="px-6 py-4 font-medium">Actor</th>
              <th className="px-6 py-4 font-medium">Resource/IP</th>
              <th className="px-6 py-4 font-medium text-right">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border,#333)]">
            {entries.map((entry) => (
              <tr
                key={entry.id}
                className="hover:bg-[var(--hover-bg,#2a2a3e)] transition-colors group"
              >
                <td className="px-6 py-3 whitespace-nowrap text-sm text-[var(--text-secondary,#aaa)]">
                  {new Date(entry.timestamp).toLocaleString()}
                </td>
                <td className="px-6 py-3 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs rounded-md border capitalize ${getActionColor(entry.action)}`}
                  >
                    {entry.action}
                  </span>
                </td>
                <td className="px-6 py-3 whitespace-nowrap text-sm text-[var(--text-primary,#fff)] font-medium capitalize">
                  {entry.target || "-"}
                </td>
                <td className="px-6 py-3 whitespace-nowrap text-sm text-[var(--text-muted,#666)] capitalize">
                  {entry.actor}
                </td>
                <td className="px-6 py-3 text-sm text-[var(--text-secondary,#aaa)] font-mono">
                  {entry.resource_type || entry.ip_address || "-"}
                </td>
                <td className="px-6 py-3 whitespace-nowrap text-right">
                  <button
                    onClick={() => setSelectedEntry(entry)}
                    className="px-3 py-1 text-xs font-medium text-[var(--text-primary,#fff)] bg-[var(--accent,#7c3aed)] hover:bg-opacity-80 rounded-md transition-colors invisible group-hover:visible"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedEntry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-[var(--card-bg,#1e1e2e)] border border-[var(--border,#333)] rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden scale-in">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--border,#333)] bg-[#15151f]">
              <div>
                <h3 className="text-xl font-semibold text-[var(--text-primary,#fff)] capitalize">
                  {selectedEntry.action}
                </h3>
                <p className="text-sm text-[var(--text-secondary,#aaa)] font-mono mt-1">
                  Actor: {selectedEntry.actor} • Target: {selectedEntry.target || "N/A"}
                </p>
              </div>
              <button
                onClick={() => setSelectedEntry(null)}
                className="p-2 text-[var(--text-muted,#666)] hover:text-white bg-[var(--hover-bg,#2a2a3e)] hover:bg-[#333] rounded-full transition-colors"
                title="Close"
              >
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto custom-scrollbar flex-1 bg-[#1a1a24] text-sm text-[var(--text-secondary,#aaa)]">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <strong>ID:</strong> {selectedEntry.id}
                </div>
                <div>
                  <strong>Timestamp:</strong> {new Date(selectedEntry.timestamp).toLocaleString()}
                </div>
                <div>
                  <strong>Status:</strong> {selectedEntry.status || "-"}
                </div>
                <div>
                  <strong>IP Address:</strong> {selectedEntry.ip_address || "-"}
                </div>
                <div>
                  <strong>Resource Type:</strong> {selectedEntry.resource_type || "-"}
                </div>
                <div>
                  <strong>Request ID:</strong> {selectedEntry.request_id || "-"}
                </div>
              </div>

              <h4 className="text-sm font-semibold text-gray-300 mb-2 uppercase tracking-wider">
                Event Payload (Details/Metadata)
              </h4>
              <pre className="bg-[#111116] border border-gray-500/20 rounded-xl p-4 overflow-x-auto text-xs font-mono text-gray-300 shadow-inner">
                {JSON.stringify(selectedEntry.metadata || selectedEntry.details || {}, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

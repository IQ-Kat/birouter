"use client";

import { useState, useEffect } from "react";
import { Card, EmptyState } from "@/shared/components";

function formatDistanceToNow(timestamp: number) {
  const seconds = Math.floor(Date.now() / 1000 - timestamp);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function BatchPage() {
  const [batches, setBatches] = useState([]);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"batches" | "files">("batches");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [batchesRes, filesRes] = await Promise.all([
        fetch("/api/batches"),
        fetch("/api/files"),
      ]);
      if (batchesRes.ok) {
        const data = await batchesRes.json();
        setBatches(data.batches || []);
      }
      if (filesRes.ok) {
        const data = await filesRes.json();
        setFiles(data.files || []);
      }
    } catch (error) {
      console.error("Failed to fetch batches/files", error);
    } finally {
      setLoading(false);
    }
  };

  const renderBatches = () => {
    if (batches.length === 0) {
      return (
        <EmptyState
          icon="view_list"
          title="No batches found"
          description="There are no OpenAI-compatible batches processing right now."
        />
      );
    }

    return (
      <div className="grid grid-cols-1 gap-4">
        {batches.map((batch: any) => (
          <Card key={batch.id} className="p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-semibold">{batch.id}</span>
                <span
                  className={`px-2 py-0.5 rounded text-xs font-medium ${
                    batch.status === "completed"
                      ? "bg-emerald-500/10 text-emerald-500"
                      : batch.status === "failed"
                        ? "bg-red-500/10 text-red-500"
                        : batch.status === "in_progress"
                          ? "bg-blue-500/10 text-blue-500"
                          : "bg-surface text-text-muted"
                  }`}
                >
                  {batch.status}
                </span>
              </div>
              <span className="text-xs text-text-muted">
                {formatDistanceToNow(batch.createdAt)}
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="flex flex-col">
                <span className="text-text-muted text-xs">Endpoint</span>
                <span>{batch.endpoint}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-text-muted text-xs">Input File</span>
                <span className="font-mono text-xs truncate" title={batch.inputFileId}>
                  {batch.inputFileId}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-text-muted text-xs">Output File</span>
                <span className="font-mono text-xs truncate">{batch.outputFileId || "—"}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-text-muted text-xs">Progress</span>
                <span>
                  {batch.requestCountsCompleted || 0} / {batch.requestCountsTotal || 0} reqs
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  };

  const renderFiles = () => {
    if (files.length === 0) {
      return (
        <EmptyState
          icon="insert_drive_file"
          title="No files found"
          description="Files uploaded for batch processing will appear here."
        />
      );
    }

    return (
      <div className="grid grid-cols-1 gap-4">
        {files.map((file: any) => (
          <Card key={file.id} className="p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-semibold">{file.id}</span>
              </div>
              <span className="text-xs text-text-muted">{formatDistanceToNow(file.createdAt)}</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="flex flex-col">
                <span className="text-text-muted text-xs">Filename</span>
                <span className="truncate">{file.filename}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-text-muted text-xs">Purpose</span>
                <span>{file.purpose}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-text-muted text-xs">Size</span>
                <span>{(file.bytes / 1024).toFixed(2)} KB</span>
              </div>
              <div className="flex flex-col">
                <span className="text-text-muted text-xs">Status</span>
                <span className="capitalize">{file.status}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto custom-scrollbar">
      <div className="flex flex-col px-6 py-6 md:py-8 max-w-6xl mx-auto w-full gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-text-main mb-1">Batch Processing</h1>
            <p className="text-text-muted">Monitor asynchronous batch requests and files</p>
          </div>
          <button
            onClick={fetchData}
            disabled={loading}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface/50 border border-border/50 text-sm hover:bg-surface disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-[18px]">refresh</span>
            Refresh
          </button>
        </div>

        <div className="flex items-center gap-2 border-b border-border/50 pb-px">
          <button
            onClick={() => setActiveTab("batches")}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "batches"
                ? "border-primary text-primary"
                : "border-transparent text-text-muted hover:text-text-main"
            }`}
          >
            Batches ({batches.length})
          </button>
          <button
            onClick={() => setActiveTab("files")}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "files"
                ? "border-primary text-primary"
                : "border-transparent text-text-muted hover:text-text-main"
            }`}
          >
            Files ({files.length})
          </button>
        </div>

        {loading && batches.length === 0 && files.length === 0 ? (
          <div className="flex items-center justify-center p-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        ) : activeTab === "batches" ? (
          renderBatches()
        ) : (
          renderFiles()
        )}
      </div>
    </div>
  );
}

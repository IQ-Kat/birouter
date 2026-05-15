"use client";

import { useState, useEffect, useCallback } from "react";
import FilesListTab from "../FilesListTab";
import { mapFileApiToRecord } from "../batch-utils";
import { FileRecord } from "@/lib/db/files";

export default function BatchFilesPage() {
  const [files, setFiles] = useState<FileRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFiles = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/v1/files?limit=20");
      if (res.ok) {
        const data = await res.json();
        setFiles((data.data || []).map(mapFileApiToRecord));
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchFiles();
  }, [fetchFiles]);

  return <FilesListTab files={files} loading={loading} onRefresh={fetchFiles} />;
}

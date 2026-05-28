"use client";

import type { InterceptedRequest } from "@/mitm/inspector/types";
import { TimingWaterfall } from "../shared/TimingWaterfall";

interface TimingTabProps {
  request: InterceptedRequest;
}

export function TimingTab({ request }: TimingTabProps) {
  return (
    <div className="p-4 h-full overflow-auto space-y-4">
      <TimingWaterfall request={request} />
      <div className="border-t border-border pt-3 space-y-1 text-xs text-text-muted">
        <div className="flex justify-between">
          <span>Timestamp</span>
          <span className="font-mono">{request.timestamp}</span>
        </div>
        <div className="flex justify-between">
          <span>Method</span>
          <span className="font-mono">{request.method}</span>
        </div>
        <div className="flex justify-between">
          <span>Status</span>
          <span className="font-mono">{String(request.status)}</span>
        </div>
        <div className="flex justify-between">
          <span>Request size</span>
          <span className="font-mono">{request.requestSize} B</span>
        </div>
        <div className="flex justify-between">
          <span>Response size</span>
          <span className="font-mono">{request.responseSize} B</span>
        </div>
      </div>
    </div>
  );
}

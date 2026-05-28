"use client";

import { useRef } from "react";
import type { InterceptedRequest } from "@/mitm/inspector/types";
import { useVirtualList } from "../hooks/useVirtualList";
import { RequestRow } from "./RequestRow";

interface RequestStreamingListProps {
  requests: InterceptedRequest[];
  selectedId: string | null;
  onSelect: (req: InterceptedRequest) => void;
  containerHeight: number;
}

export function RequestStreamingList({
  requests,
  selectedId,
  onSelect,
  containerHeight,
}: RequestStreamingListProps) {
  const { virtualItems, totalHeight, containerRef, rowRef } = useVirtualList(
    requests,
    containerHeight
  );

  if (requests.length === 0) {
    return (
      <div
        ref={containerRef}
        className="h-full flex items-center justify-center text-sm text-text-muted"
      >
        <div className="text-center space-y-2">
          <span
            className="material-symbols-outlined text-[36px] text-text-muted block"
            aria-hidden="true"
          >
            network_check
          </span>
          <p>No requests captured yet.</p>
          <p className="text-xs">Make sure AgentBridge is running or enable another capture mode.</p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef as React.RefObject<HTMLDivElement>}
      className="h-full overflow-y-auto relative"
      style={{ contain: "strict" }}
    >
      <div style={{ height: totalHeight, position: "relative" }}>
        {virtualItems.map(({ index, item, top }) => (
          <div
            key={item.id}
            ref={rowRef(index)}
            style={{ position: "absolute", top, left: 0, right: 0 }}
          >
            <RequestRow
              request={item}
              selected={item.id === selectedId}
              onClick={() => onSelect(item)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

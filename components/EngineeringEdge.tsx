// components/EngineeringEdge.tsx
"use client";

import Image from "next/image";
import { GitBranch, MonitorPlay, Code2 } from "lucide-react";
import type { EngineeringEdge as EngineeringEdgeType } from "@/data/projects";

const ICONS = {
  diagram: GitBranch,
  demo: MonitorPlay,
  snippet: Code2,
} as const;

interface EngineeringEdgeProps {
  edge: EngineeringEdgeType;
  /** Archived projects render this slot muted, since the artifact is historical */
  muted?: boolean;
}

export default function EngineeringEdge({ edge, muted = false }: EngineeringEdgeProps) {
  const Icon = ICONS[edge.type];

  return (
    <div
      className={`rounded-lg border ${
        muted ? "border-white/10 bg-white/[0.02]" : "border-cyan-400/20 bg-cyan-400/[0.03]"
      }`}
    >
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2">
        <Icon
          className={`h-3.5 w-3.5 ${muted ? "text-white/40" : "text-cyan-300"}`}
          strokeWidth={2}
        />
        <span
          className={`font-mono text-[11px] uppercase tracking-widest ${
            muted ? "text-white/40" : "text-cyan-300"
          }`}
        >
          {edge.label}
        </span>
      </div>

      <div className="p-4">
        {/* --- Slot body: swaps rendering based on edge.type --- */}
        {edge.type === "snippet" ? (
          <pre className="max-h-56 overflow-auto rounded-md bg-black/40 p-3 text-[12px] leading-relaxed text-slate-200">
            <code>{edge.code}</code>
          </pre>
        ) : edge.imageSrc ? (
          <div className="relative aspect-video w-full overflow-hidden rounded-md">
            <Image
              src={edge.imageSrc}
              alt={edge.label}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        ) : (
          // Placeholder shown until a real screenshot / diagram / GIF is dropped in
          <div
            className={`flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-md border border-dashed ${
              muted ? "border-white/15" : "border-cyan-400/30"
            }`}
          >
            <Icon className={`h-6 w-6 ${muted ? "text-white/25" : "text-cyan-400/50"}`} />
            <span className="font-mono text-[11px] text-white/30">
              {edge.type === "diagram" ? "diagram pending" : "demo capture pending"}
            </span>
          </div>
        )}

        <p className="mt-3 text-[13px] leading-snug text-white/60">{edge.caption}</p>
      </div>
    </div>
  );
}

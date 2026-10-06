// components/EngineeringEdge.tsx
// Rendered on the server: no hooks or event handlers, so no client JS is shipped.

import Image from "next/image";
import { GitBranch, MonitorPlay, Code2, ExternalLink } from "lucide-react";
import type { EngineeringEdge as EngineeringEdgeType } from "@/data/projects";

const ICONS = {
  diagram: GitBranch,
  demo: MonitorPlay,
  snippet: Code2,
} as const;

interface EngineeringEdgeProps {
  edge: EngineeringEdgeType;
  /** Project title, used to give the figure a specific accessible name */
  title?: string;
  /** Archived projects render this slot muted, since the artifact is historical */
  muted?: boolean;
}

export default function EngineeringEdge({ edge, title, muted = false }: EngineeringEdgeProps) {
  const Icon = ICONS[edge.type];
  const name = title ? `${title} ${edge.label.toLowerCase()}` : edge.label;
  const accent = muted ? "text-slate-400" : "text-signal";

  return (
    <figure>
      <div className="mb-2.5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Icon className={`h-3.5 w-3.5 ${accent}`} strokeWidth={2} aria-hidden="true" />
          <span className={`font-mono text-xs uppercase tracking-wider sm:tracking-widest ${accent}`}>
            {edge.label}
          </span>
        </div>

        {/* Diagrams are dense; let reviewers open the full-resolution asset */}
        {edge.type !== "snippet" && edge.imageSrc && (
          <a
            href={edge.imageSrc}
            target="_blank"
            rel="noopener noreferrer"
            className="flex shrink-0 items-center gap-1 whitespace-nowrap rounded-sm py-1 font-mono text-xs text-slate-400 transition-colors hover:text-signal focus-visible:text-signal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
          >
            Full size
            <ExternalLink className="h-3 w-3" aria-hidden="true" />
            <span className="sr-only">: {name} (opens in a new tab)</span>
          </a>
        )}
      </div>

      {/* --- Slot body: swaps rendering based on edge.type --- */}
      {edge.type === "snippet" ? (
        <pre
          tabIndex={0}
          aria-label={`${name} (scrollable)`}
          className="max-h-56 overflow-auto rounded-md border border-hairline bg-black/40 p-3 text-xs leading-relaxed text-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
        >
          <code>{edge.code}</code>
        </pre>
      ) : edge.imageSrc ? (
        // Same target as the "Full size" link above, kept out of the tab order to
        // avoid a duplicate stop; the image alt still names it for screen readers.
        <a
          href={edge.imageSrc}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={-1}
          className="relative block aspect-video w-full overflow-hidden rounded-md border border-hairline bg-black/30 transition-colors hover:border-signal/40"
        >
          <Image
            src={edge.imageSrc}
            alt={name}
            fill
            className={`object-contain ${muted ? "grayscale-[0.4]" : ""}`}
            sizes="(max-width: 1024px) 100vw, 400px"
          />
        </a>
      ) : (
        // Placeholder shown until a real screenshot / diagram / GIF is dropped in
        <div className="flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-md border border-dashed border-hairline">
          <Icon className="h-6 w-6 text-slate-500" aria-hidden="true" />
          <span className="font-mono text-xs text-slate-400">
            {edge.type === "diagram" ? "diagram pending" : "demo capture pending"}
          </span>
        </div>
      )}

      <figcaption className="mt-3 text-[13px] leading-relaxed text-slate-400">
        {edge.caption}
      </figcaption>
    </figure>
  );
}

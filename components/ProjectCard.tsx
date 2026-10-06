// components/ProjectCard.tsx
import Link from "next/link";
import { GitBranch, ExternalLink, Archive } from "lucide-react";
import type { Project } from "@/data/projects";
import EngineeringEdge from "./EngineeringEdge";

interface ProjectCardProps {
  project: Project;
}

const footerLinkClass =
  "flex items-center gap-1.5 rounded-sm py-1 text-sm text-slate-300 transition-colors hover:text-signal focus-visible:text-signal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal";

export default function ProjectCard({ project }: ProjectCardProps) {
  const { title, status, impact, techStack, engineeringEdge, links } = project;
  const isArchived = status === "archived";

  return (
    <article
      className={`flex h-full flex-col rounded-xl border p-4 sm:p-6 transition-colors duration-200 ease-out ${
        isArchived
          ? "border-white/[0.07] bg-transparent"
          : "border-white/10 bg-white/[0.025] hover:border-signal/30"
      }`}
    >
      {/* Header */}
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold tracking-tight text-white">{title}</h3>
        {isArchived && (
          <span className="mt-1 flex shrink-0 items-center gap-1 rounded-sm border border-amber-400/30 px-1.5 py-0.5 font-mono text-xs uppercase tracking-wide text-amber-300">
            <Archive className="h-3 w-3" aria-hidden="true" />
            Archived
          </span>
        )}
      </div>

      {/* Impact statement */}
      <p className="mb-4 text-sm leading-relaxed text-slate-300">{impact}</p>

      {/* Tech stack */}
      <ul className="mb-5 flex flex-wrap gap-1.5" aria-label="Tech stack">
        {techStack.map((tech) => (
          <li
            key={tech}
            className="rounded-sm border border-hairline bg-white/[0.03] px-2 py-0.5 font-mono text-xs text-slate-300"
          >
            {tech}
          </li>
        ))}
      </ul>

      {/* Engineering Edge slot — the visual proof-of-work for this project */}
      <div className="mb-5">
        <EngineeringEdge edge={engineeringEdge} title={title} muted={isArchived} />
      </div>

      {/* Footer links — pushed to the bottom of the card via mt-auto */}
      <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-1 border-t border-white/10 pt-3">
        {links.repo && (
          <Link
            href={links.repo}
            target="_blank"
            rel="noopener noreferrer"
            className={footerLinkClass}
          >
            <GitBranch className="h-4 w-4" aria-hidden="true" />
            {/* Archived projects lean on the repo + architecture, not a live demo */}
            {isArchived ? "View source & architecture" : "Repo"}
            <span className="sr-only"> for {title} (opens in a new tab)</span>
          </Link>
        )}

        {!isArchived && links.demo && (
          <Link
            href={links.demo}
            target="_blank"
            rel="noopener noreferrer"
            className={footerLinkClass}
          >
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
            Live demo
            <span className="sr-only"> of {title} (opens in a new tab)</span>
          </Link>
        )}

        {isArchived && links.writeUp && (
          <Link
            href={links.writeUp}
            target="_blank"
            rel="noopener noreferrer"
            className={footerLinkClass}
          >
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
            Write-up
            <span className="sr-only"> for {title} (opens in a new tab)</span>
          </Link>
        )}
      </div>
    </article>
  );
}

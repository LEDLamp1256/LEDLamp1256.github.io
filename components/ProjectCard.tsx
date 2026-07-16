// components/ProjectCard.tsx
import Link from "next/link";
import { GitBranch, ExternalLink, Archive } from "lucide-react";
import type { Project } from "@/data/projects";
import EngineeringEdge from "./EngineeringEdge";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { title, status, impact, techStack, engineeringEdge, links } = project;
  const isArchived = status === "archived";

  return (
    <article
      className={`flex h-full flex-col rounded-xl border p-5 transition-colors ${
        isArchived
          ? "border-white/10 bg-white/[0.015] grayscale-[0.3]"
          : "border-white/10 bg-white/[0.03] hover:border-cyan-400/30"
      }`}
    >
      {/* Header */}
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold text-white">{title}</h3>
        {isArchived && (
          <span className="flex shrink-0 items-center gap-1 rounded-full border border-amber-400/30 bg-amber-400/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-amber-300">
            <Archive className="h-3 w-3" />
            Archived
          </span>
        )}
      </div>

      {/* Impact statement */}
      <p className="mb-4 text-sm leading-relaxed text-white/70">{impact}</p>

      {/* Tech stack pills */}
      <div className="mb-4 flex flex-wrap gap-1.5">
        {techStack.map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-white/10 px-2 py-0.5 font-mono text-[11px] text-white/50"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Engineering Edge slot — the visual proof-of-work for this project */}
      <div className="mb-5">
        <EngineeringEdge edge={engineeringEdge} muted={isArchived} />
      </div>

      {/* Footer links — pushed to the bottom of the card via mt-auto */}
      <div className="mt-auto flex items-center gap-4 border-t border-white/10 pt-4">
        {links.repo && (
          <Link
            href={links.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-white/70 transition-colors hover:text-cyan-300"
          >
            <GitBranch className="h-4 w-4" />
            {/* Archived projects lean on the repo + architecture, not a live demo */}
            {isArchived ? "View source & architecture" : "Repo"}
          </Link>
        )}

        {!isArchived && links.demo && (
          <Link
            href={links.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-white/70 transition-colors hover:text-cyan-300"
          >
            <ExternalLink className="h-4 w-4" />
            Live demo
          </Link>
        )}

        {isArchived && links.writeUp && (
          <Link
            href={links.writeUp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-white/70 transition-colors hover:text-cyan-300"
          >
            <ExternalLink className="h-4 w-4" />
            Write-up
          </Link>
        )}
      </div>
    </article>
  );
}

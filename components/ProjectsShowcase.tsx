// components/ProjectsShowcase.tsx
import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";

export default function ProjectsShowcase() {
  return (
    <section id="projects" className="bg-[#0d1117] px-6 pt-6 pb-16 sm:px-10 md:pt-8 md:pb-20 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
          {/* <span className="font-mono text-[11px] uppercase tracking-widest text-cyan-400/70">
            Selected Work
          </span> */}
          <h2 className="flex items-center gap-3 font-mono text-xs font-normal tracking-[0.25em] text-slate-500 uppercase">
            Projects
            <span className="h-px w-8 bg-[#5eead4]/60" aria-hidden="true" />
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

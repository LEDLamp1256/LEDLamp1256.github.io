// components/ProjectsShowcase.tsx
import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";

export default function ProjectsShowcase() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="bg-background px-6 pt-6 pb-16 md:px-10 md:pt-8 md:pb-24"
    >
      {/* Same column as Hero and Resume; two columns keep the diagrams legible. */}
      <div className="mx-auto max-w-4xl">
        <h2
          id="projects-heading"
          className="mb-6 flex items-center gap-3 font-mono text-xs font-normal tracking-[0.25em] text-slate-400 uppercase"
        >
          Projects
          <span className="h-px w-8 bg-signal/60" aria-hidden="true" />
        </h2>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

// components/ProjectsShowcase.tsx
import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";

export default function ProjectsShowcase() {
  return (
    <section id="projects" className="bg-[#0d1117] px-6 py-20 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          {/* <span className="font-mono text-[11px] uppercase tracking-widest text-cyan-400/70">
            Selected Work
          </span> */}
          <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
            Projects
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

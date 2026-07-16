// app/page.tsx
// Single scrollable landing page: Hero -> Resume/Skills -> Projects Showcase.
// Data lives in /data, presentation lives in /components — this file only wires them together.

import { resume } from "@/data/resume";
import ResumeSection from "@/components/ResumeSection";
import ProjectsShowcase from "@/components/ProjectsShowcase";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-[#0d1117] text-slate-200">
      {/* ---------- Hero ---------- */}
      <section
        id="hero"
        className="flex min-h-screen flex-col justify-center px-6 py-20 md:px-10 scroll-mt-16"
      >
        <div className="mx-auto w-full max-w-4xl">
          <p className="mb-4 font-mono text-xs tracking-[0.25em] text-slate-500 uppercase">
            {resume.title}
          </p>

          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-white">
            {resume.name}
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-400">
            {resume.summary}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={resume.resumePdfPath}
              download
              className="inline-flex items-center gap-2 rounded-md bg-[#5eead4] px-5 py-3 text-sm font-medium text-[#0d1117] transition hover:bg-[#5eead4]/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5eead4]"
            >
              Download Resume
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M12 3v12m0 0-4-4m4 4 4-4M4 19h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>

            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-md border border-white/15 px-5 py-3 text-sm font-medium text-slate-300 transition hover:border-white/30 hover:text-white"
            >
              View Projects
            </a>
          </div>
        </div>
      </section>

      {/* ---------- Resume / Skills ---------- */}
      {/* ResumeSection renders its own <section id="resume">; it already
          imports and maps `resume` internally, so it's dropped in as-is. */}
      <ResumeSection />

      {/* ---------- Projects Showcase ---------- */}
      {/* Renders its own <section id="projects"> and imports `projects`
          internally, so — like ResumeSection above — it's dropped in as-is. */}
      <ProjectsShowcase />
    </main>
  );
}
// components/ResumeSection.tsx
// "Spec Sheet" resume section. Treats the resume like a datasheet for a part —
// header nameplate, hairline-divided sections, pin-out style skills table.
// Tailwind utility classes + the shared CSS custom properties in globals.css
// (--surface-raised, --signal, --hairline) for the accent system.
// Drop into app/page.tsx as <ResumeSection /> alongside your Projects section.

import { resume, type AvailabilityStatus } from "@/data/resume";
import type { ReactNode } from "react";

const STATUS_COPY: Record<AvailabilityStatus, { dot: string; label: string }> = {
  open: { dot: "bg-signal", label: "text-signal" },
  limited: { dot: "bg-amber-400", label: "text-amber-400" },
  closed: { dot: "bg-slate-500", label: "text-slate-400" },
};

const inlineLinkClass =
  "rounded-sm py-1 transition-colors hover:text-signal focus-visible:text-signal focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-signal";

export default function ResumeSection() {
  const status = STATUS_COPY[resume.availability];

  return (
    <section
      id="resume"
      aria-labelledby="resume-heading"
      className="relative py-14 px-6 md:py-16 md:px-10 bg-background text-slate-200"
    >
      <div className="mx-auto max-w-4xl">
        {/* Section heading, styled as the datasheet's mono label */}
        <h2
          id="resume-heading"
          className="mb-4 flex items-center gap-3 font-mono text-xs font-normal tracking-[0.25em] text-slate-400 uppercase"
        >
          Resume
          <span className="h-px w-8 bg-signal/60" aria-hidden="true" />
        </h2>

        {/* Nameplate header, datasheet-style */}
        <div className="border border-hairline rounded-lg bg-surface-raised px-5 py-5 sm:px-6 md:px-8 md:py-6 mb-2">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p className="font-mono text-2xl md:text-3xl font-semibold text-white tracking-tight">
                {resume.name}
              </p>
              <p className="mt-1 text-slate-400">{resume.title}</p>
            </div>

            <div className="flex flex-col items-start md:items-end gap-3">
              <div className="flex items-center gap-2">
                <span
                  className={`h-2 w-2 rounded-full ${status.dot} motion-safe:animate-pulse`}
                  aria-hidden="true"
                />
                <span className={`font-mono text-xs tracking-wide ${status.label}`}>
                  {resume.availabilityLabel}
                </span>
              </div>

              <a
                href={resume.resumePdfPath}
                download
                className="inline-flex items-center gap-2 rounded-md border border-signal/40 bg-signal/10 px-4 py-2.5 text-sm font-medium text-signal transition hover:bg-signal/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
              >
                Download PDF
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
            </div>
          </div>

          {/* Link row */}
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 border-t border-hairline pt-3 font-mono text-xs text-slate-400">
            {resume.links.github && (
              <a href={resume.links.github} className={inlineLinkClass}>
                github ↗
              </a>
            )}
            {resume.links.linkedin && (
              <a href={resume.links.linkedin} className={inlineLinkClass}>
                linkedin ↗
              </a>
            )}
            {resume.links.email && (
              <a href={`mailto:${resume.links.email}`} className={`${inlineLinkClass} break-all`}>
                {resume.links.email}
              </a>
            )}
          </div>
        </div>

        {/* The summary is not repeated here: it is the Hero's lead paragraph directly above. */}

        {/* Education */}
        <SpecRow label="Education">
          <div className="space-y-5">
            {resume.education.map((ed) => (
              <div key={ed.institution}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="font-medium text-white">{ed.institution}</h3>
                  <span className="font-mono text-xs tabular-nums text-slate-400">{ed.graduation}</span>
                </div>
                <p className="mt-0.5 text-sm text-slate-400">
                  {ed.degree}
                  {ed.focus ? ` — ${ed.focus}` : ""}
                  {ed.gpa ? ` · GPA ${ed.gpa}` : ""}
                </p>
                {ed.coursework && (
                  <div className="mt-3">
                    <p className="mb-1.5 font-mono text-xs tracking-wide text-slate-400 uppercase">
                      Coursework
                    </p>
                    <ul className="flex flex-wrap gap-1.5">
                      {ed.coursework.map((c) => (
                        <li key={c} className={courseClass}>
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </SpecRow>

        {/* Experience */}
        <SpecRow label="Experience">
          <div className="space-y-7">
            {resume.experience.map((role) => (
              <div key={role.id}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="font-medium text-white">
                    {role.role} <span className="font-normal text-slate-400">· {role.org}</span>
                  </h3>
                  <span className="font-mono text-xs tabular-nums text-slate-400">
                    {role.start} – {role.end}
                  </span>
                </div>
                {role.location && (
                  <p className="text-xs text-slate-400 mt-0.5">{role.location}</p>
                )}
                <ul className="mt-2.5 max-w-[68ch] space-y-1.5">
                  {role.bullets.map((b, i) => (
                    <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-slate-300">
                      <span
                        className="mt-2 h-1 w-1 shrink-0 rounded-full bg-signal"
                        aria-hidden="true"
                      />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </SpecRow>

        {/* Skills — pin-out table style */}
        <SpecRow label="Skills" last>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
            {resume.skills.map((group) => (
              <div key={group.domain}>
                <h3 className="font-mono text-xs font-normal tracking-wide text-slate-400 uppercase mb-2">
                  {group.label}
                </h3>
                <ul className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <li key={item} className={chipClass}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </SpecRow>
      </div>
    </section>
  );
}

/** One chip vocabulary for skills and project tech stacks (identifiers, so mono). */
const chipClass =
  "rounded-sm border border-hairline bg-white/[0.03] px-2 py-0.5 font-mono text-xs text-slate-300";

/** Course names are prose, so they share the chip shape but use the sans face. */
const courseClass =
  "rounded-sm border border-hairline bg-white/[0.03] px-2 py-0.5 text-xs text-slate-300";

/** A single labeled row in the spec sheet, with a fixed-width mono label
 *  column on desktop collapsing to a stacked layout on mobile — the same
 *  "pin-out" language used across the section. */
function SpecRow({
  label,
  children,
  last = false,
}: {
  label: string;
  children: ReactNode;
  last?: boolean;
}) {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-[140px_1fr] gap-x-6 gap-y-3 py-7 ${
        last ? "" : "border-b border-hairline"
      }`}
    >
      <p className="font-mono text-xs tracking-[0.2em] text-slate-400 uppercase md:pt-0.5">
        {label}
      </p>
      <div>{children}</div>
    </div>
  );
}

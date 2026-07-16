// components/ResumeSection.tsx
// "Spec Sheet" resume section. Treats the resume like a datasheet for a part —
// header nameplate, hairline-divided sections, pin-out style skills table.
// Tailwind utility classes + a few CSS custom properties for the accent system.
// Drop into app/page.tsx as <ResumeSection /> alongside your Projects section.

import { resume, type AvailabilityStatus } from "@/data/resume";

const STATUS_COPY: Record<AvailabilityStatus, { dot: string; label: string }> = {
  open: { dot: "bg-[var(--signal)]", label: "text-[var(--signal)]" },
  limited: { dot: "bg-amber-400", label: "text-amber-400" },
  closed: { dot: "bg-slate-500", label: "text-slate-400" },
};

export default function ResumeSection() {
  const status = STATUS_COPY[resume.availability];

  return (
    <section
      id="resume"
      className="relative py-20 px-6 md:px-10 bg-[var(--surface)] text-slate-200"
      style={
        {
          "--surface": "#0d1117",
          "--surface-raised": "#131a24",
          "--signal": "#5eead4",
          "--hairline": "rgba(148, 163, 184, 0.16)",
        } as React.CSSProperties
      }
    >
      <div className="mx-auto max-w-4xl">
        {/* Eyebrow */}
        <p className="mb-3 font-mono text-xs tracking-[0.25em] text-slate-500 uppercase">
          Resume — Spec Sheet
        </p>

        {/* Nameplate header, datasheet-style */}
        <div className="border border-[var(--hairline)] rounded-lg bg-[var(--surface-raised)] px-6 py-5 md:px-8 md:py-6 mb-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h2 className="font-mono text-2xl md:text-3xl font-semibold text-white tracking-tight">
                {resume.name}
              </h2>
              <p className="mt-1 text-slate-400">{resume.title}</p>
            </div>

            <div className="flex flex-col items-start md:items-end gap-2">
              <div className="flex items-center gap-2">
                <span
                  className={`h-2 w-2 rounded-full ${status.dot} animate-pulse`}
                  aria-hidden="true"
                />
                <span className={`font-mono text-xs tracking-wide ${status.label}`}>
                  {resume.availabilityLabel}
                </span>
              </div>

              <a
                href={resume.resumePdfPath}
                download
                className="inline-flex items-center gap-2 rounded-md border border-[var(--signal)]/40 bg-[var(--signal)]/10 px-4 py-2 text-sm font-medium text-[var(--signal)] transition hover:bg-[var(--signal)]/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--signal)]"
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
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-t border-[var(--hairline)] pt-4 font-mono text-xs text-slate-400">
            {resume.links.github && (
              <a href={resume.links.github} className="hover:text-[var(--signal)] transition">
                github ↗
              </a>
            )}
            {resume.links.linkedin && (
              <a href={resume.links.linkedin} className="hover:text-[var(--signal)] transition">
                linkedin ↗
              </a>
            )}
            {resume.links.email && (
              <a href={`mailto:${resume.links.email}`} className="hover:text-[var(--signal)] transition">
                {resume.links.email}
              </a>
            )}
          </div>
        </div>

        {/* Summary */}
        <SpecRow label="Summary">
          <p className="text-slate-300 leading-relaxed">{resume.summary}</p>
        </SpecRow>

        {/* Education */}
        <SpecRow label="Education">
          <div className="space-y-5">
            {resume.education.map((ed) => (
              <div key={ed.institution}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="font-medium text-white">{ed.institution}</h3>
                  <span className="font-mono text-xs text-slate-500">{ed.graduation}</span>
                </div>
                <p className="text-sm text-slate-400">
                  {ed.degree}
                  {ed.focus ? ` — ${ed.focus}` : ""}
                  {ed.gpa ? ` · GPA ${ed.gpa}` : ""}
                </p>
                {ed.coursework && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {ed.coursework.map((c) => (
                      <span
                        key={c}
                        className="rounded border border-[var(--hairline)] px-2 py-0.5 font-mono text-[11px] text-slate-400"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </SpecRow>

        {/* Experience */}
        <SpecRow label="Experience">
          <div className="space-y-6">
            {resume.experience.map((role) => (
              <div key={role.id}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="font-medium text-white">
                    {role.role} <span className="text-slate-500">· {role.org}</span>
                  </h3>
                  <span className="font-mono text-xs text-slate-500">
                    {role.start} – {role.end}
                  </span>
                </div>
                {role.location && (
                  <p className="text-xs text-slate-500 mt-0.5">{role.location}</p>
                )}
                <ul className="mt-2 space-y-1.5">
                  {role.bullets.map((b, i) => (
                    <li key={i} className="flex gap-2 text-sm text-slate-300">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--signal)]" />
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
            {resume.skills.map((group) => (
              <div key={group.domain}>
                <p className="font-mono text-[11px] tracking-wide text-slate-500 uppercase mb-1.5">
                  {group.label}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-md bg-white/[0.04] border border-[var(--hairline)] px-2.5 py-1 text-xs text-slate-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </SpecRow>
      </div>
    </section>
  );
}

/** A single labeled row in the spec sheet, with a fixed-width mono label
 *  column on desktop collapsing to a stacked layout on mobile — the same
 *  "pin-out" language used across the section. */
function SpecRow({
  label,
  children,
  last = false,
}: {
  label: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-[140px_1fr] gap-x-6 gap-y-3 py-6 ${
        last ? "" : "border-b border-[var(--hairline)]"
      }`}
    >
      <p className="font-mono text-xs tracking-[0.2em] text-slate-500 uppercase">
        {label}
      </p>
      <div>{children}</div>
    </div>
  );
}

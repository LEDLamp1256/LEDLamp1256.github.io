// components/SiteNav.tsx
// Sticky top bar for the single-page layout. Plain anchors only — smooth
// scrolling and the sticky-header offset are handled in globals.css.

import { resume } from "@/data/resume";

const NAV_LINKS = [
  // "About" duplicates the name link, so it is the one dropped on very narrow phones.
  { href: "#hero", label: "About", className: "max-[359px]:hidden" },
  { href: "#resume", label: "Resume" },
  { href: "#projects", label: "Projects" },
];

const linkClass =
  "rounded-sm text-slate-400 transition-colors hover:text-[#5eead4] focus-visible:text-[#5eead4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5eead4]";

export default function SiteNav() {
  return (
    <header className="sticky top-0 z-50 border-b px-6 md:px-10 border-white/[0.06] bg-[#0d1117]/85 backdrop-blur-sm">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-14 w-full max-w-4xl items-center justify-between gap-4"
      >
        <a
          href="#top"
          className="rounded-sm text-sm font-semibold tracking-tight text-white transition-colors hover:text-[#5eead4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5eead4]"
        >
          {resume.name}
        </a>

        <ul className="flex items-center gap-3.5 text-[13px] sm:gap-6 sm:text-sm">
          {NAV_LINKS.map((link) => (
            <li key={link.href} className={link.className}>
              <a href={link.href} className={linkClass}>
                {link.label}
              </a>
            </li>
          ))}
          {resume.links.github && (
            <li>
              <a
                href={resume.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                GitHub
              </a>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

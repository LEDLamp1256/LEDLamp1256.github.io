// data/resume.ts
// Central data source for the Resume / Spec Sheet section. Same philosophy as
// projects.ts: content lives here, components stay dumb, updates are data-only.

export type AvailabilityStatus = "open" | "limited" | "closed";

export interface EducationEntry {
  institution: string;
  degree: string;
  focus?: string;
  graduation: string; // e.g. "May 2027"
  gpa?: string;
  coursework?: string[];
}

export interface ExperienceEntry {
  id: string;
  role: string;
  org: string;
  location?: string;
  start: string; // "Jun 2025"
  end: string; // "Aug 2025" or "Present"
  bullets: string[];
}

export type SkillDomain = "languages" | "frameworkslibraries" | "toolstechnologies";

export interface SkillGroup {
  domain: SkillDomain;
  label: string; // human-readable header, e.g. "Languages"
  items: string[];
}

export interface ResumeData {
  name: string;
  title: string; // e.g. "Computer Engineering Student"
  availability: AvailabilityStatus;
  availabilityLabel: string; // e.g. "Open to Summer 2027 Internships"
  summary: string;
  resumePdfPath: string; // path to the actual PDF in /public
  links: {
    github?: string;
    linkedin?: string;
    email?: string;
  };
  education: EducationEntry[];
  experience: ExperienceEntry[];
  skills: SkillGroup[];
}

export const resume: ResumeData = {
  name: "Dylan Lee",
  title: "Computer Engineering Student",
  availability: "open",
  availabilityLabel: "Open to Internships",
  summary:
    "Second year Computer Engineering student at the University of California, Santa Barbara. I am currently focused on software engineering, and I am passionate about engineering practical solutions that make life more convenient and efficient.",
  resumePdfPath: "/resume.pdf",
  links: {
    github: "https://github.com/LEDLamp1256",
    linkedin: "https://www.linkedin.com/in/dylantcl/",
    email: "dylanlee0613@gmail.com",
  },
  education: [
    {
      institution: "University of California, Santa Barbara",
      degree: "B.S. Computer Engineering",
      focus: "",
      graduation: "June 2029",
      gpa: "3.6",
      coursework: [
        "Data Structures & Algorithms",
        "Object-Oriented Programming (C++)",
        "Computer Organization",
        "Foundations of Computer Science",
        "Analog & Digital Circuits and Systems"
      ],
    },
  ],
  experience: [
    {
      id: "role-1",
      role: "Counselor",
      org: "The Coder School Berkeley",
      location: "Berkeley, CA",
      start: "Jun 2023",
      end: "Jul 2024",
      bullets: [
        "Mentored groups of up to 15 students ages 6–12 in programming and project development",
        "Taught Python, Micro:bit, Scratch, and introductory object-oriented programming concepts",
        "Developed individualized lessons to reinforce programming fundamentals, critical thinking, and creativity",
        "Guided students in designing and building original programming projects"
      ],
    },
    {
      id: "role-2",
      role: "Assistant Coach",
      org: "Hanabi Judo",
      location: "Albany, CA",
      start: "Oct 2022",
      end: "Aug 2023",
      bullets: [
        "Taught fundamental judo techniques to developing students during group practices",
        "Provided one-on-one coaching to help students improve technique and execution",
        "Assisted the head coach in planning and coordinating practice activities",
      ],
    }
  ],
  skills: [
    {
      domain: "languages",
      label: "Languages",
      items: ["Python", "Swift", "C++", "Java",  "TypeScript", "JavaScript", "SQL", "HTML/CSS"],
    },
    {
      domain: "frameworkslibraries",
      label: "Frameworks & Libraries",
      items: ["SwiftUI", "AVFoundation", "React", "Next.js", "Playwright"],
    },
    {
      domain: "toolstechnologies",
      label: "Tools & Technologies",
      items: ["Git", "Firebase", "Whisper", "Ollama", "Metal", "Vulkan"],
    }
  ],
};
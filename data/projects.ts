// data/projects.ts
// Central data source for the Projects Showcase. Keeping this separate from
// the components means adding a new project later is a data-only change.

export type EdgeType = "diagram" | "demo" | "snippet";
export type ProjectStatus = "active" | "archived";

export interface EngineeringEdge {
  type: EdgeType;
  /** Short label shown on the slot header, e.g. "Architecture Diagram" */
  label: string;
  /** One-line caption explaining what the visual proves */
  caption: string;
  /** Path to a real asset once you have one (screenshot, exported diagram, GIF) */
  imageSrc?: string;
  /** Used only when type === "snippet" */
  code?: string;
  language?: string;
}

export interface ProjectLinks {
  repo?: string;
  demo?: string;
  /** Optional write-up link — useful for archived projects with no live demo */
  writeUp?: string;
}

export interface Project {
  id: string;
  title: string;
  status: ProjectStatus;
  impact: string;
  techStack: string[];
  engineeringEdge: EngineeringEdge;
  links: ProjectLinks;
}

export const projects: Project[] = [
  {
    id: "ai-voice-assistant",
    title: "AI Voice Assistant",
    status: "active",
    impact:
      "Engineered a voice assistant designed for resource intensive environments (like gaming). Focused on optimizing CPU usage by offloading Speech to Text and Language Model processing to the GPU.",
    techStack: ["Python", "asyncio", "Whisper", "Ollama", "Kokoro-82M"],
    engineeringEdge: {
      type: "diagram",
      label: "Architecture Diagram",
      caption:
        "Mic Capture → Wake Word ('Hey Jarvis') → Voice Activity Detection (speech end detected) → Speech To Text (whisper.cpp / Vulkan) → Language Model (Ollama) → Voice Activity Detection barge-in watchdog (runs concurrently, can interrupt at any point after STT) → Text To Speech (Kokoro) → Playback",
      imageSrc: "/projects/voice-assistant/architecture.png"
    },
    links: {
      repo: "https://github.com/LEDLamp1256/voiceAssistant",
    },
  },
  {
    id: "budgeting-web-app",
    title: "Budgeting Web Application",
    status: "active",
    impact:
      "Developed a budgeting web app to help manage financials with secure Firebase authentication and cloud data storage.",
    techStack: ["HTML", "CSS", "JavaScript", "Firebase"],
    engineeringEdge: {
      type: "demo",
      label: "Visual",
      caption:
        "Interactive pie charts visualize income and expense categories in real time.",
      imageSrc: "/projects/budgeting-app/visual.png"
    },
    links: {
      repo: "https://github.com/LEDLamp1256/budgetingApp",
      demo: "/budgeting",
    },
  },
  {
    id: "google-classroom-calendar",
    title: "Google Classroom Calendar",
    status: "archived",
    impact:
      "Automated academic workflows by integrating the Google Classroom API to parse assignments into a dynamic calendar.",
    techStack: ["Python", "Google Classroom API"],
    engineeringEdge: {
      type: "snippet",
      label: "Code Snippet",
      caption: "Event creation with date-based scheduling from parsed assignment data.",
      language: "python",
      code:
`def create_calendar_event(assignment, calendar_service):
    """Turn a parsed Classroom assignment into a scheduled event."""
    due = assignment["dueDate"]
    event = {
        "summary": assignment["title"],
        "start": {"dateTime": due.isoformat()},
        "end": {"dateTime": (due + timedelta(minutes=30)).isoformat()},
        "reminders": {"useDefault": True},
    }
    return calendar_service.events().insert(
        calendarId="primary", body=event
    ).execute()`,
    },
    links: {
      repo: "https://github.com/LEDLamp1256/calendarAppSharing",
    },
  },
];

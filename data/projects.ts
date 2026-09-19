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
    id: "lecturerecorder",
    title: "Lecture Recorder",
    status: "active",
    impact:
      "Built a native macOS application for reliably recording lectures and transcribing them entirely on-device. Designed recording, storage, and local Whisper transcription as independent components so long-running AI processing does not interfere with audio capture.",
    techStack: ["Swift", "SwiftUI", "AVFoundation", "Whisper", "Metal"],
    engineeringEdge: {
      type: "diagram",
      label: "Architecture Diagram",
      caption:
        "Microphone → AVAudioEngine Capture → Durable ~30s Audio Chunks → Session Storage → Completed Recording → Local Whisper Worker (whisper.cpp / Metal) → Timestamped Transcript → Grounded Lecture Notes → AI Summary. Recording and downstream AI processing run independently so slower transcription or generation never blocks audio capture.",
      imageSrc: "/projects/lecturerecorder/architecture.png"
    },
    links: {
      repo: "https://github.com/LEDLamp1256/LectureRecorder",
    },
  },
  {
    id: "aivoiceassistant",
    title: "AI Voice Assistant",
    status: "active",
    impact:
      "Engineered a fully local voice assistant designed to remain responsive in resource-intensive environments like gaming. Offloaded speech recognition and language-model inference to the GPU while keeping real-time microphone processing and interruption detection responsive.",
    techStack: ["Python", "asyncio", "Whisper", "Ollama", "Vulkan", "Kokoro"],
    engineeringEdge: {
      type: "diagram",
      label: "Architecture Diagram",
      caption:
        "Mic Capture → Wake Word ('Hey Jarvis') → Voice Activity Detection (speech end detected) → Speech To Text (whisper.cpp / Vulkan) → Language Model (Ollama) → Voice Activity Detection barge-in watchdog (runs concurrently, can interrupt at any point after STT) → Text To Speech (Kokoro) → Playback",
      imageSrc: "/projects/voiceassistant/architecture.png"
    },
    links: {
      repo: "https://github.com/LEDLamp1256/voiceAssistant",
    },
  },
  {
    id: "jobautofillagent",
    title: "Job Auto Fill Agent",
    status: "active",
    impact:
      "Engineered an AI-assisted job application agent that understands and fills web forms using Playwright and local LLM inference. Designed the workflow to handle varied form controls, recover from navigation errors, and flag uncertain responses for human review.",
    techStack: ["Python", "Playwright", "Ollama", "LLama 3.1"],
    engineeringEdge: {
      type: "diagram",
      label: "Architecture Diagram",
      caption:
        "Scraper → AI Matches form field from config.json → LLM Response is injected into the page.",
      imageSrc: "/projects/jobautofillagent/architecture.png"
    },
    links: {
      repo: "https://github.com/LEDLamp1256/jobAutoFillAgent",
    },
  },
  {
    id: "budgetingapp",
    title: "Budgeting Web Application",
    status: "archived",
    impact:
      "Developed a budgeting web application for tracking income, expenses, and personalized spending goals. Integrated Firebase authentication and cloud data storage while providing visual spending breakdowns and calculated daily and weekly spending targets.",
    techStack: ["JavaScript", "HTML/CSS", "Firebase Auth", "Firestore", "Google Charts"],
    engineeringEdge: {
      type: "demo",
      label: "Visual",
      caption:
        "Interactive pie charts visualize income and expense categories in real time.",
      imageSrc: "/projects/budgetingapp/visual.png"
    },
    links: {
      repo: "https://github.com/LEDLamp1256/budgetingApp",
      demo: "/budgeting",
    },
  },
  {
    id: "googleclassroomcalendar",
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

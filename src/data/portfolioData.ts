import type { Project, SkillCategory, SocialLink } from '../types';

export const PROFILE = {
  name: "Adarsh M",
  tagline: "Full-Stack Software Engineer • React, Node.js, Express & Flutter",
  introduction: "I engineer scalable web & mobile platforms across React, JavaScript, TypeScript, Flutter, Node.js, and Express—specializing in REST APIs, offline-first resilience, and grounded AI workflows.",
  location: "SRMIST, Chennai, India",
  timezone: "Asia/Kolkata",
  email: "adarsh048a@gmail.com",
  github: "https://github.com/Adarsh048",
  linkedin: "https://linkedin.com/in/adarsh-m-841010263/",
  resume: "https://drive.google.com/file/d/1plNZfzrBketUtW7Q5OOoYRpmemFSR0Rk/view?usp=drive_link",
  twitter: "https://x.com/adar_sxh",
  education: {
    degree: "B.Tech in Computer Science and Engineering",
    specialization: "Cyber Security Specialization",
    institution: "SRM Institute of Science and Technology",
    cgpa: "8.76 / 10.0",
    period: "2021 — 2025"
  },
  stats: {
    commits: "500+",
    repos: "15+",
    ctfRank: "Top 5 / 50",
    cgpa: "8.76"
  }
};

export const PROJECTS: Project[] = [
  {
    id: "decision-vault",
    title: "DecisionVault",
    subtitle: "Architecture Decision Record Platform",
    period: "2025",
    category: "Full-Stack • Distributed Systems",
    description: "An offline-first enterprise collaboration platform for technical teams to draft, review, and persist Architecture Decision Records (ADRs) with real-time peer synchronization.",
    features: [
      "Offline-first client persistence via IndexedDB (Dexie.js) allowing uninterrupted drafting without internet",
      "Background outbox synchronization pattern that reconciles offline local changes back to MongoDB upon reconnection",
      "Real-time team collaboration with multi-user updates and broadcast notifications via Socket.IO",
      "3-tier Role-Based Access Control (Owner, Member, Viewer) secured by HTTP-only JSON Web Tokens (JWT)"
    ],
    tags: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "Socket.IO", "IndexedDB", "Dexie.js", "Tailwind CSS"],
    liveUrl: "https://decision-vault-for.vercel.app/",
    githubUrl: "https://github.com/Adarsh048/DecisionVault",
    isPrimary: true
  },
  {
    id: "query-mind",
    title: "QueryMind / Find It",
    subtitle: "AI Search & Research Engine",
    period: "2025",
    category: "AI Engineering • Information Retrieval",
    description: "An AI-powered search and question-answering application that synthesizes live web information using Retrieval-Augmented Generation (RAG) and low-latency token streaming.",
    features: [
      "Live web retrieval pipeline orchestrating real-time discovery with Tavily Search API",
      "Retrieval-Augmented Generation (RAG) workflow with Gemini AI delivering grounded, cited answers",
      "Bidirectional WebSocket connection delivering token-by-token streaming responses",
      "Cross-platform responsive client engineered with Flutter & Dart alongside a Python FastAPI backend"
    ],
    tags: ["Flutter", "Dart", "FastAPI", "Python", "Gemini AI", "Tavily Search", "RAG", "WebSockets"],
    githubUrl: "https://github.com/Adarsh048/Find_it_app"
  },
  {
    id: "finsight",
    title: "FinSight",
    subtitle: "Finance Analytics Dashboard",
    period: "2024",
    category: "Frontend • Analytics Dashboard",
    description: "A React-based finance dashboard built to visualize transactions, monitor real-time portfolio metrics, track budget allocations, and deliver actionable fiscal insights.",
    features: [
      "Dynamic interactive charting with time-range filtering and categorical drills",
      "Real-time expense distribution breakdown with anomaly threshold alerts",
      "Modular dashboard widgets with persistent layout preferences and responsive scaling"
    ],
    tags: ["React", "JavaScript", "Tailwind CSS", "Recharts", "REST APIs"],
    liveUrl: "https://finance-dashboard-teal-nine-23.vercel.app",
    githubUrl: "https://github.com/Adarsh048/Finance_dashboard"
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Frontend",
    skills: ["React", "Next.js", "JavaScript", "TypeScript", "Tailwind CSS", "HTML5", "CSS3", "Flutter"]
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express", "FastAPI", "Python", "Socket.IO", "GraphQL", "REST APIs", "WebSockets"]
  },
  {
    title: "Databases",
    skills: ["PostgreSQL", "MongoDB", "Firebase", "Redis", "Supabase", "IndexedDB", "Dexie.js"]
  },
  {
    title: "AI Engineering",
    skills: ["Gemini AI", "RAG Workflows", "Tavily Search API", "LLM Integrations", "Token Streaming"]
  },
  {
    title: "Languages",
    skills: ["TypeScript", "JavaScript", "Python", "Dart", "Java", "C", "C++"]
  },
  {
    title: "Tools & Platforms",
    skills: ["Git", "GitHub", "Docker", "Postman", "Vite", "Linux / CLI"]
  }
];

export const MARQUEE_ROW_1 = [
  "React", "TypeScript", "Node.js", "FastAPI", "Python", "Tailwind CSS", "Next.js", "MongoDB", "JavaScript"
];

export const MARQUEE_ROW_2 = [
  "Socket.IO", "IndexedDB", "Gemini AI", "RAG Workflows", "Docker", "Express", "REST APIs", "Dexie.js", "Git"
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: "GitHub",
    sublabel: "Ma playground 🔮",
    url: PROFILE.github,
    icon: "github"
  },
  {
    label: "LinkedIn",
    sublabel: "(serious stuff 💼)",
    url: PROFILE.linkedin,
    icon: "linkedin"
  },
  {
    label: "X / Twitter",
    sublabel: "(builds & ideas 🚀)",
    url: PROFILE.twitter,
    icon: "twitter"
  },
  {
    label: "Email",
    sublabel: "(say hello 📬)",
    url: `mailto:${PROFILE.email}`,
    icon: "mail"
  }
];

import React, { useEffect } from 'react';
import { 
  ArrowLeft, 
  Trophy, 
  Terminal, 
  CheckCircle2, 
  ExternalLink,
  ArrowUpRight
} from 'lucide-react';
import { GithubIcon } from '../components/Icons';
import { LetterReveal, WordReveal } from '../components/LetterReveal';
import { PROFILE } from '../data/portfolioData';

interface ActivityPageProps {
  onBack: () => void;
  onNavigateToProjects?: () => void;
  onNavigateToContact?: () => void;
}

const TIMELINE_EVENTS = [
  {
    period: "2025 — Present",
    badge: "Current Milestone",
    title: "Full-Stack Distributed Systems & AI Retrieval",
    institution: "Independent Research & Production Builds",
    description: "Architecting offline-first collaborative systems (DecisionVault with Dexie.js and Socket.IO) and building real-time grounded RAG applications (QueryMind / Find It with Gemini AI, Tavily API, and WebSockets).",
    achievements: [
      "Engineered local-first Outbox Pattern reconciliation engine for zero-data-loss offline work",
      "Built bi-directional WebSocket streaming pipeline with sub-100ms time-to-first-token",
      "Actively maintaining 15+ repositories with 500+ lifetime Git commits"
    ],
    tags: ["Distributed Systems", "Offline-First", "Dexie.js", "Gemini AI", "WebSockets"]
  },
  {
    period: "2024",
    badge: "CTF Finalist",
    title: "CyberCarnival CTF National Finals — Top 5 / 50 Teams",
    institution: "SRMIST Cybersecurity Association",
    description: "Competed in high-intensity, multi-stage Capture The Flag finals solving complex security exploitation challenges across Web Security, Cryptanalysis, Reverse Engineering, and Network Defense.",
    achievements: [
      "Secured Top 5 placement among 50 qualifying collegiate security teams",
      "Conducted web vulnerability exploits, broken authentication analysis, and cryptographic payload decryption",
      "Applied offensive security findings back into defensive RBAC architectures in full-stack applications"
    ],
    tags: ["Cyber Security", "Web Exploitation", "Cryptanalysis", "Network Forensics", "OWASP"]
  },
  {
    period: "2024",
    badge: "Engineering Project",
    title: "FinSight Financial Analytics Dashboard",
    institution: "Production Release",
    description: "Designed and deployed a responsive personal finance analytics suite featuring interactive charting, categorical drills, and anomaly detection.",
    achievements: [
      "Achieved smooth 60fps chart rendering and client-side data aggregations",
      "Deployed to production on Vercel with automated continuous deployment from GitHub"
    ],
    tags: ["React", "Data Visualization", "Recharts", "Vercel"]
  },
  {
    period: "2021 — 2025",
    badge: "Academic Degree",
    title: "B.Tech in Computer Science and Engineering (Cyber Security)",
    institution: "SRM Institute of Science and Technology (SRMIST)",
    description: "Graduated with 8.76 / 10.0 CGPA with an intensive dual curriculum spanning computer science fundamentals (data structures, algorithms, operating systems, distributed databases) and dedicated cybersecurity modules.",
    achievements: [
      "Graduated with High Academic Standing (8.76 / 10.0 CGPA)",
      "Specialized coursework in Cryptography, Network Security, Secure Coding Practices, and Cloud Architectures",
      "Active participant in technical symposiums, internal hackathons, and open source development"
    ],
    tags: ["CSE", "Cyber Security", "Algorithms", "Operating Systems", "Networking"]
  }
];

export const ActivityPage: React.FC<ActivityPageProps> = ({ 
  onBack, 
  onNavigateToProjects,
  onNavigateToContact 
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onBack();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onBack]);

  return (
    <article className="py-8 space-y-12">
      {/* Top Breadcrumb & Return Action */}
      <div className="flex items-center justify-between border-b border-border-main pb-4 animate-hero-fade-up" style={{ animationDelay: '100ms' }}>
        <button
          onClick={onBack}
          className="group inline-flex items-center gap-2 text-xs font-mono text-text-secondary hover:text-text-primary transition-colors cursor-pointer px-2.5 py-1 rounded-md hover:bg-bg-hover"
          aria-label="Back to overview"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          <span>Back to Home</span>
        </button>
        <span className="hidden sm:inline-block text-[11px] font-mono text-text-muted">
          Press <kbd className="px-1.5 py-0.5 rounded border border-border-main bg-bg-main text-[10px]">Esc</kbd> to return
        </span>
      </div>

      {/* Hero Header */}
      <header className="space-y-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-border-main bg-panel-bg text-[11px] font-mono text-text-secondary animate-hero-badge" style={{ animationDelay: '220ms' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Timeline & Milestones Dossier</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold font-display tracking-tight text-text-primary">
            <LetterReveal text="Activity & Career Milestones" baseDelay={320} staggerMs={22} />
          </h1>
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed max-w-xl">
            <WordReveal 
              text="A chronological timeline of my engineering development, CTF security achievements, academic credentials, and open source code activity."
              baseDelay={650}
              staggerMs={28}
            />
          </p>
        </div>

        {/* Quantified Accomplishments Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 pt-2">
          <div className="p-2.5 sm:p-3.5 rounded-xl border border-border-main bg-panel-bg space-y-1 animate-hero-card" style={{ animationDelay: '950ms' }}>
            <span className="text-[10px] sm:text-[11px] font-mono text-text-muted block">Academic Honors</span>
            <span className="text-sm sm:text-base font-bold text-text-primary font-mono block">8.76 CGPA</span>
            <span className="text-[9px] sm:text-[10px] font-mono text-text-muted block">SRMIST CSE Graduate</span>
          </div>

          <div className="p-2.5 sm:p-3.5 rounded-xl border border-border-main bg-panel-bg space-y-1 animate-hero-card" style={{ animationDelay: '1080ms' }}>
            <span className="text-[10px] sm:text-[11px] font-mono text-text-muted block">Competitive Security</span>
            <span className="text-sm sm:text-base font-bold text-text-primary font-mono block">Top 5 / 50</span>
            <span className="text-[9px] sm:text-[10px] font-mono text-text-muted block">CyberCarnival CTF Finals</span>
          </div>

          <div className="p-2.5 sm:p-3.5 rounded-xl border border-border-main bg-panel-bg space-y-1 animate-hero-card" style={{ animationDelay: '1210ms' }}>
            <span className="text-[10px] sm:text-[11px] font-mono text-text-muted block">GitHub Commits</span>
            <span className="text-sm sm:text-base font-bold text-text-primary font-mono block">500+ Commits</span>
            <span className="text-[9px] sm:text-[10px] font-mono text-text-muted block">Consistent Shipping</span>
          </div>

          <div className="p-2.5 sm:p-3.5 rounded-xl border border-border-main bg-panel-bg space-y-1 animate-hero-card" style={{ animationDelay: '1340ms' }}>
            <span className="text-[10px] sm:text-[11px] font-mono text-text-muted block">Repositories</span>
            <span className="text-sm sm:text-base font-bold text-text-primary font-mono block">15+ Repos</span>
            <span className="text-[9px] sm:text-[10px] font-mono text-text-muted block">Public Open Source</span>
          </div>
        </div>
      </header>

      {/* Chronological Timeline Section */}
      <section className="space-y-6">
        <h2 className="text-lg font-bold font-display text-text-primary flex items-center gap-2 border-b border-border-main pb-2 animate-hero-fade-up" style={{ animationDelay: '1480ms' }}>
          <Terminal className="w-4 h-4 text-text-primary" />
          <span>Chronological Engineering Milestones</span>
        </h2>

        <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-[1px] before:bg-border-main">
          {TIMELINE_EVENTS.map((event, idx) => (
            <div key={idx} className="relative pl-9 space-y-3">
              {/* Timeline Node Dot */}
              <div className="absolute left-2 top-1.5 w-3 h-3 rounded-full border-2 border-bg-main bg-text-primary shadow-xs" />

              <div 
                className="p-5 rounded-2xl border border-border-main bg-panel-bg space-y-3 transition-all hover:border-text-primary/40 animate-hero-card"
                style={{ animationDelay: `${1600 + idx * 220}ms` }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 border-b border-border-main/60 pb-3">
                  <div>
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold mb-1 border border-emerald-500/20">
                      {event.badge}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold font-display text-text-primary">
                      {event.title}
                    </h3>
                    <p className="text-xs font-mono text-text-secondary">
                      {event.institution}
                    </p>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="text-xs font-mono text-text-muted">
                      {event.period}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-text-secondary leading-relaxed">
                  {event.description}
                </p>

                {/* Key Accomplishments Checklist */}
                <div className="space-y-1.5 pt-1">
                  {event.achievements.map((item, itemIdx) => (
                    <div key={itemIdx} className="flex items-start gap-2 text-xs font-mono text-text-secondary">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border-subtle">
                  {event.tags.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded text-[10px] font-mono bg-bg-main border border-border-subtle text-text-muted">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Security Exploitation & CTF Details Callout */}
      <section className="p-5 sm:p-6 rounded-2xl border border-border-main bg-panel-bg space-y-4 animate-hero-card" style={{ animationDelay: '2500ms' }}>
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            <Trophy className="w-4 h-4 text-emerald-500" />
          </div>
          <div>
            <h3 className="text-sm font-bold font-display text-text-primary">
              CyberCarnival CTF Finals Experience
            </h3>
            <span className="text-[11px] font-mono text-text-muted">
              National Security Competition
            </span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
          The CyberCarnival CTF Finals tested rigorous full-spectrum security skills under tight time constraints. Challenges demanded reverse engineering binary executables with Ghidra, identifying NoSQL/SQL injection and SSRF flaws in web endpoints, exploiting insecure JWT implementations, and cracking cryptographic salts. This background directly informs my production code: I build web applications with zero implicit trust, defense in depth, and strict access control guards.
        </p>

        <div className="flex items-center gap-3 pt-2">
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-text-primary hover:text-emerald-500 transition-colors"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>View GitHub Security Repositories & Utilities</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>

      {/* Footer Navigation */}
      <footer className="pt-6 border-t border-border-main flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-hero-fade-up" style={{ animationDelay: '2720ms' }}>
        <button
          onClick={onBack}
          className="group inline-flex items-center gap-2 text-xs font-mono text-text-primary hover:text-emerald-500 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          <span>Return to Homepage Overview</span>
        </button>

        <div className="flex items-center gap-4">
          {onNavigateToProjects && (
            <button
              onClick={onNavigateToProjects}
              className="group inline-flex items-center gap-1.5 text-xs font-mono text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
            >
              <span>Explore Projects Case Studies</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          )}
          {onNavigateToContact && (
            <button
              onClick={onNavigateToContact}
              className="group inline-flex items-center gap-1.5 text-xs font-mono text-text-primary hover:text-emerald-500 transition-colors cursor-pointer"
            >
              <span>Get In Touch</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </footer>
    </article>
  );
};

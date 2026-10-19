import React, { useEffect, useState } from 'react';
import { 
  ArrowLeft, 
  ArrowUpRight,
  GraduationCap, 
  Trophy, 
  Terminal, 
  Code2, 
  Layers, 
  CheckCircle2, 
  ExternalLink, 
  Mail, 
  Download,
  FolderGit2,
  Sparkles,
  Database,
  Bot,
  Cloud,
  Check,
  Copy,
  Cpu
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/Icons';
import { LetterReveal, WordReveal } from '../components/LetterReveal';
import { PROFILE } from '../data/portfolioData';

interface AboutPageProps {
  onBack: () => void;
  onNavigateToProjects?: () => void;
  onNavigateToContact?: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ 
  onBack, 
  onNavigateToProjects,
  onNavigateToContact 
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);

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

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(PROFILE.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  // Technical Strengths Data Mapping
  const technicalStrengths = [
    {
      category: "Languages",
      icon: Code2,
      skills: ["JavaScript", "TypeScript", "Python", "C", "C++", "SQL", "HTML", "CSS"]
    },
    {
      category: "Frontend",
      icon: Layers,
      skills: ["React.js", "Tailwind CSS", "Redux / RTK Query"]
    },
    {
      category: "Backend",
      icon: Terminal,
      skills: ["Node.js", "Express.js", "FastAPI", "REST APIs", "WebSockets"]
    },
    {
      category: "Databases & Authentication",
      icon: Database,
      skills: ["MongoDB", "Firebase", "JWT", "Role-Based Access Control"]
    },
    {
      category: "AI & Retrieval",
      icon: Bot,
      skills: ["Gemini AI", "Tavily Search API", "Retrieval-Augmented Generation (RAG)"]
    },
    {
      category: "Cloud & Tools",
      icon: Cloud,
      skills: ["AWS EC2", "S3", "IAM", "VPC", "Git", "GitHub"]
    }
  ];

  // Engineering Approach Pillars
  const approachPillars = [
    {
      title: "Full-Stack Development",
      description: "Building web applications with React, TypeScript, Node.js, Express, and MongoDB.",
      icon: Layers
    },
    {
      title: "Backend Engineering",
      description: "Developing REST APIs, integrating services, implementing authentication, and handling application data.",
      icon: Terminal
    },
    {
      title: "AI Integration",
      description: "Combining language models and web search to build context-aware research applications.",
      icon: Bot
    },
    {
      title: "Application Reliability",
      description: "Exploring offline data persistence, background synchronization, real-time communication, and automated testing.",
      icon: Cpu
    }
  ];

  // Selected Projects Data with Descriptions matching the user prompt
  const selectedProjectsData = [
    {
      title: "DecisionVault",
      subtitle: "Offline-First Collaboration Platform",
      description: "Built a full-stack platform for documenting and managing architecture decisions, featuring offline persistence, background synchronization, real-time collaboration, and role-based access control.",
      technologies: ["React", "TypeScript", "Node.js", "MongoDB", "Socket.IO", "IndexedDB"],
      liveUrl: "https://decision-vault-for.vercel.app/",
      githubUrl: "https://github.com/Adarsh048/DecisionVault"
    },
    {
      title: "QueryMind",
      subtitle: "AI-Powered Research Application",
      description: "Developed an AI-powered search and question-answering application integrating Gemini AI and Tavily Search through a FastAPI backend, with streaming responses over WebSockets.",
      technologies: ["Flutter", "Python", "FastAPI", "Gemini AI", "Tavily Search API"],
      liveUrl: undefined,
      githubUrl: "https://github.com/Adarsh048/Find_it_app"
    },
    {
      title: "FinSight",
      subtitle: "Finance Analytics Dashboard",
      description: "Created an interactive finance dashboard for tracking income, expenses, and spending trends, with charts, filtering, data export, and centralized state management.",
      technologies: ["React", "JavaScript", "Recharts", "Context API"],
      liveUrl: "https://finance-dashboard-teal-nine-23.vercel.app",
      githubUrl: "https://github.com/Adarsh048/Finance_dashboard"
    }
  ];

  return (
    <article className="pt-24 sm:pt-28 pb-16 space-y-14 max-w-4xl mx-auto">
      {/* Top Breadcrumb & Return Action */}
      <div className="flex items-center justify-between border-b border-border-main pb-4 animate-hero-fade-up" style={{ animationDelay: '100ms' }}>
        <button
          onClick={onBack}
          className="group inline-flex items-center gap-2 text-xs font-mono text-text-secondary hover:text-text-primary transition-colors cursor-pointer px-2.5 py-1 rounded-md hover:bg-bg-hover"
          aria-label="Back to home"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          <span>Back to Home</span>
        </button>
        <span className="hidden sm:inline-block text-[11px] font-mono text-text-muted">
          Press <kbd className="px-1.5 py-0.5 rounded border border-border-main bg-bg-main text-[10px]">Esc</kbd> to return
        </span>
      </div>

      {/* Hero Header */}
      <header className="space-y-6">
        <div className="space-y-3.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border-main bg-panel-bg text-xs font-mono text-text-secondary animate-hero-badge" style={{ animationDelay: '180ms' }}>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Profile & Dossier</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display tracking-tight text-text-primary leading-[1.12]">
            <LetterReveal text="About Adarsh M." baseDelay={260} staggerMs={24} />
          </h1>

          <h2 className="text-base sm:text-xl font-display font-semibold text-text-primary tracking-tight">
            <WordReveal 
              text="Software Engineer | Full-Stack Development | AI Applications"
              baseDelay={620}
              staggerMs={32}
            />
          </h2>

          <div className="space-y-3 pt-1 text-base sm:text-[17px] text-text-secondary leading-relaxed font-normal">
            <p className="animate-hero-fade-up" style={{ animationDelay: '450ms' }}>
              I'm a 2026 Computer Science and Engineering graduate from SRM Institute of Science and Technology with an 8.76 CGPA. I build full-stack web applications and AI-powered solutions, with hands-on experience in React, TypeScript, Node.js, MongoDB, and Python.
            </p>
            <p className="animate-hero-fade-up" style={{ animationDelay: '600ms' }}>
              I enjoy solving practical engineering problems, from building responsive user interfaces and reliable APIs to implementing real-time collaboration, offline-first functionality, and AI-powered search.
            </p>
          </div>
        </div>

        {/* Highlight Badge & Quick CTA Row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2 border-t border-border-subtle/80">
          <div 
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-xs sm:text-[13px] font-semibold animate-hero-fade-up w-fit"
            style={{ animationDelay: '720ms' }}
          >
            <GraduationCap className="w-4 h-4 shrink-0" />
            <span>B.Tech CSE · 8.76 CGPA</span>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 animate-hero-fade-up" style={{ animationDelay: '840ms' }}>
            {onNavigateToProjects ? (
              <button
                onClick={onNavigateToProjects}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-border-main hover:border-text-primary bg-panel-bg hover:bg-panel-hover text-text-primary text-xs font-mono font-medium transition-all duration-200 cursor-pointer shadow-2xs"
              >
                <FolderGit2 className="w-3.5 h-3.5" />
                <span>View Projects</span>
              </button>
            ) : (
              <a
                href="#projects"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-border-main hover:border-text-primary bg-panel-bg hover:bg-panel-hover text-text-primary text-xs font-mono font-medium transition-all duration-200 cursor-pointer shadow-2xs"
              >
                <FolderGit2 className="w-3.5 h-3.5" />
                <span>View Projects</span>
              </a>
            )}

            <a
              href={PROFILE.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-border-main hover:border-text-primary bg-panel-bg hover:bg-panel-hover text-text-primary text-xs font-mono font-medium transition-all duration-200 shadow-2xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Resume</span>
            </a>

            {onNavigateToContact ? (
              <button
                onClick={onNavigateToContact}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-text-primary text-bg-main hover:opacity-90 text-xs font-mono font-semibold transition-all duration-200 cursor-pointer shadow-2xs"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Contact Me</span>
              </button>
            ) : (
              <a
                href={`mailto:${PROFILE.email}`}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-text-primary text-bg-main hover:opacity-90 text-xs font-mono font-semibold transition-all duration-200 shadow-2xs"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Contact Me</span>
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Section: My Approach to Engineering */}
      <section className="space-y-5 pt-2">
        <div className="flex items-center gap-3 animate-hero-fade-up" style={{ animationDelay: '880ms' }}>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-text-primary flex items-center gap-2.5">
            <Cpu className="w-5 h-5 text-text-primary" />
            <span>My Approach to Engineering</span>
          </h2>
          <div className="h-[1px] flex-1 bg-border-main" />
        </div>

        <p className="text-[15px] sm:text-base text-text-secondary leading-relaxed animate-hero-fade-up" style={{ animationDelay: '940ms' }}>
          I focus on building software that is useful, maintainable, and reliable. My projects have given me hands-on experience across frontend development, backend engineering, database integration, authentication, and AI application development.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
          {approachPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="p-5 rounded-2xl border border-border-main bg-panel-bg/90 hover:border-text-primary/30 transition-all duration-200 shadow-xs space-y-2 animate-hero-card"
                style={{ animationDelay: `${950 + idx * 100}ms` }}
              >
                <div className="flex items-center gap-2 text-text-primary">
                  <Icon className="w-4 h-4 text-emerald-500 shrink-0" />
                  <h3 className="text-sm sm:text-base font-bold font-mono tracking-tight">
                    {pillar.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Opportunity Statement Callout */}
        <div 
          className="p-5 rounded-2xl border border-border-main bg-panel-bg/60 dark:bg-white/[0.02] space-y-2 animate-hero-fade-up"
          style={{ animationDelay: '1350ms' }}
        >
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-text-primary uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            <span>Current Focus</span>
          </div>
          <p className="text-sm sm:text-[15px] text-text-primary leading-relaxed font-sans">
            I'm looking for an entry-level Software Engineer or Full-Stack Developer opportunity where I can contribute to real products, learn from experienced engineers, and grow through solving challenging problems.
          </p>
        </div>
      </section>

      {/* Section: Education */}
      <section className="space-y-5 pt-2">
        <div className="flex items-center gap-3 animate-hero-fade-up" style={{ animationDelay: '1420ms' }}>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-text-primary flex items-center gap-2.5">
            <GraduationCap className="w-5 h-5 text-text-primary" />
            <span>Education</span>
          </h2>
          <div className="h-[1px] flex-1 bg-border-main" />
        </div>

        <div className="p-6 sm:p-7 rounded-2xl border border-border-main bg-panel-bg/90 shadow-xs space-y-5 animate-hero-card" style={{ animationDelay: '1500ms' }}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-border-main/60 pb-4">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-text-primary">
                SRM Institute of Science and Technology
              </h3>
              <p className="text-sm sm:text-[15px] font-mono font-semibold text-text-primary mt-1">
                B.Tech — Computer Science and Engineering
              </p>
            </div>
            <div className="text-left sm:text-right mt-1 sm:mt-0">
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-xs sm:text-[13px] font-semibold border border-emerald-500/20">
                CGPA: 8.76/10
              </span>
              <p className="text-xs font-mono text-text-muted mt-1">
                2022–2026
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs sm:text-[13px] font-bold uppercase tracking-wider text-text-primary font-mono">
              Relevant Coursework
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm font-mono text-text-secondary">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Data Structures and Algorithms</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Database Management Systems</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Operating Systems</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Computer Networks</span>
              </div>
              <div className="flex items-center gap-2 sm:col-span-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Object-Oriented Programming</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Technical Strengths */}
      <section className="space-y-5 pt-2">
        <div className="flex items-center gap-3 animate-hero-fade-up" style={{ animationDelay: '1600ms' }}>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-text-primary flex items-center gap-2.5">
            <Terminal className="w-5 h-5 text-text-primary" />
            <span>Technical Strengths</span>
          </h2>
          <div className="h-[1px] flex-1 bg-border-main" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {technicalStrengths.map((group, idx) => {
            const Icon = group.icon;
            return (
              <div
                key={group.category}
                className="p-5 rounded-2xl border border-border-main bg-panel-bg/90 hover:border-text-primary/30 transition-all duration-200 shadow-xs space-y-3 animate-hero-card"
                style={{ animationDelay: `${1550 + idx * 80}ms` }}
              >
                <div className="flex items-center gap-2 text-text-primary">
                  <Icon className="w-4 h-4 text-emerald-500 shrink-0" />
                  <h3 className="text-xs sm:text-sm font-bold font-mono uppercase tracking-wider">
                    {group.category}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-md text-xs font-mono border border-border-subtle bg-bg-main text-text-secondary"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Section: Selected Projects */}
      <section className="space-y-5 pt-2">
        <div className="flex items-center gap-3 animate-hero-fade-up" style={{ animationDelay: '2150ms' }}>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-text-primary flex items-center gap-2.5">
            <FolderGit2 className="w-5 h-5 text-text-primary" />
            <span>Selected Projects</span>
          </h2>
          <div className="h-[1px] flex-1 bg-border-main" />
        </div>

        <div className="space-y-4">
          {selectedProjectsData.map((project, idx) => (
            <div
              key={project.title}
              className="p-5 sm:p-6 rounded-2xl border border-border-main bg-panel-bg/90 hover:border-text-primary/40 transition-colors space-y-3 shadow-xs animate-hero-card"
              style={{ animationDelay: `${1950 + idx * 120}ms` }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border-main/50 pb-3">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-text-primary flex items-center gap-2 flex-wrap">
                    <span>{project.title}</span>
                    <span className="text-xs sm:text-sm font-normal text-text-muted font-mono">
                      — {project.subtitle}
                    </span>
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded-md border border-border-main bg-bg-main hover:border-text-primary text-xs font-mono text-text-secondary hover:text-text-primary flex items-center gap-1 transition-colors"
                      title="Live Demo"
                    >
                      <span>Live</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-md border border-border-main bg-bg-main hover:border-text-primary text-text-secondary hover:text-text-primary flex items-center transition-colors"
                      aria-label="GitHub Repository"
                      title="GitHub Repository"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>

              <p className="text-sm text-text-secondary leading-relaxed">
                {project.description}
              </p>

              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] font-mono font-bold text-text-primary uppercase tracking-wider block">
                  Technologies
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-0.5 rounded text-xs font-mono border border-border-subtle bg-bg-main text-text-secondary font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section: Achievement */}
      <section className="space-y-5 pt-2">
        <div className="flex items-center gap-3 animate-hero-fade-up" style={{ animationDelay: '2520ms' }}>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-text-primary flex items-center gap-2.5">
            <Trophy className="w-5 h-5 text-text-primary" />
            <span>Achievement</span>
          </h2>
          <div className="h-[1px] flex-1 bg-border-main" />
        </div>

        <div className="p-5 sm:p-6 rounded-2xl border border-border-main bg-panel-bg/90 hover:border-text-primary/30 transition-all duration-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 animate-hero-card" style={{ animationDelay: '2580ms' }}>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                FINALIST • TOP 5
              </span>
              <h3 className="text-base sm:text-lg font-bold text-text-primary">
                Top 5 — CyberCarnival CTF, SRM
              </h3>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed">
              Ranked among the top five teams out of 50 participating teams in a cybersecurity Capture The Flag competition.
            </p>
          </div>
          <span className="text-xs font-mono text-text-muted shrink-0 px-2.5 py-1 rounded bg-bg-main border border-border-subtle">
            Top 10%
          </span>
        </div>
      </section>

      {/* Section: Let's Connect */}
      <section className="space-y-5 pt-2">
        <div className="flex items-center gap-3 animate-hero-fade-up" style={{ animationDelay: '2660ms' }}>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-text-primary flex items-center gap-2.5">
            <Mail className="w-5 h-5 text-text-primary" />
            <span>Let's Connect</span>
          </h2>
          <div className="h-[1px] flex-1 bg-border-main" />
        </div>

        <div className="p-6 sm:p-8 rounded-2xl border border-border-main bg-panel-bg/90 shadow-xs space-y-5 animate-hero-card" style={{ animationDelay: '2720ms' }}>
          <div className="space-y-2 text-sm sm:text-base text-text-secondary leading-relaxed">
            <p>
              I'm actively exploring entry-level Software Engineer, SDE, and Full-Stack Developer opportunities.
            </p>
            <p>
              If you're hiring for a role where my skills and projects could be a fit, I'd love to connect.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border-main hover:border-text-primary bg-bg-main hover:bg-bg-hover text-text-primary text-xs font-mono font-bold transition-all duration-200 shadow-2xs group"
            >
              <GithubIcon className="w-4 h-4 transition-transform group-hover:scale-110" />
              <span>GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-text-muted group-hover:text-text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#3e76ba] hover:bg-[#3468a6] text-white text-xs font-mono font-bold transition-all duration-200 shadow-2xs group"
            >
              <LinkedinIcon className="w-4 h-4 text-white transition-transform group-hover:scale-110" />
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-white/80 group-hover:text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <div className="flex items-center gap-2">
              <a
                href={`mailto:${PROFILE.email}?subject=${encodeURIComponent("Software Engineering Opportunity — Adarsh M")}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-text-primary text-bg-main hover:opacity-90 text-xs font-mono font-bold transition-all duration-200 shadow-2xs"
              >
                <Mail className="w-4 h-4" />
                <span>Email ({PROFILE.email})</span>
              </a>

              <button
                onClick={handleCopyEmail}
                type="button"
                className="p-2 rounded-xl border border-border-main bg-bg-main hover:border-text-primary text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
                title="Copy email address"
                aria-label="Copy email address"
              >
                {copiedEmail ? (
                  <Check className="w-4 h-4 text-emerald-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Return Button */}
      <footer className="pt-6 border-t border-border-main flex items-center justify-between animate-hero-fade-up" style={{ animationDelay: '2800ms' }}>
        <button
          onClick={onBack}
          className="group inline-flex items-center gap-2 text-xs font-mono text-text-primary hover:text-text-secondary transition-colors cursor-pointer px-4 py-2 rounded-xl border border-border-main bg-panel-bg hover:bg-panel-hover"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          <span>Return to Overview</span>
        </button>

        <a
          href={PROFILE.resume}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-mono px-4 py-2 rounded-xl border border-border-main bg-panel-bg hover:bg-panel-hover text-text-primary transition-colors"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Resume</span>
        </a>
      </footer>
    </article>
  );
};

export default AboutPage;

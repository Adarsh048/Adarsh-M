import React, { useState } from 'react';
import {
  Database,
  Users,
  Sparkles,
  TrendingUp,
  Search,
  Zap,
  Terminal,
  Activity,
  Wifi,
  Boxes,
  Cpu,
  ArrowUpRight,
  CheckCircle2,
  Globe,
  ExternalLink,
  RefreshCw,
  ArrowRight,
} from 'lucide-react';
import { GithubIcon } from './Icons';
import { PROJECTS } from '../data/portfolioData';
import type { Project } from '../types';
import { useInView } from '../hooks/useInView';
import { LetterReveal } from './LetterReveal';

interface ImpactMetric {
  title: string;
  detail: string;
}

const IMPACT_HIGHLIGHTS: Record<string, ImpactMetric[]> = {
  'decision-vault': [
    { title: 'Offline-First', detail: 'Zero-downtime drafting with Dexie.js & IndexedDB' },
    { title: 'Auto-Sync Outbox', detail: 'Background reconciliation to MongoDB upon reconnect' },
    { title: 'Real-Time Collab', detail: 'Multi-peer broadcast sync powered by Socket.IO' },
  ],
  'query-mind': [
    { title: '38ms First Token', detail: 'Ultra-low-latency WebSocket token streaming' },
    { title: 'Live Web RAG', detail: 'Real-time discovery pipeline using Tavily Search API' },
    { title: 'Cross-Platform', detail: 'Engineered with Flutter client & Python FastAPI' },
  ],
  'finsight': [
    { title: 'Dynamic Charts', detail: 'Interactive time-range drills using Recharts' },
    { title: 'Anomaly Alerts', detail: 'Real-time fiscal variance & threshold monitoring' },
    { title: 'Modular Grid', detail: 'Persistent customizable dashboard widget layout' },
  ],
};

interface ProjectsProps {
  onOpenFullProjects?: () => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onOpenFullProjects }) => {
  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.1 });
  const [filter, setFilter] = useState<'all' | 'full-stack' | 'ai'>('all');

  const filteredProjects = filter === 'all'
    ? PROJECTS
    : PROJECTS.filter((p) => {
        if (filter === 'full-stack') return p.id === 'decision-vault' || p.id === 'finsight';
        if (filter === 'ai') return p.id === 'query-mind';
        return true;
      });

  const counts = {
    all: PROJECTS.length,
    'full-stack': PROJECTS.filter((p) => p.id === 'decision-vault' || p.id === 'finsight').length,
    ai: PROJECTS.filter((p) => p.id === 'query-mind').length,
  };

  return (
    <section ref={ref} id="projects" className="py-12 space-y-8">
      {/* Editorial Section Header */}
      <div className="flex flex-col items-center text-center space-y-3">
        {/* Walking Torch Platform Anchor */}
        <div
          id="projects-badge-platform"
          className={`relative inline-block rounded-lg bg-text-primary text-bg-main px-3 py-1 text-xs font-mono font-medium shadow-sm select-none ${
            isInView ? 'animate-hero-badge' : ''
          }`}
          style={{ animationDelay: '100ms' }}
        >
          Featured Builds
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary font-display">
          <LetterReveal text="Featured Engineering" isActive={isInView} baseDelay={60} staggerMs={24} />
        </h2>

        <p
          className={`text-sm sm:text-base text-text-secondary max-w-[540px] leading-relaxed ${
            isInView ? 'animate-hero-fade-up' : ''
          }`}
          style={{ animationDelay: '180ms' }}
        >
          Production applications with live interactive views, offline resilience, and low-latency AI retrieval.
        </p>

        {/* High-Tech Recruiter Filter Tabs */}
        <div className="w-full flex justify-start sm:justify-center overflow-x-auto scrollbar-none py-1 px-1">
          <div
            className={`inline-flex p-1 rounded-full border border-border-main bg-panel-bg shadow-sm shrink-0 ${
              isInView ? 'animate-hero-fade-up' : ''
            }`}
            style={{ animationDelay: '260ms' }}
          >
            {(
              [
                { id: 'all', label: 'All Projects', icon: Boxes },
                { id: 'full-stack', label: 'Full-Stack & Systems', icon: Cpu },
                { id: 'ai', label: 'AI & Retrieval', icon: Sparkles },
              ] as const
            ).map((tab) => {
              const Icon = tab.icon;
              const isActive = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id)}
                  type="button"
                  className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-mono transition-all duration-200 cursor-pointer shrink-0 ${
                    isActive
                      ? 'bg-text-primary text-bg-main font-bold shadow-md'
                      : 'text-text-secondary hover:text-text-primary hover:bg-bg-hover'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-bg-main' : 'text-text-secondary'}`} />
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isActive ? 'bg-bg-main/20 text-bg-main' : 'bg-badge-bg text-text-muted border border-border-subtle'
                    }`}
                  >
                    {counts[tab.id]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recruiter-Optimized Project Cards Stack */}
      <div
        className={`space-y-8 ${isInView ? 'animate-hero-fade-up' : ''}`}
        style={{ animationDelay: '340ms' }}
      >
        {filteredProjects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index + 1} />
        ))}
      </div>

      {onOpenFullProjects && (
        <div className="flex justify-end pt-2">
          <button
            onClick={onOpenFullProjects}
            className="group inline-flex items-center gap-2 text-xs font-mono text-text-secondary hover:text-text-primary transition-colors cursor-pointer py-1"
            aria-label="View full architectural case studies"
          >
            <span className="text-text-primary font-medium border-b border-border-main group-hover:border-text-primary pb-0.5 transition-colors">
              View full architectural case studies & deep dives
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-text-secondary group-hover:text-text-primary transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>
      )}
    </section>
  );
};

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const [viewMode, setViewMode] = useState<'live' | 'blueprint'>(
    project.liveUrl ? 'live' : 'blueprint'
  );
  const highlights = IMPACT_HIGHLIGHTS[project.id] || [];

  return (
    <article
      className={`group relative rounded-3xl border border-border-main bg-panel-bg flex flex-col overflow-hidden transition-all duration-300 hover:border-text-primary hover:shadow-2xl ${
        project.isPrimary ? 'ring-1 ring-border-main/80 shadow-md' : 'shadow-sm'
      }`}
    >
      {/* Mini Browser Chrome Bar */}
      <div className="flex items-center justify-between px-2.5 sm:px-4 py-2 border-b border-border-subtle bg-bg-main select-none gap-2">
        {/* Left: Window Dots & Address */}
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-400 dark:bg-neutral-600 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-300 dark:bg-neutral-700 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-300 dark:bg-neutral-700 inline-block" />
          </div>

          <div className="flex items-center gap-1.5 px-2 sm:px-2.5 py-0.5 rounded-full bg-panel-bg border border-border-subtle text-[10px] sm:text-[11px] font-mono text-text-secondary truncate max-w-[100px] min-[360px]:max-w-[140px] sm:max-w-[260px]">
            <Globe className="w-3 h-3 text-text-primary shrink-0" />
            <span className="truncate">
              {project.liveUrl ? project.liveUrl.replace('https://', '') : `${project.id}.app`}
            </span>
          </div>
        </div>

        {/* Right: View Mode Toggle & External Link */}
        <div className="flex items-center gap-1.5 shrink-0">
          {project.liveUrl && (
            <div className="inline-flex p-0.5 rounded-lg border border-border-subtle bg-panel-bg text-[9px] sm:text-[10px] font-mono">
              <button
                type="button"
                onClick={() => setViewMode('live')}
                className={`px-1.5 sm:px-2 py-0.5 rounded transition-colors cursor-pointer ${
                  viewMode === 'live'
                    ? 'bg-text-primary text-bg-main font-bold shadow-sm'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                Live View
              </button>
              <button
                type="button"
                onClick={() => setViewMode('blueprint')}
                className={`px-1.5 sm:px-2 py-0.5 rounded transition-colors cursor-pointer ${
                  viewMode === 'blueprint'
                    ? 'bg-text-primary text-bg-main font-bold shadow-sm'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                Blueprint
              </button>
            </div>
          )}

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 rounded hover:bg-bg-hover text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
              title="Open deployed app in new tab"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>

      {/* Interactive App Window / Live Embedded Deployed View */}
      <div className="relative h-80 sm:h-[350px] w-full overflow-hidden bg-bg-main select-none p-3 sm:p-4 flex flex-col justify-between">
        {project.liveUrl && viewMode === 'live' ? (
          <LiveIframePreview url={project.liveUrl} title={`${project.title} Live Deployed Preview`} />
        ) : (
          <>
            {project.id === 'decision-vault' && <DecisionVaultPreview />}
            {project.id === 'query-mind' && <QueryMindPreview />}
            {project.id === 'finsight' && <FinSightPreview />}
          </>
        )}
      </div>

      {/* Recruiter-Friendly Fast-Scan Details */}
      <div className="p-4 sm:p-7 space-y-3.5 sm:space-y-4">
        
        {/* Title Bar: Project Index, Title & Badges */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono font-bold text-text-muted">
                // 0{index}
              </span>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-text-primary tracking-tight">
                {project.title}
              </h3>
              {project.isPrimary && (
                <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-text-primary text-bg-main font-bold shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-bg-main animate-pulse" />
                  FEATURED
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] min-[360px]:text-[11px] font-mono text-text-secondary px-2 sm:px-2.5 py-0.5 rounded-full border border-border-main bg-badge-bg">
                {project.period}
              </span>
            </div>
          </div>

          {/* Quick-Scan Punchy Subtitle & Overview */}
          <div className="text-xs font-mono text-text-primary font-semibold mb-1">
            {project.subtitle}
          </div>

          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* 3 Recruiter Impact Chips (Instant 3-Second Takeaway) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5 pt-1">
          {highlights.map((item, i) => (
            <div
              key={i}
              className="p-2.5 rounded-xl border border-border-subtle bg-bg-main/60 hover:border-text-primary transition-colors flex flex-col justify-between"
            >
              <div className="text-[10px] font-mono font-bold text-text-primary flex items-center gap-1.5 mb-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-text-primary shrink-0" />
                <span>{item.title}</span>
              </div>
              <div className="text-[11px] text-text-secondary leading-snug">
                {item.detail}
              </div>
            </div>
          ))}
        </div>

        {/* Scannable Tech Stack Badges */}
        <div className="pt-1">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg border border-border-main bg-badge-bg text-text-primary font-mono text-[10px] min-[360px]:text-[11px] font-medium hover:border-text-primary transition-colors cursor-default"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Unmissable Recruiter Action CTAs */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-3 border-t border-border-subtle">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 rounded-full text-[11px] sm:text-xs font-mono font-bold bg-text-primary text-bg-main hover:opacity-90 transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-bg-main animate-pulse" />
              <span>Visit Live App</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 rounded-full text-[11px] sm:text-xs font-mono font-medium border border-border-main bg-badge-bg hover:border-text-primary hover:text-text-primary text-text-secondary transition-all active:scale-95 cursor-pointer"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>View Source Code</span>
            </a>
          )}
        </div>

      </div>
    </article>
  );
};

/* Live Embedded Deployed Site Preview */

interface LiveIframePreviewProps {
  url: string;
  title: string;
}

const LiveIframePreview: React.FC<LiveIframePreviewProps> = ({ url, title }) => {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 1200, height: 750, scale: 0.5 });

  React.useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const cWidth = containerRef.current.offsetWidth;
        const cHeight = containerRef.current.offsetHeight;
        // Standard full desktop viewport width (1200px) so the complete desktop app fits
        const targetVirtualWidth = 1200;
        const scale = cWidth / targetVirtualWidth;
        const virtualHeight = Math.round(cHeight / Math.max(0.01, scale));

        setDimensions({
          width: targetVirtualWidth,
          height: virtualHeight,
          scale,
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    const timer = setTimeout(updateDimensions, 150);

    return () => {
      window.removeEventListener('resize', updateDimensions);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden bg-bg-main rounded-xl border border-border-subtle"
    >
      {isLoading && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-bg-main text-text-secondary gap-2 font-mono text-xs">
          <RefreshCw className="w-4 h-4 animate-spin text-text-primary" />
          <span>Connecting to live deployment...</span>
        </div>
      )}
      <iframe
        src={url}
        title={title}
        onLoad={() => setIsLoading(false)}
        style={{
          width: `${dimensions.width}px`,
          height: `${dimensions.height}px`,
          transform: `scale(${dimensions.scale})`,
          transformOrigin: 'top left',
        }}
        className="border-0 select-none pointer-events-auto"
        loading="lazy"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
      />
      {/* Live Badge Overlay */}
      <div className="absolute bottom-2.5 right-2.5 z-20 pointer-events-none">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-panel-bg/95 backdrop-blur-md border border-border-main text-[10px] font-mono font-bold text-text-primary shadow-lg">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Live Deployment • 100% Fit</span>
        </span>
      </div>
    </div>
  );
};

/* Realistic Product Interface Previews */

const DecisionVaultPreview: React.FC = () => {
  return (
    <div className="h-full w-full font-mono text-xs flex flex-col justify-between">
      {/* Top Window Bar */}
      <div className="flex items-center justify-between pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-text-primary" />
          <span className="text-[11px] text-text-primary font-bold">
            decision-vault.app <span className="text-text-muted font-normal">/ Architecture Pipeline</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-text-primary text-bg-main font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-bg-main animate-pulse" />
            LIVE SYNC
          </span>
        </div>
      </div>

      {/* Realistic Product UI: Split Sidebar & Document */}
      <div className="grid grid-cols-12 gap-2.5 py-2.5 h-full items-stretch">
        {/* Left Mini Sidebar: ADR List */}
        <div className="col-span-4 rounded-xl border border-border-subtle bg-panel-bg p-2 flex flex-col justify-between">
          <div>
            <div className="text-[9px] text-text-muted font-bold uppercase tracking-wider mb-1.5">Records</div>
            <div className="space-y-1 text-[10px]">
              <div className="text-text-muted truncate">ADR-001 Auth</div>
              <div className="text-text-muted truncate">ADR-002 Cache</div>
              <div className="px-1.5 py-0.5 rounded bg-text-primary text-bg-main font-bold truncate">
                ADR-004 Sync
              </div>
            </div>
          </div>
          <div className="pt-1.5 border-t border-border-subtle flex items-center gap-1 text-[9px] text-text-secondary">
            <Database className="w-2.5 h-2.5 text-text-primary" />
            <span>IndexedDB</span>
          </div>
        </div>

        {/* Right Document Pane */}
        <div className="col-span-8 rounded-xl border border-border-subtle bg-bg-main p-2.5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-1 mb-1">
              <span className="text-[10px] font-bold text-text-primary truncate">
                ADR-004: Outbox Sync
              </span>
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-badge-bg border border-border-subtle text-text-primary font-semibold">
                APPROVED
              </span>
            </div>
            <p className="text-[10px] text-text-secondary leading-relaxed line-clamp-2">
              Status: Offline-first Dexie.js store. Changes queue locally and reconcile automatically with MongoDB.
            </p>
          </div>

          <div className="flex items-center justify-between text-[9px] text-text-secondary pt-1.5 border-t border-border-subtle">
            <span className="flex items-center gap-1">
              <Users className="w-2.5 h-2.5 text-text-primary" />
              <span>3 peers active</span>
            </span>
            <span className="text-text-primary font-bold">0 Pending</span>
          </div>
        </div>
      </div>

      {/* Footer Status Bar */}
      <div className="flex items-center justify-between text-[10px] text-text-secondary pt-1.5 border-t border-border-subtle">
        <span className="flex items-center gap-1">
          <Wifi className="w-3 h-3 text-text-primary" />
          <span>Offline Persistence: <strong className="text-text-primary">Ready</strong></span>
        </span>
        <span className="text-text-primary font-bold">JWT 3-Tier RBAC</span>
      </div>
    </div>
  );
};

const QueryMindPreview: React.FC = () => {
  return (
    <div className="h-full w-full font-mono text-xs flex flex-col justify-between">
      {/* Top Window Bar */}
      <div className="flex items-center justify-between pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-text-primary" />
          <span className="text-[11px] text-text-primary font-bold">
            querymind.ai <span className="text-text-muted font-normal">/ RAG Engine</span>
          </span>
        </div>
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono border border-border-main bg-badge-bg text-text-primary font-bold">
          <Zap className="w-3 h-3 text-text-primary" />
          <span>Gemini 1.5</span>
        </span>
      </div>

      {/* Search Bar + Synthesized Result */}
      <div className="py-2 space-y-2">
        <div className="flex items-center justify-between px-2.5 py-1.5 rounded-xl border border-border-main bg-panel-bg shadow-sm">
          <div className="flex items-center gap-2 text-text-primary text-[11px] truncate">
            <Search className="w-3.5 h-3.5 text-text-primary shrink-0" />
            <span className="truncate">"What is consensus latency in distributed Raft?"</span>
          </div>
          <span className="text-[9px] px-1.5 py-0.5 rounded bg-badge-bg text-text-secondary border border-border-subtle shrink-0">
            Tavily Web
          </span>
        </div>

        {/* Synthesized Response */}
        <div className="p-2.5 rounded-xl border border-border-subtle bg-bg-main text-[11px] leading-relaxed">
          <div className="flex items-center justify-between text-[9px] text-text-secondary mb-1">
            <span className="flex items-center gap-1 font-bold text-text-primary">
              <span className="w-1.5 h-1.5 rounded-full bg-text-primary animate-ping" />
              LIVE RAG SYNTHESIS
            </span>
            <span className="text-text-primary font-bold">99.4% GROUNDED</span>
          </div>
          <p className="text-text-secondary text-[10px] line-clamp-2">
            Raft achieves single-round leader consensus under steady-state heartbeat leases, eliminating two-phase overhead during normal write paths...
          </p>
          <div className="flex items-center gap-1.5 mt-1.5 pt-1 border-t border-border-subtle text-[9px] text-text-secondary">
            <span>Sources:</span>
            <span className="px-1.5 py-0.2 rounded bg-badge-bg text-text-primary font-semibold">[1] Stanford Paper</span>
            <span className="px-1.5 py-0.2 rounded bg-badge-bg text-text-primary font-semibold">[2] ACM Queue</span>
          </div>
        </div>
      </div>

      {/* Footer Status Bar */}
      <div className="flex items-center justify-between text-[10px] text-text-secondary pt-1.5 border-t border-border-subtle">
        <span className="flex items-center gap-1">
          <Activity className="w-3 h-3 text-text-primary" />
          <span>WebSocket Stream: <strong className="text-text-primary">38ms TTFT</strong></span>
        </span>
        <span className="text-text-primary font-bold">Flutter + FastAPI</span>
      </div>
    </div>
  );
};

const FinSightPreview: React.FC = () => {
  return (
    <div className="h-full w-full font-mono text-xs flex flex-col justify-between">
      {/* Top Window Bar */}
      <div className="flex items-center justify-between pb-2 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-3.5 h-3.5 text-text-primary" />
          <span className="text-[11px] text-text-primary font-bold">
            finsight.analytics <span className="text-text-muted font-normal">/ Metrics</span>
          </span>
        </div>
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-text-primary text-bg-main font-bold">
          <TrendingUp className="w-3 h-3" />
          +14.2% YTD
        </span>
      </div>

      {/* Dashboard KPI Tiles + Visual SVG Area Chart */}
      <div className="py-2 space-y-2">
        <div className="grid grid-cols-3 gap-2">
          <div className="p-2 rounded-xl border border-border-subtle bg-panel-bg">
            <div className="text-[9px] text-text-secondary">PORTFOLIO</div>
            <div className="text-xs sm:text-sm font-bold text-text-primary">$48,250.00</div>
          </div>
          <div className="p-2 rounded-xl border border-border-subtle bg-panel-bg">
            <div className="text-[9px] text-text-secondary">MONTHLY BURN</div>
            <div className="text-xs sm:text-sm font-bold text-text-primary">$3,120.00</div>
          </div>
          <div className="p-2 rounded-xl border border-border-subtle bg-panel-bg">
            <div className="text-[9px] text-text-secondary">VARIANCE</div>
            <div className="text-xs sm:text-sm font-bold text-text-primary">-2.4% Optimal</div>
          </div>
        </div>

        {/* Dynamic SVG Area Growth Chart */}
        <div className="relative h-14 w-full rounded-xl border border-border-subtle bg-bg-main px-3 py-1 flex items-end justify-between overflow-hidden">
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 40">
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="currentColor" stopOpacity="0.25" />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <path
              d="M0,35 Q15,30 30,22 T60,18 T85,10 L100,6 L100,40 L0,40 Z"
              fill="url(#chartGradient)"
              className="text-text-primary"
            />
            <path
              d="M0,35 Q15,30 30,22 T60,18 T85,10 L100,6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-text-primary"
            />
            <circle cx="100" cy="6" r="3" fill="currentColor" className="text-text-primary" />
          </svg>
          <div className="relative z-10 w-full flex justify-between text-[8px] text-text-muted font-mono pb-0.5">
            <span>Q1</span>
            <span>Q2</span>
            <span>Q3</span>
            <span>Q4 (PEAK $48.2k)</span>
          </div>
        </div>
      </div>

      {/* Footer Status Bar */}
      <div className="flex items-center justify-between text-[10px] text-text-secondary pt-1.5 border-t border-border-subtle">
        <span className="flex items-center gap-1">
          <Activity className="w-3 h-3 text-text-primary" />
          <span>Recharts Engine: <strong className="text-text-primary">Real-Time</strong></span>
        </span>
        <span className="text-text-primary font-bold">REST Financial APIs</span>
      </div>
    </div>
  );
};

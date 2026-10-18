import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  Activity, 
  RefreshCw, 
  ArrowRight, 
  Mail
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, XIcon } from './Icons';
import { PROFILE } from '../data/portfolioData';
import { useInView } from '../hooks/useInView';
import { LetterReveal } from './LetterReveal';

// High-density 5-row x 16-col activity cadence matrix (80 data points)
const COMMIT_CELLS = [
  0.2, 0.4, 0.1, 0.6, 0.8, 0.3, 0.5, 0.2, 0.9, 0.6, 1.0, 0.4, 0.7, 0.3, 0.8, 0.5,
  0.5, 0.9, 0.3, 0.2, 0.8, 1.0, 0.4, 0.3, 0.2, 0.5, 0.6, 0.3, 0.8, 0.4, 0.9, 0.6,
  0.4, 0.2, 0.6, 1.0, 0.7, 0.4, 0.3, 0.5, 0.9, 0.3, 0.8, 0.2, 0.5, 0.7, 0.3, 0.8,
  0.3, 0.5, 0.2, 0.8, 0.6, 0.3, 0.4, 0.9, 1.0, 0.3, 0.5, 0.2, 0.7, 0.4, 0.9, 0.5,
  0.4, 0.3, 0.6, 0.2, 0.5, 1.0, 0.3, 0.6, 0.2, 0.9, 0.4, 0.8, 0.5, 0.7, 0.3, 0.9,
];

interface BentoGridProps {
  onOpenFullActivity?: () => void;
}

export const BentoGrid: React.FC<BentoGridProps> = ({ onOpenFullActivity }) => {
  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.1 });
  const [syncState, setSyncState] = useState<'synced' | 'syncing'>('synced');

  const triggerSyncSim = () => {
    setSyncState('syncing');
    setTimeout(() => {
      setSyncState('synced');
    }, 1100);
  };

  return (
    <section ref={ref} id="career" className="py-10 space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-3">
        <h2 
          onClick={onOpenFullActivity}
          className={`text-xl sm:text-2xl font-bold font-display tracking-tight text-text-primary whitespace-nowrap ${
            onOpenFullActivity ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''
          }`}
          title={onOpenFullActivity ? "Click to view full activity & milestones dossier" : undefined}
        >
          <LetterReveal text="Activity & Network" isActive={isInView} baseDelay={60} staggerMs={24} />
        </h2>
        <div
          id="activity-ledge-platform"
          className={`h-[1px] flex-1 bg-border-main relative ${isInView ? 'animate-divider-expand' : ''}`}
          style={{ animationDelay: '120ms' }}
        />
      </div>

      <div className="space-y-3.5">
        {/* ROW 1: GitHub Repositories Card */}
        <div
          className={`w-full ${isInView ? 'animate-hero-fade-up' : ''}`}
          style={{ animationDelay: '180ms' }}
        >
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="relative group flex flex-col justify-between overflow-hidden rounded-2xl border border-border-main bg-panel-bg p-5 transition-all duration-300 hover:border-text-primary hover:shadow-xs min-h-[140px]"
          >
            {/* Top Row: Icon + Handle + Arrow */}
            <div className="flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl border border-border-subtle bg-bg-main text-text-primary">
                  <GithubIcon className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-md border border-border-main bg-bg-main text-text-secondary font-medium">
                  @Adarsh048
                </span>
              </div>
              <span className="p-1.5 rounded-full border border-border-main bg-bg-main text-text-secondary group-hover:text-text-primary transition-colors">
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>

            {/* Middle: Title & Scope */}
            <div className="space-y-1 z-10 pt-3">
              <span className="font-bold text-base tracking-tight text-text-primary font-display block">
                GitHub Repositories
              </span>
              <p className="text-xs text-text-secondary leading-relaxed">
                Open-source engineering • Distributed systems, offline-first ADR platforms & grounded RAG workflows.
              </p>
            </div>

            {/* Bottom Row: Key Repos Metrics */}
            <div className="flex items-center gap-2 pt-2.5 border-t border-border-subtle/80 z-10 text-[10px] font-mono text-text-muted">
              <span>15+ Repos</span>
              <span>•</span>
              <span>500+ Commits</span>
              <span>•</span>
              <span>TypeScript / Python</span>
            </div>

            {/* Subtle Background Watermark */}
            <div className="absolute -right-2 -bottom-4 opacity-5 dark:opacity-10 font-mono text-6xl font-bold select-none pointer-events-none text-text-primary">
              &lt;/&gt;
            </div>
          </a>
        </div>

        {/* ROW 2: Contribution Pulse & Shipping Velocity (Full-Width Symmetrical Card) */}
        <div
          className={`rounded-2xl border border-border-main bg-panel-bg p-4 sm:p-6 space-y-3.5 sm:space-y-4 ${
            isInView ? 'animate-hero-fade-up' : ''
          }`}
          style={{ animationDelay: '280ms' }}
        >
          {/* Header Row: Title on Left, Active Streak on Right */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border-subtle/80 pb-3">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-500 shrink-0" />
              <span className="text-xs sm:text-sm font-bold font-display text-text-primary">
                Contribution Pulse & Shipping Velocity
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-[10px] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Active Streak
              </span>
            </div>
          </div>

          {/* Activity Matrix Subhead */}
          <div className="flex flex-wrap items-center justify-between gap-1 text-[10px] font-mono text-text-muted pt-0.5">
            <span>Recent 16-Week Activity Matrix</span>
            <span>500+ Lifetime GitHub Commits</span>
          </div>

          {/* Activity Matrix Grid (Strict 16-Column Layout across all screens) */}
          <div 
            className="w-full py-1"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(16, minmax(0, 1fr))',
              gap: '3px',
            }}
          >
            {COMMIT_CELLS.map((intensity, idx) => {
              const cellBg =
                intensity < 0.3
                  ? 'bg-border-main/50'
                  : intensity < 0.6
                  ? 'bg-emerald-500/35'
                  : intensity < 0.8
                  ? 'bg-emerald-500/65'
                  : 'bg-emerald-500';

              return (
                <div
                  key={idx}
                  className={`h-2 min-[360px]:h-2.5 sm:h-3 rounded-[2px] sm:rounded-[2.5px] transition-all hover:scale-125 cursor-pointer ${cellBg}`}
                  title={`Activity index ${idx + 1}: ${(intensity * 10).toFixed(0)} contributions`}
                />
              );
            })}
          </div>

          {/* 4 Equal-Width Symmetrical Telemetry Metric Boxes */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 pt-3 border-t border-border-subtle">
            {/* Box 1: Commits */}
            <div className="p-2.5 sm:p-3 rounded-xl border border-border-subtle bg-bg-main/60 flex flex-col justify-between text-center min-h-[72px] sm:min-h-[76px]">
              <span className="text-[9px] sm:text-[10px] font-mono text-text-muted uppercase tracking-wider block">
                COMMITS
              </span>
              <span className="text-sm min-[360px]:text-base sm:text-lg font-bold font-mono text-text-primary block my-0.5">
                {PROFILE.stats.commits}
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono text-text-secondary block">
                Lifetime Shipped
              </span>
            </div>

            {/* Box 2: Repositories */}
            <div className="p-2.5 sm:p-3 rounded-xl border border-border-subtle bg-bg-main/60 flex flex-col justify-between text-center min-h-[72px] sm:min-h-[76px]">
              <span className="text-[9px] sm:text-[10px] font-mono text-text-muted uppercase tracking-wider block">
                REPOSITORIES
              </span>
              <span className="text-sm min-[360px]:text-base sm:text-lg font-bold font-mono text-text-primary block my-0.5">
                {PROFILE.stats.repos}
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono text-text-secondary block">
                Public Open Source
              </span>
            </div>

            {/* Box 3: CTF Rank */}
            <div className="p-2.5 sm:p-3 rounded-xl border border-border-subtle bg-bg-main/60 flex flex-col justify-between text-center min-h-[72px] sm:min-h-[76px]">
              <span className="text-[9px] sm:text-[10px] font-mono text-text-muted uppercase tracking-wider block">
                CTF SECURITY
              </span>
              <span className="text-sm min-[360px]:text-base sm:text-lg font-bold font-mono text-text-primary block my-0.5">
                {PROFILE.stats.ctfRank}
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono text-text-secondary block">
                National Finals
              </span>
            </div>

            {/* Box 4: Outbox Sync Simulator */}
            <div 
              onClick={triggerSyncSim}
              className="p-2.5 sm:p-3 rounded-xl border border-border-subtle bg-bg-main/60 flex flex-col justify-between text-center min-h-[72px] sm:min-h-[76px] cursor-pointer hover:border-emerald-500/50 transition-colors group select-none"
              title="Click to test simulated local-first state sync"
            >
              <div className="flex items-center justify-center gap-1 text-[9px] sm:text-[10px] font-mono text-text-muted uppercase tracking-wider">
                <span>ENGINE SYNC</span>
                <RefreshCw className={`w-2.5 h-2.5 group-hover:text-emerald-500 transition-colors ${syncState === 'syncing' ? 'animate-spin text-emerald-500' : ''}`} />
              </div>
              <span className="text-sm min-[360px]:text-base sm:text-lg font-bold font-mono text-emerald-600 dark:text-emerald-400 block my-0.5">
                {syncState === 'syncing' ? 'SYNCING...' : '100%'}
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono text-text-secondary block">
                {syncState === 'syncing' ? 'Reconciling...' : 'Zero Data Loss'}
              </span>
            </div>
          </div>
        </div>

        {/* ROW 3: Professional Channels (3 Equal Symmetrical Columns) */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-3 gap-3.5 ${isInView ? 'animate-hero-fade-up' : ''}`}
          style={{ animationDelay: '380ms' }}
        >
          {/* LinkedIn Profile */}
          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 sm:p-5 rounded-2xl border border-border-main bg-panel-bg hover:border-text-primary hover:shadow-xs transition-all flex flex-col justify-between group min-h-[115px]"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-xl border border-border-subtle bg-bg-main text-text-primary">
                <LinkedinIcon className="w-4 h-4" />
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-text-muted group-hover:text-text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
            <div>
              <span className="text-xs font-bold font-mono text-text-primary block">
                LinkedIn
              </span>
              <span className="text-[11px] font-mono text-text-secondary block">
                Professional Network • Adarsh M
              </span>
            </div>
          </a>

          {/* X / Twitter */}
          <a
            href={PROFILE.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 sm:p-5 rounded-2xl border border-border-main bg-panel-bg hover:border-text-primary hover:shadow-xs transition-all flex flex-col justify-between group min-h-[115px]"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-xl border border-border-subtle bg-bg-main text-text-primary">
                <XIcon className="w-4 h-4" />
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-text-muted group-hover:text-text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
            <div>
              <span className="text-xs font-bold font-mono text-text-primary block">
                X (Twitter)
              </span>
              <span className="text-[11px] font-mono text-text-secondary block">
                Engineering Dispatch • @adar_sxh
              </span>
            </div>
          </a>

          {/* Direct Inquiries (Email) */}
          <a
            href={`mailto:${PROFILE.email}`}
            className="p-4 sm:p-5 rounded-2xl border border-border-main bg-panel-bg hover:border-text-primary hover:shadow-xs transition-all flex flex-col justify-between group min-h-[115px]"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-xl border border-border-subtle bg-bg-main text-text-primary">
                <Mail className="w-4 h-4" />
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-text-muted group-hover:text-text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
            <div>
              <span className="text-xs font-bold font-mono text-text-primary block">
                Direct Inquiries
              </span>
              <span className="text-[11px] font-mono text-text-secondary block truncate" title={PROFILE.email}>
                {PROFILE.email}
              </span>
            </div>
          </a>
        </div>
      </div>

      {onOpenFullActivity && (
        <div className="flex justify-end pt-2">
          <button
            onClick={onOpenFullActivity}
            className="group inline-flex items-center gap-2 text-xs font-mono text-text-secondary hover:text-text-primary transition-colors cursor-pointer py-1"
            aria-label="View full activity timeline and career milestones"
          >
            <span className="text-text-primary font-medium border-b border-border-main group-hover:border-text-primary pb-0.5 transition-colors">
              View full activity timeline & career milestones
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-text-secondary group-hover:text-text-primary transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>
      )}
    </section>
  );
};

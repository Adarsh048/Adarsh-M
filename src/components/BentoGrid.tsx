import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  ArrowRight, 
  Copy, 
  Check, 
  Mail, 
  TrendingUp 
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, XIcon } from './Icons';
import { PROFILE } from '../data/portfolioData';
import { useInView } from '../hooks/useInView';
import { LetterReveal } from './LetterReveal';

// Faint Envelope Watermark for Mail Card
const MailWatermark: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <rect width="20" height="15" x="2" y="4.5" rx="3" />
    <path d="m22 7.5-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7.5" />
    <path d="m2 17 6-5" />
    <path d="m22 17-6-5" />
  </svg>
);

interface BentoGridProps {
  onOpenFullActivity?: () => void;
}

export const BentoGrid: React.FC<BentoGridProps> = ({ onOpenFullActivity }) => {
  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.05 });
  const row1 = useInView<HTMLDivElement>({ threshold: 0.04 });
  const row2 = useInView<HTMLDivElement>({ threshold: 0.04 });
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(PROFILE.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };



  return (
    <section ref={ref} id="career" className="py-8 space-y-5">
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
        {/* Walking Torch Platform Anchor */}
        <div
          id="activity-ledge-platform"
          className={`h-[1px] flex-1 bg-border-main relative ${isInView ? 'animate-divider-expand' : 'opacity-0'}`}
          style={{ animationDelay: '120ms' }}
        />
        <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-border-main bg-panel-bg text-[10px] font-mono text-text-secondary select-none">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Active Playground</span>
        </div>
      </div>

      {/* Bento Grid layout faithfully inspired by the playful developer aesthetic */}
      <div className="space-y-3 sm:space-y-3.5">
        
        {/* =========================================================================
            ROW 1: Top Asymmetrical Split (GitHub Math Cat + Contribution Stats)
            ========================================================================= */}
        <div ref={row1.ref} className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-3.5">
          
          {/* Card 1: GitHub Chalkboard Math Cat Banner (7 Cols) */}
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            className={`sm:col-span-7 relative group overflow-hidden rounded-[26px] border border-border-main bg-neutral-950 p-5 sm:p-6 min-h-[175px] sm:min-h-[185px] flex flex-col justify-end transition-all duration-300 hover:border-text-primary/70 hover:shadow-md ${
              row1.isInView ? 'animate-hero-fade-up' : 'opacity-0 translate-y-8 pointer-events-none'
            }`}
            style={{ animationDelay: '160ms' }}
          >
            {/* Background: Adarsh's GitHub Profile Avatar with Atmospheric Vignette Overlay */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105 opacity-80"
              style={{ backgroundImage: `url('/github-avatar.png')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/30" />

            {/* Top Right Mini Corner Link Indicator */}
            <div className="absolute top-4 right-4 p-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-white/80 group-hover:text-white group-hover:bg-black/60 transition-all">
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>

            {/* Content Layer: GitHub Icon + Header + I build. Subtitle */}
            <div className="relative z-10 space-y-1">
              <div className="text-white mb-2 inline-block">
                <GithubIcon className="w-7 h-7 text-white drop-shadow-sm" />
              </div>
              
              <div className="flex items-baseline gap-2">
                <h3 className="text-xl sm:text-2xl font-bold text-white font-display tracking-tight drop-shadow-sm">
                  GitHub
                </h3>
              </div>

              <p className="text-xs sm:text-sm font-mono text-neutral-200/90 drop-shadow-sm">
                I build.
              </p>
            </div>
          </a>

          {/* Card 2: Monochrome Activity & Commit Velocity Graph (5 Cols) */}
          <div
            onClick={onOpenFullActivity}
            className={`sm:col-span-5 rounded-[26px] border border-border-main bg-white dark:bg-[#0a0b0d] dark:bg-gradient-to-br dark:from-[#14151b] dark:via-[#0f1014] dark:to-[#0a0b0d] p-4.5 sm:p-5 flex flex-col justify-between min-h-[175px] sm:min-h-[185px] transition-all duration-300 hover:border-neutral-400 dark:hover:border-neutral-400 shadow-xs hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_8px_30px_rgba(255,255,255,0.06)] cursor-pointer select-none group relative overflow-hidden ${
              row1.isInView ? 'animate-hero-fade-up' : 'opacity-0 translate-y-8 pointer-events-none'
            }`}
            style={{ animationDelay: '220ms' }}
            title="Click to view full career milestones & activity dossier"
          >
            {/* Top Right Ambient Subtle Glow */}
            <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-neutral-100/80 dark:bg-white/[0.04] blur-2xl pointer-events-none group-hover:bg-neutral-200/60 dark:group-hover:bg-white/[0.08] transition-all duration-500" />

            {/* Top Bar: Title & Stat Badge */}
            <div className="flex items-center justify-between pb-1 relative z-10">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-xl bg-neutral-100 dark:bg-white/[0.06] border border-neutral-200 dark:border-white/10 flex items-center justify-center text-neutral-900 dark:text-white shrink-0 shadow-xs">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-mono font-bold text-neutral-900 dark:text-white tracking-wide truncate">
                    Commit Velocity
                  </div>
                  <span className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400">
                    500+ commits
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-white/[0.06] border border-emerald-200/80 dark:border-white/15 text-[10px] font-mono text-emerald-700 dark:text-neutral-300 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-white animate-pulse shadow-[0_0_4px_rgba(16,185,129,0.8)] dark:shadow-[0_0_4px_rgba(255,255,255,0.8)]" />
                <span className="font-semibold text-emerald-800 dark:text-white">+38% velocity</span>
              </div>
            </div>

            {/* Graph Visual Area */}
            <div className="relative w-full py-1 my-auto z-10">
              {/* Peak Tooltip Pill */}
              <div className="absolute top-0 right-16 -translate-y-1.5 z-20 pointer-events-none opacity-90 group-hover:opacity-100 transition-opacity">
                <div className="px-2 py-0.5 rounded-md bg-neutral-900 dark:bg-black/90 border border-neutral-700 dark:border-white/25 text-[9px] font-mono text-white shadow-[0_4px_12px_rgba(0,0,0,0.3)] flex items-center gap-1 backdrop-blur-md">
                  <span className="w-1 h-1 rounded-full bg-emerald-400 dark:bg-white shadow-[0_0_4px_rgba(255,255,255,0.8)]" />
                  <span>Peak: 48 / wk</span>
                </div>
              </div>

              <svg
                viewBox="0 0 320 80"
                className="w-full h-20 overflow-visible"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="activityAreaLight" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.22" />
                    <stop offset="60%" stopColor="#10b981" stopOpacity="0.05" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                  </linearGradient>
                  <linearGradient id="activityStrokeLight" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#059669" />
                    <stop offset="50%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#047857" />
                  </linearGradient>
                  <linearGradient id="activityAreaMono" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.22" />
                    <stop offset="60%" stopColor="#ffffff" stopOpacity="0.04" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0.0" />
                  </linearGradient>
                  <linearGradient id="activityStrokeMono" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#737373" />
                    <stop offset="50%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#cccccc" />
                  </linearGradient>
                </defs>

                {/* Background Activity Volume Pillars */}
                <rect x="12" y="45" width="8" height="35" rx="2" className="fill-neutral-900/[0.04] dark:fill-white/[0.04]" />
                <rect x="44" y="38" width="8" height="42" rx="2" className="fill-neutral-900/[0.04] dark:fill-white/[0.04]" />
                <rect x="76" y="32" width="8" height="48" rx="2" className="fill-neutral-900/[0.05] dark:fill-white/[0.05]" />
                <rect x="108" y="28" width="8" height="52" rx="2" className="fill-neutral-900/[0.05] dark:fill-white/[0.05]" />
                <rect x="140" y="35" width="8" height="45" rx="2" className="fill-neutral-900/[0.04] dark:fill-white/[0.04]" />
                <rect x="172" y="20" width="8" height="60" rx="2" className="fill-neutral-900/[0.06] dark:fill-white/[0.06]" />
                <rect x="204" y="26" width="8" height="54" rx="2" className="fill-neutral-900/[0.05] dark:fill-white/[0.05]" />
                <rect x="236" y="12" width="8" height="68" rx="2" className="fill-emerald-500/[0.12] dark:fill-white/[0.09]" />
                <rect x="268" y="22" width="8" height="58" rx="2" className="fill-neutral-900/[0.06] dark:fill-white/[0.06]" />
                <rect x="300" y="16" width="8" height="64" rx="2" className="fill-neutral-900/[0.07] dark:fill-white/[0.07]" />

                {/* Subtle Horizontal Grid Guidelines */}
                <line x1="0" y1="20" x2="320" y2="20" stroke="currentColor" className="text-neutral-200 dark:text-neutral-800/80" strokeDasharray="3 3" strokeWidth="1" />
                <line x1="0" y1="50" x2="320" y2="50" stroke="currentColor" className="text-neutral-200 dark:text-neutral-800/80" strokeDasharray="3 3" strokeWidth="1" />

                {/* Area Fill Light */}
                <path
                  d="M 0,58 C 15,58 20,52 30,52 C 45,52 50,45 65,45 C 80,45 85,38 100,38 C 115,38 120,44 135,42 C 150,40 155,25 170,24 C 185,23 192,34 205,34 C 220,34 228,12 240,12 C 255,12 262,26 275,26 C 290,26 305,18 320,16 L 320,80 L 0,80 Z"
                  fill="url(#activityAreaLight)"
                  className="dark:hidden"
                />

                {/* Area Fill Dark */}
                <path
                  d="M 0,58 C 15,58 20,52 30,52 C 45,52 50,45 65,45 C 80,45 85,38 100,38 C 115,38 120,44 135,42 C 150,40 155,25 170,24 C 185,23 192,34 205,34 C 220,34 228,12 240,12 C 255,12 262,26 275,26 C 290,26 305,18 320,16 L 320,80 L 0,80 Z"
                  fill="url(#activityAreaMono)"
                  className="hidden dark:block"
                />

                {/* Main Stroke Line Light */}
                <path
                  d="M 0,58 C 15,58 20,52 30,52 C 45,52 50,45 65,45 C 80,45 85,38 100,38 C 115,38 120,44 135,42 C 150,40 155,25 170,24 C 185,23 192,34 205,34 C 220,34 228,12 240,12 C 255,12 262,26 275,26 C 290,26 305,18 320,16"
                  fill="none"
                  stroke="url(#activityStrokeLight)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  className="dark:hidden"
                />

                {/* Main Stroke Line Dark */}
                <path
                  d="M 0,58 C 15,58 20,52 30,52 C 45,52 50,45 65,45 C 80,45 85,38 100,38 C 115,38 120,44 135,42 C 150,40 155,25 170,24 C 185,23 192,34 205,34 C 220,34 228,12 240,12 C 255,12 262,26 275,26 C 290,26 305,18 320,16"
                  fill="none"
                  stroke="url(#activityStrokeMono)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  className="hidden dark:block"
                />

                {/* Peak Highlight Point */}
                <circle cx="240" cy="12" r="4.5" className="fill-emerald-600 dark:fill-white" />
                <circle cx="240" cy="12" r="8" className="fill-emerald-500/30 dark:fill-white/30 animate-ping origin-center" />
                <circle cx="240" cy="12" r="2" className="fill-white dark:fill-black" />

                {/* Current Active Point */}
                <circle cx="320" cy="16" r="3.5" className="fill-emerald-600 dark:fill-white" />
              </svg>
            </div>

            {/* Bottom: Month Timeline Axis & Quick Stats */}
            <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800/80 flex items-center justify-between text-[10px] font-mono text-neutral-500 dark:text-neutral-400 relative z-10">
              <div className="flex items-center gap-3">
                <span className="hover:text-neutral-900 dark:hover:text-white transition-colors">Q1</span>
                <span className="hover:text-neutral-900 dark:hover:text-white transition-colors">Q2</span>
                <span className="hover:text-neutral-900 dark:hover:text-white transition-colors">Q3</span>
                <span className="text-neutral-900 dark:text-white font-semibold">Q4 (Now)</span>
              </div>

              <div className="flex items-center gap-2.5">
                <span className="flex items-center gap-1 text-neutral-700 dark:text-neutral-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-white shadow-[0_0_3px_rgba(16,185,129,0.6)] dark:shadow-[0_0_3px_rgba(255,255,255,0.6)]" />
                  <span>28d streak</span>
                </span>
                <span className="text-neutral-300 dark:text-neutral-600">|</span>
                <span className="flex items-center gap-1 text-neutral-700 dark:text-neutral-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                  <span>15 repos</span>
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* =========================================================================
            ROW 2: Bottom Bento Triad (Photo with Kanji + Social / LeetCode + Offline)
            ========================================================================= */}
        <div ref={row2.ref} className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-3.5">

          {/* Card 3: Cinematic Monochrome Founder Portrait with Vertical Japanese Kanji (Col Span 4) */}
          <div
            onClick={onOpenFullActivity}
            className={`sm:col-span-4 relative group overflow-hidden rounded-[26px] border border-border-main bg-neutral-950 min-h-[180px] sm:min-h-[210px] cursor-pointer transition-all duration-300 hover:border-text-primary/70 hover:shadow-md ${
              row2.isInView ? 'animate-hero-fade-up' : 'opacity-0 translate-y-8 pointer-events-none'
            }`}
            style={{ animationDelay: '200ms' }}
            title="Click to view full activity dossier"
          >
            {/* Cinematic 35mm Photo */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
              style={{ backgroundImage: `url('/founder-portrait.jpg')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/20" />

            {/* Vertical Japanese Text: こんにちは (Konnichiwa) along left edge */}
            <div className="absolute left-3.5 bottom-3.5 text-white font-bold text-[13px] tracking-widest [writing-mode:vertical-rl] select-none pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] font-sans">
              こんにちは
            </div>

            {/* Circular Arrow Badge at Top Right */}
            <div className="absolute top-3.5 right-3.5 p-2 rounded-full bg-black/45 backdrop-blur-md border border-white/20 text-white group-hover:scale-110 group-hover:bg-black/70 transition-all">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 4: LinkedIn & X Social Cards (Col Span 4) */}
          <div
            className={`sm:col-span-4 grid grid-cols-2 gap-2.5 min-h-[180px] sm:min-h-[210px] ${
              row2.isInView ? 'animate-hero-fade-up' : 'opacity-0 translate-y-8 pointer-events-none'
            }`}
            style={{ animationDelay: '280ms' }}
          >
            {/* LinkedIn Card */}
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-[22px] bg-[#3e76ba] hover:bg-[#3468a6] text-white p-4 flex flex-col items-center justify-center text-center transition-all duration-300 hover:scale-[1.03] shadow-sm select-none group"
              title="LinkedIn: Adarsh M • I connect."
            >
              <div className="flex items-center justify-center transition-transform duration-200 group-hover:scale-110 mb-1.5">
                <LinkedinIcon className="w-8 h-8 text-white" strokeWidth={2.2} />
              </div>
              <div className="text-sm sm:text-base font-bold text-white font-display tracking-tight">
                LinkedIn
              </div>
              <span className="text-xs sm:text-sm font-mono text-white/90 tracking-tight">
                I connect.
              </span>
            </a>

            {/* X / Twitter Card */}
            <a
              href={PROFILE.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-[22px] bg-neutral-900 hover:bg-neutral-800 dark:bg-[#212224] border border-neutral-800 dark:border-[#2e3034] hover:border-neutral-500 text-white p-4 flex flex-col items-center justify-center text-center transition-all duration-300 hover:scale-[1.03] shadow-sm select-none group"
              title="X: @adar_sxh • I discuss."
            >
              <div className="flex items-center justify-center transition-transform duration-200 group-hover:scale-110 mb-1.5">
                <XIcon className="w-7 h-7 text-white" />
              </div>
              <div className="text-sm sm:text-base font-bold text-white font-display tracking-tight">
                X
              </div>
              <span className="text-xs sm:text-sm font-mono text-neutral-300 dark:text-neutral-400 tracking-tight">
                I discuss.
              </span>
            </a>
          </div>

          {/* Card 5: Mail Card (Col Span 4) */}
          <div
            onClick={() => {
              window.location.href = `mailto:${PROFILE.email}?subject=${encodeURIComponent("Software Engineering Opportunity — Adarsh M")}`;
            }}
            className={`sm:col-span-4 rounded-[26px] border border-border-main hover:border-neutral-400 bg-white dark:bg-[#0a0a0c] dark:bg-gradient-to-br dark:from-[#16171d] dark:via-[#101114] dark:to-[#0a0a0c] p-5 flex flex-col items-center justify-between text-center relative overflow-hidden transition-all duration-300 shadow-xs hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_8px_30px_rgba(255,255,255,0.08)] cursor-pointer select-none group min-h-[185px] sm:min-h-[210px] ${
              row2.isInView ? 'animate-hero-fade-up' : 'opacity-0 translate-y-8 pointer-events-none'
            }`}
            style={{ animationDelay: '360ms' }}
            title={`Click to email ${PROFILE.email}`}
          >
            {/* Top Right Ambient Subtle Glow */}
            <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-neutral-100/80 dark:bg-white/[0.04] blur-2xl pointer-events-none group-hover:bg-neutral-200/60 dark:group-hover:bg-white/[0.08] transition-all duration-500" />

            {/* Faint Envelope Watermark */}
            <MailWatermark className="absolute -bottom-6 -right-6 w-36 h-36 text-neutral-900/[0.04] dark:text-white/[0.06] pointer-events-none select-none transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-3" />

            {/* Top: Status Pill */}
            <div className="relative z-10 w-full flex items-center justify-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100/90 dark:bg-white/[0.06] border border-neutral-200/80 dark:border-white/15 text-[10px] font-mono text-neutral-700 dark:text-neutral-300 shadow-xs backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-white animate-pulse shadow-[0_0_4px_rgba(16,185,129,0.8)] dark:shadow-[0_0_4px_rgba(255,255,255,0.8)]" />
                <span className="text-neutral-900 dark:text-white font-medium">Available for roles</span>
              </div>
            </div>

            {/* Center: Tactile Mail Emblem & Title */}
            <div className="relative z-10 space-y-2 flex flex-col items-center my-auto py-1">
              <div className="w-12 h-12 rounded-2xl bg-neutral-100 dark:bg-transparent dark:bg-gradient-to-b dark:from-white/[0.12] dark:to-white/[0.02] border border-neutral-200 dark:border-white/20 shadow-xs dark:shadow-[0_4px_16px_rgba(0,0,0,0.5)] flex items-center justify-center text-neutral-900 dark:text-white group-hover:scale-110 group-hover:border-neutral-400 dark:group-hover:border-white/35 transition-all duration-300">
                <Mail className="w-5 h-5 text-neutral-900 dark:text-white drop-shadow-sm" />
              </div>

              <div className="space-y-0.5">
                <div className="text-base sm:text-lg font-bold font-display text-neutral-950 dark:text-white tracking-tight flex items-center justify-center gap-1.5">
                  <span>Mail</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-950 dark:group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
                <div className="text-[11px] sm:text-xs font-mono text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-800 dark:group-hover:text-neutral-200 transition-colors">
                  {PROFILE.email}
                </div>
              </div>
            </div>

            {/* Bottom: Solid High-Contrast Action Button */}
            <div className="relative z-10 w-full pt-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleCopyEmail(e);
                }}
                type="button"
                className="w-full inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-100 dark:text-neutral-950 text-xs font-mono font-bold transition-all duration-200 shadow-sm dark:shadow-[0_2px_12px_rgba(255,255,255,0.12)] active:scale-95 cursor-pointer"
                title="Copy email to clipboard"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400 dark:text-neutral-950 stroke-[2.5]" />
                    <span>copied to clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-white dark:text-neutral-950" />
                    <span>copy email</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Action to View Dedicated Full Milestone Page */}
      {onOpenFullActivity && (
        <div className="flex justify-end pt-1">
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

export default BentoGrid;

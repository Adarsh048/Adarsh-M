import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Clock, MapPin, Sparkles, ArrowDown, ExternalLink, Terminal, Shuffle } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { WordReveal } from './LetterReveal';
import { PROFILE } from '../data/portfolioData';

interface Greeting {
  text: string;
  lang: string;
  note: string;
}

const GREETINGS: Greeting[] = [
  { text: "Hello", lang: "English", note: "Global developer" },
  { text: 'print("Hello")', lang: "Python", note: "Python / AI" },
  { text: "नमस्ते", lang: "Hindi", note: "National greeting" },
  { text: "నమస్కారం", lang: "Telugu", note: "Telugu greeting" },
  { text: "வணக்கம்", lang: "Tamil", note: "SRMIST Chennai" },
  { text: "നമസ്കാരം", lang: "Malayalam", note: "Native roots" },
  { text: "こんにちは", lang: "Japanese", note: "Tokyo / Global" },
  { text: "Hallo", lang: "German", note: "Central Europe" },
  { text: "Olá", lang: "Portuguese", note: "Universal greeting" },
  { text: "Hola", lang: "Spanish", note: "Global reach" },
];

const GLYPHS = ["0", "1", "X", "#", "_", "/", "§", "∆", "Ø", "¥", "@", "*", "+"];

export const Hero: React.FC = () => {
  const [localTime, setLocalTime] = useState<string>('');
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [displayText, setDisplayText] = useState(GREETINGS[0].text);
  const [isScrambling, setIsScrambling] = useState(false);
  
  const isScramblingRef = useRef(false);
  const greetingIndexRef = useRef(0);
  const isHoveredRef = useRef(false);
  const autoTimerRef = useRef<number | null>(null);

  // Synchronize greetingIndex ref
  useEffect(() => {
    greetingIndexRef.current = greetingIndex;
  }, [greetingIndex]);

  // Helper to split Unicode strings into true grapheme clusters (prevents breaking Tamil/Malayalam diacritics)
  const getGraphemes = (str: string): string[] => {
    if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
      const segmenter = new Intl.Segmenter(undefined, { granularity: 'grapheme' });
      return Array.from(segmenter.segment(str), (s) => s.segment);
    }
    return Array.from(str);
  };

  // High-speed cyber matrix decryption scramble effect (grapheme cluster safe)
  const cycleGreeting = useCallback((_isManual = false) => {
    if (isScramblingRef.current) return;
    isScramblingRef.current = true;
    setIsScrambling(true);

    const currentIndex = greetingIndexRef.current;
    const nextIndex = (currentIndex + 1) % GREETINGS.length;
    const targetGreeting = GREETINGS[nextIndex];
    const targetGraphemes = getGraphemes(targetGreeting.text);
    const targetLength = targetGraphemes.length;
    
    let iteration = 0;
    const maxIterations = 5;

    const interval = setInterval(() => {
      iteration += 1;
      const progress = iteration / maxIterations;

      const scrambled = targetGraphemes
        .map((grapheme, idx) => {
          if (grapheme === ' ') return ' ';
          // Gradually lock resolved graphemes from left to right
          if (idx / targetLength < progress) {
            return grapheme;
          }
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        })
        .join('');

      setDisplayText(scrambled);

      if (iteration >= maxIterations + 1) {
        clearInterval(interval);
        setDisplayText(targetGreeting.text);
        setGreetingIndex(nextIndex);
        greetingIndexRef.current = nextIndex;
        isScramblingRef.current = false;
        setIsScrambling(false);
      }
    }, 22);
  }, []);

  // Restart automatic change timer (runs faster, every 2.4s)
  const restartAutoTimer = useCallback(() => {
    if (autoTimerRef.current) {
      clearInterval(autoTimerRef.current);
    }
    autoTimerRef.current = setInterval(() => {
      if (!isHoveredRef.current && !document.hidden && !isScramblingRef.current) {
        cycleGreeting(false);
      }
    }, 2400);
  }, [cycleGreeting]);

  // Start automatic change timer on mount and handle tab visibility
  useEffect(() => {
    restartAutoTimer();

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (autoTimerRef.current) clearInterval(autoTimerRef.current);
      } else {
        restartAutoTimer();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (autoTimerRef.current) clearInterval(autoTimerRef.current);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [restartAutoTimer]);

  // User manual trigger: immediate transition and timer restart
  const handleManualCycle = () => {
    cycleGreeting(true);
    restartAutoTimer();
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      };
      setLocalTime(new Intl.DateTimeFormat('en-IN', options).format(now).toLowerCase());
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const currentGreeting = GREETINGS[greetingIndex];

  return (
    <section id="hero" className="relative pt-4 sm:pt-5 pb-8 transition-colors">
      <div className="w-full space-y-8">
        
        {/* Asymmetrical Hero Layout */}
        <div className="flex flex-col-reverse sm:flex-row gap-4 sm:gap-6 justify-between items-start sm:items-center">
          
          {/* Main Content Column */}
          <div className="flex flex-col flex-1 space-y-4">
            
            <div className="space-y-3">
              
              {/* Status & Decryption Helper Badges with Walking Torch Platform */}
              <div className="pt-16 sm:pt-[86px] select-none animate-hero-badge" style={{ animationDelay: '140ms' }}>
                <div id="hero-badge-platform" className="relative inline-flex flex-wrap sm:flex-nowrap items-center gap-2 self-start sm:self-auto max-w-full">
                  {/* Available for Engineering Roles Badge */}
                  <div id="hero-badge-roles" className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-2.5 py-0.5 rounded-full border border-border-main bg-badge-bg text-text-secondary text-[10px] min-[360px]:text-[11px] sm:text-xs font-mono whitespace-nowrap shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-text-primary animate-pulse shrink-0" />
                    <span>Available for Engineering Roles</span>
                  </div>

                  {/* Context badge displaying ONLY language (no explanation) with interactive cycle trigger */}
                  <button
                    onClick={handleManualCycle}
                    onMouseEnter={() => { isHoveredRef.current = true; }}
                    onMouseLeave={() => { isHoveredRef.current = false; }}
                    type="button"
                    className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-border-main hover:border-text-primary bg-badge-bg text-[10px] min-[360px]:text-[11px] font-mono text-text-secondary hover:text-text-primary transition-colors cursor-pointer whitespace-nowrap shrink-0"
                    title="Click to cycle language"
                  >
                    <Shuffle className={`w-2.5 h-2.5 ${isScrambling ? 'animate-spin' : ''}`} />
                    <span className="text-text-primary font-semibold tracking-wide">{currentGreeting.lang}</span>
                  </button>
                </div>
              </div>

              {/* Primary Headline with Perfect Comma Binding & Zero Reflow Breaks */}
              <div className="space-y-1">
                {/* Row 1: Interactive Greeting with attached comma & decrypt indicator */}
                <div className="flex items-center animate-hero-fade-up" style={{ animationDelay: '260ms' }}>
                  <button
                    id="hero-greeting-anchor"
                    onClick={handleManualCycle}
                    onMouseEnter={() => { isHoveredRef.current = true; }}
                    onMouseLeave={() => { isHoveredRef.current = false; }}
                    type="button"
                    className="group inline-flex items-baseline focus-visible:outline-none cursor-pointer text-left select-none"
                    title="Click to cycle greetings"
                    aria-label={`Greeting: ${displayText}. Click to cycle.`}
                  >
                    <span className="text-lg min-[360px]:text-xl sm:text-2xl md:text-3xl font-display font-bold tracking-tight text-text-primary underline decoration-border-main group-hover:decoration-text-primary underline-offset-4 decoration-2 transition-colors whitespace-nowrap">
                      {displayText},
                    </span>
                    <span className="inline-flex items-center ml-2 text-text-secondary group-hover:text-text-primary transition-colors align-middle">
                      <Shuffle className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${isScrambling ? 'animate-spin' : ''}`} />
                    </span>
                  </button>
                </div>

                {/* Row 2: Prominent commanding Name headline with exquisite slow letter ripple reveal */}
                <h1 className="text-2xl min-[360px]:text-3xl sm:text-5xl md:text-6xl lg:text-[64px] font-display font-extrabold tracking-tighter text-text-primary leading-[1.05] whitespace-nowrap">
                  <span className="inline-block animate-word-reveal" style={{ animationDelay: '360ms' }}>
                    I'm
                  </span>{' '}
                  <span className="inline-block whitespace-nowrap">
                    {"Adarsh".split('').map((char, i) => (
                      <span
                        key={i}
                        className="animate-letter-reveal"
                        style={{ animationDelay: `${440 + i * 40}ms` }}
                      >
                        {char}
                      </span>
                    ))}
                  </span>{' '}
                  <span
                    className="animate-letter-reveal"
                    style={{ animationDelay: `${440 + 6 * 40 + 20}ms` }}
                  >
                    M
                  </span>
                </h1>

                {/* Subtitle */}
                <div className="pt-1 animate-hero-fade-up" style={{ animationDelay: '850ms' }}>
                  <p className="font-mono text-xs sm:text-sm text-text-secondary tracking-tight">
                    {PROFILE.tagline}
                  </p>
                </div>
              </div>

            </div>

            {/* Introduction Statement with Slow Word Reveal */}
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed max-w-3xl">
              <WordReveal 
                text={PROFILE.introduction}
                baseDelay={1050}
                staggerMs={26}
              />
            </p>

            {/* Status Pills / Badges Strip */}
            <div className="flex flex-wrap gap-2 pt-1 text-xs font-mono animate-hero-fade-up" style={{ animationDelay: '1500ms' }}>
              
              {/* Location Badge */}
              <div className="inline-flex items-center rounded-full border border-border-main bg-badge-bg text-text-secondary px-3 py-1">
                <MapPin className="w-3 h-3 mr-1.5 text-text-primary" />
                <span>{PROFILE.location}</span>
              </div>

              {/* Real-Time Local IST Clock */}
              <div className="inline-flex items-center rounded-full border border-border-main bg-badge-bg text-text-secondary px-3 py-1">
                <Clock className="w-3 h-3 mr-1.5 text-text-primary" />
                <span>{localTime || '10:30 pm'} IST</span>
              </div>

              {/* Verified Resume Pill */}
              <a
                href={PROFILE.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border border-border-main bg-badge-bg hover:border-text-primary text-text-primary px-3 py-1 transition-colors group"
              >
                <Sparkles className="w-3 h-3 mr-1.5 text-text-primary" />
                <span>Resume</span>
                <ExternalLink className="w-2.5 h-2.5 ml-1 opacity-60 group-hover:opacity-100" />
              </a>

              {/* Academic Credential Pill */}
              <div className="inline-flex items-center rounded-full border border-border-main bg-badge-bg text-text-secondary px-3 py-1">
                <span>B.Tech CSE • CGPA 8.76</span>
              </div>
            </div>

            {/* Call to Actions & Direct Links */}
            <div className="flex flex-wrap items-center gap-3 pt-3 animate-hero-fade-up" style={{ animationDelay: '1700ms' }}>
              <button
                onClick={() => scrollTo('projects')}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-text-primary text-bg-main font-mono text-xs uppercase tracking-wider font-semibold hover:opacity-85 transition-opacity"
              >
                <span>View Projects</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => scrollTo('contact')}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-border-main hover:border-text-primary hover:bg-bg-hover text-text-primary font-mono text-xs uppercase tracking-wider transition-colors"
              >
                <span>Say Hello</span>
              </button>

              <div className="h-4 w-[1px] bg-border-main mx-1 hidden sm:block" />

              <div className="flex items-center gap-2">
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full border border-border-main hover:border-text-primary hover:bg-bg-hover text-text-primary transition-colors"
                  aria-label="GitHub Profile"
                  title="GitHub Profile"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                </a>

                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full border border-border-main hover:border-text-primary hover:bg-bg-hover text-text-primary transition-colors"
                  aria-label="LinkedIn Profile"
                  title="LinkedIn Profile"
                >
                  <LinkedinIcon className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Portrait / Developer Monogram Card */}
          <div className="self-start sm:self-auto shrink-0 animate-hero-card" style={{ animationDelay: '550ms' }}>
            <div className="size-24 sm:size-28 rounded-2xl border border-border-main bg-panel-bg flex flex-col items-center justify-center p-3 relative select-none transition-colors">
              <div className="size-10 sm:size-11 rounded-xl border border-border-main bg-bg-main flex items-center justify-center mb-1 text-text-primary shadow-sm">
                <Terminal className="w-6 h-6 text-text-primary" />
              </div>
              <span className="font-mono text-xs font-bold text-text-primary tracking-wider">
                adarsh.m
              </span>
              <span className="font-mono text-[10px] text-text-muted">
                full_stack
              </span>
              <span className="absolute top-2 right-2 text-[8px] font-mono text-text-muted">
                DEV.01
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

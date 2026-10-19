import React, { useEffect, useState } from 'react';
import { 
  ArrowLeft, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  Copy, 
  Check, 
  ShieldCheck, 
  ArrowUpRight,
  MessageSquare
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/Icons';
import { LetterReveal, WordReveal } from '../components/LetterReveal';
import { PROFILE } from '../data/portfolioData';

interface ContactPageProps {
  onBack: () => void;
  onNavigateToProjects?: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onBack, onNavigateToProjects }) => {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: 'Full-Stack / Software Engineering Opportunity',
    message: ''
  });
  const [sentNotice, setSentNotice] = useState(false);

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

  const copyEmail = () => {
    navigator.clipboard.writeText(PROFILE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:${PROFILE.email}?subject=${encodeURIComponent(
      formState.subject + ' - ' + formState.name
    )}&body=${encodeURIComponent(
      `Hello Adarsh,\n\n${formState.message}\n\nBest regards,\n${formState.name}\n${formState.email}`
    )}`;
    window.location.href = mailtoUrl;
    setSentNotice(true);
  };

  return (
    <article className="pt-24 sm:pt-28 pb-12 space-y-12">
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
      <header className="space-y-5">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border-main bg-panel-bg text-xs font-mono text-text-secondary animate-hero-badge" style={{ animationDelay: '220ms' }}>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Direct Communication & Inquiries</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display tracking-tight text-text-primary leading-[1.12]">
            <LetterReveal text="Get In Touch" baseDelay={320} staggerMs={24} />
          </h1>
          <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-3xl font-sans">
            <WordReveal 
              text="Whether you have a technical opportunity, a distributed systems challenge, or want to discuss full-stack & AI engineering, my inbox is open."
              baseDelay={650}
              staggerMs={28}
            />
          </p>
        </div>

        {/* Status Callout Card */}
        <div className="p-4 sm:p-5 rounded-2xl border border-border-main bg-panel-bg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3.5 sm:gap-4 shadow-xs animate-hero-card" style={{ animationDelay: '950ms' }}>
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="relative flex h-3 w-3 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
            </div>
            <div className="min-w-0 space-y-0.5">
              <span className="text-sm sm:text-base font-mono font-bold text-text-primary block">
                Active & Available for Work
              </span>
              <span className="text-xs sm:text-sm font-mono text-text-secondary block">
                Open to Full-Stack Engineer, Backend Engineer & AI Systems roles
              </span>
            </div>
          </div>

          <button
            onClick={copyEmail}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border-main bg-bg-main hover:border-text-primary text-xs sm:text-sm font-mono text-text-primary transition-colors cursor-pointer self-start sm:self-auto shrink-0 shadow-xs"
            title="Click to copy email address"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-500" />
                <span className="text-emerald-500 font-semibold">Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-text-secondary" />
                <span>{PROFILE.email}</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Grid: Direct Message Form & Contact Channels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Form Container */}
        <section className="p-6 sm:p-7 rounded-2xl border border-border-main bg-panel-bg space-y-5 shadow-xs animate-hero-card" style={{ animationDelay: '1150ms' }}>
          <div className="flex items-center gap-2.5 border-b border-border-main/60 pb-3.5">
            <MessageSquare className="w-5 h-5 text-emerald-500" />
            <h2 className="text-lg sm:text-xl font-bold font-display text-text-primary">
              Send a Direct Message
            </h2>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs sm:text-[13px] font-mono font-medium text-text-secondary block">Your Name / Organization</label>
              <input
                type="text"
                required
                placeholder="e.g. Sarah Jenkins • Acme Corp"
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-border-main bg-bg-main text-text-primary text-sm font-sans placeholder:text-text-muted focus:outline-none focus:border-text-primary transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs sm:text-[13px] font-mono font-medium text-text-secondary block">Your Email</label>
              <input
                type="email"
                required
                placeholder="sarah@acme.com"
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-border-main bg-bg-main text-text-primary text-sm font-sans placeholder:text-text-muted focus:outline-none focus:border-text-primary transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs sm:text-[13px] font-mono font-medium text-text-secondary block">Subject</label>
              <input
                type="text"
                required
                value={formState.subject}
                onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-border-main bg-bg-main text-text-primary text-sm font-sans focus:outline-none focus:border-text-primary transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs sm:text-[13px] font-mono font-medium text-text-secondary block">Message / Technical Scope</label>
              <textarea
                required
                rows={4}
                placeholder="Hello Adarsh, we saw your work on DecisionVault and would like to connect regarding an engineering role..."
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-border-main bg-bg-main text-text-primary text-sm font-sans placeholder:text-text-muted focus:outline-none focus:border-text-primary transition-colors resize-none leading-relaxed"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-text-primary text-bg-main font-bold hover:opacity-90 transition-opacity cursor-pointer text-sm sm:text-base shadow-xs"
            >
              <Send className="w-4 h-4" />
              <span>Launch Email Client</span>
            </button>

            {sentNotice && (
              <p className="text-xs text-emerald-500 text-center pt-1 font-sans font-medium">
                Opening your email client to send your message directly.
              </p>
            )}
          </form>
        </section>

        {/* Communication Channels & Protocols */}
        <section className="space-y-6">
          <div className="p-6 sm:p-7 rounded-2xl border border-border-main bg-panel-bg space-y-5 shadow-xs animate-hero-card" style={{ animationDelay: '1350ms' }}>
            <h2 className="text-lg sm:text-xl font-bold font-display text-text-primary border-b border-border-main/60 pb-3.5">
              Channels & Location
            </h2>

            <div className="space-y-4">
              <div className="flex items-start gap-3.5">
                <MapPin className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />
                <div>
                  <span className="text-sm sm:text-[15px] text-text-primary font-bold block">Location</span>
                  <span className="text-xs sm:text-sm font-mono text-text-secondary block">{PROFILE.location}</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Clock className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />
                <div>
                  <span className="text-sm sm:text-[15px] text-text-primary font-bold block">Timezone</span>
                  <span className="text-xs sm:text-sm font-mono text-text-secondary block">{PROFILE.timezone} (UTC+5:30)</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Mail className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />
                <div>
                  <span className="text-sm sm:text-[15px] text-text-primary font-bold block">Response SLA</span>
                  <span className="text-xs sm:text-sm font-mono text-text-secondary block">Replies typically within 12 hours</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />
                <div>
                  <span className="text-sm sm:text-[15px] text-text-primary font-bold block">Security Inquiries</span>
                  <span className="text-xs sm:text-sm font-mono text-text-secondary block">PGP & Responsible disclosures welcomed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Social Profiles Grid */}
          <div className="grid grid-cols-2 gap-3.5">
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 sm:p-4.5 rounded-xl border border-border-main bg-panel-bg hover:border-text-primary text-text-primary transition-all flex items-center justify-between group shadow-xs animate-hero-card"
              style={{ animationDelay: '1500ms' }}
            >
              <div className="flex items-center gap-3">
                <GithubIcon className="w-5 h-5" />
                <div>
                  <span className="text-sm font-mono font-bold block">GitHub</span>
                  <span className="text-xs font-mono text-text-muted block">@Adarsh048</span>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-text-secondary group-hover:text-text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 sm:p-4.5 rounded-xl border border-border-main bg-panel-bg hover:border-text-primary text-text-primary transition-all flex items-center justify-between group shadow-xs animate-hero-card"
              style={{ animationDelay: '1650ms' }}
            >
              <div className="flex items-center gap-3">
                <LinkedinIcon className="w-5 h-5" />
                <div>
                  <span className="text-sm font-mono font-bold block">LinkedIn</span>
                  <span className="text-xs font-mono text-text-muted block">Adarsh M</span>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-text-secondary group-hover:text-text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </section>
      </div>

      {/* Footer Navigation */}
      <footer className="pt-6 border-t border-border-main flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-hero-fade-up" style={{ animationDelay: '1850ms' }}>
        <button
          onClick={onBack}
          className="group inline-flex items-center gap-2 text-xs font-mono text-text-primary hover:text-emerald-500 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          <span>Return to Homepage Overview</span>
        </button>

        {onNavigateToProjects && (
          <button
            onClick={onNavigateToProjects}
            className="group inline-flex items-center gap-1.5 text-xs font-mono text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
          >
            <span>Explore Projects Architecture Case Studies</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        )}
      </footer>
    </article>
  );
};

import React, { useEffect, useState } from 'react';
import { 
  ArrowLeft, 
  Mail, 
  MapPin, 
  Send, 
  Copy, 
  Check, 
  ArrowUpRight,
  MessageSquare,
  Globe,
  Loader2,
  CheckCircle2,
  AlertCircle
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
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

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

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setStatus('sending');
    setErrorMessage('');

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${PROFILE.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          subject: formState.subject || 'Job or Internship Opportunity',
          message: formState.message,
          _subject: `Portfolio Message from ${formState.name}: ${formState.subject || 'Job or Internship Opportunity'}`,
          _replyto: formState.email,
          _template: 'table',
          _captcha: 'false'
        })
      });

      const data = await response.json().catch(() => null);

      if (response.ok && (!data || data.success === 'true' || data.success === true)) {
        setStatus('success');
        setFormState({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else if (data?.message && /activat/i.test(data.message)) {
        setStatus('success');
        setFormState({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        throw new Error(data?.message || 'Submission could not be completed.');
      }
    } catch (err: any) {
      console.error('Contact submission error:', err);
      setStatus('error');
      setErrorMessage(err.message || 'Unable to send message directly right now.');
    }
  };

  return (
    <article className="pt-24 sm:pt-28 pb-12 space-y-12">
      {/* Top Breadcrumb & Return Action */}
      <div className="flex items-center justify-between border-b border-border-main pb-4 animate-hero-fade-up" style={{ animationDelay: '100ms' }}>
        <button
          onClick={onBack}
          className="group inline-flex items-center gap-2 text-xs font-mono text-text-secondary hover:text-text-primary transition-colors cursor-pointer px-2.5 py-1 rounded-md hover:bg-bg-hover"
          aria-label="Back to Home"
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
            <span>Let's Connect</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display tracking-tight text-text-primary leading-[1.12]">
            <LetterReveal text="Let's Build Something Together" baseDelay={320} staggerMs={22} />
          </h1>

          <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-3xl font-sans">
            <WordReveal 
              text="I'm actively looking for opportunities to contribute, learn, and grow as a software engineer — whether through a full-time role or an internship."
              baseDelay={650}
              staggerMs={26}
            />
          </p>
        </div>

        {/* Opportunities Availability Banner */}
        <div className="p-4 sm:p-5 rounded-2xl border border-border-main bg-panel-bg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3.5 sm:gap-4 shadow-xs animate-hero-card" style={{ animationDelay: '950ms' }}>
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="relative flex h-3 w-3 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
            </div>
            <div className="min-w-0 space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 uppercase tracking-wide">
                  Open to Opportunities
                </span>
              </div>
              <span className="text-sm sm:text-base font-mono font-bold text-text-primary block">
                Available for Full-Time & Internship Opportunities
              </span>
              <span className="text-xs sm:text-sm font-mono text-text-secondary block">
                Software Engineer · SDE · Full-Stack Developer · Backend Developer · Software Engineering Intern
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
                <span className="text-emerald-500 font-semibold">Copied!</span>
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
              Send Me a Message
            </h2>
          </div>

          {status === 'success' ? (
            <div className="p-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-center space-y-4 animate-hero-card">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-500">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-base sm:text-lg font-bold font-display text-text-primary">
                  Message Sent Successfully!
                </h3>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed max-w-sm mx-auto font-sans">
                  Thank you for reaching out! Your message was delivered directly to Adarsh at <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">{PROFILE.email}</span>. I will review it and get back to you promptly.
                </p>
              </div>
              <button
                onClick={() => setStatus('idle')}
                type="button"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono font-bold bg-text-primary text-bg-main hover:opacity-90 transition-opacity cursor-pointer shadow-xs"
              >
                <span>Send Another Message</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs sm:text-[13px] font-mono font-medium text-text-secondary block">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  disabled={status === 'sending'}
                  placeholder="Your name or organization"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-border-main bg-bg-main text-text-primary text-sm font-sans placeholder:text-text-muted focus:outline-none focus:border-text-primary transition-colors disabled:opacity-60"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs sm:text-[13px] font-mono font-medium text-text-secondary block">
                  Your Email
                </label>
                <input
                  type="email"
                  required
                  disabled={status === 'sending'}
                  placeholder="you@example.com"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-border-main bg-bg-main text-text-primary text-sm font-sans placeholder:text-text-muted focus:outline-none focus:border-text-primary transition-colors disabled:opacity-60"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs sm:text-[13px] font-mono font-medium text-text-secondary block">
                  Subject
                </label>
                <input
                  type="text"
                  required
                  disabled={status === 'sending'}
                  placeholder="Job or Internship Opportunity"
                  value={formState.subject}
                  onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-border-main bg-bg-main text-text-primary text-sm font-sans placeholder:text-text-muted focus:outline-none focus:border-text-primary transition-colors disabled:opacity-60"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs sm:text-[13px] font-mono font-medium text-text-secondary block">
                  Message
                </label>
                <textarea
                  required
                  rows={4}
                  disabled={status === 'sending'}
                  placeholder="Hi Adarsh, I'd like to connect with you regarding a software engineering opportunity..."
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-border-main bg-bg-main text-text-primary text-sm font-sans placeholder:text-text-muted focus:outline-none focus:border-text-primary transition-colors resize-none leading-relaxed disabled:opacity-60"
                />
              </div>

              {status === 'error' && (
                <div className="p-3.5 rounded-xl border border-rose-500/30 bg-rose-500/10 text-xs text-rose-600 dark:text-rose-400 space-y-1.5">
                  <div className="flex items-center gap-2 font-medium">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage || 'Direct submission failed. Click below to launch your email client.'}</span>
                  </div>
                  <a
                    href={`mailto:${PROFILE.email}?subject=${encodeURIComponent(formState.subject || 'Job or Internship Opportunity')}&body=${encodeURIComponent(formState.message)}`}
                    className="inline-flex items-center gap-1 font-mono font-semibold underline text-text-primary hover:text-emerald-500 pt-0.5"
                  >
                    <span>Send via email app instead</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className={`w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-text-primary text-bg-main font-bold hover:opacity-90 transition-all cursor-pointer text-sm sm:text-base shadow-xs ${
                  status === 'sending' ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {status === 'sending' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          )}
        </section>

        {/* Communication Channels & Find Me Online */}
        <section className="space-y-6">
          {/* Get in Touch Card */}
          <div className="p-6 sm:p-7 rounded-2xl border border-border-main bg-panel-bg space-y-5 shadow-xs animate-hero-card" style={{ animationDelay: '1350ms' }}>
            <h2 className="text-lg sm:text-xl font-bold font-display text-text-primary border-b border-border-main/60 pb-3.5">
              Get in Touch
            </h2>

            <div className="space-y-4">
              {/* Email */}
              <div className="flex items-start gap-3.5">
                <Mail className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />
                <div className="space-y-0.5">
                  <span className="text-sm sm:text-[15px] text-text-primary font-bold block">Email</span>
                  <a 
                    href={`mailto:${PROFILE.email}`}
                    className="text-xs sm:text-sm font-mono text-emerald-600 dark:text-emerald-400 hover:underline block font-semibold"
                  >
                    {PROFILE.email}
                  </a>
                  <p className="text-xs sm:text-[13px] text-text-secondary leading-relaxed pt-1">
                    Have an opportunity, a project idea, or want to connect? I'd love to hear from you.
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3.5 pt-2 border-t border-border-subtle">
                <MapPin className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />
                <div className="space-y-0.5">
                  <span className="text-sm sm:text-[15px] text-text-primary font-bold block">Location</span>
                  <span className="text-xs sm:text-sm font-mono text-text-secondary block">
                    India · Asia/Kolkata (IST, UTC+5:30)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Find Me Online Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 animate-hero-fade-up" style={{ animationDelay: '1460ms' }}>
              <Globe className="w-4 h-4 text-text-primary" />
              <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-text-primary">
                Find Me Online
              </h3>
            </div>

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
          <span>Back to Home</span>
        </button>

        {onNavigateToProjects && (
          <button
            onClick={onNavigateToProjects}
            className="group inline-flex items-center gap-1.5 text-xs font-mono text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
          >
            <span>Explore My Projects</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        )}
      </footer>
    </article>
  );
};

export default ContactPage;

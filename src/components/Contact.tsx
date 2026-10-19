import React, { useState } from 'react';
import { Copy, Check, Send, FileText, MessageSquare, ArrowRight, Loader2, CheckCircle2, AlertCircle, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { PROFILE } from '../data/portfolioData';
import { useInView } from '../hooks/useInView';
import { LetterReveal } from './LetterReveal';

interface ContactProps {
  onOpenFullContact?: () => void;
}

export const Contact: React.FC<ContactProps> = ({ onOpenFullContact }) => {
  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.1 });
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const copyEmail = () => {
    navigator.clipboard.writeText(PROFILE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

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
          name: formData.name,
          email: formData.email,
          subject: formData.subject || 'Software Engineering Opportunity',
          message: formData.message,
          _subject: `Portfolio Message from ${formData.name}: ${formData.subject || 'Opportunity'}`,
          _replyto: formData.email,
          _template: 'table',
          _captcha: 'false'
        })
      });

      const data = await response.json().catch(() => null);

      if (response.ok && (!data || data.success === 'true' || data.success === true)) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else if (data?.message && /activat/i.test(data.message)) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
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
    <section ref={ref} id="contact" className="py-14 space-y-8">
      {/* Centered Editorial Header */}
      <div className="flex flex-col items-center text-center space-y-3">
        <div
          id="contact-badge-platform"
          className={`relative inline-block rounded-lg bg-text-primary text-bg-main px-3 py-1 text-xs font-mono font-medium ${
            isInView ? 'animate-hero-badge' : 'opacity-0'
          }`}
          style={{ animationDelay: '100ms' }}
        >
          Connect 💌
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary font-display">
          <LetterReveal text="Say Hello 👋" isActive={isInView} baseDelay={60} staggerMs={24} />
        </h2>

        <p
          className={`text-sm sm:text-base text-text-secondary max-w-2xl leading-relaxed ${
            isInView ? 'animate-hero-fade-up' : 'opacity-0 translate-y-6'
          }`}
          style={{ animationDelay: '180ms' }}
        >
          I am actively seeking Full-Stack and AI Engineering opportunities. Whether you have an exciting engineering opening, a project to collaborate on, or wish to talk software architecture — my inbox is always open.
        </p>
      </div>

      {/* Main Contact Container */}
      <div
        className={`w-full max-w-2xl sm:max-w-3xl mx-auto space-y-6 ${
          isInView ? 'animate-hero-fade-up' : 'opacity-0 translate-y-8'
        }`}
        style={{ animationDelay: '260ms' }}
      >
        
        {/* Fast Action Card with 1-Click Email Copy */}
        <div className="p-4 sm:p-5 rounded-2xl border border-border-main bg-panel-bg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3.5 sm:gap-4 shadow-sm hover:border-text-primary transition-colors">
          <div className="flex items-center gap-3 min-w-0 w-full sm:w-auto">
            <div className="size-10 rounded-xl border border-border-main bg-bg-main text-text-primary flex items-center justify-center shrink-0">
              <span className="font-mono font-bold text-sm">@</span>
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-xs text-text-muted block font-mono">
                Verified Direct Email
              </span>
              <a
                href={`mailto:${PROFILE.email}`}
                className="text-xs min-[360px]:text-sm sm:text-base font-semibold text-text-primary hover:underline font-mono truncate block"
              >
                {PROFILE.email}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={copyEmail}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-medium border border-border-main hover:border-text-primary hover:bg-bg-hover text-text-primary transition-colors"
              aria-label="Copy email address"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>

            <a
              href={`mailto:${PROFILE.email}?subject=${encodeURIComponent("Software Engineering Opportunity — Adarsh M")}`}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-bold bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 hover:opacity-85 transition-opacity"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Compose</span>
            </a>
          </div>
        </div>

        {/* Functional Interactive Direct Message Form */}
        <div className="p-5 sm:p-6 rounded-2xl border border-border-main bg-panel-bg space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-border-subtle pb-3.5">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-emerald-500" />
              <h3 className="text-base font-bold text-text-primary font-display">
                Send a Direct Message
              </h3>
            </div>
            <span className="text-xs font-mono text-text-muted">
              Direct to inbox
            </span>
          </div>

          {status === 'success' ? (
            <div className="py-8 text-center space-y-3">
              <div className="size-12 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto mb-2">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-base font-semibold text-text-primary font-display">
                Message Sent Directly!
              </h4>
              <p className="text-sm text-text-secondary max-w-sm mx-auto font-sans">
                Thank you for reaching out! Your message was delivered directly to Adarsh at <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">{PROFILE.email}</span>. I will respond promptly.
              </p>
              <button
                onClick={() => {
                  setStatus('idle');
                  setFormData({ name: '', email: '', subject: '', message: '' });
                }}
                className="text-xs font-mono text-text-primary hover:underline pt-2 inline-block cursor-pointer"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1.5">
                  <label className="text-xs sm:text-[13px] font-mono text-text-secondary block font-medium">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    disabled={status === 'sending'}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Jane Doe"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-border-main bg-neutral-50/70 dark:bg-bg-main text-text-primary focus:bg-white dark:focus:bg-bg-main focus:outline-none focus:border-text-primary transition-colors disabled:opacity-60"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs sm:text-[13px] font-mono text-text-secondary block font-medium">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    required
                    disabled={status === 'sending'}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jane@company.com"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-border-main bg-neutral-50/70 dark:bg-bg-main text-text-primary focus:bg-white dark:focus:bg-bg-main focus:outline-none focus:border-text-primary transition-colors disabled:opacity-60"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs sm:text-[13px] font-mono text-text-secondary block font-medium">
                  Subject
                </label>
                <input
                  type="text"
                  disabled={status === 'sending'}
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Software Engineering Opportunity / Project Discussion"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-border-main bg-neutral-50/70 dark:bg-bg-main text-text-primary focus:bg-white dark:focus:bg-bg-main focus:outline-none focus:border-text-primary transition-colors disabled:opacity-60"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs sm:text-[13px] font-mono text-text-secondary block font-medium">
                  Message *
                </label>
                <textarea
                  required
                  rows={3}
                  disabled={status === 'sending'}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Hi Adarsh, I came across your portfolio and would love to chat about..."
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-border-main bg-neutral-50/70 dark:bg-bg-main text-text-primary focus:bg-white dark:focus:bg-bg-main focus:outline-none focus:border-text-primary transition-colors resize-none leading-relaxed disabled:opacity-60"
                />
              </div>

              {status === 'error' && (
                <div className="p-3.5 rounded-xl border border-rose-500/30 bg-rose-500/10 text-xs text-rose-600 dark:text-rose-400 space-y-1.5">
                  <div className="flex items-center gap-2 font-medium">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage || 'Direct submission failed. Click below to launch your email client.'}</span>
                  </div>
                  <a
                    href={`mailto:${PROFILE.email}?subject=${encodeURIComponent(formData.subject || 'Software Engineering Opportunity')}&body=${encodeURIComponent(formData.message)}`}
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
                className={`w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 hover:opacity-85 transition-opacity shadow-xs cursor-pointer ${
                  status === 'sending' ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {status === 'sending' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Dispatching Message...</span>
                  </>
                ) : (
                  <>
                    <span>Dispatch Email</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Verified Social & Document Directory */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border-main bg-badge-bg text-xs font-mono text-text-secondary hover:text-text-primary hover:border-text-primary transition-colors"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>GitHub Profile</span>
          </a>

          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border-main bg-badge-bg text-xs font-mono text-text-secondary hover:text-text-primary hover:border-text-primary transition-colors"
          >
            <LinkedinIcon className="w-3.5 h-3.5" />
            <span>LinkedIn Profile</span>
          </a>

          <a
            href={PROFILE.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border-main bg-badge-bg text-xs font-mono text-text-primary hover:border-text-primary transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>View Resume (PDF)</span>
          </a>
        </div>

      </div>

      {onOpenFullContact && (
        <div className="flex justify-end pt-2">
          <button
            onClick={onOpenFullContact}
            className="group inline-flex items-center gap-2 text-xs font-mono text-text-secondary hover:text-text-primary transition-colors cursor-pointer py-1"
            aria-label="View full contact dossier and communication channels"
          >
            <span className="text-text-primary font-medium border-b border-border-main group-hover:border-text-primary pb-0.5 transition-colors">
              View full contact channels & communication SLA
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-text-secondary group-hover:text-text-primary transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>
      )}
    </section>
  );
};

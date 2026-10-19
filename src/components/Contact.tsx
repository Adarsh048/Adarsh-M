import React, { useState } from 'react';
import { Copy, Check, Send, FileText, MessageSquare, ArrowRight } from 'lucide-react';
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
  const [submitted, setSubmitted] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(PROFILE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSubmitted(true);
    const mailtoLink = `mailto:${PROFILE.email}?subject=${encodeURIComponent(
      formData.subject || `Software Engineering Opportunity from ${formData.name}`
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    window.location.href = mailtoLink;
  };

  return (
    <section ref={ref} id="contact" className="py-14 space-y-8">
      {/* Centered Editorial Header */}
      <div className="flex flex-col items-center text-center space-y-3">
        <div
          id="contact-badge-platform"
          className={`relative inline-block rounded-lg bg-text-primary text-bg-main px-3 py-1 text-xs font-mono font-medium ${
            isInView ? 'animate-hero-badge' : ''
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
            isInView ? 'animate-hero-fade-up' : ''
          }`}
          style={{ animationDelay: '180ms' }}
        >
          I am actively seeking Full-Stack and AI Engineering opportunities. Whether you have an exciting engineering opening, a project to collaborate on, or wish to talk software architecture — my inbox is always open.
        </p>
      </div>

      {/* Main Contact Container */}
      <div
        className={`w-full max-w-2xl sm:max-w-3xl mx-auto space-y-6 ${isInView ? 'animate-hero-fade-up' : ''}`}
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
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-bold bg-text-primary text-bg-main hover:opacity-85 transition-opacity"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Compose</span>
            </a>
          </div>
        </div>

        {/* Functional Interactive Direct Message Form */}
        <div className="p-5 sm:p-6 rounded-2xl border border-border-main bg-panel-bg space-y-4">
          <div className="flex items-center justify-between border-b border-border-subtle pb-3">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-text-primary" />
              <h3 className="text-sm font-semibold text-text-primary">
                Send a Direct Message
              </h3>
            </div>
            <span className="text-[11px] font-mono text-text-muted">
              Direct to inbox
            </span>
          </div>

          {submitted ? (
            <div className="py-8 text-center space-y-2">
              <div className="size-10 rounded-full border border-border-main bg-bg-main text-text-primary flex items-center justify-center mx-auto mb-2">
                <Check className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-semibold text-text-primary">
                Opening Mail Client
              </h4>
              <p className="text-xs text-text-secondary max-w-sm mx-auto">
                Your email client is opening with pre-filled details. Thank you for reaching out, Adarsh will respond promptly.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', subject: '', message: '' });
                }}
                className="text-xs font-mono text-text-primary hover:underline pt-2 inline-block"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-text-secondary block">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Jane Doe"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-border-main bg-bg-main text-text-primary focus:outline-none focus:border-text-primary transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-text-secondary block">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jane@company.com"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-border-main bg-bg-main text-text-primary focus:outline-none focus:border-text-primary transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono text-text-secondary block">
                  Subject
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Software Engineering Opportunity / Project Discussion"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-border-main bg-bg-main text-text-primary focus:outline-none focus:border-text-primary transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono text-text-secondary block">
                  Message *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Hi Adarsh, I came across your portfolio and would love to chat about..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-border-main bg-bg-main text-text-primary focus:outline-none focus:border-text-primary transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-bold bg-text-primary text-bg-main hover:opacity-85 transition-opacity"
              >
                <span>Dispatch Email</span>
                <Send className="w-3.5 h-3.5" />
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

import React from 'react';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import type { Project } from '../types';
import { useInView } from '../hooks/useInView';
import { LetterReveal } from './LetterReveal';

interface ProjectsProps {
  onOpenFullProjects?: () => void;
}

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpenFullProjects?: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpenFullProjects, index }) => {
  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.05 });

  return (
    <article
      ref={ref}
      onClick={onOpenFullProjects}
      className={`group relative rounded-2xl border border-border-main bg-panel-bg overflow-hidden transition-all duration-300 hover:border-text-primary/60 hover:shadow-xl cursor-pointer flex flex-col justify-between ${
        isInView ? 'animate-hero-fade-up' : 'opacity-0 translate-y-8 pointer-events-none'
      }`}
      style={{ animationDelay: `${(index % 2) * 120}ms` }}
    >
      {/* Top: Project Website Preview Screenshot spanning the card width */}
      {project.image && (
        <div className="relative w-full aspect-[16/10] overflow-hidden bg-neutral-950 border-b border-border-subtle shrink-0">
          <img
            src={project.image}
            alt={`${project.title} interface preview`}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            decoding="async"
          />
        </div>
      )}

      {/* Card Content Area matching reference image */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Project Title in Bold */}
          <h3 className="font-display font-bold text-xl sm:text-2xl text-text-primary tracking-tight">
            {project.title}
          </h3>

          {/* Duration / Date */}
          <div className="text-xs sm:text-sm text-text-muted font-normal mt-1">
            {project.period}
          </div>

          {/* Project Description */}
          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mt-2.5">
            {project.description}
          </p>
        </div>

        {/* Tech Stack Tags & Action Buttons */}
        <div className="space-y-4 pt-1">
          {/* Rounded pill-shaped tags */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800/90 border border-neutral-200/90 dark:border-neutral-700/60 text-neutral-700 dark:text-neutral-300 text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Two Action Buttons: Live & Source */}
          <div
            className="flex items-center gap-2.5 pt-1"
            onClick={(e) => e.stopPropagation()}
          >
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-200 dark:text-neutral-950 text-xs sm:text-sm font-semibold shadow-xs transition-all duration-200 hover:scale-[1.02] cursor-pointer"
                title="Visit Live Application"
              >
                <ExternalLink className="w-3.5 h-3.5 stroke-[2.2]" />
                <span>Live</span>
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-200 dark:text-neutral-950 text-xs sm:text-sm font-semibold shadow-xs transition-all duration-200 hover:scale-[1.02] cursor-pointer"
                title="View Source Code"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-3.5 h-3.5 shrink-0"
                  aria-hidden="true"
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span>Source</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export const Projects: React.FC<ProjectsProps> = ({ onOpenFullProjects }) => {
  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.1 });

  return (
    <section ref={ref} id="projects" className="py-12 space-y-6">
      {/* Editorial Section Header */}
      <div className="flex flex-col items-center text-center space-y-3">
        {/* Walking Torch Platform Anchor */}
        <div
          id="projects-badge-platform"
          className={`relative inline-block rounded-lg bg-text-primary text-bg-main px-3 py-1 text-xs font-mono font-medium shadow-sm select-none ${
            isInView ? 'animate-hero-badge' : 'opacity-0'
          }`}
          style={{ animationDelay: '100ms' }}
        >
          Selected Works
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary font-display">
          <LetterReveal text="Things I've Built" isActive={isInView} baseDelay={60} staggerMs={24} />
        </h2>

        <p
          className={`text-sm sm:text-base text-text-secondary max-w-2xl leading-relaxed ${
            isInView ? 'animate-hero-fade-up' : 'opacity-0 translate-y-6'
          }`}
          style={{ animationDelay: '180ms' }}
        >
          A few projects, experiments, and ideas brought to life through code. Explore more on the{' '}
          <a
            href="https://adarshm-portfolio.web.app/"
            onClick={(e) => {
              if (onOpenFullProjects) {
                e.preventDefault();
                onOpenFullProjects();
              }
            }}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-primary underline underline-offset-4 hover:opacity-80 transition-opacity font-medium"
          >
            projects page
          </a>
          .
        </p>
      </div>

      {/* Vertical Project Cards Grid matching reference image */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
        {PROJECTS.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index + 1}
            onOpenFullProjects={onOpenFullProjects}
          />
        ))}
      </div>

      {/* Link to Full Projects Page */}
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

export default Projects;

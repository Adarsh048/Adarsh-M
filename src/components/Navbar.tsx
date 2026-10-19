import React from 'react';
import { User, Compass, BookOpen, Mail, FileText, MoonStar, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { PROFILE } from '../data/portfolioData';

interface NavbarProps {
  currentPath?: string;
  onNavigate?: (path: string, targetSection?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath = '/', onNavigate }) => {
  const { theme, toggleTheme } = useTheme();

  const handleNav = (sectionId: string) => {
    const routeMap: Record<string, string> = {
      hero: '/',
      about: '/about',
      projects: '/projects',
      blogs: '/blogs',
      contact: '/contact',
    };

    const targetRoute = routeMap[sectionId] || '/';

    // If already on the targeted route, smoothly scroll to top
    if (currentPath === targetRoute) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (onNavigate) {
      onNavigate(targetRoute, sectionId);
    } else {
      window.location.href = targetRoute;
    }
  };

  const isCurrentActive = (sectionId: string) => {
    if (sectionId === 'hero') return currentPath === '/';
    if (sectionId === 'about') return currentPath === '/about';
    if (sectionId === 'projects') return currentPath === '/projects';
    if (sectionId === 'blogs') return currentPath === '/blogs';
    if (sectionId === 'contact') return currentPath === '/contact';
    return false;
  };

  return (
    <>
      {/* ================= DESKTOP FLOATING PILL NAVBAR ================= */}
      <nav 
        id="desktop-nav"
        className="hidden md:flex fixed top-6 inset-x-0 mx-auto max-w-fit rounded-full border border-neutral-800 bg-[#121212]/95 dark:bg-[#121212]/95 dark:border-neutral-800 border-neutral-800/80 backdrop-blur-xl shadow-lg shadow-black/40 z-[5000] px-6 py-2.5 items-center gap-6 sm:gap-7 transition-all duration-300 animate-nav-slide-down"
        aria-label="Desktop Navigation"
      >
        {/* Home Outline Icon with Arched Doorway */}
        <button
          onClick={() => handleNav('hero')}
          className={`transition-colors cursor-pointer p-0.5 flex items-center justify-center ${
            isCurrentActive('hero')
              ? 'text-white dark:text-white'
              : 'text-neutral-400 hover:text-white dark:text-neutral-400 dark:hover:text-white'
          }`}
          aria-label="Home"
          title="Home"
        >
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.8" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="w-4 h-4 sm:w-[17px] sm:h-[17px]"
          >
            <path d="M3 10.5L12 3l9 7.5V20a1.5 1.5 0 01-1.5 1.5h-15A1.5 1.5 0 013 20v-9.5z" />
            <path d="M9 21.5v-6a3 3 0 016 0v6" />
          </svg>
        </button>

        {/* About */}
        <button
          onClick={() => handleNav('about')}
          className={`text-sm font-medium tracking-normal transition-colors cursor-pointer ${
            isCurrentActive('about')
              ? 'text-white font-semibold dark:text-white'
              : 'text-neutral-400 hover:text-white dark:text-neutral-400 dark:hover:text-white'
          }`}
          title="About"
        >
          About
        </button>

        {/* Projects */}
        <button
          onClick={() => handleNav('projects')}
          className={`text-sm font-medium tracking-normal transition-colors cursor-pointer ${
            isCurrentActive('projects')
              ? 'text-white font-semibold dark:text-white'
              : 'text-neutral-400 hover:text-white dark:text-neutral-400 dark:hover:text-white'
          }`}
          title="Projects"
        >
          Projects
        </button>

        {/* Blogs */}
        <button
          onClick={() => handleNav('blogs')}
          className={`text-sm font-medium tracking-normal transition-colors cursor-pointer ${
            isCurrentActive('blogs')
              ? 'text-white font-semibold dark:text-white'
              : 'text-neutral-400 hover:text-white dark:text-neutral-400 dark:hover:text-white'
          }`}
          title="Blogs & Technical Notes"
        >
          Blogs
        </button>

        {/* Reach */}
        <button
          onClick={() => handleNav('contact')}
          className={`text-sm font-medium tracking-normal transition-colors cursor-pointer ${
            isCurrentActive('contact')
              ? 'text-white font-semibold dark:text-white'
              : 'text-neutral-400 hover:text-white dark:text-neutral-400 dark:hover:text-white'
          }`}
          title="Reach"
        >
          Reach
        </button>

        {/* Resume */}
        <a
          href={PROFILE.resume}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium tracking-normal text-neutral-400 hover:text-white dark:text-neutral-400 dark:hover:text-white transition-colors"
          title="Resume PDF"
        >
          Resume
        </a>

        {/* Subtle Vertical Divider */}
        <div className="shrink-0 bg-neutral-700/70 dark:bg-neutral-800 w-[1px] h-3.5 mx-0.5" />

        {/* Moon with Sparkles Theme Toggle Button */}
        <button
          id="theme-toggle-btn"
          onClick={toggleTheme}
          className="text-neutral-400 hover:text-white dark:text-neutral-400 dark:hover:text-white transition-colors cursor-pointer p-0.5 flex items-center justify-center focus-visible:outline-none"
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? (
            <MoonStar className="w-4 h-4 sm:w-[17px] sm:h-[17px] transition-transform duration-300 hover:rotate-12" />
          ) : (
            <Sun className="w-4 h-4 sm:w-[17px] sm:h-[17px] transition-transform duration-300 hover:rotate-45" />
          )}
        </button>
      </nav>

      {/* ================= MOBILE FLOATING BOTTOM DOCK ================= */}
      <div className="block md:hidden">
        {/* Soft gradient fade on bottom */}
        <div className="pointer-events-none fixed bottom-0 inset-x-0 h-20 bg-gradient-to-t from-bg-main to-transparent z-30" />

        <div 
          id="mobile-dock"
          className="fixed inset-x-0 bottom-5 z-40 mx-auto w-max max-w-[calc(100vw-1.5rem)] px-3.5 py-2 rounded-full border border-neutral-800 bg-[#121212]/95 backdrop-blur-xl shadow-xl flex items-center gap-3 sm:gap-4 transition-colors animate-dock-slide-up"
          aria-label="Mobile Navigation Dock"
        >
          <button
            onClick={() => handleNav('hero')}
            className={`p-1.5 transition-colors cursor-pointer ${
              isCurrentActive('hero')
                ? 'text-white'
                : 'text-neutral-400 hover:text-white'
            }`}
            aria-label="Home"
            title="Home"
          >
            <svg 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.8" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="w-4.5 h-4.5"
            >
              <path d="M3 10.5L12 3l9 7.5V20a1.5 1.5 0 01-1.5 1.5h-15A1.5 1.5 0 013 20v-9.5z" />
              <path d="M9 21.5v-6a3 3 0 016 0v6" />
            </svg>
          </button>

          <button
            onClick={() => handleNav('about')}
            className={`p-1.5 transition-colors cursor-pointer ${
              isCurrentActive('about')
                ? 'text-white'
                : 'text-neutral-400 hover:text-white'
            }`}
            aria-label="About"
            title="About"
          >
            <User className="w-4.5 h-4.5" />
          </button>

          <button
            onClick={() => handleNav('projects')}
            className={`p-1.5 transition-colors cursor-pointer ${
              isCurrentActive('projects')
                ? 'text-white'
                : 'text-neutral-400 hover:text-white'
            }`}
            aria-label="Projects"
            title="Projects"
          >
            <Compass className="w-4.5 h-4.5" />
          </button>

          <button
            onClick={() => handleNav('blogs')}
            className={`p-1.5 transition-colors cursor-pointer ${
              isCurrentActive('blogs')
                ? 'text-white'
                : 'text-neutral-400 hover:text-white'
            }`}
            aria-label="Blogs"
            title="Blogs"
          >
            <BookOpen className="w-4.5 h-4.5" />
          </button>

          <button
            onClick={() => handleNav('contact')}
            className={`p-1.5 transition-colors cursor-pointer ${
              isCurrentActive('contact')
                ? 'text-white'
                : 'text-neutral-400 hover:text-white'
            }`}
            aria-label="Reach"
            title="Reach"
          >
            <Mail className="w-4.5 h-4.5" />
          </button>

          <a
            href={PROFILE.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 text-neutral-400 hover:text-white transition-colors"
            aria-label="Resume"
            title="Resume"
          >
            <FileText className="w-4.5 h-4.5" />
          </a>

          <div className="shrink-0 bg-neutral-700/70 w-[1px] h-3.5 mx-0.5" />

          <button
            onClick={toggleTheme}
            className="p-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <MoonStar className="w-4.5 h-4.5" />
            ) : (
              <Sun className="w-4.5 h-4.5" />
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;

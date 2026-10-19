import React from 'react';
import { User, Compass, Mail, FileText, MoonStar, Sun } from 'lucide-react';
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
    if (sectionId === 'contact') return currentPath === '/contact';
    return false;
  };

  return (
    <>
      {/* ================= DESKTOP FLOATING PILL NAVBAR ================= */}
      <nav 
        id="desktop-nav"
        className="hidden md:flex fixed top-7 inset-x-0 mx-auto max-w-fit rounded-full border border-neutral-200/60 dark:border-neutral-800/60 bg-transparent backdrop-blur-md shadow-sm z-[5000] px-7 py-3 items-center gap-7 sm:gap-8 transition-all duration-300 animate-nav-slide-down"
        aria-label="Desktop Navigation"
      >
        {/* Home Outline Icon with Arched Doorway */}
        <button
          onClick={() => handleNav('hero')}
          className={`transition-colors cursor-pointer p-1 flex items-center justify-center ${
            isCurrentActive('hero')
              ? 'text-neutral-950 dark:text-white'
              : 'text-neutral-500 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white'
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
            className="w-[19px] h-[19px] sm:w-5 sm:h-5"
          >
            <path d="M3 10.5L12 3l9 7.5V20a1.5 1.5 0 01-1.5 1.5h-15A1.5 1.5 0 013 20v-9.5z" />
            <path d="M9 21.5v-6a3 3 0 016 0v6" />
          </svg>
        </button>

        {/* About */}
        <button
          onClick={() => handleNav('about')}
          className={`text-[15px] font-medium tracking-normal transition-colors cursor-pointer ${
            isCurrentActive('about')
              ? 'text-neutral-950 font-semibold dark:text-white'
              : 'text-neutral-500 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white'
          }`}
          title="About"
        >
          About
        </button>

        {/* Projects */}
        <button
          onClick={() => handleNav('projects')}
          className={`text-[15px] font-medium tracking-normal transition-colors cursor-pointer ${
            isCurrentActive('projects')
              ? 'text-neutral-950 font-semibold dark:text-white'
              : 'text-neutral-500 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white'
          }`}
          title="Projects"
        >
          Projects
        </button>

        {/* Reach */}
        <button
          onClick={() => handleNav('contact')}
          className={`text-[15px] font-medium tracking-normal transition-colors cursor-pointer ${
            isCurrentActive('contact')
              ? 'text-neutral-950 font-semibold dark:text-white'
              : 'text-neutral-500 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white'
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
          className="text-[15px] font-medium tracking-normal text-neutral-500 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white transition-colors"
          title="Resume PDF"
        >
          Resume
        </a>

        {/* Subtle Vertical Divider */}
        <div className="shrink-0 bg-neutral-200 dark:bg-neutral-800 w-[1px] h-4.5 mx-0.5" />

        {/* Moon with Sparkles Theme Toggle Button */}
        <button
          id="theme-toggle-btn"
          onClick={toggleTheme}
          className="text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white transition-colors cursor-pointer p-1 flex items-center justify-center focus-visible:outline-none"
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? (
            <MoonStar className="w-[19px] h-[19px] sm:w-5 sm:h-5 transition-transform duration-300 hover:rotate-12" />
          ) : (
            <Sun className="w-[19px] h-[19px] sm:w-5 sm:h-5 transition-transform duration-300 hover:rotate-45" />
          )}
        </button>
      </nav>

      {/* ================= MOBILE FLOATING BOTTOM DOCK ================= */}
      <div className="block md:hidden">
        <div 
          id="mobile-dock"
          className="fixed inset-x-0 bottom-5 z-40 mx-auto w-max max-w-[calc(100vw-1.5rem)] px-4 py-2.5 rounded-full border border-neutral-200/60 dark:border-neutral-800/60 bg-transparent backdrop-blur-md shadow-sm flex items-center gap-3.5 sm:gap-4.5 transition-colors animate-dock-slide-up"
          aria-label="Mobile Navigation Dock"
        >
          <button
            onClick={() => handleNav('hero')}
            className={`p-2 transition-colors cursor-pointer ${
              isCurrentActive('hero')
                ? 'text-neutral-950 dark:text-white'
                : 'text-neutral-500 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white'
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
              className="w-5 h-5"
            >
              <path d="M3 10.5L12 3l9 7.5V20a1.5 1.5 0 01-1.5 1.5h-15A1.5 1.5 0 013 20v-9.5z" />
              <path d="M9 21.5v-6a3 3 0 016 0v6" />
            </svg>
          </button>

          <button
            onClick={() => handleNav('about')}
            className={`p-2 transition-colors cursor-pointer ${
              isCurrentActive('about')
                ? 'text-neutral-950 dark:text-white'
                : 'text-neutral-500 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white'
            }`}
            aria-label="About"
            title="About"
          >
            <User className="w-5 h-5" />
          </button>

          <button
            onClick={() => handleNav('projects')}
            className={`p-2 transition-colors cursor-pointer ${
              isCurrentActive('projects')
                ? 'text-neutral-950 dark:text-white'
                : 'text-neutral-500 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white'
            }`}
            aria-label="Projects"
            title="Projects"
          >
            <Compass className="w-5 h-5" />
          </button>

          <button
            onClick={() => handleNav('contact')}
            className={`p-2 transition-colors cursor-pointer ${
              isCurrentActive('contact')
                ? 'text-neutral-950 dark:text-white'
                : 'text-neutral-500 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white'
            }`}
            aria-label="Reach"
            title="Reach"
          >
            <Mail className="w-5 h-5" />
          </button>

          <a
            href={PROFILE.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-neutral-500 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white transition-colors"
            aria-label="Resume"
            title="Resume"
          >
            <FileText className="w-5 h-5" />
          </a>

          <div className="shrink-0 bg-neutral-200 dark:bg-neutral-700/70 w-[1px] h-4.5 mx-0.5" />

          <button
            onClick={toggleTheme}
            className="p-2 text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white transition-colors cursor-pointer"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <MoonStar className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;

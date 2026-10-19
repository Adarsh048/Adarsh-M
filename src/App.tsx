import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { TorchWhiteoutOverlay } from './components/TorchWhiteoutOverlay';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { StackMarquee } from './components/StackMarquee';
import { BentoGrid } from './components/BentoGrid';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Torch } from './components/Torch';
import { AboutPage } from './pages/AboutPage';
import { StackPage } from './pages/StackPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ActivityPage } from './pages/ActivityPage';
import { ContactPage } from './pages/ContactPage';
import { BlogsPage } from './pages/BlogsPage';

const VALID_PAGES = ['/about', '/stack', '/projects', '/activity', '/career', '/contact', '/blogs'];

export const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const p = window.location.pathname;
      return VALID_PAGES.includes(p) ? p : '/';
    }
    return '/';
  });

  useEffect(() => {
    const handlePopState = () => {
      const p = window.location.pathname;
      setCurrentPath(VALID_PAGES.includes(p) ? p : '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string, _targetSection?: string) => {
    if (typeof window !== 'undefined') {
      if (path !== window.location.pathname) {
        window.history.pushState({}, '', path);
      }
    }
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    switch (currentPath) {
      case '/about':
        return (
          <AboutPage 
            onBack={() => navigateTo('/')} 
            onNavigateToProjects={() => navigateTo('/projects')}
            onNavigateToContact={() => navigateTo('/contact')}
          />
        );
      case '/stack':
        return (
          <StackPage 
            onBack={() => navigateTo('/')} 
            onNavigateToProjects={() => navigateTo('/projects')} 
          />
        );
      case '/projects':
        return (
          <ProjectsPage 
            onBack={() => navigateTo('/')} 
            onNavigateToStack={() => navigateTo('/stack')}
            onNavigateToContact={() => navigateTo('/contact')}
          />
        );
      case '/activity':
      case '/career':
        return (
          <ActivityPage 
            onBack={() => navigateTo('/')} 
            onNavigateToProjects={() => navigateTo('/projects')}
            onNavigateToContact={() => navigateTo('/contact')}
          />
        );
      case '/contact':
        return (
          <ContactPage 
            onBack={() => navigateTo('/')} 
            onNavigateToProjects={() => navigateTo('/projects')} 
          />
        );
      case '/blogs':
        return (
          <BlogsPage 
            onBack={() => navigateTo('/')} 
            onNavigateToProjects={() => navigateTo('/projects')} 
            onNavigateToContact={() => navigateTo('/contact')} 
          />
        );
      default:
        return (
          <>
            {/* Tactical Flashlight Developer Patrolling & Leaping Across Sections */}
            <Torch size="sm" />
            <Hero />
            <About onOpenFullAbout={() => navigateTo('/about')} />
            <StackMarquee onOpenFullStack={() => navigateTo('/stack')} />
            <BentoGrid onOpenFullActivity={() => navigateTo('/activity')} />
            <Projects onOpenFullProjects={() => navigateTo('/projects')} />
            <Contact onOpenFullContact={() => navigateTo('/contact')} />
            <Footer />
          </>
        );
    }
  };

  return (
    <ThemeProvider>
      <TorchWhiteoutOverlay />
      <div className="relative min-h-screen bg-bg-main text-text-primary font-sans antialiased selection:bg-neutral-800 selection:text-white dark:selection:bg-neutral-200 dark:selection:text-black transition-colors duration-200">
        {/* Global Navigation: Desktop Floating Pill + Mobile Dock */}
        <Navbar currentPath={currentPath} onNavigate={navigateTo} />

        {/* Centered Editorial Container (Balanced max-w-3xl: 768px) */}
        <main id="portfolio-main" className="max-w-3xl mx-auto px-4 sm:px-6 pb-24 md:pb-12 flex flex-col space-y-10 relative z-10 w-full overflow-x-clip">
          <div key={currentPath} className="w-full flex flex-col space-y-10 animate-page-enter">
            {renderContent()}
          </div>
        </main>

      </div>
    </ThemeProvider>
  );
};

export default App;

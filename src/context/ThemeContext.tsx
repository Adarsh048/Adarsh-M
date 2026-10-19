import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  isTorchWhiteout: boolean;
  torchOrigin: { x: number; y: number } | null;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    try {
      const themeVersion = localStorage.getItem('theme_version');
      if (themeVersion !== 'v2') {
        localStorage.setItem('theme', 'dark');
        localStorage.setItem('theme_version', 'v2');
        return 'dark';
      }
      const saved = localStorage.getItem('theme');
      if (saved === 'light' || saved === 'dark') {
        return saved;
      }
      return 'dark';
    } catch {
      return 'dark';
    }
  });

  const [isTorchWhiteout, setIsTorchWhiteout] = useState<boolean>(false);
  const [torchOrigin, setTorchOrigin] = useState<{ x: number; y: number } | null>(null);
  const whiteoutTimersRef = useRef<number[]>([]);

  const applyTheme = (targetTheme: Theme) => {
    const root = document.documentElement;
    if (targetTheme === 'dark') {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
    }
    try {
      localStorage.setItem('theme', targetTheme);
      localStorage.setItem('theme_version', 'v2');
    } catch {}
  };

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    // Clear any active whiteout timers
    whiteoutTimersRef.current.forEach((id) => clearTimeout(id));
    whiteoutTimersRef.current = [];

    const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark';

    // Calculate origin: flashlight tip (if dark), or character, or active theme toggle button
    let origin = { x: window.innerWidth * 0.5, y: window.innerHeight * 0.4 };
    if (typeof document !== 'undefined') {
      if (theme === 'dark') {
        const emitter = document.getElementById('torch-emitter-tip');
        if (emitter) {
          const rect = emitter.getBoundingClientRect();
          if (rect.width > 0 || rect.height > 0) {
            origin = {
              x: rect.left + rect.width / 2,
              y: rect.top + rect.height / 2,
            };
          }
        }
      }

      // If not obtained from emitter, check the character container
      if (origin.x === window.innerWidth * 0.5 && origin.y === window.innerHeight * 0.4) {
        const char = document.getElementById('hero-animated-character');
        if (char) {
          const rect = char.getBoundingClientRect();
          if (rect.top >= -100 && rect.top <= window.innerHeight + 100) {
            const isFlipped = char.querySelector('[style*="scaleX(-1)"]') !== null;
            origin = {
              x: isFlipped ? rect.left + rect.width * 0.15 : rect.left + rect.width * 0.85,
              y: rect.top + rect.height * 0.52,
            };
          }
        }
      }

      // If character is not in view, check the active theme toggle button in the navbar
      if (origin.x === window.innerWidth * 0.5 && origin.y === window.innerHeight * 0.4) {
        const toggleBtn = document.querySelector('button[aria-label*="Switch to"]');
        if (toggleBtn) {
          const rect = toggleBtn.getBoundingClientRect();
          origin = {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
          };
        }
      }
    }

    // Clamp coordinates safely within the viewport
    origin.x = Math.max(16, Math.min(window.innerWidth - 16, origin.x));
    origin.y = Math.max(16, Math.min(window.innerHeight - 16, origin.y));

    const maxRadius = Math.hypot(
      Math.max(origin.x, window.innerWidth - origin.x),
      Math.max(origin.y, window.innerHeight - origin.y)
    );

    const root = document.documentElement;
    root.style.setProperty('--torch-x', `${origin.x}px`);
    root.style.setProperty('--torch-y', `${origin.y}px`);
    root.style.setProperty('--torch-max-radius', `${maxRadius}px`);

    const doc = document as any;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (typeof doc.startViewTransition === 'function' && !prefersReduced) {
      root.setAttribute('data-theme-transition', 'torch-flow');

      const transition = doc.startViewTransition(() => {
        applyTheme(nextTheme);
        setThemeState(nextTheme);
      });

      transition.ready.then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${origin.x}px ${origin.y}px)`,
              `circle(${maxRadius}px at ${origin.x}px ${origin.y}px)`,
            ],
          },
          {
            duration: 1100, // Standard professional pacing
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)', // Gold-standard ease-in-out curve
            pseudoElement: '::view-transition-new(root)',
          }
        );
      });

      transition.finished.finally(() => {
        root.removeAttribute('data-theme-transition');
      });
    } else {
      // Fallback for browsers without View Transitions or reduced motion
      setTorchOrigin(origin);
      setIsTorchWhiteout(true);

      const t1 = window.setTimeout(() => {
        applyTheme(nextTheme);
        setThemeState(nextTheme);
      }, 250);

      const t2 = window.setTimeout(() => {
        setIsTorchWhiteout(false);
        setTorchOrigin(null);
      }, 1100);

      whiteoutTimersRef.current.push(t1, t2);
    }
  }, [theme]);

  const setTheme = useCallback((newTheme: Theme) => {
    if (newTheme === theme) return;
    toggleTheme();
  }, [theme, toggleTheme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, isTorchWhiteout, torchOrigin }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

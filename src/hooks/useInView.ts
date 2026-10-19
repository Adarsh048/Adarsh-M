import { useEffect, useRef, useState } from 'react';

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  initialInView?: boolean;
}

export function useInView<T extends HTMLElement = HTMLDivElement>({
  threshold,
  rootMargin,
  triggerOnce = true,
  initialInView = false,
}: UseInViewOptions = {}) {
  const ref = useRef<T | null>(null);
  const [isInView, setIsInView] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    return initialInView;
  });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (typeof IntersectionObserver === 'undefined') {
      setIsInView(true);
      return;
    }

    // Check if the element is already within/above the visible viewport on initial load
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) {
      setIsInView(true);
      if (triggerOnce) return;
    }

    const isMobile = window.innerWidth <= 768;
    // On mobile view, trigger right as the content enters the bottom edge of the viewport
    const effectiveRootMargin = rootMargin ?? (isMobile ? '0px 0px -15px 0px' : '0px 0px -40px 0px');
    const effectiveThreshold = threshold ?? (isMobile ? 0.04 : 0.08);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      },
      { threshold: effectiveThreshold, rootMargin: effectiveRootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isInView };
}


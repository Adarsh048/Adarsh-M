import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useTheme } from '../context/ThemeContext';

type TorchMode = 'flashing' | 'steady' | 'off';

export type TorchSize = 'sm' | 'md' | 'lg';

interface TorchProps {
  size?: TorchSize;
  className?: string;
}

const SIZES: Record<TorchSize, { widthClass: string; shadowClass: string }> = {
  sm: {
    widthClass: 'w-[35px] h-[58px]',
    shadowClass: 'drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)]',
  },
  md: {
    widthClass: 'w-[47px] h-[78px]',
    shadowClass: 'drop-shadow-[0_6px_14px_rgba(0,0,0,0.65)]',
  },
  lg: {
    widthClass: 'w-[60px] h-[100px]',
    shadowClass: 'drop-shadow-[0_8px_18px_rgba(0,0,0,0.7)]',
  },
};

export type HeroAnimationState = 'entering' | 'waving' | 'climbing' | 'walking';

type MotionState =
  | 'intro_look'
  | 'intro_wave'
  | 'intro_hold'
  | 'intro_hoist'
  | 'walk_right'
  | 'stop_right'
  | 'wave_right'
  | 'turn_left_1'
  | 'turn_left_2'
  | 'look_left'
  | 'walk_left'
  | 'stop_left'
  | 'turn_right_1'
  | 'turn_right_2'
  | 'look_right'
  | 'jump'
  | 'spiderman';

interface StateVisual {
  img: string;
  flip: number;
  isWalking: boolean;
}

const DARK_STATE_CONFIG: Record<MotionState, StateVisual> = {
  intro_look: { img: '/walk/peek_look.png?v=5', flip: 1, isWalking: false },
  intro_wave: { img: '/walk/peek_wave_cycle.webp?v=5', flip: 1, isWalking: false },
  intro_hold: { img: '/walk/climb_hold.png?v=5', flip: -1, isWalking: false },
  intro_hoist: { img: '/walk/hoist_climb.png?v=5', flip: 1, isWalking: false },
  walk_right: { img: '/walk/walk_cycle.webp?v=6', flip: 1, isWalking: true },
  stop_right: { img: '/walk/stand_right.png?v=6', flip: 1, isWalking: false },
  wave_right: { img: '/walk/wave_cycle.webp?v=1', flip: 1, isWalking: false },
  turn_left_1: { img: '/walk/turn_front.png?v=2', flip: 1, isWalking: false },
  turn_left_2: { img: '/walk/stand_right.png?v=6', flip: -1, isWalking: false },
  look_left: { img: '/walk/stand_right.png?v=6', flip: -1, isWalking: false },
  walk_left: { img: '/walk/walk_cycle.webp?v=6', flip: -1, isWalking: true },
  stop_left: { img: '/walk/stand_right.png?v=6', flip: -1, isWalking: false },
  turn_right_1: { img: '/walk/turn_front.png?v=2', flip: 1, isWalking: false },
  turn_right_2: { img: '/walk/stand_right.png?v=6', flip: 1, isWalking: false },
  look_right: { img: '/walk/stand_right.png?v=6', flip: 1, isWalking: false },
  jump: { img: '/walk/jump_pose.png?v=2', flip: 1, isWalking: false },
  spiderman: { img: '/walk/spiderman_pose.png?v=2', flip: 1, isWalking: false },
};

const LIGHT_STATE_CONFIG: Record<MotionState, StateVisual> = {
  intro_look: { img: '/walk/peek_look.png?v=5', flip: 1, isWalking: false },
  intro_wave: { img: '/walk/peek_wave_cycle.webp?v=5', flip: 1, isWalking: false },
  intro_hold: { img: '/walk/climb_hold.png?v=5', flip: -1, isWalking: false },
  intro_hoist: { img: '/walk/hoist_climb.png?v=5', flip: 1, isWalking: false },
  walk_right: { img: '/walk/light_walk_cycle.webp?v=1', flip: 1, isWalking: true },
  stop_right: { img: '/walk/light_stand_right.png?v=1', flip: 1, isWalking: false },
  wave_right: { img: '/walk/wave_cycle.webp?v=1', flip: 1, isWalking: false },
  turn_left_1: { img: '/walk/turn_front.png?v=2', flip: 1, isWalking: false },
  turn_left_2: { img: '/walk/light_stand_right.png?v=1', flip: -1, isWalking: false },
  look_left: { img: '/walk/light_stand_right.png?v=1', flip: -1, isWalking: false },
  walk_left: { img: '/walk/light_walk_cycle.webp?v=1', flip: -1, isWalking: true },
  stop_left: { img: '/walk/light_stand_right.png?v=1', flip: -1, isWalking: false },
  turn_right_1: { img: '/walk/turn_front.png?v=2', flip: 1, isWalking: false },
  turn_right_2: { img: '/walk/light_stand_right.png?v=1', flip: 1, isWalking: false },
  look_right: { img: '/walk/light_stand_right.png?v=1', flip: 1, isWalking: false },
  jump: { img: '/walk/jump_pose.png?v=2', flip: 1, isWalking: false },
  spiderman: { img: '/walk/spiderman_pose.png?v=2', flip: 1, isWalking: false },
};

const getStateConfig = (state: MotionState, isDark: boolean): StateVisual => {
  return isDark ? DARK_STATE_CONFIG[state] : LIGHT_STATE_CONFIG[state];
};

const TYPING_NOTES = [
  "📝 note: fast api route",
  "💻 compiling react v19",
  "⚡ optimizing latency",
  "✨ git commit -m 'feat'",
  "🧠 training rag pipeline",
  "🚀 deploying to edge",
  "✦ clean code & types",
];

const WALK_SPEED = 96; // Brisk, responsive walking speed synced with 4-frame stride
const PAUSE_AT_EDGE = 0.22; // Snappy pause at edge
const TURN_STAGE = 0.12; // Snappy 3/4 turn body steps
const LOOK_BEFORE_WALK = 0.18; // Decisive glance forward before stepping

interface PlatformRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

type PlatformId = 'hero' | 'about' | 'stack' | 'career' | 'projects' | 'contact' | 'footer';

const PLATFORM_ORDER: PlatformId[] = ['hero', 'about', 'stack', 'career', 'projects', 'contact', 'footer'];

const PLATFORM_DOM_IDS: Record<PlatformId, string> = {
  hero: 'hero-badge-platform',
  about: 'about-ledge-platform',
  stack: 'stack-ledge-platform',
  career: 'activity-ledge-platform',
  projects: 'projects-badge-platform',
  contact: 'contact-badge-platform',
  footer: 'footer-ground-platform',
};

const SECTION_DIALOGUES: Record<PlatformId, string> = {
  hero: "Zero bugs, perfect landing",
  about: "Profile decrypted, ready to roll",
  stack: "Tech stack loaded, 100% test coverage",
  career: "Activity synced, commits verified",
  projects: "Production deployed, zero downtime",
  contact: "Signal connected, ping me anytime",
  footer: "Thank you, stay connected ✨",
};

const FULL_DIALOGUE = "Zero bugs, perfect landing";

export const Torch: React.FC<TorchProps> = ({ size = 'sm', className = '' }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const isDarkRef = useRef(isDark);

  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const currentSize = SIZES[size] || SIZES.sm;
  const [mode, setMode] = useState<TorchMode>('flashing');
  const [visual, setVisual] = useState<StateVisual>(() =>
    getStateConfig(prefersReducedMotion ? 'stop_right' : 'walk_right', isDark)
  );

  const isMobileRef = useRef<boolean>(typeof window !== 'undefined' && window.innerWidth < 640);

  // Light Mode Only: Typing Note index & timer
  const [typingNoteIndex, setTypingNoteIndex] = useState<number>(0);

  useEffect(() => {
    if (isDark) return;
    const interval = setInterval(() => {
      setTypingNoteIndex((prev) => (prev + 1) % TYPING_NOTES.length);
    }, 2400);
    return () => clearInterval(interval);
  }, [isDark]);

  useEffect(() => {
    isDarkRef.current = isDark;
    setVisual(getStateConfig(stateRef.current, isDark));
  }, [isDark]);

  const getVisual = useCallback((state: MotionState) => {
    return getStateConfig(state, isDarkRef.current);
  }, []);

  const [isReady, setIsReady] = useState<boolean>(false);
  const [isLandingBurst, setIsLandingBurst] = useState<boolean>(false);
  const [isShivering, setIsShivering] = useState<boolean>(false);
  const [isBooming, setIsBooming] = useState<boolean>(false);
  
  // Explicit hero animation states: 'entering' | 'climbing' | 'walking'
  const [heroAnimationState, setHeroAnimationState] = useState<HeroAnimationState>(prefersReducedMotion ? 'walking' : 'entering');
  const heroAnimStateRef = useRef<HeroAnimationState>(prefersReducedMotion ? 'walking' : 'entering');
  
  // Dialogue Box States
  const [isDialogueOpen, setIsDialogueOpen] = useState<boolean>(false);
  const [isDialogueClosing, setIsDialogueClosing] = useState<boolean>(false);
  const [displayedDialogue, setDisplayedDialogue] = useState<string>('');
  const [targetDialogue, setTargetDialogue] = useState<string>(FULL_DIALOGUE);
  const typewriterTimerRef = useRef<number | null>(null);
  const dialogueCloseTimerRef = useRef<number | null>(null);
  const dialogueTextRef = useRef<HTMLSpanElement | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const characterRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  
  // Spider-Man Web Net & Grappling Line State & Refs
  const [isWebActive, setIsWebActive] = useState<boolean>(false);
  const webLineRef = useRef<SVGLineElement | null>(null);
  const webSecondLineRef = useRef<SVGLineElement | null>(null);
  const webNetGroupRef = useRef<SVGGElement | null>(null);
  
  // Platform & Multi-Section Jump State
  const [currentPlatform, setCurrentPlatform] = useState<PlatformId>('hero');
  const currentPlatformRef = useRef<PlatformId>('hero');
  const isJumpingRef = useRef<boolean>(false);
  const jumpStartTimeRef = useRef<number>(0);
  const jumpDurationRef = useRef<number>(0.55);
  const jumpStartPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const jumpTargetPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const jumpDirectionRef = useRef<PlatformId>('about');

  // Intro Sequence State
  type IntroPhase = 'come' | 'reach' | 'hold' | 'hoist' | 'stand' | 'done';
  const introPhaseRef = useRef<IntroPhase>(prefersReducedMotion ? 'done' : 'come');
  const introPhaseStartTimeRef = useRef<number>(0);
  const introStartPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const introTargetPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const isIntroRef = useRef<boolean>(!prefersReducedMotion);
  const greetingAnchorRef = useRef<{ leftX: number; rightX: number; topY: number; bottomY: number } | null>(null);
  const badgeRolesRef = useRef<PlatformRect | null>(null);

  // Coordinates inside #portfolio-main container
  const currentPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const patrolPosRef = useRef<number>(10);
  const stateRef = useRef<MotionState>(prefersReducedMotion ? 'stop_right' : 'walk_right');
  const timerRef = useRef<number>(0);
  const lastTimeRef = useRef<number | null>(null);
  const isHoveredRef = useRef<boolean>(false);
  const platformsRef = useRef<Record<PlatformId, PlatformRect> | null>(null);

  const isLit = mode !== 'off';

  // Measure all section platforms relative to #portfolio-main container
  const updatePlatforms = useCallback(() => {
    const mainElem = document.getElementById('portfolio-main');
    if (!mainElem) return;

    isMobileRef.current = window.innerWidth < 640;
    const mainRect = mainElem.getBoundingClientRect();
    const updated: Partial<Record<PlatformId, PlatformRect>> = {};

    for (const pid of PLATFORM_ORDER) {
      const domId = PLATFORM_DOM_IDS[pid];
      const el = document.getElementById(domId);
      if (el) {
        const rect = el.getBoundingClientRect();
        // Use offsetWidth and offsetHeight to prevent transforms (like scaleX(0)) from breaking platform width
        const width = el.offsetWidth || rect.width;
        const height = el.offsetHeight || rect.height;
        updated[pid] = {
          x: rect.left - mainRect.left,
          y: rect.top - mainRect.top,
          width,
          height,
        };
      }
    }

    if (Object.keys(updated).length > 0) {
      platformsRef.current = updated as Record<PlatformId, PlatformRect>;
    }

    const rolesEl = document.getElementById('hero-badge-roles');
    if (rolesEl) {
      const rect = rolesEl.getBoundingClientRect();
      badgeRolesRef.current = {
        x: rect.left - mainRect.left,
        y: rect.top - mainRect.top,
        width: rolesEl.offsetWidth || rect.width,
        height: rolesEl.offsetHeight || rect.height,
      };
    }

    const greetingEl = document.getElementById('hero-greeting-anchor');
    if (greetingEl) {
      const greetRect = greetingEl.getBoundingClientRect();
      greetingAnchorRef.current = {
        leftX: greetRect.left - mainRect.left,
        rightX: greetRect.right - mainRect.left,
        topY: greetRect.top - mainRect.top,
        bottomY: greetRect.bottom - mainRect.top,
      };
    }
  }, []);

  // Trigger typewriter dialogue box on touchdown
  const triggerDialogueBox = useCallback((text: string = FULL_DIALOGUE) => {
    if (typewriterTimerRef.current) clearInterval(typewriterTimerRef.current);
    if (dialogueCloseTimerRef.current) clearTimeout(dialogueCloseTimerRef.current);

    setIsDialogueOpen(true);
    setIsDialogueClosing(false);
    setDisplayedDialogue('');
    setTargetDialogue(text);

    let charIdx = 0;
    typewriterTimerRef.current = window.setInterval(() => {
      charIdx += 1;
      const str = text.slice(0, charIdx);
      setDisplayedDialogue(str);
      if (dialogueTextRef.current) {
        dialogueTextRef.current.textContent = str;
      }
      if (charIdx >= text.length) {
        if (typewriterTimerRef.current) {
          clearInterval(typewriterTimerRef.current);
          typewriterTimerRef.current = null;
        }
      }
    }, 18);

    dialogueCloseTimerRef.current = window.setTimeout(() => {
      setIsDialogueClosing(true);
      setTimeout(() => {
        setIsDialogueOpen(false);
        setIsDialogueClosing(false);
      }, 160);
    }, 1900);
  }, []);

  // Launch jump leap between any section platforms
  const initiateJump = useCallback((toPlatform: PlatformId) => {
    updatePlatforms();
    if (!platformsRef.current) return;

    const targetData = platformsRef.current[toPlatform];
    if (!targetData) return;

    const isMobile = isMobileRef.current;

    // Platform-specific landing x-offsets
    const targetX = toPlatform === 'about' || toPlatform === 'stack' || toPlatform === 'career'
      ? targetData.x + Math.min(28, targetData.width * 0.15)
      : toPlatform === 'footer'
      ? targetData.x + (isMobile ? 12 : 20)
      : targetData.x + Math.min(isMobile ? 12 : 16, targetData.width * 0.25);
    const targetY = targetData.y - 56;

    const startX = currentPosRef.current.x;
    const startY = currentPosRef.current.y;

    jumpStartPosRef.current = { x: startX, y: startY };
    jumpTargetPosRef.current = { x: targetX, y: targetY };
    jumpStartTimeRef.current = performance.now();
    jumpDirectionRef.current = toPlatform;

    // Close active dialogues when jumping
    setIsDialogueOpen(false);
    setIsDialogueClosing(false);
    if (typewriterTimerRef.current) clearInterval(typewriterTimerRef.current);
    if (dialogueCloseTimerRef.current) clearTimeout(dialogueCloseTimerRef.current);

    // Responsive jump duration (snappier on mobile)
    const jumpDist = Math.hypot(targetX - startX, targetY - startY);
    const baseDuration = isMobile
      ? Math.min(0.50, Math.max(0.38, jumpDist * 0.00042))
      : Math.min(0.65, Math.max(0.50, jumpDist * 0.00060));
    jumpDurationRef.current = baseDuration;

    isJumpingRef.current = true;
    if (toPlatform !== 'footer') {
      setCurrentPlatform(toPlatform);
    }

    const currentIndex = PLATFORM_ORDER.indexOf(currentPlatformRef.current);
    const targetIndex = PLATFORM_ORDER.indexOf(toPlatform);
    const isUpward = targetIndex < currentIndex || targetY < startY - 20;

    const flip = targetX >= startX ? 1 : -1;

    if (isUpward) {
      // Spider-Man web-slinging leap up!
      setVisual({ img: getStateConfig('spiderman', isDarkRef.current).img, flip, isWalking: false });
      setIsWebActive(true);
    } else {
      // Athletic tuck jump down
      setVisual({ img: getStateConfig('jump', isDarkRef.current).img, flip, isWalking: false });
      setIsWebActive(false);
    }
  }, [updatePlatforms]);

  // Track scroll direction & smooth hysteresis targeting
  const lastScrollYRef = useRef<number>(0);
  const handleScrollRef = useRef<() => void>(() => {});
  const scrollTickingRef = useRef<boolean>(false);

  // Smooth scroll listener: zero forced reflows, uses cached platform coordinates
  const handleScroll = useCallback(() => {
    if (scrollTickingRef.current) return;
    scrollTickingRef.current = true;

    requestAnimationFrame(() => {
      scrollTickingRef.current = false;

      const currentScrollY = window.scrollY;
      lastScrollYRef.current = currentScrollY;

      // 1. Extreme top: stay on Hero
      if (currentScrollY <= 40) {
        if (!isJumpingRef.current && currentPlatformRef.current !== 'hero') {
          initiateJump('hero');
        }
        return;
      }

      // 2. Extreme bottom: jump down and land on the footer ground line!
      if (window.innerHeight + currentScrollY >= (document.documentElement.scrollHeight - 70)) {
        if (!isJumpingRef.current && currentPlatformRef.current !== 'footer') {
          initiateJump('footer');
        }
        return;
      }

      const mainElem = document.getElementById('portfolio-main');
      if (!mainElem) return;
      const mainTop = mainElem.getBoundingClientRect().top;
      const platforms = platformsRef.current;
      if (!platforms) return;

      const viewportH = window.innerHeight;
      const focalZone = viewportH * 0.45;

      // Hysteresis: If current platform is still comfortably in view, STAY on it!
      const curPlat = platforms[currentPlatformRef.current];
      if (curPlat) {
        const curScreenY = mainTop + curPlat.y;
        if (curScreenY >= 50 && curScreenY <= viewportH * 0.72) {
          return;
        }
      }

      // Find the most prominent in-view platform
      let bestTarget: PlatformId = currentPlatformRef.current;
      let minDistance = Infinity;

      for (const pid of PLATFORM_ORDER) {
        const p = platforms[pid];
        if (!p) continue;
        const screenY = mainTop + p.y;
        if (screenY >= -50 && screenY <= viewportH * 0.85) {
          const dist = Math.abs(screenY - focalZone);
          if (dist < minDistance) {
            minDistance = dist;
            bestTarget = pid;
          }
        }
      }

      if (!isJumpingRef.current && currentPlatformRef.current !== bestTarget) {
        // Release intro lock on scroll
        if (isIntroRef.current && introPhaseRef.current !== 'done') {
          introPhaseRef.current = 'done';
          isIntroRef.current = false;
          setHeroAnimationState('walking');
          heroAnimStateRef.current = 'walking';
        }
        initiateJump(bestTarget);
      }
    });
  }, [initiateJump]);

  useEffect(() => {
    handleScrollRef.current = handleScroll;
  }, [handleScroll]);

  // Preload essential sprite assets
  useEffect(() => {
    const preloadList = [
      '/walk/peek_look.png?v=5',
      '/walk/peek_wave_cycle.webp?v=5',
      '/walk/wave_cycle.webp?v=1',
      '/walk/climb_hold.png?v=5',
      '/walk/hoist_climb.png?v=5',
      '/walk/jump_pose.png?v=2',
      '/walk/walk_cycle.webp?v=6',
      '/walk/stand_right.png?v=6',
      '/walk/light_walk_cycle.webp?v=1',
      '/walk/light_stand_right.png?v=1',
      '/walk/turn_front.png?v=2',
    ];
    preloadList.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Scroll & resize listeners
  useEffect(() => {
    let resizeTimer: number;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(updatePlatforms, 120);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', onResize);

    updatePlatforms();
    const t1 = setTimeout(updatePlatforms, 250);
    const t2 = setTimeout(updatePlatforms, 800);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', onResize);
      clearTimeout(resizeTimer);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [handleScroll, updatePlatforms]);

  // Main RAF animation loop: walking, edge turning, mid-air parabolic jumping, shudder & boom
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (containerRef.current) {
        containerRef.current.style.transform = 'translate3d(0px, 0px, 0px)';
      }
      if (characterRef.current) {
        characterRef.current.style.transform = 'scaleX(1)';
      }
      setVisual(getVisual('stop_right'));
      setIsReady(true);
      return;
    }

    let animId: number;

    const tick = (now: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = now;
      }
      const delta = Math.min((now - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = now;

      if (!platformsRef.current) {
        updatePlatforms();
      }

      const platforms = platformsRef.current;

      if (platforms) {
        const isMobile = isMobileRef.current;

        // ========== 0. HERO ANIMATION: ENTER FROM LEFT -> CLIMB UPWARD -> WALK ON BADGE ==========
        if (isIntroRef.current) {
          if (!badgeRolesRef.current) {
            updatePlatforms();
          }

          const heroPlat = platforms['hero'];
          const rolesPlat = badgeRolesRef.current;

          // Left corner coordinates of "Available for Engineering Roles" badge
          const cornerX = rolesPlat
            ? rolesPlat.x
            : (heroPlat ? heroPlat.x : (isMobile ? 16 : 24));
          const cornerY = rolesPlat ? rolesPlat.y : (heroPlat ? heroPlat.y : 60);

          // Safe coordinates strictly inside the visible container on mobile
          const holdPos = {
            x: isMobile ? Math.max(4, cornerX - 16) : cornerX - 30,
            y: cornerY - 2,
          };

          const hoistPos = {
            x: isMobile ? Math.max(2, cornerX - 12) : cornerX - 36,
            y: cornerY - 51,
          };

          const standPos = {
            x: isMobile ? cornerX + 4 : cornerX - 2,
            y: cornerY - 56,
          };

          // State 1: COME FROM THE LEFT
          if (introPhaseRef.current === 'come') {
            if (introPhaseStartTimeRef.current === 0) {
              introPhaseStartTimeRef.current = now;
              stateRef.current = 'walk_right';
              setVisual(getVisual('walk_right'));
              setHeroAnimationState('entering');
              heroAnimStateRef.current = 'entering';
            }

            // On mobile, start within the visible screen edge (never negative!)
            const startX = isMobile ? Math.max(0, cornerX - 32) : cornerX - 160;
            const targetX = holdPos.x;
            const travelDistance = Math.max(20, targetX - startX);
            const duration = Math.min(1.2, Math.max(0.65, travelDistance / WALK_SPEED));

            const elapsed = (now - introPhaseStartTimeRef.current) / 1000;
            const t = Math.min(1, elapsed / duration);
            
            const ease = t < 0.8
              ? (t / 0.8) * 0.82
              : 0.82 + 0.18 * (1 - Math.pow(1 - (t - 0.8) / 0.2, 2));

            const currentX = startX + (targetX - startX) * ease;
            const currentY = cornerY + 32;

            currentPosRef.current = { x: currentX, y: currentY };
            if (containerRef.current) {
              containerRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0px)`;
            }
            if (characterRef.current) {
              characterRef.current.style.transform = 'scaleX(1)';
            }
            if (!isReady) setIsReady(true);

            if (t >= 1) {
              introPhaseRef.current = 'reach';
              introPhaseStartTimeRef.current = now;
              introStartPosRef.current = { x: targetX, y: currentY };
              introTargetPosRef.current = { ...holdPos };
              stateRef.current = 'intro_hold';
              setVisual(getVisual('intro_hold'));
              setHeroAnimationState('climbing');
              heroAnimStateRef.current = 'climbing';
            }
          }
          // State 2: REACH ARMS TO CORNER
          else if (introPhaseRef.current === 'reach') {
            const elapsed = (now - introPhaseStartTimeRef.current) / 1000;
            const duration = 0.32;
            const t = Math.min(1, elapsed / duration);
            const easeT = t * t;

            const pStart = introStartPosRef.current;
            const pTarget = introTargetPosRef.current;
            const currentX = pStart.x + (pTarget.x - pStart.x) * easeT;
            const currentY = pStart.y + (pTarget.y - pStart.y) * easeT;
            const tilt = -Math.sin(t * Math.PI) * 10;

            currentPosRef.current = { x: currentX, y: currentY };
            if (containerRef.current) {
              containerRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0px)`;
            }
            if (characterRef.current) {
              characterRef.current.style.transform = `scaleX(-1) rotate(${tilt}deg)`;
            }

            if (t >= 1) {
              introPhaseRef.current = 'hold';
              introPhaseStartTimeRef.current = now;
            }
          }
          // State 2b: HANG & GRIP CORNER
          else if (introPhaseRef.current === 'hold') {
            const elapsed = (now - introPhaseStartTimeRef.current) / 1000;
            const bobY = Math.sin(elapsed * 10) * 1.5;
            const currentX = holdPos.x;
            const currentY = holdPos.y + bobY;

            currentPosRef.current = { x: currentX, y: currentY };
            if (containerRef.current) {
              containerRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0px)`;
            }
            if (characterRef.current) {
              characterRef.current.style.transform = 'scaleX(-1) rotate(-6deg)';
            }

            if (elapsed >= 0.22) {
              introPhaseRef.current = 'hoist';
              introPhaseStartTimeRef.current = now;
              introStartPosRef.current = { x: currentX, y: currentY };
              introTargetPosRef.current = { ...hoistPos };
              stateRef.current = 'intro_hoist';
              setVisual(getVisual('intro_hoist'));
            }
          }
          // State 2c: HOIST BODY UP
          else if (introPhaseRef.current === 'hoist') {
            const duration = 0.40;
            const elapsed = (now - introPhaseStartTimeRef.current) / 1000;
            const t = Math.min(1, elapsed / duration);

            const pStart = introStartPosRef.current;
            const pTarget = introTargetPosRef.current;

            const easeT = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
            const currentX = pStart.x + (pTarget.x - pStart.x) * easeT;
            const currentY = pStart.y + (pTarget.y - pStart.y) * easeT;
            const tilt = Math.sin(t * Math.PI) * 6;

            currentPosRef.current = { x: currentX, y: currentY };
            if (containerRef.current) {
              containerRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0px)`;
            }
            if (characterRef.current) {
              characterRef.current.style.transform = `scaleX(1) rotate(${tilt}deg)`;
            }

            if (t >= 1) {
              introPhaseRef.current = 'stand';
              introPhaseStartTimeRef.current = now;
              introStartPosRef.current = { x: currentX, y: currentY };
              introTargetPosRef.current = { ...standPos };
              stateRef.current = 'stop_right';
              setVisual(getVisual('stop_right'));
            }
          }
          // State 2d: STAND UPRIGHT
          else if (introPhaseRef.current === 'stand') {
            const duration = 0.18;
            const elapsed = (now - introPhaseStartTimeRef.current) / 1000;
            const t = Math.min(1, elapsed / duration);

            const pStart = introStartPosRef.current;
            const pTarget = introTargetPosRef.current;
            const easeT = t * t;
            const currentX = pStart.x + (pTarget.x - pStart.x) * easeT;
            const currentY = pStart.y + (pTarget.y - pStart.y) * easeT;

            currentPosRef.current = { x: currentX, y: currentY };
            if (containerRef.current) {
              containerRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0px)`;
            }
            if (characterRef.current) {
              characterRef.current.style.transform = 'scaleX(1)';
            }

            if (t >= 1) {
              introPhaseRef.current = 'done';
              isIntroRef.current = false;
              currentPlatformRef.current = 'hero';
              setCurrentPlatform('hero');
              setHeroAnimationState('walking');
              heroAnimStateRef.current = 'walking';

              patrolPosRef.current = isMobile ? 4 : 6;
              stateRef.current = 'walk_right';
              setVisual(getVisual('walk_right'));

              setIsShivering(true);
              setTimeout(() => setIsShivering(false), 240);
            }
          }
        }
        // ========== 1. MID-AIR JUMP TRAJECTORY ==========
        else if (isJumpingRef.current) {
          const duration = jumpDurationRef.current || 0.55;
          const elapsed = (now - jumpStartTimeRef.current) / 1000;
          const t = Math.min(1, elapsed / duration);

          const pStart = jumpStartPosRef.current;
          const pTarget = jumpTargetPosRef.current;
          const currentIndex = PLATFORM_ORDER.indexOf(currentPlatformRef.current);
          const targetIndex = PLATFORM_ORDER.indexOf(jumpDirectionRef.current);
          const isUpward = targetIndex < currentIndex || pTarget.y < pStart.y - 20;

          let currentX: number;
          let currentY: number;
          let tilt = 0;
          const flip = pTarget.x >= pStart.x ? 1 : -1;

          if (isUpward) {
            // SPIDER-MAN WEB SLINGSHOT ZIP TRAJECTORY
            const easeT = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
            
            // Scaled swing arc (capped on mobile to prevent clipping)
            const maxSwing = isMobile ? 10 : 18;
            const swingArc = Math.sin(t * Math.PI) * maxSwing;
            currentX = pStart.x + (pTarget.x - pStart.x) * easeT + (flip * swingArc);
            currentY = pStart.y + (pTarget.y - pStart.y) * easeT;

            // Character tilts towards web anchor direction in mid-air
            const dx = pTarget.x - currentX;
            const dy = pTarget.y - currentY;
            const webAngle = Math.atan2(dy, Math.abs(dx)) * (180 / Math.PI);
            tilt = (flip * -1) * Math.sin(t * Math.PI) * Math.min(24, Math.max(6, (90 - webAngle) * 0.35));

            // Dynamic anchor position on the destination platform
            const targetPlat = platforms[jumpDirectionRef.current];
            const anchorX = targetPlat ? targetPlat.x + Math.min(32, targetPlat.width * 0.5) : pTarget.x + 20;
            const anchorY = targetPlat ? targetPlat.y + 4 : pTarget.y + 56;

            // Character shooting hand position
            const handX = currentX + (flip === 1 ? 42 : 6);
            const handY = currentY + 10;

            // Update web line & spider net directly in DOM
            if (webLineRef.current) {
              webLineRef.current.setAttribute('x1', String(anchorX));
              webLineRef.current.setAttribute('y1', String(anchorY));
              webLineRef.current.setAttribute('x2', String(handX));
              webLineRef.current.setAttribute('y2', String(handY));
              const webOpacity = t < 0.08 ? t / 0.08 : t > 0.9 ? (1 - t) / 0.1 : 1;
              webLineRef.current.setAttribute('opacity', String(webOpacity));
            }
            if (webSecondLineRef.current) {
              webSecondLineRef.current.setAttribute('x1', String(anchorX));
              webSecondLineRef.current.setAttribute('y1', String(anchorY));
              webSecondLineRef.current.setAttribute('x2', String(handX));
              webSecondLineRef.current.setAttribute('y2', String(handY));
              const webOpacity = t < 0.08 ? (t / 0.08) * 0.75 : t > 0.9 ? ((1 - t) / 0.1) * 0.75 : 0.75;
              webSecondLineRef.current.setAttribute('opacity', String(webOpacity));
            }
            if (webNetGroupRef.current) {
              webNetGroupRef.current.setAttribute('transform', `translate(${anchorX}, ${anchorY})`);
              const netOpacity = t < 0.08 ? t / 0.08 : t > 0.9 ? (1 - t) / 0.1 : 1;
              webNetGroupRef.current.setAttribute('opacity', String(netOpacity));
            }
          } else {
            // ATHLETIC VAULT LEAP DOWN WITH CUBIC EASING
            const easeT = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
            currentX = pStart.x + (pTarget.x - pStart.x) * easeT;
            const linearY = pStart.y + (pTarget.y - pStart.y) * easeT;
            const distY = Math.abs(pTarget.y - pStart.y);
            // Cap parabolic arc height on mobile so person never leaps off the screen top
            const maxArc = isMobile ? 42 : 110;
            const arcHeight = Math.min(maxArc, Math.max(24, distY * 0.18));
            const arcY = -Math.sin(t * Math.PI) * arcHeight;
            currentY = linearY + arcY;
            tilt = Math.sin(t * Math.PI) * (flip * 12);
          }

          // Clamp within container bounds
          const mainElem = document.getElementById('portfolio-main');
          const maxW = mainElem ? mainElem.clientWidth : 640;
          currentX = Math.max(4, Math.min(maxW - 40, currentX));

          currentPosRef.current = { x: currentX, y: currentY };

          if (containerRef.current) {
            containerRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0px)`;
          }
          if (characterRef.current) {
            characterRef.current.style.transform = `scaleX(${flip}) rotate(${tilt}deg)`;
          }

          if (t >= 1) {
            isJumpingRef.current = false;
            setIsWebActive(false);
            currentPlatformRef.current = jumpDirectionRef.current;
            setCurrentPlatform(jumpDirectionRef.current);
            const landingPlat = platforms[jumpDirectionRef.current];
            const landingOffset = landingPlat
              ? (jumpDirectionRef.current === 'about' || jumpDirectionRef.current === 'stack' || jumpDirectionRef.current === 'career'
                  ? Math.min(28, landingPlat.width * 0.15)
                  : jumpDirectionRef.current === 'footer'
                  ? (isMobile ? 12 : 20)
                  : Math.min(isMobile ? 12 : 16, landingPlat.width * 0.25))
              : 16;
            patrolPosRef.current = landingOffset;
            const nextLandingState = 'walk_right';
            stateRef.current = nextLandingState;
            setVisual(getVisual(nextLandingState));

            // ONLY shake screen on desktop! Never shake mobile main container to avoid scroll stutter & reflow
            if (!isMobile) {
              const mainShakeElem = document.getElementById('portfolio-main');
              if (mainShakeElem) {
                mainShakeElem.classList.remove('animate-earthquake');
                requestAnimationFrame(() => {
                  mainShakeElem.classList.add('animate-earthquake');
                  setTimeout(() => {
                    mainShakeElem.classList.remove('animate-earthquake');
                  }, 400);
                });
              }
            }

            // Character impact shudder
            setIsShivering(true);
            setTimeout(() => setIsShivering(false), 280);

            // Seismic ground rupture & dust puffs
            setIsBooming(true);
            setTimeout(() => setIsBooming(false), 380);

            // Flash flare
            setIsLandingBurst(true);
            setTimeout(() => setIsLandingBurst(false), 280);

            // Dialogue box popup (For footer, we trigger dialogue after reaching center)
            if (jumpDirectionRef.current !== 'footer') {
              triggerDialogueBox(SECTION_DIALOGUES[jumpDirectionRef.current] || FULL_DIALOGUE);
            }

            setTimeout(() => {
              if (handleScrollRef.current) handleScrollRef.current();
            }, 300);
          }
        }
        // ========== 2. PLATFORM WALKING PATROL ==========
        else {
          // If at footer base: walk till the centre and then wave hand & dialogue "Thank you, stay connected"
          if (currentPlatformRef.current === 'footer') {
            const footerPlat = platforms.footer;
            const mainElem = document.getElementById('portfolio-main');
            const mainWidth = mainElem ? mainElem.clientWidth : 640;
            const platW = footerPlat ? footerPlat.width : mainWidth;
            const charW = isMobile ? 35 : 47;
            const centerX = Math.max(20, Math.round((platW - charW) / 2));

            if (patrolPosRef.current < centerX) {
              if (stateRef.current !== 'walk_right') {
                stateRef.current = 'walk_right';
                setVisual(getVisual('walk_right'));
              }
              patrolPosRef.current += WALK_SPEED * delta;
              if (patrolPosRef.current >= centerX) {
                patrolPosRef.current = centerX;
                stateRef.current = 'wave_right';
                setVisual(getVisual('wave_right'));
                triggerDialogueBox("Thank you, stay connected ✨");
              }
            } else {
              patrolPosRef.current = centerX;
              if (stateRef.current !== 'wave_right') {
                stateRef.current = 'wave_right';
                setVisual(getVisual('wave_right'));
              }
            }

            const currentX = footerPlat ? footerPlat.x + patrolPosRef.current : patrolPosRef.current;
            const currentY = footerPlat ? footerPlat.y - 56 : currentPosRef.current.y;
            currentPosRef.current = { x: currentX, y: currentY };
            if (containerRef.current) {
              containerRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0px)`;
            }
            if (characterRef.current) {
              characterRef.current.style.transform = 'scaleX(1)';
            }
            animId = requestAnimationFrame(tick);
            return;
          }

          const currentPlat = platforms[currentPlatformRef.current];
          if (currentPlat) {
            const mainElem = document.getElementById('portfolio-main');
            const mainWidth = mainElem ? mainElem.clientWidth : 640;

            const minBound = 4;
            const platformMax = Math.max(minBound + 12, currentPlat.width - 36);
            // Constrain patrol bound within mobile screen width
            const screenSafeMax = Math.max(minBound + 12, mainWidth - currentPlat.x - 42);
            const maxBound = Math.min(platformMax, screenSafeMax);

            if (!isHoveredRef.current) {
              const currentState = stateRef.current;

              switch (currentState) {
                case 'walk_right': {
                  patrolPosRef.current += WALK_SPEED * delta;
                  if (patrolPosRef.current >= maxBound) {
                    patrolPosRef.current = maxBound;
                    stateRef.current = 'stop_right';
                    timerRef.current = 0;
                    setVisual(getVisual('stop_right'));
                  }
                  break;
                }
                case 'stop_right': {
                  timerRef.current += delta;
                  if (timerRef.current >= PAUSE_AT_EDGE) {
                    stateRef.current = 'turn_left_1';
                    timerRef.current = 0;
                    setVisual(getVisual('turn_left_1'));
                  }
                  break;
                }
                case 'turn_left_1': {
                  timerRef.current += delta;
                  if (timerRef.current >= TURN_STAGE) {
                    stateRef.current = 'turn_left_2';
                    timerRef.current = 0;
                    setVisual(getVisual('turn_left_2'));
                  }
                  break;
                }
                case 'turn_left_2': {
                  timerRef.current += delta;
                  if (timerRef.current >= TURN_STAGE) {
                    stateRef.current = 'look_left';
                    timerRef.current = 0;
                    setVisual(getVisual('look_left'));
                  }
                  break;
                }
                case 'look_left': {
                  timerRef.current += delta;
                  if (timerRef.current >= LOOK_BEFORE_WALK) {
                    stateRef.current = 'walk_left';
                    timerRef.current = 0;
                    setVisual(getVisual('walk_left'));
                  }
                  break;
                }
                case 'walk_left': {
                  patrolPosRef.current -= WALK_SPEED * delta;
                  if (patrolPosRef.current <= minBound) {
                    patrolPosRef.current = minBound;
                    stateRef.current = 'stop_left';
                    timerRef.current = 0;
                    setVisual(getVisual('stop_left'));
                  }
                  break;
                }
                case 'stop_left': {
                  timerRef.current += delta;
                  if (timerRef.current >= PAUSE_AT_EDGE) {
                    stateRef.current = 'turn_right_1';
                    timerRef.current = 0;
                    setVisual(getVisual('turn_right_1'));
                  }
                  break;
                }
                case 'turn_right_1': {
                  timerRef.current += delta;
                  if (timerRef.current >= TURN_STAGE) {
                    stateRef.current = 'turn_right_2';
                    timerRef.current = 0;
                    setVisual(getVisual('turn_right_2'));
                  }
                  break;
                }
                case 'turn_right_2': {
                  timerRef.current += delta;
                  if (timerRef.current >= TURN_STAGE) {
                    stateRef.current = 'look_right';
                    timerRef.current = 0;
                    setVisual(getVisual('look_right'));
                  }
                  break;
                }
                case 'look_right': {
                  timerRef.current += delta;
                  if (timerRef.current >= LOOK_BEFORE_WALK) {
                    stateRef.current = 'walk_right';
                    timerRef.current = 0;
                    setVisual(getVisual('walk_right'));
                  }
                  break;
                }
              }
            }

            const currentX = currentPlat.x + patrolPosRef.current;
            const currentY = currentPlat.y - 56;
            currentPosRef.current = { x: currentX, y: currentY };

            const flip = getStateConfig(stateRef.current, isDarkRef.current).flip;
            if (containerRef.current) {
              containerRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0px)`;
            }
            if (characterRef.current) {
              characterRef.current.style.transform = `scaleX(${flip})`;
            }
          }
        }
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [getVisual, updatePlatforms]);

  // Hover & touch interactions for desktop and mobile
  const handleHoverStart = () => {
    isHoveredRef.current = true;
    if (stateRef.current === 'walk_right') {
      setVisual(getVisual('stop_right'));
    } else if (stateRef.current === 'walk_left') {
      setVisual(getVisual('stop_left'));
    }
  };

  const handleHoverEnd = () => {
    isHoveredRef.current = false;
    if (stateRef.current === 'walk_right') {
      setVisual(getVisual('walk_right'));
    } else if (stateRef.current === 'walk_left') {
      setVisual(getVisual('walk_left'));
    }
  };

  const toggleMode = () => {
    if (isDark) {
      setMode((prev) => {
        if (prev === 'flashing') return 'steady';
        if (prev === 'steady') return 'off';
        return 'flashing';
      });
    } else {
      setTypingNoteIndex((prev) => (prev + 1) % TYPING_NOTES.length);
      triggerDialogueBox("Taking notes on the go! 💻✨");
    }
  };

  // Color tokens tailored to theme
  const beamPrimaryColor = isDark ? '#FFFFFF' : '#F59E0B';
  const beamAtmosphereColor = isDark ? '#FFFFFF' : '#FBBF24';
  const webColor = isDark ? '#FFFFFF' : '#000000';
  const webSecondColor = isDark ? '#CBD5E1' : '#000000';

  return (
    <>
      {/* Spider-Man Web Net & Grappling Line */}
      {isWebActive && (
        <svg
          className="absolute top-0 left-0 w-full h-full pointer-events-none z-20 overflow-visible"
          style={{ position: 'absolute', top: 0, left: 0 }}
        >
          {/* Primary High-Tension Silk Core Line */}
          <line
            ref={webLineRef}
            x1="0"
            y1="0"
            x2="0"
            y2="0"
            stroke={webColor}
            strokeWidth="2.2"
            strokeLinecap="round"
          />

          {/* Secondary Braided Silk Line */}
          <line
            ref={webSecondLineRef}
            x1="0"
            y1="0"
            x2="0"
            y2="0"
            stroke={webSecondColor}
            strokeWidth="1.2"
            strokeDasharray="4 2"
            strokeLinecap="round"
          />

          {/* Spider-Man Web Net Anchor Cluster on Hero Platform */}
          <g ref={webNetGroupRef} transform="translate(0, 0)">
            <circle r="3.5" fill={webColor} />
            <line x1="0" y1="0" x2="-16" y2="-12" stroke={webColor} strokeWidth="1.3" opacity="0.9" />
            <line x1="0" y1="0" x2="-20" y2="3" stroke={webColor} strokeWidth="1.3" opacity="0.9" />
            <line x1="0" y1="0" x2="-12" y2="14" stroke={webColor} strokeWidth="1.3" opacity="0.9" />
            <line x1="0" y1="0" x2="12" y2="14" stroke={webColor} strokeWidth="1.3" opacity="0.9" />
            <line x1="0" y1="0" x2="20" y2="3" stroke={webColor} strokeWidth="1.3" opacity="0.9" />
            <line x1="0" y1="0" x2="16" y2="-12" stroke={webColor} strokeWidth="1.3" opacity="0.9" />
            <line x1="0" y1="0" x2="0" y2="-18" stroke={webColor} strokeWidth="1.3" opacity="0.9" />

            <polygon
              points="-8,-6 -10,1 -6,7 6,7 10,1 8,-6 0,-9"
              fill="none"
              stroke={webColor}
              strokeWidth="1.0"
              opacity="0.85"
            />

            <polygon
              points="-15,-11 -19,2 -11,13 11,13 19,2 15,-11 0,-17"
              fill="none"
              stroke={webColor}
              strokeWidth="0.9"
              opacity="0.7"
            />
          </g>
        </svg>
      )}

      <div
        ref={containerRef}
        id="hero-animated-character"
        data-animation-state={heroAnimationState}
        className={`absolute top-0 left-0 z-30 select-none pointer-events-auto will-change-transform ${
          !isReady ? 'opacity-0 pointer-events-none' : 'opacity-100 transition-opacity duration-200'
        } ${className}`}
        style={{
          transformOrigin: 'center bottom',
          transform: 'translate3d(0px, 0px, 0px)',
          touchAction: 'manipulation',
        }}
        onMouseEnter={handleHoverStart}
        onMouseLeave={handleHoverEnd}
        onTouchStart={() => {
          if (isIntroRef.current && introPhaseRef.current !== 'done') {
            introPhaseRef.current = 'done';
            isIntroRef.current = false;
            setHeroAnimationState('walking');
            heroAnimStateRef.current = 'walking';
          }
          handleHoverStart();
        }}
        onTouchEnd={() => {
          setTimeout(handleHoverEnd, 600);
        }}
      >
      {/* Standard Monochrome Dialogue Box (Centered Above Character on Mobile & Desktop) */}
      {isDialogueOpen && (
        <div
          className={`absolute -top-9.5 left-1/2 -translate-x-1/2 z-50 pointer-events-none select-none transition-all duration-200 ${
            isDialogueClosing ? 'opacity-0 scale-95 translate-y-1' : 'animate-dialogue-spring-right'
          }`}
          style={{ maxWidth: 'calc(100vw - 32px)' }}
        >
          {/* Main Dialogue Card in Clean Black & White */}
          <div className="relative px-2.5 py-1 rounded-md border border-border-main bg-panel-bg text-text-primary text-[11px] font-mono font-medium shadow-md flex items-center gap-1.5 whitespace-nowrap overflow-hidden">
            <span ref={dialogueTextRef}>{displayedDialogue}</span>
            {displayedDialogue.length < targetDialogue.length && (
              <span className="inline-block w-1 h-3 bg-text-primary animate-pulse -ml-0.5 shrink-0" />
            )}

            {/* Speech Pointer Tail pointing down toward character head */}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-panel-bg border-r border-b border-border-main rotate-45" />
          </div>
        </div>
      )}

      {/* Seismic Ground Impact: Lateral Rupture Crack Lines & Dust Debris */}
      {isBooming && (
        <div className="absolute top-[56px] left-[17px] -translate-x-1/2 pointer-events-none z-10 w-0 h-0">
          {/* Left Seismic Rupture Crack Line along the ledge (hardware scaleX) */}
          <div className="absolute top-0 right-0 w-[80px] h-[2.5px] bg-text-primary rounded-full origin-right animate-rupture-left will-change-transform" />
          {/* Right Seismic Rupture Crack Line along the ledge (hardware scaleX) */}
          <div className="absolute top-0 left-0 w-[80px] h-[2.5px] bg-text-primary rounded-full origin-left animate-rupture-right will-change-transform" />

          {/* Seismic Impact Dust Debris */}
          <div className="absolute -top-1 -left-2 size-2 bg-text-secondary/70 animate-dust-left" />
          <div className="absolute -top-2 -left-4 size-1.5 bg-text-muted/80 animate-dust-left" style={{ animationDelay: '0.04s' }} />
          <div className="absolute -top-1 -right-2 size-2 bg-text-secondary/70 animate-dust-right" />
          <div className="absolute -top-2 -right-4 size-1.5 bg-text-muted/80 animate-dust-right" style={{ animationDelay: '0.04s' }} />
        </div>
      )}

      {/* Character & Light Beam Entity Wrapper */}
      {(() => {
        const isIntroActive = isIntroRef.current && introPhaseRef.current !== 'done';
        const isAtFooter = currentPlatform === 'footer' || currentPlatformRef.current === 'footer';

        const activeWidthClass = visual.img.includes('spiderman')
          ? 'w-[54px]'
          : currentSize.widthClass;

        const entityWidth = visual.img.includes('spiderman')
          ? 'w-[54px]'
          : currentSize.widthClass;

        return (
          <div className={entityWidth}>
            <button
              onClick={toggleMode}
              type="button"
              className={`group relative cursor-pointer focus-visible:outline-none block transition-transform duration-200 hover:scale-105 active:scale-95 ${
                isShivering ? 'animate-impact-shiver' : ''
              }`}
              title={isAtFooter ? "Waving goodbye" : isDark ? "Flashlight" : "MacBook 💻"}
              aria-label={
                isAtFooter
                  ? "Developer waving and saying thank you stay connected at base"
                  : isDark
                  ? "Developer exploring with flashlight"
                  : "Anime developer walking with open laptop and typing notes in light mode"
              }
            >
              {/* Tooltip on hover */}
              {!isDialogueOpen && (
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none px-2 py-0.5 rounded-full bg-panel-bg border border-border-main text-[9px] font-mono text-text-primary whitespace-nowrap shadow-md z-40">
                  {isAtFooter
                    ? '👋 Thank you, stay connected'
                    : isDark
                    ? (mode === 'flashing' ? '⚡ Strobe' : mode === 'steady' ? '🔦 Beam' : '✖ Off')
                    : '💻 Typing notes'}
                </div>
              )}

              {/* Light Mode Only: Typing Note Chip (Hidden while dialogue is open or at footer base) */}
              {!isDark && !isDialogueOpen && !isAtFooter && (
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-40 pointer-events-none select-none flex flex-col items-center">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-panel-bg/95 border border-border-main shadow-xs text-[10px] font-mono text-text-primary whitespace-nowrap animate-typing-note-float">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                    <span className="font-semibold">{TYPING_NOTES[typingNoteIndex]}</span>
                  </div>
                  <div className="relative w-12 h-2 overflow-visible pointer-events-none">
                    <span className="absolute -top-1 left-2 text-[9px] font-mono text-text-secondary animate-typing-particle-1">✦</span>
                    <span className="absolute -top-2 left-6 text-[9px] font-mono text-emerald-600 animate-typing-particle-2">{}</span>
                    <span className="absolute -top-1 left-9 text-[9px] font-mono text-blue-500 animate-typing-particle-3">//</span>
                  </div>
                </div>
              )}

              {/* Flippable Directional Container */}
              <div
                ref={characterRef}
                className="w-full will-change-transform"
                style={{ transformOrigin: 'center bottom', transform: 'scaleX(1)' }}
              >
                {/* Walking Bobbing Body */}
                <div
                  className={`relative ${visual.isWalking && !isJumpingRef.current ? 'animate-walk-bob' : ''}`}
                  style={{ transformOrigin: 'center bottom' }}
                >
                  {/* Animated Walking, Jumping & Turning Anime Developer Character */}
                  <img
                    ref={imgRef}
                    src={visual.img}
                    alt="Walking Anime Developer with MacBook and Backpack"
                    className={`${activeWidthClass} object-contain ${currentSize.shadowClass} select-none pointer-events-none block`}
                    draggable={false}
                  />

              {/* High-Performance Volumetric Light Beam Overlay (Zero Blur Overhead on Mobile) */}
              <svg
                className={`absolute top-0 left-0 ${activeWidthClass} overflow-visible pointer-events-none`}
                viewBox="0 0 182 300"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
            <defs>
              {/* Volumetric Core Light Cone Gradient - Balanced Vibrant Glow */}
              <linearGradient id="animeBeamCore" x1="165" y1="155" x2="165" y2="3500" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor={beamPrimaryColor} stopOpacity={isDark ? '0.50' : '0.38'} />
                <stop offset="8%" stopColor={beamPrimaryColor} stopOpacity={isDark ? '0.34' : '0.26'} />
                <stop offset="25%" stopColor={beamPrimaryColor} stopOpacity={isDark ? '0.19' : '0.14'} />
                <stop offset="55%" stopColor={beamPrimaryColor} stopOpacity={isDark ? '0.08' : '0.06'} />
                <stop offset="85%" stopColor={beamPrimaryColor} stopOpacity={isDark ? '0.025' : '0.015'} />
                <stop offset="100%" stopColor={beamPrimaryColor} stopOpacity="0" />
              </linearGradient>

              {/* Outer Atmospheric Scatter Gradient - Warm Ambient Halo */}
              <linearGradient id="animeBeamOuter" x1="165" y1="155" x2="165" y2="3800" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor={beamAtmosphereColor} stopOpacity={isDark ? '0.26' : '0.20'} />
                <stop offset="15%" stopColor={beamAtmosphereColor} stopOpacity={isDark ? '0.16' : '0.12'} />
                <stop offset="45%" stopColor={beamAtmosphereColor} stopOpacity={isDark ? '0.065' : '0.05'} />
                <stop offset="80%" stopColor={beamAtmosphereColor} stopOpacity={isDark ? '0.018' : '0.012'} />
                <stop offset="100%" stopColor={beamAtmosphereColor} stopOpacity="0" />
              </linearGradient>

              {/* Atmospheric Scatter Blur Filter */}
              <filter id="animeBeamBlur" x="-30%" y="-20%" width="160%" height="150%">
                <feGaussianBlur stdDeviation="30" />
              </filter>
            </defs>

            {/* ================= VOLUMETRIC LIGHT BEAM (DARK MODE ONLY, REMOVED AT FOOTER BASE) ================= */}
            {isLit && isDark && !isIntroActive && !isAtFooter && (
              <g
                className={`pointer-events-none ${
                  isLandingBurst
                    ? 'opacity-100 animate-pulse'
                    : mode === 'flashing'
                    ? 'animate-torch-flash'
                    : 'opacity-80'
                }`}
              >
                {/* Diffuse Outer Atmospheric Scatter Cone */}
                <polygon
                  points="165,155 -500,3500 3000,3500"
                  fill="url(#animeBeamOuter)"
                  filter={!isMobileRef.current ? "url(#animeBeamBlur)" : undefined}
                />

                {/* Core Focused Direct Light Cone */}
                <polygon
                  points="165,155 -20,3200 2380,3200"
                  fill="url(#animeBeamCore)"
                />

                {/* Narrow High-Lumen Inner Beam Ray */}
                <polygon
                  points="165,155 370,2700 1920,2700"
                  fill="url(#animeBeamCore)"
                  opacity={isLandingBurst ? '0.95' : '0.65'}
                />

                {/* Emitter Lens Core Glow at Torch Tip */}
                <circle id="torch-emitter-tip" cx="165" cy="155" r="6" fill={beamPrimaryColor} opacity="0.8" filter={!isMobileRef.current ? "url(#animeBeamBlur)" : undefined} />
                <circle cx="165" cy="155" r="2.5" fill="#ffffff" opacity="0.95" />
              </g>
            )}
          </svg>
        </div>
      </div>
    </button>
  </div>
        );
      })()}
  </div>
</>
);
};
export default Torch;

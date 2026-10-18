/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          main: "var(--bg-main)",
          panel: "var(--panel-bg)",
          hover: "var(--panel-hover)",
        },
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)",
        },
        border: {
          main: "var(--border-main)",
          subtle: "var(--border-subtle)",
        },
        badge: {
          bg: "var(--badge-bg)",
          border: "var(--badge-border)",
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      animation: {
        'marquee': 'marquee var(--duration, 35s) linear infinite',
        'marquee-reverse': 'marquee-reverse var(--duration, 35s) linear infinite',
        'spotlight': 'spotlight 2s ease 0.5s 1 forwards',
        'radar-ping': 'radarPing 2.2s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translate3d(0%, 0, 0)' },
          to: { transform: 'translate3d(-50%, 0, 0)' },
        },
        'marquee-reverse': {
          from: { transform: 'translate3d(-50%, 0, 0)' },
          to: { transform: 'translate3d(0%, 0, 0)' },
        },
        spotlight: {
          '0%': {
            opacity: 0,
            transform: 'translate(-72%, -62%) scale(0.5)',
          },
          '100%': {
            opacity: 1,
            transform: 'translate(-50%, -40%) scale(1)',
          },
        },
        radarPing: {
          '0%': { transform: 'scale(1)', opacity: '0.85' },
          '70%, 100%': { transform: 'scale(3.2)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};

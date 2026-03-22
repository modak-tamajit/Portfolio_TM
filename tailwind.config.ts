import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg:              '#0a0a0f',
        surface:         '#111118',
        'surface-2':     '#16161f',
        'surface-3':     '#1c1c28',
        border:          '#1e1e2e',
        'border-bright': '#2e2e42',
        primary:         '#e4e4f0',
        secondary:       '#5a5a7a',
        muted:           '#2e2e42',
        accent:          '#7c6af7',
        'accent-light':  '#a899ff',
        'accent-dim':    'rgba(124,106,247,0.15)',
        tgreen:          '#00ff88',
        'tgreen-dim':    '#00cc6a',
        'warm':          '#f7a06a',
      },
      fontFamily: {
        display: ['var(--font-syne)',       'sans-serif'],
        body:    ['var(--font-dm-sans)',    'sans-serif'],
        mono:    ['var(--font-jetbrains)',  'monospace'],
      },
      animation: {
        'scroll-x':      'scrollX 35s linear infinite',
        'blink':         'blink 1s step-end infinite',
        'glow-pulse':    'glowPulse 3s ease-in-out infinite',
        'float':         'float 6s ease-in-out infinite',
        'fade-up':       'fadeUp 0.6s ease-out forwards',
        'spin-slow':     'spin 8s linear infinite',
      },
      keyframes: {
        scrollX: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(124,106,247,0.15)' },
          '50%':      { boxShadow: '0 0 50px rgba(124,106,247,0.45)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config

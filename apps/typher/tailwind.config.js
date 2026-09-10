/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        machine: {
          950: '#040609',
          900: '#080c12',
          850: '#0d131c',
          800: '#141d2a',
          750: '#1c2738',
          700: '#253448',
          600: '#3a4e68',
          500: '#5c7290',
          400: '#8ba2c0',
          300: '#b8c9dc',
          200: '#e2ecf7',
          100: '#f4f8fc',
        },
        glow: {
          cyan: '#38bdf8',
          electric: '#60a5fa',
          green: '#10b981',
          amber: '#f59e0b',
          red: '#ef4444',
          white: '#ffffff',
        }
      },
      fontFamily: {
        display: ['Syne', 'Space Grotesk', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Space Mono', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'glow-cyan': '0 0 25px -5px rgba(56, 189, 248, 0.4)',
        'glow-cyan-lg': '0 0 50px -10px rgba(56, 189, 248, 0.5)',
        'glow-green': '0 0 20px -3px rgba(16, 185, 129, 0.45)',
        'glow-white': '0 0 30px -5px rgba(255, 255, 255, 0.35)',
        'machine-panel': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.08), 0 20px 40px -15px rgba(0, 0, 0, 0.9)',
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(to right, rgba(56, 189, 248, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(56, 189, 248, 0.04) 1px, transparent 1px)',
        'grid-dots': 'radial-gradient(rgba(56, 189, 248, 0.12) 1px, transparent 1px)',
        'metallic-shimmer': 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.03) 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 24s linear infinite',
        'spin-reverse-slow': 'spin-reverse 30s linear infinite',
        'data-stream': 'dataStream 2s linear infinite',
        'radar-sweep': 'radarSweep 4s linear infinite',
      },
      keyframes: {
        'spin-reverse': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(-360deg)' },
        },
        dataStream: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { transform: 'translateY(100%)', opacity: '0' },
        },
        radarSweep: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      }
    },
  },
  plugins: [],
}

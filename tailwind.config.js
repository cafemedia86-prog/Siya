// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // enable class-based dark mode
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          cream: '#f5f5f0',
          olive: '#5A5A40',
          ink: '#1a1a1a',
          terracotta: '#a65d4a',
          // premium accent palette
          accent: {
            100: '#e0f2fe', // light cyan
            200: '#bae6fd',
            300: '#7dd3fc',
            400: '#38bdf8',
            500: '#0ea5e9',
            600: '#0284c7',
            700: '#0369a1',
            800: '#075985',
            900: '#0c4a6e',
          },
        },
        dark: {
          bg: '#0f0f0f',
          surface: '#1a1a1a',
          card: '#242424',
          text: '#e8e8e3',
          muted: '#9a9a8f'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'serif'],
      },
      animation: {
        fadeIn: 'fadeIn 0.6s ease-out forwards',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
    },
  },
  plugins: [],
};

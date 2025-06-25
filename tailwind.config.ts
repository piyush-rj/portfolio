import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          bg: 'rgb(var(--bg-primary) / <alpha-value>)',
          text: 'rgb(var(--text-primary) / <alpha-value>)',
        }
      }
    },
  },
  plugins: [],
};

export default config;

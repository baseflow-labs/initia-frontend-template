import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary, #3b82f6)',
        secondary: 'var(--color-secondary, #8b5cf6)',
      },
    },
  },
  plugins: [],
};

export default config;

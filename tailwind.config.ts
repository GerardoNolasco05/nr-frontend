import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './index.html',                  // for Vite
    './src/**/*.{js,ts,jsx,tsx}',    // for React components
    './app/**/*.{js,ts,jsx,tsx}',    // for React Router (framework mode)
  ],
  theme: {
    extend: {},                      // place to add custom colors, fonts, etc.
  },
  plugins: [],
};

export default config;

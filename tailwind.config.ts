import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './index.html',                  // for Vite
    './src/**/*.{js,ts,jsx,tsx}',    // for React components
    './app/**/*.{js,ts,jsx,tsx}',    // for React Router (framework mode)
  ],
  theme: {
    extend: {
      fontFamily: {
        dos: ["'Perfect DOS VGA 437'", 'monospace'], // MS-DOS style font
      },
    },
  },
  plugins: [],
};

export default config;

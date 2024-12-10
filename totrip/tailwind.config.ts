/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      filter: {
        invert: 'invert(1)',
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        customGray: '#E4E4E4',
      },
    },
    variants: {
      filter: ['responsive', 'hover', 'focus'],
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    require('tailwindcss-filters'), 
  ],
} satisfies Config;

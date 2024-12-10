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
        btn: 'rgba(112, 186, 255, 0.40)',
      },
    },
    variants: {
      filter: ['responsive', 'hover', 'focus'],
    },
  },
  plugins: [
    require('tailwindcss-filters'), 
  ],
} satisfies Config;

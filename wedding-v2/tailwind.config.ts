import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        'rufina-stencil': ['rufina-stencil', 'sans-serif'],
        'rufina-stencil-ornaments': ['rufina-stencil-ornaments', 'sans-serif'],
        'quinn-display' : ['quinn-display', 'serif'],
        'canto' : ['canto', 'serif']
      }
    },
  },
  plugins: [],
};
export default config;

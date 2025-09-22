// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#f9f4ee',
        'text-brown': '#6b4f4b',
        accent: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#d94f0e',
          800: '#c2410c',
          900: '#9a3412',
          950: '#7c2d12',
        },
      },
      fontFamily: {
        sans: ['var(--font-cormorant)', 'sans-serif'],
      },
      // You can also extend other parts of the theme here,
      // but we'll handle the primary font globally in layout.tsx
    },
  },
  plugins: [
    // Add any plugins here, e.g., require('@tailwindcss/forms')
  ],
};

export default config;

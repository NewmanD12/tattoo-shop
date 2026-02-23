// tailwind.config.ts
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-new-rocker)", "system-ui", "sans-serif"], // Overrides ALL default sans-serif
        serif: ["var(--font-new-rocker)", "serif"],                 // Just in case
        mono: ["var(--font-new-rocker)", "monospace"],              // Even code blocks get metal
      },
      // Optional: make text a bit more readable with spacing
      letterSpacing: {
        wider: "0.05em",
      },
    },
  },
  plugins: [],
};
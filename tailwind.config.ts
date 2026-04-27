import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        card: "var(--color-card)",
        primary: "var(--color-primary)",
        border: "var(--color-border)",
      },
      fontFamily: {
        sans: ["var(--font-lato)", "sans-serif"],
      },
    },
  },
};

export default config;

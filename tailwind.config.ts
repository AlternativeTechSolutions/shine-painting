import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        body: ["var(--font-lato)", "sans-serif"],
      },
      colors: {
        navy: {
          950: "#0A0F1E",
          900: "#0D1526",
          800: "#142040",
          700: "#1A2D5A",
        },
        gold: {
          400: "#F0C040",
          500: "#E8B020",
          600: "#C8940A",
        },
        cream: "#F8F4ED",
        slate: "#8898AA",
      },
      animation: {
        "fade-up": "fadeUp 0.7s ease forwards",
        shimmer: "shimmer 2.5s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
      },
    },
  },
  plugins: [],
};
export default config;

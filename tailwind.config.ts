import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f7f8ff",
          500: "#5b5bd8",
          600: "#4646c8",
          700: "#3434a9",
        },
      },
      boxShadow: {
        soft: "0 18px 48px rgba(15, 23, 42, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;

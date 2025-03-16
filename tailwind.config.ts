import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // sans: ["var(--font-geist-sans)"],
        // mono: ["var(--font-geist-mono)"],
        poppins: ["var(--font-poppins)"], // for logo/custom
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;

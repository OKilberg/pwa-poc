import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/shared/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        tresLogo: "#FFE414",
        tresYellow: "#D7BF0A",
        tresContrastYellow: "#d1bd25",
        tresLight: "#D9D9D9",
        success: "#75C44D",
      },
      fontFamily: {
        carterOne: ["var(--font-carter-one)", "sans-serif"],
        publicSans: ["var(--font-public-sans)", "sans-serif"],
      },
      boxShadow: {
        "text-outline": "0 0 0 2px rgba(0, 0, 0, 1)",
      },
    },
  },
  daisyui: {
    themes: ["bumblebee"],
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
} satisfies Config;

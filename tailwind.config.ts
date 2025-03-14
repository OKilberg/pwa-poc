import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/shared/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        fadeIn: "fadeIn 1s ease-out",
        slideInRight: "slideInRight 0.2s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideInRight: {
          "0%": { transform: "translateX(100%)", opacity: "0" }, // Start off-screen to the right
          "100%": { transform: "translateX(0)", opacity: "1" }, // End at the normal position
        },
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        tresLogo: "#FFE414",
        tresYellow: "#D7BF0A",
        tresContrastYellow: "#d1bd25",
        tresLight: "#D9D9D9",
        success: "#75C44D",
        successDark: "#5B973E",
        danger: "#C46B4D",
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

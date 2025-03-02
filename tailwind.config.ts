import type { Config } from "tailwindcss";

export default {
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
        tresYellow: "#D7BF0A",
        tresContrastYellow: "#d1bd25",
        tresLight: "#D9D9D9",
      },
      fontFamily: {
        carterOne: ["var(--font-carter-one)", "sans-serif"],
        publicSans: ["var(--font-public-sans)", "sans-serif"],
      },
    },
  },
  daisyui: {
    themes: ["bumblebee"],
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
} satisfies Config;

import type { Config } from "tailwindcss"

const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette")

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Darker palette with colors close to Next.js theme
        primary: {
          light: "#1F1F1F", // Light shade of primary dark color
          DEFAULT: "#0D0D0D", // Default primary dark color (very dark gray)
          dark: "#050505", // Dark shade of primary dark color (almost black)
        },
        secondary: {
          light: "#2B2B2B", // Light shade of secondary dark color
          DEFAULT: "#1A1A1A", // Default secondary dark color (dark gray)
          dark: "#0E0E0E", // Dark shade of secondary dark color
        },
        accent: {
          light: "#4A90E2", // Light accent color (dark blue)
          DEFAULT: "#0070F3", // Default accent color (Next.js blue)
          dark: "#003E7E", // Dark accent color (darker blue)
        },
        background: {
          light: "#0D0D0D", // Light background color
          DEFAULT: "#000000", // Default background color (black)
          dark: "#000000", // Dark background color (black)
        },
      },
      animation: {
        aurora: "aurora 60s linear infinite",
      },
      keyframes: {
        aurora: {
          from: {
            backgroundPosition: "50% 50%, 50% 50%",
          },
          to: {
            backgroundPosition: "350% 50%, 350% 50%",
          },
        },
      },
    },
  },
  plugins: [addVariablesForColors],
}
export default config

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"))
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  )

  addBase({
    ":root": newVars,
  })
}

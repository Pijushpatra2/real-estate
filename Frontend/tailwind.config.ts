import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
colors: {
    border: "hsl(var(--border))",
    input: "hsl(var(--input))",
    ring: "hsl(var(--ring))",
    background: "hsl(var(--background))",
    foreground: "hsl(var(--foreground))",
    primary: {
      DEFAULT: "#0B5D48", // Deep Evernal Green
      foreground: "#FFFFFF",
    },
    secondary: {
      DEFAULT: "#16855D", // Brighter green for accents
      foreground: "#FFFFFF",
    },
    accent: {
      DEFAULT: "#20c589", // Golden accent
      foreground: "#1C3F36", // Dark green for contrast
    },
    muted: {
      DEFAULT: "#F8F4EF", // Soft beige background
      foreground: "#5E6E69", // Cool gray text
    },
    card: {
      DEFAULT: "#FFFFFF",
      foreground: "#1C3F36",
    },
    destructive: {
      DEFAULT: "#E5484D", // Red tone, slightly muted
      foreground: "#FFFFFF",
    },
    popover: {
      DEFAULT: "#FFFFFF",
      foreground: "#1C3F36",
    },},
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config

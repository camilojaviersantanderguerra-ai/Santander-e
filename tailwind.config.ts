import type { Config } from "tailwindcss";

// Todo el sistema de color nace del logo: negro grafito + bronce/oro cepillado.
// Cambiar estos valores actualiza automáticamente toda la marca (ver data/site-config.ts
// para textos/props editables sin tocar este archivo).
const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#050506",
          900: "#0a0a0c",
          850: "#0f0f12",
          800: "#141417",
          700: "#1b1b1f",
          600: "#26262b",
          500: "#38383f",
        },
        bronze: {
          50: "#f9f1e4",
          100: "#f0ddb9",
          200: "#e3c690",
          300: "#d4ac70",
          400: "#c79657",
          500: "#b3813f",
          600: "#946732",
          700: "#734f27",
          800: "#523a1e",
          900: "#332413",
        },
        gold: {
          200: "#efe1bd",
          300: "#e2cd93",
          400: "#d1b26e",
          500: "#c19c56",
          600: "#a3813f",
        },
        copper: {
          400: "#c07a4e",
          500: "#a75f39",
          600: "#8a4b2b",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      letterSpacing: {
        widest2: "0.28em",
        widest3: "0.4em",
      },
      backgroundImage: {
        "brushed-gold":
          "linear-gradient(115deg, #8a6a34 0%, #d9c187 22%, #f4e6bf 38%, #b3813f 52%, #e3c690 68%, #8a6a34 84%, #c19c56 100%)",
        "graphite-radial":
          "radial-gradient(120% 120% at 50% 0%, #16161a 0%, #0a0a0c 55%, #050506 100%)",
        "grain-fade":
          "linear-gradient(180deg, rgba(5,5,6,0) 0%, rgba(5,5,6,0.9) 100%)",
      },
      boxShadow: {
        subtle: "0 1px 0 0 rgba(255,255,255,0.04) inset, 0 20px 60px -20px rgba(0,0,0,0.6)",
        glow: "0 0 40px -8px rgba(212,172,112,0.35)",
        card: "0 30px 80px -30px rgba(0,0,0,0.75)",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        floatSlow: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) forwards",
        shimmer: "shimmer 6s linear infinite",
        floatSlow: "floatSlow 6s ease-in-out infinite",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;

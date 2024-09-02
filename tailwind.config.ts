import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  mode: "jit", // Just-In-Time mode
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    // "!./src/stories/*/**",
  ],
  theme: {
    extend: {
      fontFamily: {},
      colors: ({ theme }) => {
        const brand = {
          "100": "#130D33",
          "90": "#291F61",
          "80": "#34228F",
          "70": "#5336E2",
          "60": "#7257FF",
          "50": "#907AFF",
          "40": "#B4A6FF",
          "30": "#DBD4FF",
          "20": "#F0EDFF",
          "10": "#F6F5FF",
        };

        const error = {
          "100": "#290800",
          "90": "#611000",
          "80": "#8A1700",
          "70": "#AD1D00",
          "60": "#DB340B",
          "50": "#FF5226",
          "40": "#FF9175",
          "30": "#FFCEC2",
          "20": "#FFE9E3",
          "10": "#FFF3F0",
        };

        return {
          // gray: theme("colors.brand"),
          brand,
          success: "#021F10",
          info: "#021026",
          warning: "#331C03",
          error,
          neutral: "#131214",
          social: {
            fb: "#005688",
            tw: "#0B84CF",
          },
          accent: {
            subtle: brand["20"],
            bold: brand["70"],
            muted: brand["30"],
            dim: brand["40"],
          },
        };
      },
      backgroundColor: ({ theme }) => {
        return {
          canvas: theme("colors.white"),
          subtle: theme("colors.neutral/10"),
          muted: theme("colors.neutral/20"),
          "danger-primary": theme("colors.error.50"),
          "danger-secondary": theme("colors.error.60"),
          "danger-tertiary": theme("colors.error.70"),
        };
      },
      dropShadow: ({ theme }) => ({
        button: `0 4px 4px rgba(${theme("colors.black")}, 25%)`,
      }),
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
  safelist: [
    {
      pattern: /col-span-(\d+)/,
      variants: ["sm", "md", "lg", "xl"], // Add responsive variants if needed
    },
  ],
};

export default config;

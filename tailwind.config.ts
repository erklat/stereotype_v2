import type { Config } from "tailwindcss";

const config: Config = {
  mode: "jit", // Just-In-Time mode
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
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

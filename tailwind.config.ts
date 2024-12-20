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
        turquoise: "#00BFA6",
        "turquoise-dark": "#00897B",
      },
      fontFamily: {
        "e-Ukraine": ["e-Ukraine", "sans-serif"],
        bebas_neue: ["bebas_neue", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;

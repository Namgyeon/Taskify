import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./features/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ["Pretendard", "sans-serif"],
      },
      fontSize: {
        "3xl": ["32px", { lineHeight: "42px" }],
        "2xl": ["24px", { lineHeight: "32px" }],
        xl: ["20px", { lineHeight: "32px" }],
        "2lg": ["18px", { lineHeight: "26px" }],
        lg: ["16px", { lineHeight: "26px" }],
        md: ["14px", { lineHeight: "24px" }],
        sm: ["13px", { lineHeight: "22px" }],
        xs: ["12px", { lineHeight: "20px" }],
      },
    },
  },
  plugins: [],
};

export default config;

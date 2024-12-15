import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#3B82F6", // blue-500
          dark: "#1E3A8A", // blue-700
        },
        amex: "#016FD0",
        visa: "#fdbb0a",
        mc: "#EB001B",
        other: "#D7D2CB",
        // darkGreen: "#1B5E20",
        // lightGreen: "#A5D6A7",
        // accent: "#FF9800",
        // neutral: {
        //   light: "#F5F5F5",
        //   dark: "#424242",
        // },
      },
    },
  },
  plugins: [],
};
export default config;

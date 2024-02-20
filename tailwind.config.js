/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#56AFC2",
        "primary-text": "#121314",
        "primary-background": "#F3F7F8",
        secondary: "#8bd8e8",
        accent: "#41d4f3",
      },
    },
  },
  plugins: [],
};

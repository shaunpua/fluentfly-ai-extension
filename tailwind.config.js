/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3DD194",
        "primary-text-lt": "#070d0a",
        "primary-text-dt": "#F2F8F5",
        "primary-background-lt": "#fbfefc",
        "primary-background-dt": "##010402",
        secondary: "#75F0BD",
        accent: "#49FDB2",
      },

      zIndex: {
        max: "2147483638",
      },
    },
  },
  plugins: [],
};

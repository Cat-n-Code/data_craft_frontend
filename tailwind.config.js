/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,vue}"],
  theme: {
    extend: {
      borderRadius: {
        none: "0",
        sm: "0.5rem",
        md: "0.75rem",
        lg: "1.0rem",
        xl: "1.5rem",
        full: "9999px",
      },
    },
  },
  plugins: [require("tailwindcss-primeui")],
};

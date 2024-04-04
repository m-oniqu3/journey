/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: "rgb(4 120 87)",
        grayscale: {
          100: "rgb(236 239 241)",
        },
        neutral: "#fff",
      },
    },
  },
  plugins: [],
};

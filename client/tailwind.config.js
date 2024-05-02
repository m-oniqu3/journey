/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      lg2: "1200px",

      xl: "1280px",
    },

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

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-dark-red": "linear-gradient(90deg, #8B0000, #000000)", // Added dark red gradient
        "glossy-dark-red":
          "linear-gradient(135deg, #8B0000, #4B0000) , radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0))",
      },
      colors: {
        "turquoise-900": "#003747",
        "turquoise-700": "#046276",
        "turquoise-500": "#06768d",
      },
    },
  },
  plugins: [],
};

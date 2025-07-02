/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#f87171", // Light red for buttons and accents
        secondary: "#fbbf24", // Yellow for highlights
        background: "#f3f4f6", // Light gray for body background
        footer: "#1f2937", // Dark gray for footer background
        textPrimary: "#333333", // Dark text color
        textSecondary: "#4b5563", // Lighter text color
      },
    },
  },
  plugins: [daisyui],
};

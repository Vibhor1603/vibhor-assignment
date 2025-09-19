/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Background colors
        background: {
          DEFAULT: "#ffffff",
          light: "#f8fafc",
        },

        // Primary - Blue
        primary: {
          light: "#60a5fa",
          DEFAULT: "#3b82f6",
          dark: "#2563eb",
        },

        // Text colors
        text: {
          primary: "#1f2937",
          secondary: "#6b7280",
          muted: "#9ca3af",
        },

        // Border
        border: {
          DEFAULT: "#e5e7eb",
        },
      },
    },
  },
  plugins: [],
};

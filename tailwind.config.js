/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Simple background colors
        background: {
          DEFAULT: "#ffffff",
          light: "#f8fafc",
          dark: "#f1f5f9",
        },

        // Primary - Blue
        primary: {
          light: "#60a5fa",
          DEFAULT: "#3b82f6",
          dark: "#2563eb",
        },

        // Secondary - Purple
        secondary: {
          light: "#a78bfa",
          DEFAULT: "#8b5cf6",
          dark: "#7c3aed",
        },

        // Accent - Green
        accent: {
          light: "#4ade80",
          DEFAULT: "#22c55e",
          dark: "#16a34a",
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
          light: "#f3f4f6",
        },
      },

      // Custom Background Images (Gradients)
      backgroundImage: {
        // Your custom gradient
        "gradient-white-blue": "linear-gradient(to bottom, #ffffff, #93c5fd)",

        // Additional useful gradients
        "gradient-primary": "linear-gradient(to bottom, #3b82f6, #1d4ed8)",
        "gradient-secondary": "linear-gradient(to bottom, #8b5cf6, #7c3aed)",
        "gradient-accent": "linear-gradient(to bottom, #22c55e, #16a34a)",

        // Multi-color gradients
        "gradient-rainbow":
          "linear-gradient(to right, #3b82f6, #8b5cf6, #22c55e)",
        "gradient-sunset": "linear-gradient(to bottom, #f97316, #ef4444)",
      },

      // Simple font sizes
      fontSize: {
        sm: "14px",
        md: "16px",
        lg: "18px",
        xl: "20px",
      },
    },
  },
  plugins: [],
};

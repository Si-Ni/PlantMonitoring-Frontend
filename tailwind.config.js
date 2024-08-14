const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */ module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./node_modules/@nextui-org/theme/dist//*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1A73E8",
        secondary: "#FF4081",
        success: "#4CAF50",
        warning: "#FB8C00",
        error: "#F44336"
      }
    }
  },
  darkMode: "class",
  plugins: [
    nextui({
      defaultTheme: "dark",
      defaultExtendTheme: "dark"
    })
  ]
};

/* eslint-disable @typescript-eslint/no-var-requires */
const { pick, omit } = require("lodash")
const colors = require("tailwindcss/colors")
const defaultTheme = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#FCFEFA",
          100: "#E3FBDA",
          200: "#B2F39B",
          300: "#81EC5B",
          400: "#50E41B",
          500: "#38A213",
          600: "#2D800F",
          700: "#22600B",
          800: "#174007",
          900: "#0B2004",
          950: "#061202"
        }
      },
      fontFamily: {
        body: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "system-ui",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "system-ui",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
      borderWidth: {
        DEFAULT: "1px",
        0: "0",
        2: "2px",
        3: "3px",
        4: "4px",
        6: "6px",
        8: "8px",
      },
      minHeight: {
        ...defaultTheme.height,
      },
      minWidth: {
        ...defaultTheme.width,
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require('@tailwindcss/aspect-ratio')],
  future: {
    hoverOnlyWhenSupported: true,
  },
}

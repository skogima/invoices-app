/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    fontSize: {
      "body-variant": [
        "13px",
        {
          lineHeight: "15px",
          letterSpacing: "-0.25px",
          fontWeight: "500",
        },
      ],
      body: [
        "13px",
        {
          lineHeight: "18px",
          letterSpacing: "-0.1px",
          fontWeight: "500",
        },
      ],
      "body-l": [
        "18px",
        {
          lineHeight: "32px",
          letterSpacing: "-0.38px",
          fontWeight: "700",
        },
      ],
      "heading-s": [
        "15px",
        {
          lineHeight: "24px",
          letterSpacing: "-0.25px",
          fontWeight: "700",
        },
      ],
      "heading-s-variant": [
        "15px",
        {
          lineHeight: "15px",
          letterSpacing: "-0.25px",
          fontWeight: "700",
        },
      ],
      "heading-m": [
        "24px",
        {
          lineHeight: "22px",
          letterSpacing: "-0.75px",
          fontWeight: "700",
        },
      ],
      "heading-l": [
        "36px",
        {
          lineHeight: "33px",
          letterSpacing: "-1px",
          fontWeight: "700",
        },
      ],
    },
    fontFamily: {
      sans: ["League Spartan", "sans-serif"],
    },
    borderRadius: {
      none: "0px",
      xs: "4px",
      sm: "6px",
      DEFAULT: "8px",
      lg: "20px",
      xl: "24px",
      full: "9999px",
    },
    colors: {
      white: "#FFFFFF",
      black: "#000000",
      green: "#33D69F",
      orange: "#FF8F00",
      red: {
        DEFAULT: "#EC5757",
        light: "#FF9797",
      },
      violet: {
        DEFAULT: "#7C5DFA",
        light: "#9277FF",
      },
      "blue-gray": {
        300: "#7E88C3",
        400: "#888EB0",
      },
      gray: {
        50: "#F9FAFE",
        100: "#F8F8FB",
        200: "#DFE3FA",
        400: "#777F98",
        600: "#373B53",
        700: "#252945",
        800: "#1E2139",
        900: "#141625",
        950: "#0C0E16",
      },
    },
    dropShadow: {
      menu: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      "select-dark": "0px 10px 20px rgba(0, 0, 0, 0.25)",
      select: "0px 10px 20px #48549F19",
    },
    boxShadow: {
      card: "0px 10px 10px -10px #48549F0A",
    },
    extend: {
      keyframes: {
        "fade-in": {
          "100%": { opacity: 1 },
        },
        "slide-in": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
      animation: {
        "fade-in": "fade-in 400ms ease-in forwards",
        "slide-in": "slide-in 200ms ease-in forwards",
      },
    },
  },
  plugins: [],
};

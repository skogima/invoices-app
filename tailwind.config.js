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
          fontWeight: "medium",
        },
      ],
      body: [
        "13px",
        {
          lineHeight: "18px",
          letterSpacing: "-0.1px",
          fontWeight: "medium",
        },
      ],
      "heading-s": [
        "15px",
        {
          lineHeight: "24px",
          letterSpacing: "-0.25px",
          fontWeight: "bold",
        },
      ],
      "heading-s-variant": [
        "15px",
        {
          lineHeight: "15px",
          letterSpacing: "-0.25px",
          fontWeight: "bold",
        },
      ],
      "heading-m": [
        "24px",
        {
          lineHeight: "22px",
          letterSpacing: "-0.75px",
          fontWeight: "bold",
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
        50: "#F8F8FB",
        200: "#DFE3FA",
        600: "#373B53",
        700: "#252945",
        800: "#1E2139",
        900: "#141625",
        950: "#0C0E16",
      },
    },
  },
  plugins: ["prettier-plugin-tailwindcss"],
};

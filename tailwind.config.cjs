/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}"],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            code: {
              fontFamily: "Fira Code, monospace",
              // span: {
              //   fontFamily: "Fira Code, monospace",
              // },
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography"),],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  safelist: [
    {
      pattern: /col-span-(1|2|3|4|5|6|7|8|9|10|11|12)/,
    },
    // Add any other classes you need to safelist
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

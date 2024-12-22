/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "var(--primary-color)",
        "secondary": "var(--secondary-color)"
      },
      fontFamily: {
        "bungee": ['Bungee', 'cursive'],
        "inter": ['Inter', 'sans-serif'],

      }
    },
  },
  plugins: [],
}


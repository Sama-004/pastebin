/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 'custom-bg': '#181818',
        'custom-bg': '#2b2b2b',
        'nav-color': '#333',
      },
    },
  },
  plugins: [],
}


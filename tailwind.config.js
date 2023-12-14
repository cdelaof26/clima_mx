/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'sm': '800px',
      'md': '700px',
      'lg': '1200px',
      'xl': '1800px',
      '2xl': '4000px'
    }
  },
  plugins: [require("daisyui")],
}

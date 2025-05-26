/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust according to your project structure
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      keyframes: {
        'gradient-shine': {
          '0%, 100%': { 'background-position': '200% center' },
          '50%': { 'background-position': '0% center' },
        },
      },
      animation: {
        'gradient-shine': 'gradient-shine 3s ease-in-out infinite',
      },
      backgroundSize: {
        '200%': '200% 100%',
      },
    },
  },
  plugins: [],
};

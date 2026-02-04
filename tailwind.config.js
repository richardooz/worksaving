/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        greatvibes: ['"Great Vibes"', 'cursive'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        'warm-slate': {
          800: '#2f2a2e',
        },
      },
      keyframes: {
        equalize: {
          '0%, 100%': { height: '0.6rem' },
          '50%': { height: '1.4rem' },
        },
      },
      animation: {
        equalize: 'equalize 1.2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        slab: ['"Roboto Slab"', 'serif'],
        poppins: ['Poppins', 'sans-serif'],
        rufina: ['Rufina', 'serif'],
      },
      fontSize: {
        'custom-32': '32px',
        '24': '24px',
      },
      colors: {
        mainBlue: '#1E2A38', 
        subGrey: '#E5E5E5',
        subBlue: '#616A75',
      },
      keyframes: {
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        slideDown: 'slideDown 0.3s ease-out forwards',
      },
    },
  },
  plugins: [],
}

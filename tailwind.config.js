/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    extend: {},
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    colors: {
      body:{DEFAULT:'#fff'},
      grey: { DEFAULT: '#EFEFF3', secondary: '#EAEAEA', tertiary:'#808080' },
      black: '#1E1612',
      white: '#fff',
      blue:{DEFAULT:'#4E8EE5', secondary:'#4484FA',tertiary:'#b3dcfd', light:'#F2F7FF'},
      red: 'red',
      green:'green',
      transparent: 'transparent',
    },
  },
  plugins: [],
};

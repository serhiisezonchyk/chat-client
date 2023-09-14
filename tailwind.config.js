/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,jsx}'],
  darkMode:'class',
  theme: {
    extend: {},
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    colors: {
      body:{DEFAULT:'#fff',dark:'#212121'},
      grey: { DEFAULT: '#EFEFF3', secondary: '#EAEAEA', tertiary:'#808080', dark:'#363636' },
      black: '#1E1612',
      white: '#fff',
      blue:{DEFAULT:'#4E8EE5', secondary:'#4484FA',tertiary:'#b3dcfd', light:'#F2F7FF'},
      purple:{DEFAULT:'#7c44bd', secondary:'#4b3466'},
      red: 'red',
      green:'green',
      transparent: 'transparent',
    },
  },
  plugins: [],
};

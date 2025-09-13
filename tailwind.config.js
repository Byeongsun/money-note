export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Noto Sans KR', 'sans-serif'],
      },
      colors: {
        kakao: {
          yellow: '#FEE500',
          dark: '#3C1E1E',
          light: '#FFF8E1',
        },
      },
    },
  },
  plugins: [],
}
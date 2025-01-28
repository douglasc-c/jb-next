import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        global: "url('/images/bg/global.png')",
        bgnew: "url('/images/bg/newbg.png')",
        render: "url('/images/bg/renders.png')",
        'base-home': "url('/images/bg/baseImage.png')",
      },
      colors: {
        backgroundStart: 'rgb(var(--background-start-rgb))',
        backgroundEnd: 'rgb(var(--background-end-rgb))',
        foreground: 'rgb(var(--foreground-rgb))',
        primary: '#A47659',
        secondary: '#86776B',
        tertiary: '#747756',
        quaternary: '#A4A96B',
        'index-number-of-house':
          'linear-gradient(0deg, #A47659 30%, #78ffd6 100%)',
        'index-land': 'linear-gradient(0deg, #230057 30%, #71f697 100%)',
        'index-avaliable-value':
          'linear-gradient(0deg, #525820 30%, #a4a96b 100%)',
      },
      fontFamily: {
        rubik: ['Rubik', 'sans-serif'],
      },
      fontWeight: {
        light: '300',
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
      },
    },
  },
  plugins: [],
}

export default config

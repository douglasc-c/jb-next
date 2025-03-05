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
      },
      colors: {
        backgroundStart: '#1f1f23',
        backgroundEnd: '#1f1f23',
        foreground: 'rgb(var(--foreground-rgb))',
        primary: '#18181b',
        secondary: '#2c2c31',
        tertiary: '#86776B',
        quaternary: '#A39085',
        border: '#2c2c31',
        background: '#00008',
        textPrimary: '#e8e8e8',
        gray: '#1f1f23',
        input: '#26282c',
        title: '#e79204',
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

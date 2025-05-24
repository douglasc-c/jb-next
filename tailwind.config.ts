import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      backgroundImage: {
        global: "url('/images/bg/global.png')",
        bgnew: "url('/images/bg/newbg.png')",
        render: "url('/images/bg/gain.jpeg')",
        graph: "url('/images/bg/graphic.jpeg')",
        card: "url('/images/bg/card-graph.png')",
        table: "url('/images/bg/table-graph.jpeg')",
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: '#ffffff',
        },
        secondary: {
          DEFAULT: '#F3F4F6', // Gray 100
          foreground: '#1F2937', // Gray 800
        },
        destructive: {
          DEFAULT: '#EF4444', // Red 500
          foreground: '#FFFFFF',
        },
        muted: {
          DEFAULT: '#F3F4F6', // Gray 100
          foreground: '#6B7280', // Gray 500
        },
        accent: {
          DEFAULT: '#F3F4F6', // Gray 100
          foreground: '#1F2937', // Gray 800
        },
        popover: {
          DEFAULT: '#FFFFFF',
          foreground: '#1F2937', // Gray 800
        },
        card: {
          DEFAULT: '#FFFFFF',
          foreground: '#1F2937', // Gray 800
        },
        title: '#185AA8', // Teal 200
        backgroundStart: '#1f1f23',
        backgroundEnd: '#1f1f23',
        textPrimary: '#e8e8e8',
        gray: '#1f1f23',
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
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        blob: {
          '0%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
          '33%': {
            transform: 'translate(30px, -50px) scale(1.1)',
          },
          '66%': {
            transform: 'translate(-20px, 20px) scale(0.9)',
          },
          '100%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        blob: 'blob 7s infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config

import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  plugins: [],
  theme: {
    colors: {
      primary: '#03BCCC',
      'primary-dark': '#04646C',
      secondary: '#603D98',
      light: {
        'primary-dark': '#ECF5F5',
        success: '#E7F8F1',
        error: '#FFEDED'
      },
      success: '#0CB66E',
      warning: '#FFD22D',
      error: '#F85C60',
      info: '#186ADE',
      ui: {
        white: '#FFFFFF',
        gray: '#A6A6A6',
        light: {
          clear: '#ECEAEA',
          gray: '#E5E5E5'
        },
        medium: {
          gray: '#737373'
        },
        dark: {
          gray: '#282828'
        },
        green: '#099b09',
        red: '#e62a2a',
        orange: '#f2c94c'
      },
      'bg-dark': '#c9ccd1',
      'bg-light': '#fff'
    },
    fontFamily: {
      sans: ['Poppins', 'sans-serif']
    },
    fontSize: {
      xs: ['0.625rem', '0.875rem'],
      sm: ['0.75rem', '1rem'],
      md: ['0.875rem', '1.25rem'],
      lg: ['1rem', '1.5rem'],
      xl: ['1.25rem', '1.75rem'],
      '2xl': ['1.50rem', '2rem'],
      '3xl': ['2rem', '2.35rem'],
      '8xl': ['6rem', '1']
    }
  }
}
export default config

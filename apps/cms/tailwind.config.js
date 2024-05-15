/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')

const childs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const states = ['idle', 'error', 'loading', 'disable', 'success']

const zIndexes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './icons/**/*.{js,ts,jsx,tsx}',
    './views/**/*.{js,ts,jsx,tsx}',
    './utils/**/*.{js,ts,jsx,tsx}',
    './layouts/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    '../../packages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      primary: '',
      white: '#ffffff',
      black: '#000000',
      inherit: 'inherit',
      current: 'currentColor',
      transparent: 'transparent',
    },
    zIndex: zIndexes.reduce((z, n) => ({ ...z, [n * 5]: n * 5 }), {}),
    boxShadow: {
      none: 'none',
      DEFAULT: '',
    },
    fontFamily: {
      sans: ['var(--font-sans)', ...defaultTheme.fontFamily.sans],
    },
  },
  plugins: [
    ({ theme, addVariant, addUtilities, matchUtilities }) => {
      /* Variants */
      childs.forEach(child => {
        const variant = `${child}${child === 1 ? 'st' : child === 2 ? 'nd' : child === 3 ? 'rd' : 'th'}`
        addVariant(variant, `&:nth-child(${child})`)
      })
      states.forEach(st => addVariant(st, `&[data-state=${st}]`))

      /* Utilities */
      addUtilities({ '.flex-center': { 'align-items': 'center', 'justify-content': 'center' } })
      matchUtilities({ s: value => ({ width: value, height: value }) }, { values: theme('width') })

      /* Skeleton */
      matchUtilities({ sw: value => ({ '--skeleton-width': value }) }, { values: theme('width') })
      matchUtilities({ sh: value => ({ '--skeleton-height': value }) }, { values: theme('height') })
    },
  ],
}

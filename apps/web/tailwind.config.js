/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

const childs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

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
      serif: ['var(--font-serif)', ...defaultTheme.fontFamily.serif],
    },
    extend: {
      animation: {
        in: 'enter var(--animate-duration) var(--animate-easing) var(--animate-delay) both',
        out: 'leave var(--animate-duration) var(--animate-easing) var(--animate-delay) both',
        blink: 'blink 1.25s step-end infinite',
      },
    },
  },
  plugins: [
    require('tailwindcss-radix')({ variantPrefix: 'rdx' }),
    ({ theme, addVariant, addUtilities, matchUtilities }) => {
      /* Variants */
      childs.forEach(child => {
        const variant = `${child}${child === 1 ? 'st' : child === 2 ? 'nd' : child === 3 ? 'rd' : 'th'}`
        addVariant(variant, `&:nth-child(${child})`)
      })

      /* Utilities */
      addUtilities({ '.flex-center': { 'align-items': 'center', 'justify-content': 'center' } })
      matchUtilities({ s: value => ({ width: value, height: value }) }, { values: theme('width') })

      /* Skeleton */
      matchUtilities({ sw: value => ({ '--skeleton-width': value }) }, { values: theme('width') })
      matchUtilities({ sh: value => ({ '--skeleton-height': value }) }, { values: theme('height') })

      /* Animation */
      matchUtilities({ 'animate-x': value => ({ '--animate-x': value }) }, { values: theme('translate') })
      matchUtilities({ 'animate-y': value => ({ '--animate-y': value }) }, { values: theme('translate') })
      matchUtilities({ 'animate-scale': value => ({ '--animate-scale-x': value, '--animate-scale-y': value }) }, { values: theme('scale') })
      matchUtilities({ 'animate-scale-x': value => ({ '--animate-scale-x': value }) }, { values: theme('scale') })
      matchUtilities({ 'animate-scale-y': value => ({ '--animate-scale-y': value }) }, { values: theme('scale') })
      matchUtilities({ 'animate-opacity': value => ({ '--animate-opacity': value }) }, { values: theme('opacity') })
      matchUtilities({ 'animate-ease': value => ({ '--animate-easing': value }) }, { values: theme('transitionTimingFunction') })
      matchUtilities({ 'animate-delay': value => ({ '--animate-delay': value }) }, { values: theme('transitionDelay') })
      matchUtilities({ 'animate-duration': value => ({ '--animate-duration': value }) }, { values: theme('transitionDuration') })
    },
  ],
}

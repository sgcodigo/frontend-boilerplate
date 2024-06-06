/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
const { contents, zIndexes, animations, keyframes, defaultPlugin, baseColors } = require('@pkg/tailwindcss')

module.exports = {
  content: contents,
  theme: {
    colors: {
      ...baseColors,
    },
    zIndex: zIndexes,
    boxShadow: {
      none: 'none',
      DEFAULT: '',
    },
    fontFamily: {
      sans: ['var(--font-sans)', ...defaultTheme.fontFamily.sans],
      serif: ['var(--font-serif)', ...defaultTheme.fontFamily.serif],
    },
    extend: { animation: animations, keyframes },
  },
  plugins: [require('tailwindcss-radix')(), defaultPlugin],
}

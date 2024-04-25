const { kebabCase } = require('lodash')

function getMapToken(name) {
  const tokens = require('./map-tokens.json')
  return Object.entries(tokens[name]).reduce(
    (colors, [name, { $value }]) => ({
      ...colors,
      [kebabCase(name)]: `var(--${kebabCase($value.slice(1, -1))})`,
    }),
    {},
  )
}

function seedsToCSSVars(name) {
  const tokens = require('./seed-tokens.json')
  const values = Object.entries(tokens[name]).flatMap(([key, value]) =>
    value.$value ? [[`${name}-${key}`, value.$value]] : Object.entries(value).map(([$key, { $value }]) => [`${name}-${key}-${$key}`, $value]),
  )

  return values.reduce((total, [name, value]) => ({ ...total, [`--${kebabCase(name)}`]: value }), {})
}

module.exports = { getMapToken, seedsToCSSVars }

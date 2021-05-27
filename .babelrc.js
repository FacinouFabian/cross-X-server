module.exports = (api) => {
  api.cache(true)

  const presets = ['@babel/typescript', '@babel/env']
  const plugins = [
    'babel-plugin-transform-typescript-metadata',
    ['@babel/proposal-decorators', { legacy: true }],
    '@babel/plugin-proposal-class-properties',
    '@babel/transform-runtime',
  ]

  return { presets, plugins }
}
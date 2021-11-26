module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    [
      '@babel/plugin-proposal-class-properties',
      {
        loose: true,
      },
    ],
    [
      '@babel/plugin-proposal-object-rest-spread',
      {
        loose: true,
      },
    ],
    [
      '@babel/plugin-transform-runtime',
      {
        version: '^7.15.0',
      },
    ],
    '@babel/plugin-transform-object-assign',
    '@babel/plugin-transform-react-constant-elements',
    'babel-plugin-transform-dev-warning',
    [
      'babel-plugin-transform-react-remove-prop-types',
      {
        mode: 'unsafe-wrap',
      },
    ],
  ],
  ignore: [/@babel[\\|/]runtime/],
}

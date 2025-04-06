module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    './code-push-babel-plugin',
    [
      '@babel/plugin-proposal-decorators',
      {
        version: '2023-05',
      },
    ],
    ['@babel/plugin-transform-class-static-block'],
  ],
  assumptions: {
    setPublicClassFields: false,
  },
  env: {
    production: {
      plugins: ['transform-remove-console'],
    },
    development: {
      plugins: ['./code-push-babel-plugin'],
    },
  },
  overrides: [
    {
      env: {
        development: {
          plugins: ['./code-push-babel-plugin'],
        },
      },
    },
  ],
};

module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  root: true,
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint/eslint-plugin', 'prettier'],
  rules: {
    'prettier/prettier': ['error'],
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-console': 0,
    'no-param-reassign': [
      0,
      {
        props: false,
      },
    ],
    'no-new': 0,
    'import/no-unresolved': 0,
    'import/extensions': 0,
    'import/no-extraneous-dependencies': 0,
    'arrow-parens': 0,
    'max-classes-per-file': 0,
    'prefer-destructuring': [
      'error',
      {
        object: false,
        array: false,
      },
    ],
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    quotes: ['error', 'single'],
    'implicit-arrow-linebreak': 0, // Incompatible with prettier
    'operator-linebreak': [
      2,
      'after',
      {
        overrides: {
          '?': 'before',
          ':': 'before',
        },
      },
    ], // Incompatible with prettier
    'object-curly-newline': 'off', // Incompatible with prettier
    'function-paren-newline': 'off', // Incompatible with prettier
    'import/prefer-default-export': 'off',
    'linebreak-style': 'off',
  },
};

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  extends: ['airbnb-typescript', 'prettier'],
  parserOptions: {
    project: './tsconfig.json',
    extraFileExtensions: ['.json'],
  },
  rules: {
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
    'import/no-cycle': 'off',
    'no-nested-ternary': 'off',
    'prettier/prettier': 'error',
    'react/jsx-props-no-spreading': 'off',
    'react/no-array-index-key': 'warn',
    'react/prop-types': 'off',
    'no-param-reassign': 'off',
    'prefer-promise-reject-errors': 'off',
    'func-names': 'off',
    'no-plusplus': 'off',
    'consistent-return': 'off',
    '@typescript-eslint/return-await': 'off'
  },
};

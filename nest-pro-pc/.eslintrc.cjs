module.exports = {
  env: { browser: true, es2020: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['react-refresh'],
  ignorePatterns: ['*.html'],
  rules: {
    'react-refresh/only-export-components': 'warn',
  },
  settings: {
    'import/resolver': {
      alias: {
        map: ['@', './src/*'],
        extensions: ['.ts', '.tsx'],
      },
    },
  },
};

// eslint-disable-next-line no-undef
module.exports = {
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  extends: [
    'prettier/prettier',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'prettier',
  ],
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
    'no-undef': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    'vue/multi-word-component-names': 'off',
  },
  plugins: ['@typescript-eslint'],
  root: true,
};

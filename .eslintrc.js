/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    // 这个是 vue/xxx 规则
    'plugin:vue/vue3-essential',
    // 这个是@typescript-eslint内置的一些rules
    'plugin:@typescript-eslint/recommended',
    // 这个是屏蔽掉prettier有的eslint规则，防止冲突
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'prettier/prettier': 'warn',
  },
};

/** @type {import('eslint').Linter.Config} */
const config = {
  extends: ["plugin:@next/next/recommended"],
  plugins: [
    'eslint-plugin-react-compiler',
  ],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "@typescript-eslint/require-await": "off",
    'react-compiler/react-compiler': "error",
  },
};

module.exports = config;

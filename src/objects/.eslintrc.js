/* eslint-disable indent */
/* eslint-disable array-element-newline */
/* eslint-disable quote-props */
module.exports = {
  env: {
    browser: true,
    es2021: true,
    resolve: {
      extensions: [".ts", ".js"],
    },
  },
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/jsx-runtime",
    "eslint:all",
    "plugin:react/all",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
  },
};

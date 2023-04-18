module.exports = {
    parser: "@babel/eslint-parser",
    env: {
        browser: true,
        es2020: true,
    },
    extends: "eslint:recommended",
    parserOptions: {
        ecmaVersion: 11,
        sourceType: "module",
    },
    rules: {},
};

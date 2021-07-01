module.exports = {
    env: {
        es6: true,
        node: true,
    },
    extends: ['eslint:recommended', 'plugin:prettier/recommended'],
    plugins: ['prettier'],
    rules: {
        'prettier/prettier': 'error',
        'no-console': 'error',
        curly: ['error', 'all'],
        'prefer-arrow-callback': 'error',
        'one-var': ['error', 'never'],
        'no-var': 'error',
        'prefer-const': 'error',
    },
    parserOptions: {
        ecmaVersion: 2020,
    },
};

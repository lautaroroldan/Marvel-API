module.exports = {
    'env': {
        'browser': true,
        'es2021': true
    },
    'extends': [
        '/node_modules/ts-standard/eslintrc.json',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended'
    ],
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'ecmaVersion': 'latest',
        'sourceType': 'module',
        'project': './tsconfig.json'
    },
    'plugins': [
        '@typescript-eslint',
        'react'
    ],
    'rules': {
        'react-refresh/only-export-components': 'warn',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/promise-function-async': 'off',
        '@typescript-eslint/no-floating-promises': 'off',
    }
}

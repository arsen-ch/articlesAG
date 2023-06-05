module.exports = {
    root: true,
    env: {
        browser: true,
        node: true
    },
    parserOptions: {
        parser: 'babel-eslint'
    },
    extends: [
        '@nuxtjs',
        'plugin:nuxt/recommended'
    ],
    rules: {
        'array-bracket-spacing': [
            'error',
            'always'
        ],
        'computed-property-spacing': [
            'error',
            'always'
        ],
        indent: [
            'error',
            4
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'padded-blocks': [
            'error',
            {
                classes: 'always'
            }
        ],
        quotes: [
            'error',
            'single'
        ],
        semi: [
            'error',
            'always'
        ],
        'space-in-parens': [
            'error',
            'always'
        ],
        'space-before-function-paren': [
            'error', {
                anonymous: 'always',
                named: 'never',
                asyncArrow: 'always'
            }
        ],
        'yield-star-spacing': [
            'error', {
                before: false,
                after: true
            } ],
        'vue/html-indent': [
            'error',
            4
        ],
        'vue/multiline-html-element-content-newline': 'off',
        'vue/singleline-html-element-content-newline': 'off',
        'vue/max-attributes-per-line': 'off',
        'vue/html-self-closing': 'off',
        'vue/html-closing-bracket-newline': 'off'
    }
};

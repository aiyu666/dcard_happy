module.exports = {
    "env": {
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "extends": [
        "airbnb-base"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018
    },
    'rules': {
        'object-curly-spacing': ["error", "always"],
        'indent': ["error", 4],
        'new-cap': ["error", { "newIsCapExceptionPattern": "^Buffer\.." }],
    },
};
module.exports = {
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true,
            "modules": true,
            "experimentalObjectRestSpread": true
        },
    },
    "parser": "babel-eslint",
    "plugins": [
        "jest",
        "prettier"
    ],
    "env": {
        "browser": true,
        "jest/globals": true
    },
    "extends": [
        "airbnb-base",
        "plugin:prettier/recommended",
        "plugin:react/recommended"
    ],
    "rules": {
        "quotes": [2, "single"],
        "no-console": 0,
        "max-len": [2, 80],
        "arrow-body-style": 0,
        "arrow-parens": 0,
        "jsx-a11y/href-no-hash": "off",
        "react/prop-types": 0,
        "no-case-declarations": 0,
        "import/no-extraneous-dependencies": 0,
        "no-underscore-dangle": 0,
        "prettier/prettier": ["error", {
            "singleQuote": true,
            "trailingComma": "all",
            "jsxBracketSameLine": true,
            "parser": "flow"
        }]
    }
};

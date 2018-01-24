module.exports = {
    "parser": "babel-eslint",
    "plugins": ["jest"],
    "env": {
        browser: true,
        "jest/globals": true,
    },
    "extends": "airbnb",
    "rules": {
        "react/jsx-filename-extension": 0,
        "react/prop-types": 0,
        "max-len": [2, 80],
        "arrow-parens": 0,
    },
};

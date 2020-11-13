module.exports = {
    root: true,
    env: {
        node: true,
        "es6": true
    },
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
        "indent": ["error", 4],
        "semi": ["error", "always"],
        "comma-dangle": ["error", "always-multiline"],
        "eol-last": ["error", "never"],
        "quotes": ["error", "single"],
        "no-mixed-operators": [
            "error",
            {
                "groups": [
                    ["==", "!=", "===", "!==", ">", ">=", "<", "<="],
                ],
            },
        ],
    },
    parserOptions: {
        parser: "babel-eslint",
        "ecmaVersion": 6,
    },
};
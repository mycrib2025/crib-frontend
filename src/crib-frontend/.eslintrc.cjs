// .eslintrc.cjs
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    // ✅ React allows default exports
    "import/no-default-export": "off",

    // 🚫 Prevent multiple default exports (Babel also enforces this)
    "no-restricted-syntax": [
      "error",
      {
        selector: "ExportDefaultDeclaration",
        message: "Only ONE default export per file is allowed.",
      },
    ],

    // Optional quality-of-life rules
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
  },
};
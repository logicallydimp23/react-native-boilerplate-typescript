module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: [
    "@typescript-eslint",
    "react",
  ],
  extends: ["airbnb-typescript"],
  parserOptions: {
    project: ["./tsconfig.eslint.json"],
  },
  settings: {
    "import/resolver": {
      typescript: {},
    },
  },
  globals: {
    FormData: true,
  },
  rules: {
    semi: "off",
    "@typescript-eslint/semi": [0],
    "prettier/prettier": 0,
    "react/jsx-filename-extension": "off",
    "react/prefer-stateless-function": [0, { ignorePureComponents: false }],
    "react/prop-types": [
      "error",
      {
        ignore:
          [
            "navigation",
            "dispatch",
            "auth",
          ],
      },
    ],
    "no-underscore-dangle": ["error", { allow: ["_navigator", "_id", "_root"] }],
    "arrow-parens": ["error", "as-needed"],
    "import/no-unresolved": 2,
    "no-console": "error",
    "max-len": 0,
    "react/forbid-prop-types": [0],
    "no-unused-expressions": ["error", { allowShortCircuit: false, allowTernary: true }],
    "vars-on-top": 2,
    "require-await": 2,
    "no-await-in-loop": 2,
    "no-return-await": 2,
    "no-multi-spaces": ["error", { ignoreEOLComments: false }],
    "func-style": ["error", "declaration", { allowArrowFunctions: true }],
    "linebreak-style": [0, "unix"],
    "react/jsx-props-no-spreading": [0, {
      custom: "ignore",
    }],
    quotes: "off",
    "@typescript-eslint/quotes": [2, "double", { avoidEscape: true }],
    camelcase: [
      "error",
      {
        allow:
          [
            "UNSAFE_componentWillMount",
            "UNSAFE_componentWillUpdate",
          ],
      },
    ],
    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: "variable",
        format: ["camelCase", "PascalCase", "UPPER_CASE"],
      },
    ],
    "react/static-property-placement": [0, "property assignment"],
    "func-names": ["error", "never"],
  },
};

module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "extends": [
    "eslint:recommended"
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "settings": {},
  "plugins": [],
  "rules": {
    "eqeqeq": ["error", "always"],
    "arrow-parens": ["error", "as-needed"],
    "indent": [
      "error",
      2,
      {
        "SwitchCase": 1,
        "ignoredNodes": [ "JSXAttribute", "JSXSpreadAttribute", ],
      }
    ],
    "max-len": [
      "error",
      {
        "ignoreTrailingComments": true,
        "ignoreComments": true,
        "code": 100
      }
    ],
    "linebreak-style": [
      0,
      "unix"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "always"
    ]
  }
};

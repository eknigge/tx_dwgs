module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'standard'
  ],
  overrides: [
    {
      files: [
        '*.js',
        '*.jsx'
      ]
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: [
    'react',
    'jsx-a11y'
  ],
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    'no-unreachable-loop': 'off',
    'react/prop-types': 'off'
  }
}

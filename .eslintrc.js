module.exports = {
  extends: [ 'standard', 'standard-react' ],
  plugins: [ 'import' ],
  parser: 'babel-eslint',
  rules: {
    'import/order': ['error',{'newlines-between': 'always'}],
  }
}

const path = require('path');

module.exports = {
  mode: 'development',
  entry: './demo/js/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'demo/js')
  },
};

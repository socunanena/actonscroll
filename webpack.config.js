const path = require('path');

module.exports = {
  mode: 'development',
  entry: './example/js/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'example/js')
  },
};

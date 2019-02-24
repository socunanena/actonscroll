const path = require('path');

module.exports = {
  mode: 'development',
  entry: './example/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'example')
  },
};

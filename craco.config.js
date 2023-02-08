const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@lib': path.resolve(__dirname, 'src/lib'),
      '@demo': path.resolve(__dirname, 'src/demo'),
    },
  },
};
const path = require('path');

// Keeps the original "@/..." import alias used throughout the recovered source.
module.exports = {
  webpack: {
    alias: { '@': path.resolve(__dirname, 'src') },
  },
};

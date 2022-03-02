const path = require('path');
const server = process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : 'http://allper.powwwer.io';

module.exports = {
  reactStrictMode: true,

  webpack: (config, options) => {
    config.resolve.alias.fonts = path.join(__dirname, './src/public/assets/fonts');
    return config
  },

  sassOptions: {
    includePaths: [
      path.join(__dirname, './src/styles'),
      path.join(__dirname, './src/public/assets'),
    ]
  },

  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${server}/api/:path*`
      }
    ]
  }
}

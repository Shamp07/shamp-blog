const { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_SERVER } = require('next/constants');
const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');
const path = require('path');

const multerConfig = require('./config/multer-s3-config.json');

module.exports = withPlugins([withImages], {
  [PHASE_DEVELOPMENT_SERVER]: {
    env: {
      BASE_PATH: 'http://localhost',
    },
  },
  [PHASE_PRODUCTION_SERVER]: {
    env: {
      BASE_PATH: 'https://shamp.kr',
    },
  },
  images: {
    domains: [multerConfig.bucketURL],
  },
  exclude: path.resolve(__dirname, 'assets/icon'),
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
});

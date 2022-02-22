const { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } = require('next/constants');
const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');
const path = require('path');

const multerConfig = require('./config/multer-s3-config.json');

const DEVELOPMENT_BASE_PATH = 'https://dev.shamp.kr';
const PRODUCTION_BASE_PATH = 'https://shamp.kr';

module.exports = withPlugins([withImages], {
  [PHASE_DEVELOPMENT_SERVER]: {
    env: {
      BASE_PATH: DEVELOPMENT_BASE_PATH,
    },
  },
  [PHASE_PRODUCTION_BUILD]: {
    env: {
      BASE_PATH: PRODUCTION_BASE_PATH,
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

    config.module.rules.push({
      test: /\.(eot|woff|woff2|ttf)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000,
          name: '[name].[ext]',
        },
      },
    });

    return config;
  },
});

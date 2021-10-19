const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');
const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');
const path = require('path');
const withBundleAnalyzer = require('@next/bundle-analyzer');

module.exports = withPlugins([], {
  [PHASE_DEVELOPMENT_SERVER]: {
    env: {
      BASE_PATH: 'http://localhost',
    },
  },
  exclude: path.resolve(__dirname, 'assets/icon/*.svg'),
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
});

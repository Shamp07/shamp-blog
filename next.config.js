const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');
const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');
const path = require('path');
const withBundleAnalyzer = require('@next/bundle-analyzer');

module.exports = withPlugins([withImages, withBundleAnalyzer], (phase, { defaultConfig }) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  const env = {
    BASE_PATH: isDev ? 'http://localhost' : 'https://shamp.kr',
  };

  return {
    ...defaultConfig,
    env,
    exclude: path.resolve(__dirname, 'assets/icon'),
    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      });
    },
  };
});

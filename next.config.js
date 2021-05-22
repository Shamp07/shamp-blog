const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');
const path = require('path');

module.exports = (phase) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  const env = {
    BASE_PATH: (() => {
      if (isDev) return 'http://localhost';
      return 'https://shamp.kr';
    })(),
  };

  const webpack = (config) => {
    config.resolve = {
      alias: {
        '@src': path.join(__dirname, 'src'),
        '@store': path.join(__dirname, 'stores'),
      },
      ...config.resolve,
    };
    return config;
  };

  return {
    env,
    webpack,
  };
};

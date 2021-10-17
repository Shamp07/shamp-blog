const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');
const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');

module.exports = withPlugins([withImages], (phase) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  const env = {
    BASE_PATH: isDev ? 'http://localhost' : 'https://shamp.kr',
  };

  return {
    env,
  };
});

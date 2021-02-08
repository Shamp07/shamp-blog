const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  const env = {
    BASE_PATH: (() => {
      if (isDev) return 'http://localhost';
      return 'http://shamp.kr';
    })(),
  };

  return {
    env,
  };
};

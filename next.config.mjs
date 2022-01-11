import { fileURLToPath } from 'url'
import { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_SERVER } from 'next/constants.js';
import withPlugins from 'next-compose-plugins';
import withImages from 'next-images';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename);

const nextConfig = withPlugins([withImages], {
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
  exclude: path.resolve(__dirname, 'assets/icon'),
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
});

export default nextConfig;

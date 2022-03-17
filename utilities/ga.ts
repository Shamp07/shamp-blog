import gaConfig from '@config/ga-config.json';

declare global {
  interface Window {
    gtag: (param1: string, param2: string, param3: object) => void;
  }
}

// eslint-disable-next-line import/prefer-default-export
export const pageView = (url: string) => {
  window.gtag('config', gaConfig.googleAnalyticsTrackingID, {
    page_path: url,
  });
};

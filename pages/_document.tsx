import React from 'react';
import {
  Html, Head, Main, NextScript,
} from 'next/document';

import gaConfig from '@config/ga-config.json';

/* eslint-disable react/no-danger */
const Document = () => (
  <Html>
    <Head>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${gaConfig.googleAnalyticsTrackingID}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaConfig.googleAnalyticsTrackingID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;

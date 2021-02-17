import Document, {
  Html, Main, NextScript, Head,
} from 'next/document';
import React from 'react';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="ko">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

import flush from 'styled-jsx/server';
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@material-ui/styles';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => ({
            ...sheet.collectStyles(<App {...props} />),
            ...sheets.collect(<App {...props} />),
          }),
        });
      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <React.Fragment>
            {sheets.getStyleElement()}
            {sheet.getStyleElement()}
            {flush() || null}
          </React.Fragment>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <html type="text/html">
        <Head>
          <link rel="icon" href="../../static/common/favicon.jpg" type="image/x-icon" />
          <meta name="viewport" content="initial-scale=1.0, viewport-fit=cover, width=device-width" />
          <meta name="google-site-verification" content="ZjST6veyKcEgE_FmGkg5FJLdWDrgTwHVDz5rW_rsPcE" />
          <link rel="stylesheet" href="https://unpkg.com/swiper/css/swiper.min.css" />
          <script src="../package/js/swiper.min.js" />
          <title>影城通｜跨影城選位預訂平台｜線上電影月租看到飽</title>
          {this.props.styleTags}
        </Head>
        <body style={{ margin: '0px' }}>
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-KHC9WZW"
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
          <Main />
          <NextScript />
          <script src="https://unpkg.com/swiper/js/swiper.min.js" />
        </body>
      </html>
    );
  }
}

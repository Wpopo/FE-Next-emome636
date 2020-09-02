import App from 'next/app';
import store from 'Store';
import { Provider } from 'react-redux';
import { withRouter } from 'next/router';
import Header from 'Components/common/Header';
import Footer from 'Components/common/Footer';
import { MuiThemeProvider } from '@material-ui/core/styles';
import muiTheme from 'Styled/materialUITheme';
import { EZDingWrapper } from 'Styled/commonStyled';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={muiTheme}>
          <Header>
            <title>影城通｜跨影城選位預訂平台｜線上電影月租看到飽</title>
          </Header>
          <EZDingWrapper>
            <Component {...pageProps} />
          </EZDingWrapper>
          <Footer />
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default withRouter(MyApp);

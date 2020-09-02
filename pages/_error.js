import React from 'react';
import Error from 'next/error';
import HeadMeta from '../components/headMeta';
import Buttom from '@material-ui/core/Button';
// import Navbar from '../components/common/navbar';
// import CinemaEntry from '../components/common/cinemaEntry';
// import Footer from '../components/common/footer';

export default class InitialError extends React.Component {
  render() {
    const divStyle = {
      width: '100%',
      height: 600,
      backgroundColor: '#535664',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    };

    const imgStyle = {
      width: 240,
      height: 150,
      margin: '0 auto',
      display: 'block',
      paddingTop: 135,
    };
    const textStyle = {
      width: '346px',
      height: '24px',
      fontSsize: '17.1px',
      color: '#ffffff',
    };

    return (
      <div>
        <HeadMeta />
        {/* <Navbar url={this.props.url}/> */}
        <div style={divStyle}>
          <img src={'/static/icon/error.png'} style={imgStyle} />
          <div style={textStyle}>頁面暫時沒有回應或發生錯誤，請稍後再試看看</div>
          <br />
          <Buttom
            variant="outlined"
            onClick={() => {
              location.href = '/';
            }}
          >
            回首頁
          </Buttom>
        </div>
        {/* <CinemaEntry /> */}
        {/* <Footer /> */}
      </div>
    );
  }
}

import HeadMeta from '../components/headMeta';
import Buttom from '@material-ui/core/Button';

const bookingError = () => {
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
    width: '240px',
    fontSsize: '17.1px',
    color: '#ffffff',
  };

  return (
    <div>
      <HeadMeta />
      {/* <Navbar url={this.props.url}/> */}
      <div style={divStyle}>
        <img src={'/static/icon/error_card.png'} style={imgStyle} />
        <div style={textStyle}>本次交易未完成，可能是:</div>
        <div style={textStyle}>1. 信⽤卡資訊輸入錯誤</div>
        <div style={textStyle}>2. 銀⾏系統忙碌或連線逾時</div>
        <div style={textStyle}>3. 其他信用卡交易限制</div>
        <br />
        <div style={textStyle}>本交易不會收取費用，請您放心！</div>
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
};

export default bookingError;

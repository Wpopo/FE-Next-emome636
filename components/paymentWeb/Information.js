import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import Helper from 'Lib/helper';
import Drawer from '@material-ui/core/Drawer';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { setView } from 'Actions/payment/mainActions';
// import AlertDialog from 'Components/common/EzAlertDialog';
import Palette from 'Styled/palette';
import { withStyles } from '@material-ui/core/styles';

let productList = null;
// let isShowAlert = false;
const Information = ({ ...props }) => {
  const { view, setView, movieInfo, orderInfo, classes } = props;

  productList = Helper.payment.getInformatData();

  const totalMoney = productList[0];

  const [open, setOpen] = useState(false);

  const toggleDrawer = (event) => {
    if (event.type === 'keydown') return;
    // if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
    //   return;
    // }
    setOpen(false);
  };

  if (productList === null) return null;
  return (
    <div className={classes.root}>
      <div className={`switch ${open ? 'active' : ''}`} aria-label="delete" onClick={() => setOpen(!open)}>
        <ExpandMoreIcon className={open ? 'open' : 'close'} />
      </div>
      <Drawer className="markpoint" anchor="bottom" open={open} onClick={(e) => toggleDrawer(e)}>
        <Content money={totalMoney} {...props} />
      </Drawer>
      <div className="bottom_fixed">
        <div className={`${classes.bottomWrap}`}>
          {/* 總金額計算 */}
          <MoneyContent money={totalMoney} setView={setView} view={view} orderInfo={orderInfo} {...props} />
        </div>
      </div>
    </div>
  );
};

const Content = ({ money = 0, ...props }) => {
  const { movieInfo, classes } = props;
  return (
    <Fragment>
      <div className={classes.content}>
        <MovieInfoUI info={movieInfo} />
      </div>
      <Divider className={classes.line} />
      <div className={classes.bottomWrap}>
        {/* 總金額計算 */}
        <MoneyContent money={money} />
      </div>
    </Fragment>
  );
};

// 上方電影資訊
const MovieInfoUI = ({ info = {} }) => {
  if (info.size <= 0) return null;
  // info = {
  //   cinema_name: '台北日新威秀影城',
  //   ecd_id: '40288eb0050f542401050f551a8a48c3',
  //   ecm_id: '6d4546f78d574a5bb9a3f3b3eeb2a4e4',
  //   erp_product_code: [('301112007', '301112003', '301111012', '301111011')],
  //   ez_trans_master_id: '1033f0e447974348bb6c08a5d72332c6',
  //   hall_name: '旗艦大廳 1廳',
  //   movie_id: '6a881b0d57fe4618bd57feb1302b75ba',
  //   movie_name: '(數位)返校',
  //   poster_url: 'http://l10l010l3322ll.photos.atmovies.com.tw:8080/2019/B/fbcn27931333/poster/px_fbcn27931333_0004.jpg',
  //   // seats:
  //   //   '0000000001;1;1;9@@J排3號,0000000001;1;1;8@@J排4號,0000000001;1;1;9@@J排5號,0000000001;1;1;8@@J排6號,0000000001;1;1;9@@J排7號,0000000001;1;1;8@@J排8號',
  //   seats: '1-7@@10-7,1-6@@10-6,1-5@@10-5',
  //   show_date: 1572364800000,
  //   show_time: 1572405600000,
  // };
  return (
    <Fragment>
      {/* 海報 */}
      <img className="poster" src={info.poster_url} />
      <div className="infoBoxWrap">
        {/* 影城資訊 */}
        <div className="info_left">
          <div className="movie_name">{info.movie_name}</div>

          <div className="infoWrap">
            <div className="cinema_name">{info.cinema_name}</div>
          </div>
          <div className="infoWrap">
            <div className="sub_title">廳別</div>
            <div>{info.hall_name}</div>
          </div>
          <div className="infoWrap">
            <div className="sub_title">版本</div>
            <div>{info.hall_name}</div>
          </div>
          <div className="infoWrap">
            <span className="sub_title">日期</span>
            <span>{Helper.datetime.MsToformat(info.show_date, 'MM.DD')}</span>
          </div>
          <div className="infoWrap">
            <span className="sub_title">時間</span>
            <span>{Helper.datetime.MsToformat(info.show_time, 'HH:mm')}</span>
          </div>

          <div className="infoWrap">
            <span className="sub_title">座位</span>
            <div className="chips">
              {info.seats.split(',').map((seat) => (
                <span className="chip" key={seat}>
                  {seat.split('@@')[1]}
                </span>
              ))}
            </div>
          </div>
        </div>
        {/* 訂票明細 */}
        <div className="info_right">
          <div className="title">訂票明細</div>
          <MovieTicket />
        </div>
      </div>
    </Fragment>
  );
};

// 電影票
const MovieTicket = () => {
  const list = productList[1];
  // 無選擇商品，則跳出
  if (list.length <= 0) return null;

  return list.map((ticket) => (
    <Fragment key={ticket.id + ticket.code}>
      <div className="ticketWrap">
        <span>{ticket.name}</span>
        <div className="info">
          <span>{Helper.data.formatPaymentPrice(ticket.price, ticket.point)}</span>
          <span className="quantity">{`x${ticket.quantity}`}</span>
        </div>
      </div>
    </Fragment>
  ));
};

const bookingProcess = (money, setView, view, orderInfo) => {
  if (view === 'selectProduct') {
    const qua = orderInfo.seat_idx_list.split(',').length;
    let qua2 = 0;
    const list = productList[1];
    if (list.length > 0) list.map((ticket) => (qua2 += ticket.quantity));

    if (qua !== qua2) {
      alert('訂票數量錯誤');
    } else {
      setView('checkOut');
    }
  } else {
    document.getElementById('checkOutBtn').click();
  }
};

// 資訊欄 下方自付額總覽
const MoneyContent = ({ money = 0, setView, view, orderInfo, ...props }) => {
  const inf = view === 'selectProduct' ? '前往結帳' : '完成訂票';

  return (
    <Fragment>
      <span className="priceWrap">
        選購完成,自付額
        <span className="price">{money}</span>元
      </span>
      <Button
        variant={money > 0 ? 'contained' : 'outlined'}
        disabled={!money > 0}
        onClick={() => bookingProcess(money, setView, view, orderInfo)}
      >
        {inf}
      </Button>
      {/* <Fragment>
        //警告訊息
        <AlertDialog
          open={isShowAlert}
          handleClose={() => (isShowAlert = false)}
          title={'資料錯誤'}
          context={'訂票數量錯誤'}
        />
      </Fragment> */}
    </Fragment>
  );
};

const styles = (theme) => ({
  root: {
    // 下方開闔 開關
    '& .switch': {
      left: '50%',
      width: '14px',
      borderWidth: '0 8px 14px 8px',
      borderStyle: 'none solid solid',
      borderColor: `transparent transparent ${Palette.SECOND[80]}`,
      cursor: 'pointer',
      'z-index': '1500',
      '& .MuiSvgIcon-root': {
        position: 'absolute',
        bottom: '-18px',
        left: '-8px',
        width: '30px',
        height: '22px',
        '&.close': {
          transform: 'rotate(180deg)',
          transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
          }),
        },
        '&.open': {
          transform: 'rotate(0deg)',
          transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
          }),
        },
      },
      '&:after': {
        content: '""',
        width: '100vw',
        height: '1px',
        display: 'block',
        backgroundColor: Palette.SECOND[80],

        left: 0,
      },
    },
    // 移動特效
    '& .switch,& .switch:after': {
      position: 'fixed',
      'transition-property': 'all',
      'transition-duration': '.350s',
      'transition-timing-function': 'cubic-bezier(0, 1, 0.5, 1)',
      bottom: 76,
      [theme.breakpoints.down('sm')]: {
        bottom: 88,
      },
    },
    // 動態移動距離
    '& .switch.active,& .switch.active:after': {
      // 取決 Drawer 的高度
      // 可至materialUITheme -> MuiDrawer 找設定
      bottom: 270,
      // pad
      [theme.breakpoints.down('md')]: {},
      // mobile
      [theme.breakpoints.down('sm')]: {
        bottom: 380,
      },
    },
    // 下方 按鈕控制區
    '& .bottom_fixed': {
      position: 'fixed',
      bottom: 0,
      left: 0,
      width: '100%',
      height: '76px',
      margin: 'auto',
      backgroundColor: Palette.FIFTH[100],
      [theme.breakpoints.down('sm')]: {
        height: '88px',
      },
    },
  },
  // 資訊欄 內容
  content: {
    display: 'flex',
    width: '650px',
    height: '185px',
    margin: '16px auto 8px auto',
    fontSize: '14px',
    color: '#FFFFFF',
    '& .poster': {
      width: '55px',
      height: '80px',
      padding: '0 24px 0 0',
    },
    '& .infoWrap, & .infoBoxWrap': {
      display: 'flex',
      '& .info_left': { paddingRight: '60px' },
      '& .movie_name': { paddingBottom: '8px', fontSize: '18px' },
      '& .cinema_name': { paddingBottom: '8px', color: Palette.FIFTH[10] },
      '& .sub_title, & .title': {
        color: Palette.FIFTH[30],
        padding: '0 8px 8px 0',
      },
      '& .chip': { paddingRight: '4px' },
    },
    '& .ticketWrap': {
      width: '300px',
      paddingBottom: '8px',
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '16px',
      '& .quantity': { paddingLeft: '16px' },
    },
    '& .line': { border: `1px solid ${Palette.FIFTH[60]}` },
    // pad
    [theme.breakpoints.down('md')]: {},
    // mobile
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px',
      width: 'calc(100% - 48px)', // 左右padding 24px
      height: '100%',
      '& .poster': {
        width: '48px',
        height: '70px',
        padding: '0 8px 0 0',
      },
      '& .infoBoxWrap': {
        flexDirection: 'column',
        width: '100%',
        '& .info_left': { paddingRight: 'unset !important' },
        '& .info_right': { paddingTop: '8px' },
        '& .movie_name': { fontSize: '12px !important' },
        '& .title': { position: 'absolute', margin: '0 0 0 -64px' },
        '& .ticketWrap': {
          width: '100%',
          maxWidth: '300px',
          fontSize: '12px',
          '& .quantity': { paddingLeft: '16px' },
        },
      },
    },
  },
  line: {
    width: '1024px',
    margin: 'auto',
    backgroundColor: Palette.FIFTH[50],
    // pad
    [theme.breakpoints.down('md')]: {
      width: 'calc(100% - 48px)', // 左右padding 24px
    },
    // mobile
    [theme.breakpoints.down('sm')]: {},
  },
  // bottom 按鈕 & 金額
  bottomWrap: {
    width: '700px',
    height: '100%',
    margin: 'auto',
    padding: '8px 0',
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '14px',
    color: '#FFFFFF',
    '& button': { width: '270px' },
    '& .price': {
      paddingLeft: '4px',
      color: Palette.FIRST[30],
    },
    // pad
    [theme.breakpoints.down('md')]: {
      width: 'calc(100% - 48px)', // 左右padding 24px
    },
    // mobile
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      '& .priceWrap': { paddingBottom: '8px' },
      '& button': { width: '100%', maxWidth: '270px' },
    },
  },
});

export default connect(
  (state) => ({
    view: state.getIn(['payment', 'main', 'view']),
    movieInfo: state.getIn(['payment', 'main', 'movieInfo']),
    // preferential: state.getIn(['preferential']),
    ticketList: state.getIn(['payment', 'product', 'ticketList']),
    orderInfo: state.getIn(['payment', 'main', 'orderInfo']),
  }),
  (dispatch) => ({
    setView(view) {
      dispatch(setView(view));
    },
  }),
)(withStyles(styles)(Information));

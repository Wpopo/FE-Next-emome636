import React, { useRef, useState, useLayoutEffect } from 'react';
// import dynamic from 'next/dynamic';
import Router from 'next/router';
import Helper from 'Lib/helper';
import CONSTANT from 'CONSTANTS';
import API from 'CONSTANTS/API/movieInfoAPI';
import IMAGE from 'CONSTANTS/image';
import ButtomControl from 'Components/movieInfo/movieTimeBottom';
import Buttom from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme, withStyles } from '@material-ui/core/styles';
import Palette from 'Styled/palette';

/**
 * 重點一
 * 請不要在此頁處理任何登入相關事項
 * 請導頁至Login.js處理
 * 包含未來可能導入的第三方串接
 *
 * 重點二
 * 此Component註解的部分為 IScroll 功能
 * 可以實現在web版時，使用鼠標進行拖曳
 * 原先功能有實作成功，但還有cb渲染及SSR問題
 * 功能上還需要優化，但時間來不及了....
 * 希望下一個人能繼承衣缽
 */
const seatMap = ({ classes }) => {
  // 最多可選擇做位張數
  const maxSeatNum = 6;
  // 電影座位表
  const [seatTable, setSeatTable] = useState([]);
  // 目前選擇座位 (陣列)
  const [arrSelSeat, setArrSelSeat] = useState({});
  // 電影資訊
  const [movieInfo, setMovieInfo] = useState(null);
  // payment web 所需資訊
  const [paymentData, setPaymentData] = useState({});

  const theme = useTheme();
  const is_SM_Screen = useMediaQuery(theme.breakpoints.down('sm'));

  // const DynamicComponentWithNoSSR = isScroll
  //   ? null
  //   : dynamic(() =>
  //       import('Assets/iscroll/iscroll-probe').then(
  //         mod => {
  //           console.log(mod);
  //           build(mod.default);
  //         },
  //         { ssr: false },
  //       ),
  //     );

  useLayoutEffect(() => {
    // 取得 session_id
    const session_id = Helper.data.getUrlParam().session_id;
    // 取得指定電影場次座位資訊
    fetch_seat_detail(session_id);
  }, []);

  // 建置 Scroll
  // const build = IScroll => {
  //   myScroll = new IScroll('#scroller', {
  //     scrollbars: 'custom',
  //     scrollX: true,
  //     scrollY: true,
  //     lockDirection: true,
  //     preventDefault: false,
  //     zoom: true,
  //     eventPassthrough: true,
  //   });
  // };

  // 取得指定電影場次座位資訊
  const fetch_seat_detail = (session_id) => {
    Helper.axios.fetch(
      API.SHOWTIME.GET_SEAT_DETAIL(session_id),
      (cb) => {
        // 座位表
        if (cb.seat_table.length > 0) setSeatTable(cb.seat_table);
        // 本頁所需顯示 電影資訊
        setMovieInfo({
          movie_title: cb.booking_info.movie_title.zh_tw,
          cinema_name: cb.booking_info.cinema_name.zh_tw,
          movie_version: cb.booking_info.movie_version,
          time: Helper.datetime.MsToformatObj(cb.booking_info.show_time),
          hall: cb.booking_info.hall_name,
          poster: cb.booking_info.poster_url,
        });

        // payment web 所需資訊
        setPaymentData({
          // URL 參數取得 下方為預設值(636 目前下方不會有其他值)
          // * 但如果有一天需要串第三方值 請至Login.js定義規則 不要直接在這隻檔案處理 *
          channel_code: 'emome636',
          campaign_code: 'rwdweb',
          options: 'movieInfo:true',
          // param
          session_id,
          // cb param
          movie_id: cb.booking_info.movie_id,
          cinema_id: cb.booking_info.cinema_id,
          cinema_trans_id: cb.cinema_trans_id,
          transaction_id: cb.transaction_id,
          // 選位資訊
          hall_id: cb.seat_data.hall_id,
          area_category_code: cb.seat_data.area_category_code,
          area_num: cb.seat_data.area_num,
          seat_idx_list: '',
        });
      },
      {
        errorFn: () => {
          console.log('error123');
          Router.push({ pathname: '/movieInfo' });
        },
      },
    );
  };

  // 設定選擇的座位
  const setSelectSeat = (key, status, seatNum) => {
    // 此座位狀態已被售出，或者為走道，則直接跳出
    if (status === 'saled' || status === 'none') return;

    const obj = { ...arrSelSeat };

    // 判斷此座位是否已被選
    if (obj[key] === undefined) {
      // 此座位尚未被選取
      // 若已達最大可選張數，則跳出
      if (Object.keys(arrSelSeat).length >= maxSeatNum) return;
      // 加入選取
      obj[key] = seatNum;
    } else {
      // 此座位尚已被選取
      // 取消此座位
      delete obj[key];
    }
    // 設定 目前選擇座位
    setArrSelSeat(obj);
    // 設定 payment web 所需資訊 => 選位資訊
    setPaymentData({ ...paymentData, seat_idx_list: Object.values(obj).join() });
  };

  return movieInfo !== null ? (
    <div className={classes.root}>
      {/* <DynamicComponentWithNoSSR /> */}

      {/* 上方資訊 */}
      <div className="movie_info_root">
        <div>
          <img className="poster" src={movieInfo.poster} />
        </div>
        <div className="movie_info">
          <div>{movieInfo.movie_title}</div>
          <div className="location">{movieInfo.cinema_name}</div>
          <div>
            <span className="title">廳別</span>
            <span className="data">{movieInfo.hall}</span>
            <span className="title">版本</span>
            <span className="data">{movieInfo.movie_version}</span>
          </div>
          <div>
            <span className="title">日期</span>
            <span className="data">{movieInfo.time.date}</span>
            <span className="title">時間</span>
            <span className="data">{movieInfo.time.time}</span>
          </div>
        </div>
      </div>
      {/* 目前選擇人數 */}
      <div className="people_num_wrap">
        目前選擇人數
        <span>{Object.keys(arrSelSeat).length}</span>位
      </div>
      {/* 座位表 */}
      {seatTable.length > 0 ? (
        <div className="emome_wrap">
          <div id="scroller" className="scroll-container Ez_Scroll_Bar">
            <EZ_SeatTable seatTable={seatTable} arrSelSeat={arrSelSeat} setSelectSeat={setSelectSeat} />
          </div>
        </div>
      ) : (
        456
      )}
      {/* 下方 控制項 */}
      <ButtomControl
        infoList={[
          {
            title: '座位',
            data: Object.entries(arrSelSeat).map(([key, seat]) => <span key={key}>{seat.split('@@')[1]}</span>),
          },
        ]}
        btnList={[
          // <Buttom key="1" variant="outlined">
          //   選擇座位
          // </Buttom>,
          <Buttom
            key="2"
            size={is_SM_Screen ? 'medium' : 'large'}
            variant="contained"
            disabled={Object.keys(arrSelSeat).length <= 0}
            onClick={() => {
              sessionStorage.setItem('bodyData', JSON.stringify(paymentData));
              // paymentInit : 第一次進行 結帳流程
              sessionStorage.setItem('paymentInit', true);
              sessionStorage.setItem('paymentViewInit', true);
              Router.push({ pathname: '/Login', query: { page: 'seatmap' } });
            }}
          >
            前往付費
          </Buttom>,
        ]}
      />
    </div>
  ) : null;
};

// 座位表
const EZ_SeatTable = ({ seatTable, arrSelSeat, setSelectSeat }) => {
  const targetRef = useRef();

  useLayoutEffect(() => {
    // 若element render完成
    // 自動將畫面 scroll至 座位圖正中央
    if (targetRef.current) {
      document.getElementsByClassName('scroll-container')[0].scrollLeft =
        (targetRef.current.offsetWidth - window.innerWidth) / 2;
    }
  }, []);

  // 設定每個座位的狀態
  const getStatus = (status) => {
    switch (status) {
      case 'empty':
        status = 'active';
        break;
      case 'TRANSPARENT':
        status = 'none';
        break;
      case 'appointment':
        status = 'saled';
        break;
      default:
        status = '';
        break;
    }
    return status;
  };

  return (
    <div className="emome" ref={targetRef}>
      {/* 示意圖 */}
      <div className="schematic_wrap">
        {/* 螢幕 */}
        <span className="monitor" />
        {/* 座位介紹 */}
        <div className="seat_introduction_wrap">
          <div className="seat_introduction">
            <span className="seat selected" />
            您的座位
          </div>
          <div className="seat_introduction">
            <span className="seat active" />
            未出售
          </div>
          <div className="seat_introduction">
            <span className="seat saled" />
            已售出
          </div>
        </div>
      </div>
      {/* 繪製座位表 */}
      <div className="seat_map_wrap">
        {seatTable.map((Rows, rowIdx) => (
          <div className="seat_row" key={rowIdx}>
            {Rows.map((seat, colIdx) => {
              const key = `${rowIdx}-${colIdx}`;
              const status = getStatus(seat.seat);
              return (
                <span
                  key={key}
                  className={`seat ${status}${arrSelSeat[key] !== undefined ? ' selected' : ''}`}
                  onClick={() => setSelectSeat(key, status, seat.tag)}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
const styles = (theme) => ({
  root: {
    '& .movie_info_root': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    // 上方資訊
    '& .poster': {
      width: '54px',
      height: '78px',
      margin: '0px 10px',
    },
    '& .movie_info': {
      padding: '40px 0 32px 0',
      fontSize: '18px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      flexDirection: 'column',
      color: '#FFFFFF',
      '& .location': {
        color: Palette.FIFTH[30],
        fontSize: '16px',
      },
      '& .title': {
        fontSize: '12px',
        color: Palette.FIFTH[30],
        paddingRight: '4px',
      },
      '& .data': { paddingRight: '16px' },
    },
    // 目前選擇人數
    '& .people_num_wrap': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#FFFFFF',
      fontSize: '14px',
      '& span': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '24px',
        height: '24px',
        margin: '0 8px',
        borderRadius: '5px',
        color: Palette.FIFTH[100],
        backgroundColor: Palette.FIRST[30],
      },
    },
    '& .emome_wrap': {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      padding: '8px 8px 140px 8px',
      '& .scroll-container': {
        display: 'flex',
        margin: 'auto',
        maxHeight: '75vh',
        maxWidth: '100%',
        overflow: 'auto',

        // '& .iScrollHorizontalScrollbar': {
        //   position: 'absolute',
        //   zIndex: '13',
        //   height: '5px',
        //   left: '24px',
        //   right: '24px',
        //   bottom: '0px',
        // },

        // '& .iScrollVerticalScrollbar': {
        //   position: 'absolute',
        //   zIndex: 13,
        //   width: '5px',
        //   bottom: '2px',
        //   top: '2px',
        //   right: '2px',
        // },

        // '& .iScrollIndicator': {
        //   height: '100%',
        //   backgroundColor: Palette.FIFTH[90],
        // },
      },
      '& .emome': {},
    },
    // 座位表
    // 示意圖
    '& .schematic_wrap': {
      paddingBottom: '30px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontSize: '14px',
      color: '#FFFFFF',
      '& .monitor': {
        background: `url(${IMAGE.OBJECT.monitor}) center no-repeat`,
        backgroundSize: 'contain',
        width: '450px',
        height: '55px',
        marginBottom: '8px',
      },
      '& .seat_introduction_wrap': {
        width: '260px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        '& .seat_introduction': {
          display: 'flex',
          alignItems: 'center',
          '& .seat': {
            width: '20px',
            height: '13px',
            margin: '0 8px 0 0',
          },
        },
      },
    },
    // 座位表
    '& .seat_map_wrap': {
      padding: '0 24px',

      '& .seat_row': {
        whiteSpace: 'nowrap',
      },
    },
    // 座位狀態
    '& .seat': {
      display: 'inline-block',
      borderRadius: '100px 100px 0 0',
      width: '22px',
      height: '16px',
      backgroundColor: '#FFFFFF',
      margin: '8px 8px 0 0',
      '&.active': { cursor: 'pointer' },
      '&.none': {
        backgroundColor: 'unset',
      },
      '&.selected': {
        backgroundColor: Palette.FIRST[30],
      },
      '&.saled': {
        backgroundColor: Palette.FIFTH[50],
      },
    },
    // Pad
    [theme.breakpoints.down('md')]: {},
    // mobile
    [theme.breakpoints.down('sm')]: {
      '& .seat': {
        width: '28px',
        height: '20px',
      },
    },
  },
});
export default withStyles(styles)(seatMap);

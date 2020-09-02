import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import Helper from 'Lib/helper';
import API from 'CONSTANTS/API/memberAPI';
import IMAGE from 'CONSTANTS/image';
import Record from 'Components/Member/Record';
import Redpoint from 'Components/Member/Redpoint';
import ToolTip from 'Components/common/ToolTip';
import Palette from 'Styled/palette';
import Buttom from '@material-ui/core/Button';
import { setRecordList } from 'Actions/member/memberActions';
import Hidden from '@material-ui/core/Hidden';
import { withStyles } from '@material-ui/core/styles';

const MemberCenter = ({ ...props }) => {
  const { recordList, classes } = props;

  // Bottom要Show的清單
  // 1: 會員紅利, 2:訂票紀錄
  const [showList, setShowList] = useState(2);
  const [memberInfo, setMemberInfo] = useState(null);
  const [memberPoint, setMemberPoint] = useState(null);
  const [isApply, setIsApply] = useState(null);

  useEffect(() => {
    fetch_member();
    fetch_is_apply();
    fetch_member_point();
    // 取得會員訂票清單及明細
    fetch_order_record(0);
    fetch_order_record(1);
  }, []);

  useEffect(() => {});

  // 取得會員訂票清單及明細
  // is_show=1 已開演
  // is_show=0 未開演
  const fetch_order_record = (is_show = 0) => {
    // 若已有資料 則不進行fetch
    //if (recordList.getIn([0, 0]) > 0) return;

    const { setRecordList } = props;
    Helper.axios.fetch(
      API.MEMBER.GET_ORDER_RECORD(is_show),
      (cb) => {
        if (cb.list.length > 0) {
          Immutable.fromJS(setRecordList(is_show, cb.list));
        }
      },
      {
        errorFn: () => {
          console.log('error123');
        },
      },
    );
  };

  const fetch_member = () => {
    if (memberInfo !== null) return;
    Helper.axios.fetch(
      API.MEMBER.GET_INFO(),
      (cb) => {
        // console.log(cb);
        setMemberInfo(cb);
      },
      {
        errorFn: () => {
          console.log('error123');
        },
      },
    );
  };

  const fetch_member_point = () => {
    if (memberInfo !== null) return;
    Helper.axios.fetch(
      API.MEMBER.GET_TOTAL_POINTS(),
      (cb) => {
        // console.log(cb);
        setMemberPoint(cb);
      },
      {
        errorFn: () => {
          console.log('error123');
        },
      },
    );
  };

  const fetch_is_apply = () => {
    Helper.axios.fetch(
      API.MEMBER.GET_SUB(),
      (cb) => {
        let is_apply = 'N';
        cb.map((item) => {
          if (item.is_apply === 'Y') {
            is_apply = 'Y';
          }
        });
        setIsApply(is_apply);
      },
      {
        errorFn: () => {
          //Router.push({ pathname: '/repairPage' });
          console.log('error123');
        },
      },
    );
  };

  return isApply !== null && memberInfo !== null && memberPoint !== null ? (
    <div className={classes.root}>
      {/* TOP - 個人資料 */}
      <div className={classes.top}>
        <div className="top_info">
          <div className="top_title">會員編號</div>
          <div className="top_data">{memberInfo.channel_uid}</div>
        </div>
        <div className="top_info">
          <div className="top_title">會員身份</div>
          <div className="top_data">{isApply == 'Y' ? 'VIP會員' : '一般會員'}</div>
        </div>
        <Buttom variant="contained">立即申租</Buttom>
      </div>
      {/* MIDDLE - 紅利點數 & 訂票紀錄 */}
      <div className={classes.middle}>
        <div className="mid_point border border_wrap">
          <div className="mid_titlewrap">
            <span className="title">
              紅利點數
              <ToolTip cusClass="tip" text="*本列表僅提供查詢７個月內訂單" />
            </span>

            <span className="list" onClick={() => setShowList(1)}>
              紅利列表
            </span>
          </div>
          <div className="point_wrap">
            <div className="point_round">
              <div className="point_num">{memberPoint.point_sum}</div>
              <div className="point_unit">點</div>
            </div>
          </div>
        </div>
        <div className="mid_record border border_wrap">
          <div className="mid_titlewrap">
            <span className="title">
              訂票紀錄
              <ToolTip cusClass="tip" text="＊申租加入影城通VIP會員，即享會員優惠贈點" />
            </span>
            <span className="list" onClick={() => setShowList(2)}>
              訂票列表
            </span>
          </div>
          <OrderRecord recordConfig={recordList.get(0).toJS()} />
        </div>
      </div>
      {/* BOTTOM - 會員紅利清單 or 訂票紀錄清單 */}
      <div className={`${classes.Bottom} ${showList === 1 ? 'first' : 'second'}`}>
        <span className="triangle" />
        {showList === 1 ? <Redpoint /> : <Record />}
      </div>
    </div>
  ) : null;
};

// 訂票紀錄
const OrderRecord = ({ recordConfig }) => {
  const isFetch = recordConfig[0];
  const list = recordConfig[1];

  if (!isFetch)
    return (
      <div className="no_order_record">
        <div>目前沒有訂票紀錄</div>
        <Buttom
          variant="outlined"
          className="no_order_record_btn"
          onClick={() => {
            location.href = '/movieInfo';
          }}
        >
          手刀訂票去
        </Buttom>
      </div>
    );

  // 顯示最新一筆資料
  const data = list[0];

  // 分析開演日期和時間
  // output: {year: 'YYYY', date: 'MM.DD', time: 'HH:mm'}
  const showTime = Helper.datetime.MsToformatObj(data.show_time);

  return (
    <div className="order_record_wrap">
      <img src={data.poster_url} />
      <div>
        <div className="info_wrap movie_title_wrap">
          <span className="movie_title">{data.cinema_name_ch}</span>
        </div>
        <div className="info_wrap">
          <span className="order_record_title">訂票序號</span>
          <span className="order_number">{data.booking_num}</span>
        </div>

        <div className="info_wrap">
          <span className="order_record_title">開演日期</span>
          <div>
            <span>{showTime.date}</span>
            <span className="movie_year">{showTime.year}</span>
          </div>
          <Hidden mdUp>
            {/* Mobile */}
            <div className="break" />
          </Hidden>
          <span className="order_record_title">開演時間</span>
          <span>{showTime.time}</span>
        </div>

        <div className="info_wrap">
          <span className="order_record_title">影城</span>
          <span>{data.cinema_name_ch}</span>
        </div>
        <div className="info_wrap seat_wrap">
          <span className="order_record_title">座位</span>
          <div className="seat_dice_wrap">
            {data.seats.split(',').map((seat, idx) => (
              <span key={idx} className="seat_dice">
                {seat}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = (theme) => ({
  root: {
    maxWidth: '1200px',
    margin: 'auto',
    padding: '60px 24px',
    fontSize: '16px',
    '& .title': {
      fontSize: '18px',
      color: '#FFFFFF',
    },
    '& .list': {
      display: 'flex',
      alignItems: 'center',
      fontSize: '14px',
      color: Palette.FIFTH[10],
      cursor: 'pointer',
      '&:after': {
        content: '""',
        marginLeft: '7px',
        boxSizing: 'border-box',
        width: '21px',
        height: '21px',
        backgroundImage: `url(${IMAGE.ICON.LIST})`,
        backgroundSize: 'cover',
        display: 'inline-block',
      },
    },
    '& .border': {
      border: `1px solid ${Palette.FIFTH[40]}`,
      borderRadius: '8px',
    },
    '& .border_wrap': {
      padding: '16px 16px 0 24px',
      boxSizing: 'border-box',
    },
    // 共用 style
    // 訂票序號 style
    '& .order_number': {
      color: Palette.FIRST[30],
      fontSize: '18px',
      fontWeight: 'bold',
    },
    // 資訊顯示
    '& .info_wrap': {
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      paddingBottom: '8px',
      '& .order_record_title': {
        paddingRight: '8px',
        fontSize: '12px',
        color: Palette.FIFTH[10],
        '&.bg': { fontSize: '18px' },
      },
      '& .movie_title': {
        maxWidth: '230px',
        'white-space': 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
      },
      '& .movie_year': {
        fontSize: '12px',
        color: Palette.FIFTH[10],
        padding: '0 16px 0 7px',
      },
      '& .seat_dice': {
        padding: '0 8px 8px 0',
        'white-space': 'nowrap',
      },
    },
    [theme.breakpoints.down('md')]: {
      padding: '48px 24px',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '30px 16px',
      '& .border_wrap': {
        padding: '16px 16px 20px 24px',
      },
    },
  },
  // TOP - 個人資料
  top: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '100px',
    margin: '0px 0 8px 0',
    '& .title': {
      height: '100%',
      paddingTop: '22px',
    },
    '& .top_info': {
      margin: '0 40px 0 0',
      '& .top_title': {
        paddingBottom: '8px',
        fontSize: '12px',
        color: Palette.FIFTH[10],
      },
      '& .top_data': {
        fontSize: '16px',
        color: '#FFFFFF',
      },
    },
  },
  // MIDDLE - 紅利點數 & 訂票紀錄
  middle: {
    display: 'flex',

    '& .mid_titlewrap': {
      display: 'flex',
      'justify-content': 'space-between',
      alignItems: 'center',
      '& .title': {
        display: 'flex',
        alignItems: 'center',
      },
    },
    // 紅利點數
    '& .mid_point': {
      position: 'relative',
      width: '328px',
      height: '258px',
      margin: '0 16px 16px 0',
      // 圓形
      '& .point_wrap': {
        position: 'absolute',
        top: 'calc(50% - 80px)',
        left: 'calc(50% - 80px)',
        '& .point_round': {
          position: 'relative',
          width: '160px',
          height: '160px',
          color: Palette.FIRST[30],
          border: `3px solid  ${Palette.FIRST[30]}`,
          borderRadius: '100px',
          textAlign: 'center',
          '& .point_num': {
            position: 'absolute',
            width: '100%',
            top: 'calc(50% - 24px)',
            lineHeight: '48px',
            fontSize: '48px',
          },
          '& .point_unit': {
            position: 'absolute',
            width: '100%',
            top: 'calc(65%)',
            fontSize: '14px',
          },
        },
      },
    },
    // 訂票紀錄
    '& .mid_record': {
      clear: 'both',
      flex: 1,
      margin: '0 0px 16px 0',
      fontSize: '16px',
      color: '#FFFFFF',
      '& .order_record_wrap': {
        display: 'flex',
        padding: '16px 0 0 0',
        '& img': {
          width: 'auto',
          height: '180px',
          padding: '0 20px 0 0',
        },
      },
      '& .no_order_record': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '185px',
        flexDirection: 'column',
      },
      '& .no_order_record_btn': {
        margin: '16px 0px',
      },
      '& .movie_title_wrap': {
        padding: '0 0 16px 0',
      },
      '& .seat_wrap': {
        alignItems: 'flex-start !important',
        '& .order_record_title': {
          padding: '2px 8px 0 0',
        },
      },
      '& .seat_dice_wrap': {
        display: 'flex',
        flexWrap: 'wrap',
        maxWidth: '220px',
      },
    },
    // PAD
    [theme.breakpoints.down('md')]: {
      '& .mid_point': {
        width: '240px',
      },
      '& .mid_record': {
        '& .seat_dice_wrap': {
          maxWidth: '210px !important',
        },
      },
    },
    // MOBILE
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      // 紅利點數
      '& .mid_point': {
        width: '100%',
        height: '120px',
        order: 2,
        // 圓形
        '& .point_wrap': {
          top: 'unset !important',
          left: 'unset !important',
          position: 'relative !important',
          '& .point_round': {
            width: '120px !important',
            border: 'unset !important',
            height: '56px !important',
            textAlign: 'unset !important',
            display: 'flex',
            '& .point_num': {
              position: 'relative !important',
              top: 'calc(50% - 20px) !important',
            },
            '& .point_unit': {
              width: 'unset !important',
              top: 'unset !important',
              bottom: '8px',
              right: 0,
            },
          },
        },
      },
      // 訂票紀錄
      '& .mid_record': {
        order: 1,
        '& .order_record_wrap': {
          'flex-direction': 'column',
          position: 'relative',
          '& img': {
            width: '34px !important',
            height: 'auto !important',
            padding: '0 0 20px 0 !important',
          },
          '& .movie_title': {
            maxWidth: '190px !important',
          },
        },
      },
    },
  },
  // BOTTOM - 會員紅利清單 or 訂票紀錄清單
  Bottom: {
    width: '100%',
    position: 'relative',
    padding: '60px 100px !important',
    boxSizing: 'border-box',
    borderRight: `1px solid ${Palette.FIFTH[40]}`,
    borderBottom: `1px solid ${Palette.FIFTH[40]}`,
    borderLeft: `1px solid ${Palette.FIFTH[40]}`,
    borderRadius: '8px',

    // 三角形 指標 第一個
    '&.first': {
      '& .triangle': { left: 'calc(328px / 2)' },
      '&:before': {
        width: 'calc(328px / 2 - 4px)',
      },
      '&:after': {
        width: 'calc(100% - 164px - 13px)',
      },
    },
    // 三角形 指標 第二個
    '&.second': {
      '& .triangle': { right: 'calc(328px / 2)' },
      '&:before': {
        width: 'calc(100% - 328px / 2 - 13px)',
      },
      '&:after': {
        width: 'calc(328px / 2 - 4px)',
      },
    },

    '& .triangle': {
      position: 'absolute',
      border: `solid ${Palette.FIFTH[40]}`,
      'border-width': '0 1px 1px 0',
      display: 'inline-block',
      padding: '4px',
      top: '-4.2px',
      transform: 'rotate(-135deg)',
      '-webkit-transform': 'rotate(-135deg)',
    },

    '&:before': {
      borderRadius: '8px 0 0 0',
      position: 'absolute',
      top: 0,
      left: '2.5px',
      content: '""',
      flex: '2 0 0',
      height: '1px',
      borderTop: `1px solid ${Palette.FIFTH[40]}`,
    },
    '&:after': {
      borderRadius: '0 8px 0 0',
      position: 'absolute',
      top: 0,
      right: '2.5px',
      content: '""',
      height: '1px',
      borderTop: `1px solid ${Palette.FIFTH[40]}`,
    },
    '& .title': {
      padding: '0 0 8px 0',
    },
    [theme.breakpoints.down('md')]: {
      padding: '60px 40px !important',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '0px !important',
      border: 'unset',
      '& .triangle': { border: 'unset' },
      '&:before': { border: 'unset' },
      '&:after': { border: 'unset' },
    },
  },
  pagination: {
    paddingTop: '42px',
    '& ul': {
      'justify-content': 'center',
    },
  },
});
export default connect(
  (state) => ({
    recordList: state.getIn(['member', 'main', 'recordList']),
  }),
  (dispatch) => ({
    setRecordList(type, data) {
      dispatch(setRecordList({ type, data }));
    },
  }),
)(withStyles(styles)(MemberCenter));

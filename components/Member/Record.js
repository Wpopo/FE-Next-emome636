import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Helper from 'Lib/helper';
import API from 'CONSTANTS/API/memberAPI';
import IMAGE from 'CONSTANTS/image';
import Tabs from 'Components/common/EzTabs';
import Table from 'Components/common/EzTable';
import Loading from 'Components/common/EzLoading';
import Drawer from '@material-ui/core/Drawer';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AlertDialog from 'Components/common/EzAlertDialog';
import Buttom from '@material-ui/core/Button';
import Palette from 'Styled/palette';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import { invalid } from 'moment';

/**
 * 展開後 詳細資料 尚未排版完成
 */

// 訂票紀錄
const Record = ({ ...props }) => {
  const { recordList } = props;
  //const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   if (recordList.getIn([1, 0])) setLoading(false);
  // }, [recordList]);

  const tabList = {
    0: { title: '未開演', children: <RecordisShow data={recordList.toJS()[0][1]} {...props} /> },
    1: { title: '已開演', children: <RecordisShow data={recordList.toJS()[1][1]} {...props} /> },
  };

  // return !loading ? (
  //   <Fragment>
  //     <div className="title">訂票紀錄</div>
  //     <Tabs tabList={tabList} />
  //   </Fragment>
  // ) : null;

  return (
    <Fragment>
      <div className="title">訂票紀錄</div>
      <Tabs tabList={tabList} />
    </Fragment>
  );
};

const RecordisShow = ({ data = [], classes }) => {
  const tbHeader = [
    { id: 0, title: '電影', align: 'center', classes: '' },
    { id: 1, title: '電影名稱', align: 'left', classes: '' },
    { id: 2, title: '訂票序號', align: 'right', classes: '' },
    { id: 3, title: '開演日期', align: 'right', classes: '' },
    { id: 4, title: '開演時間', align: 'right', classes: '' },
    { id: 5, title: '詳細內容', align: 'center', classes: '' },
  ];

  const [expendID, setExpendID] = useState(null);
  const fn_setExpendID = (idx) => {
    return idx === expendID ? setExpendID(null) : setExpendID(idx);
  };

  const getTbBodyData = (data) => {
    const result = data.map((item, idx) => {
      const { poster_url, movie_name_ch, booking_num, show_time } = item;

      // 分析開演日期和時間
      // output: {year: 'YYYY', date: 'MM.DD', time: 'HH:mm'}
      const showTime = Helper.datetime.MsToformatObj(show_time);

      // 整理column資料
      return {
        0: { title: '電影', dom: <img src={poster_url} />, align: 'center' },
        1: {
          title: '電影名稱',
          dom: <span className="show_title">{movie_name_ch}</span>,
          align: 'left',
        },
        2: {
          title: '訂票序號',
          dom: <span className="order_number">{booking_num}</span>,
          align: 'right',
        },
        3: {
          title: '開演日期',
          dom: (
            <div>
              <span className="show_date">{showTime.date}</span>
              <span className="show_year">{showTime.year}</span>
            </div>
          ),
          align: 'right',
        },
        4: {
          title: '開演時間',
          dom: <span className="showTime">{showTime.time}</span>,
          align: 'right',
        },
        // 詳細內容
        5: {
          title: '',
          dom: (
            <div className="btn-detail no_copy" onClick={() => fn_setExpendID(idx)}>
              詳細
              <ExpandMoreIcon className={`expand ${idx === expendID ? 'open' : 'close'}`} />
            </div>
          ),
          align: 'center',
        },
      };
    });
    return result;
  };
  const tbBody = getTbBodyData(data);

  return (
    <div className={classes.content}>
      <Table
        headerList={tbHeader}
        dataList={tbBody}
        expendID={expendID}
        expendComponent={<Detail data={data[expendID]} />}
        colSpan={6}
        noDataImg={IMAGE.noData.record}
        noDataText={'目前沒有訂票紀錄'}
      />
    </div>
  );
};

const cancelOrder = (orderId, setOpenLoading, setIsOnlineCanceled) => {
  console.log('cancel order : ' + orderId);
  setOpenLoading(true);
  Helper.axios.fetch(
    API.MEMBER.CANCEL_BOOKING(orderId),
    (cb) => {
      setOpenLoading(false);
      setIsOnlineCanceled(true);
    },
    {
      errorFn: () => {
        console.log('error123');
        setOpenLoading(false);
      },
    },
  );
};

// 展開詳細資料
const Detail = ({ data = [] }) => {
  // console.log(data.ez_order_id);
  // console.log(data);
  const [openAlert, setOpenAlert] = useState(false);
  // 展開詳細資料
  const [open, setOpen] = useState(true);
  // 取消訂票時 顯示的loading
  const [openLoading, setOpenLoading] = useState(false);
  // const [isDisable, setIsDisable] = useState(false);

  // 分析開演日期和時間
  // output: {year: 'YYYY', date: 'MM.DD', time: 'HH:mm'}
  const showTime = Helper.datetime.MsToformatObj(data.show_time);

  // console.log('data.is_online_canceled', data.is_online_canceled);
  const [isOnlineCanceled, setIsOnlineCanceled] = useState(data.is_online_canceled);

  const price = data.fee_sum + data.price_sum;
  return (
    <div className="detail_wrap">
      <Loading open={openLoading} />
      <div className="info_wrap movie_title_wrap">
        <span className="order_record_title">影城</span>
        <span className="full_wrap">{data.cinema_name_ch}</span>
      </div>
      <div className="info_wrap seat_wrap">
        <span className="order_record_title">座位</span>
        <div className="seat_dice_wrap full_wrap">
          <div>
            {data.seats.split(',').map((seat, idx) => (
              <span key={idx} className="seat_dice">
                {seat}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="info_wrap">
        <span className="order_record_title">商品</span>
        <div className="full_wrap">
          {data.booking_detail.map((product, idx) => (
            <div className="data_wrap" key={idx}>
              <span>{product.ez_product_name}</span>
              <span>
                <span>{`${product.quantity} 張`}</span>
                <span>{`${product.price} 元`}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="info_wrap">
        <span className="order_record_title">手續費</span>
        <div className="full_wrap">
          <div>
            <span>訂票手續費</span>
            <span>{data.fee_sum}</span>
          </div>
        </div>
      </div>
      <div className="info_wrap full_wrap">
        <span className="order_record_title bg">自付額</span>
        <span>
          <span className="order_number">{price}</span> 元
        </span>
      </div>
      <Drawer />
      <AlertDialog
        open={openAlert}
        style={'YESNO'}
        handleCancle={() => setOpenAlert(false)}
        handleClose={() => {
          cancelOrder(data.ez_order_id, setOpenLoading, setIsOnlineCanceled);
          setOpenAlert(false);
        }}
        title={'確認取消此筆訂單？'}
        context={'訂票手續費依影城規定恕不退還'}
      />
      <div className="info_bottom">
        <div className="ticket_info" onClick={() => setOpen(!open)}>
          購票證明
          <ExpandMoreIcon className={`expand ${open ? 'open' : 'close'}`} />
        </div>
        {isOnlineCanceled ? (
          // 已取消
          <Buttom variant="outlined" disabled>
            已線上取消
          </Buttom>
        ) : (
          // 未取消
          <Buttom
            variant="outlined"
            onClick={() => {
              setOpenAlert(true);
            }}
          >
            取消訂票
          </Buttom>
        )}
      </div>
      {!open ? (
        <div>
          <Divider className="line" />
          <div className="ticket_info_root">
            <div className="ticket_info_detail">
              <div className="ticket_info_detail_title info">
                <div>
                  <span className="order_record_title2">開演日期</span>
                  <span className="show_date">{showTime.date}</span>
                  <span className="show_year">{showTime.year}</span>
                </div>
                <div>
                  <span className="order_record_title2">發票日期</span>
                  {data.invoice !== null ? (
                    <span className="show_date">{data.invoice.inv_date.date}</span>
                  ) : (
                    <span className="show_date">---</span>
                  )}
                  {data.invoice !== null ? (
                    <span className="show_year">{data.invoice.inv_date.year}</span>
                  ) : (
                    <span className="show_year">---</span>
                  )}
                </div>
              </div>
              <div className="info">
                <span className="order_record_title2">發票號碼</span>
                {data.invoice !== null ? (
                  <span className="inv">{data.invoice.inv_no}</span>
                ) : (
                  <span className="inv">---</span>
                )}
              </div>
              <div>
                <div className="info order_record_title2">
                  1. 因電影票課徵娛樂稅，因此全台影城電影購票皆不開立發票，而以票根作為購買證明，故只開立訂票手續費。
                </div>
                <div className="info order_record_title2">2. 發票開立日期為開演後3~5天。</div>
                <div className="info order_record_title2">3. 發票尚未開立前，將不會出現購買證明標章。</div>
                <div className="info order_record_title2">4. 如取消訂票或退票，此購買證明視同失效。</div>
              </div>
            </div>
            <div className="ticketImg">
              <img className="ticketImg" src={IMAGE.ICON._ticket} />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

const styles = (theme) => ({
  content: {
    '& img': {
      width: '38px',
      height: '51px',
    },
    '& .show_date': {
      fontSize: '20px',
    },
    '& .show_year': {
      fontSize: '12px',
      color: Palette.FIFTH[10],
      paddingLeft: '7px',
    },
    '& .showTime': {
      fontSize: '20px',
    },
    // 開闔
    '& .expand': {
      height: '22px',
      width: '14px',
      '&.close': {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
      },
      '&.open': {
        transform: 'rotate(180deg)',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
      },
    },

    '& .btn-detail': {
      border: `1px solid ${Palette.FIFTH[40]}`,
      borderRadius: '12px',
      width: '60px',
      lineHeight: '22px',
      display: 'inline-flex',
      'justify-content': 'center',
      textAlign: 'center',
      fontSize: '12px',
      cursor: 'pointer',
    },

    // 詳細資料
    '& .detail_wrap': {
      maxWidth: '700px',
      width: '100%',
      '& .order_record_title': {
        paddingRight: '0 !important',
      },
      '& .info_wrap': {
        justifyContent: 'space-between',
        '& .full_wrap': {
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'column',
          width: 'calc(100% - 54px)',
          '& .data_wrap': {
            display: 'flex',
            justifyContent: 'space-between',
          },
        },
      },
      '& .info_bottom': {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'baseline',
      },
      '& .ticket_info': {
        margin: '0px 10px',
      },
    },
    '& .line': {
      border: `1px solid ${Palette.FIFTH[60]}`,
      margin: '20px',
      height: 'auto',
    },
    '& .ticket_info_root': {
      display: 'flex',
      alignItems: 'center',
      '& .ticket_info_detail': {
        maxWidth: '400px',

        '& .ticket_info_detail_title': {
          display: 'flex',
          justifyContent: 'space-between',
        },
        '& .order_record_title2': {
          fontSize: '12px',
          color: Palette.FIFTH[10],
          margin: '0px 10px 0px 0px',
        },
        '& .inv': {
          fontSize: '16px',
          color: Palette.FIRST[30],
        },
      },
      '& .ticketImg': {
        width: '136px',
        height: '136px',
        margin: '0px 30px',
      },
      '& .info': {
        margin: '10px 0px',
      },
    },
  },
});

export default connect(
  (state) => ({
    recordList: state.getIn(['member', 'main', 'recordList']),
  }),
  (dispatch) => ({
    // setRecordList(data) {
    //   dispatch(setRecordList(data));
    // },
  }),
)(withStyles(styles)(Record));

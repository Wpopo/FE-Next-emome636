import store from 'Store';
import HelperData from './data';
import Button from '@material-ui/core/Button';

const Helper = {
  // 取得資訊欄資料
  // 格式：
  // [
  //   0, // 總金額
  //   [  // 電影票
  //     {...tickets props}...
  //   ],
  // ]
  //
  // ** 注意：目前僅抓取電影片優惠，若未來套票和加購餐有需求，需在改寫 **
  getInformatData() {
    const state = store.getState();
    const result = [0, []];
    const ticketList = state.getIn(['payment', 'product', 'ticketList']).toJS();
    let money = 0;

    // 處理目前所選的電影票
    // 無商品
    if (ticketList === [] || ticketList === undefined) return null;
    ticketList.map((ticket) => {
      // 從商品清單選出 數量大於0
      if (ticket.quantity > 0) {
        // 數量 * (票價+手續費)
        money += ticket.quantity * (ticket.price + ticket.fee);
        result[1].push(ticket);
      }
    });

    result[0] = money;
    return result;
  },

  // 取得目前所選的電影票
  getSelectedTicket() {
    const state = store.getState();
    const result = [];
    const selectedTicket = state.getIn(['product', 'selectedTicket']);
    const ticketList = state.getIn(['product', 'ticketList']).toJS();

    // 已選座位數量大於0
    if (selectedTicket > 0) {
      ticketList.map((item) => item.list.map((ticket) => (ticket.quantity > 0 ? result.push(ticket) : null)));
    }

    return result;
  },

  // 優惠頁 取得所有商品 已呈現該顯示Side bar
  // {id:bool, id:bool,...}
  // EX: {1:true, 3:true}
  getShowSideBar() {
    const state = store.getState();
    const ticketList = state.getIn(['product', 'ticketList']).toJS();
    const result = {};

    ticketList.map((ticket) => ticket.list.map((item) => (item.quantity > 0 ? (result[ticket.id] = true) : null)));

    return result;
  },

  // 結帳頁 取得所有商品、優惠資訊的ID
  // EX: "16,28,.."
  getCheckOutID() {
    const orderList = this.getInformatData(); //  [0, [], []]
    let result = [];

    // 處理票價、套票
    orderList[1].map((product) =>
      product.map((ticket) => {
        ticket.preferential !== undefined
          ? // 優惠票數大於零
            ticket.preferential.map((pre) => (pre.quantity > 0 ? result.push(pre) : null))
          : null;

        // 票數大於零
        ticket.quantity > 0 ? result.push(ticket) : null;
      }),
    );

    // 整理取得資訊
    if (result.length > 0) {
      result = result.map((item) => item.id).join(',');
    } else {
      result = 0;
    }

    return result;
  },

  // 結帳頁 取得所有商品、優惠資訊
  getCheckOutOrder() {
    const orderList = this.getInformatData(); //  [0, [], []]
    let result = [];
    // console.log(JSON.stringify(orderList));

    // 處理票價、套票
    // orderList[1].map((product) =>
    //   product.map((ticket) => {
    //     ticket.preferential !== undefined
    //       ? // 優惠票數大於零
    //         ticket.preferential.map((pre) => (pre.quantity > 0 ? result.push(pre) : null))
    //       : null;

    //     // 票數大於零
    //     ticket.quantity > 0 ? result.push(ticket) : null;
    //   }),
    // );
    Object.entries(orderList[1]).map(([key, ticket]) => {
      ticket.preferential !== undefined
        ? ticket.preferential.map((pre) => (pre.quantity > 0 ? result.push(pre) : null))
        : null;
      ticket.quantity > 0 ? result.push(ticket) : null;
    });

    // 整理取得資訊
    if (result.length > 0) {
      result = result.map((item) => ({
        epfm_id: item.id,
        erp_product_code: item.code,
        quantity: item.quantity,
        coupon_no: item.coupon_no !== undefined ? item.coupon_no : '',
        check_number:
          item.check_number !== undefined
            ? item.check_number
            : // 滿額贈票的情況
            item.checkInfo !== undefined
            ? item.checkInfo.check_number !== undefined
              ? item.checkInfo.check_number
              : ''
            : '',
        trans_info: item.trans_info !== undefined ? item.trans_info : null,
      }));
    }
    //console.log(JSON.stringify(result));
    return result;
  },

  // 結帳頁 取得環境變數
  getCheckOutEVN() {
    const state = store.getState();
    const options = state.getIn(['payment', 'main', 'orderInfo', 'options']);
    const campaign_code = state.getIn(['payment', 'main', 'orderInfo', 'campaign_code']);
    const channel_code = state.getIn(['payment', 'main', 'orderInfo', 'channel_code']);
    const ez_trans_master_id = state.getIn(['payment', 'main', 'movieInfo', 'ez_trans_master_id']);
    const os_type = state.getIn(['payment', 'main', 'orderInfo', 'osType']);
    const result = { options, campaign_code, channel_code, ez_trans_master_id, os_type };

    return result;
  },

  // 產生資訊欄下方Button
  createInformationButon: (props) => {
    const { view = '', setView } = props;
    const state = store.getState();
    const selectedFareTicket = state.getIn(['product', 'selectedTicket']);
    const bookingTicket = state.getIn(['product', 'bookingTicket']);

    let jsx = '';

    if (view === 'selectProduct') {
      jsx = (
        <Button
          className="common-btn"
          variant="contained"
          onClick={(e) => {
            if (selectedFareTicket !== bookingTicket) {
              e.stopPropagation();
            } else {
              setView('selectPreferential');
            }
          }}
        >
          選優惠
        </Button>
      );
    } else if (view === 'checkOut') {
      jsx = (
        <Button
          className="common-btn"
          variant="contained"
          onClick={() => document.getElementById('checkOutBtn').click()}
        >
          去結帳
        </Button>
      );
    }

    return jsx;
  },

  // 爆米花控制項
  processPopcorn: (flag, setFlag, text, setText, props) => {
    // console.log(flag);
    // console.log(props);

    const {
      popcornFlag,
      popcornText,
      ticketPopcornFlag,
      ticketPopcornText,
      preferentialPopcornText,
      preferentialPopcornFlag,
    } = props;
    // 爆米花控制項 有順序關係
    // 重要性高的 請擺前面
    if (popcornFlag) {
      // main redux popcorn controll
      if (flag === true && text === popcornText) return;
      setFlag(true);
      setText(popcornText);
    } else if (ticketPopcornFlag) {
      if (flag === true && text === ticketPopcornText) return;
      setFlag(true);
      setText(ticketPopcornText);
    } else if (preferentialPopcornFlag) {
      if (flag === true && text === preferentialPopcornText) return;
      setFlag(true);
      setText(preferentialPopcornText);
    } else {
      if (flag === false) return;
      setFlag(false);
    }
  },
};

export default Helper;

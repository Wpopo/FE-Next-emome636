import Immutable from 'immutable';
import {
  productReset,
  addTicket,
  reduceTicket,
  setInitTicketList,
  setBookingTicket,
} from 'Actions/payment/productCartActions';
import { handleActions } from 'redux-actions';

// 預設電影票初始狀態
const initState = Immutable.fromJS({
  money: 0, // 目前總金額
  bookingTicket: 6, // 應選座位數量
  selectedTicket: 0, // 已選座位數量
  ticketList: [], // 所有電影票
});
const ProductCartReducer = handleActions(
  {
    // Reset
    [productReset]: () => initState,

    // 設定初始電影商品清單
    [setInitTicketList]: (state, { payload }) => state.set('ticketList', payload),

    // 電影商品數量 +1
    [addTicket]: (state, { payload }) => {
      // 該項票種目前數量
      const nQty = state.getIn(['ticketList', payload.ticketIdx, 'quantity']);
      // 已選座位數量
      const selectedTicket = state.get('selectedTicket');
      // 應選座位數量
      const bookingTicket = state.get('bookingTicket');

      if (selectedTicket + 1 > bookingTicket) return state;
      return state
        .setIn(['ticketList', payload.ticketIdx, 'quantity'], nQty + 1)
        .set('selectedTicket', selectedTicket + 1);
    },

    // 電影商品數量 -1
    [reduceTicket]: (state, { payload }) => {
      // 該項票種目前數量
      const nQty = state.getIn(['ticketList', payload.ticketIdx, 'quantity']);
      // 已選座位數量
      const selectedTicket = state.get('selectedTicket');

      if (nQty <= 0) return state;
      return state
        .setIn(['ticketList', payload.ticketIdx, 'quantity'], nQty - 1)
        .set('selectedTicket', selectedTicket - 1);
    },

    // 應選座位數量
    [setBookingTicket]: (state, { payload }) => state.set('bookingTicket', payload),
  },
  initState,
);

export default ProductCartReducer;

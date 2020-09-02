import Immutable from 'immutable';
import { mainReset, setView, setInitOrderInfo, setMovieInfo, setErpCode } from 'Actions/payment/mainActions';
import { handleActions } from 'redux-actions';

// 預設第一頁顯示畫面為會員條款
const initState = Immutable.fromJS({
  view: 'servicePolicy',
  /*
  訂購資訊
  {
    channel_code: 'emome636',
    campaign_code: 'rwdweb',
    options: 'movieInfo:true',
    session_id,
    movie_id,
    cinema_id,
    cinema_trans_id,
    transaction_id,
    hall_id,
    area_category_code,
    area_num,
    seat_idx_list,
  }
  */
  orderInfo: {},
  movieInfo: {},
  erpCode: '',
});
const mainReducer = handleActions(
  {
    // Reset
    [mainReset]: () => initState,

    // 設定目前該顯示頁面
    [setView]: (state, { payload }) => state.set('view', payload),

    // 設定初始訂票資訊
    [setInitOrderInfo]: (state, { payload }) => state.set('orderInfo', payload),

    // 新增訂購資訊
    [setMovieInfo]: (state, { payload }) => state.set('movieInfo', payload),

    // 設定erpCode
    [setErpCode]: (state, { payload }) => state.set('erpCode', payload),
  },
  initState,
);

export default mainReducer;

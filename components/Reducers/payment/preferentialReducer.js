import Immutable from 'immutable';
import CONSTANT from 'CONSTANTS/payment';
import {
  preferentialReset,
  setPreferentialPopcornFlag,
  setPreferentialPopcornText,
  setMaxFareTicket,
  setInitPreferential,
  addBankPoint,
  reduceBankPoint,
  setMemberRedPoint,
  addRedPoint,
  reduceRedPoint,
  addBankPurchases,
  reduceBankPurchases,
  setBankPurchasesCheckNumber,
  setPersonalCoupon,
  addOneCoupon,
  setSelectedCoupon,
  delTempCoupon,
  addPoint,
  reducePoint,
  setCheckInfoPoint,
} from 'Actions/payment/preferentialActions';
import { handleActions } from 'redux-actions';

// 預設選優惠初始狀態
const initState = Immutable.fromJS({
  init: true,
  selectedFareTicket: 0,
  maxFareTicket: 0,
  // 銀行優惠
  bank: {
    quantity: 0,
    // 紅利折抵
    point: [],
    // 滿額贈票
    purchase: [],
    // 目前選擇的優惠
    // format: id_index
    // EX: 紅利折抵 第三個優惠項目 => 0-2
    // EX: 滿額贈票 第三個優惠項目 => 1-2
    selected: '',
  },
  // 會員紅利
  redPoint: {},
  // 優惠序號
  serialNum: {},
  // 消費點數
  salesPoint: { quantity: 0, list: [] },

  // 爆米花控制項
  popcornFlag: false, // 顯示爆米花
  popcornText: '', // 爆米花警告文字
});

const PreferentialReducer = handleActions(
  {
    // Reset
    [preferentialReset]: () => initState,

    // 設定爆米花開關
    [setPreferentialPopcornFlag]: (state, { payload }) => state.set('popcornFlag', payload),

    // 設定爆米花文字
    [setPreferentialPopcornText]: (state, { payload }) => state.set('popcornText', payload),

    // 設定最多可搭優惠數量
    [setMaxFareTicket]: (state, { payload }) => state.set('maxFareTicket', payload),

    // 設定優惠
    [setInitPreferential]: (state, { payload }) => {
      let points = [];
      let purchase = [];
      let redPoints = { quantity: 0 };
      let serialNum = {
        quantity: 0,
        // 暫時輸入的序號號碼(防止重複加入)
        tempCouponCode: [],
        // 暫時輸入的序號
        tempCoupon: [],
        // 歸戶序號
        personalCoupon: [],
      };
      let salesPoints = [];

      // 根據 payload key (fare_type) 判斷優惠種類
      // key = 1,11 銀行紅利折抵
      if (payload[1] !== undefined) points = points.concat(payload[1]);
      if (payload[11] !== undefined) points = points.concat(payload[11]);
      // key = 2 銀行滿額優惠(傳檔)
      if (payload[2] !== undefined) purchase = purchase.concat(payload[2]);
      // key = 10 銀行滿額優惠(不傳檔)
      if (payload[10] !== undefined) purchase = purchase.concat(payload[10]);
      // key = 3 Coupon折抵
      if (payload[3] !== undefined) serialNum = Object.assign(serialNum, payload[3][0]);
      // key = 4 會員紅利點數
      if (payload[4] !== undefined) redPoints = Object.assign(redPoints, payload[4][0]);
      // key = 5 第三方點數折抵
      if (payload[5] !== undefined) salesPoints = salesPoints.concat(payload[5]);

      return state
        .set('init', false)
        .setIn(['bank', 'point'], points)
        .setIn(['bank', 'purchase'], purchase)
        .set('redPoint', redPoints)
        .set('serialNum', serialNum)
        .setIn(['salesPoint', 'list'], salesPoints);
    },
    /** 銀行優惠 */
    // 銀行優惠_紅利折抵 +1
    [addBankPoint]: (state, { payload }) => {
      // 優惠選擇數量，超過可搭配優惠的張數
      const selectedTicket = state.get('selectedFareTicket');
      const maxFareTicket = state.get('maxFareTicket');
      if (maxFareTicket === 0) {
        return state.set('popcornFlag', true).set('popcornText', CONSTANT.popcorn.preferential.noPreferential);
      }
      if (selectedTicket + 1 > maxFareTicket) {
        return state.set('popcornFlag', true).set('popcornText', CONSTANT.popcorn.preferential.excess);
      }

      // 優惠檢查 判斷是否 +1
      const nSelected = state.getIn(['bank', 'selected']);
      if (nSelected === '' || nSelected === `0-${payload.idx}`) {
        // 通過檢核 +1
        return state
          .setIn(['bank', 'quantity'], state.getIn(['bank', 'quantity']) + 1)
          .setIn(
            ['bank', 'point', payload.idx, 'quantity'],
            state.getIn(['bank', 'point', payload.idx, 'quantity']) + 1,
          )
          .setIn(['bank', 'selected'], `0-${payload.idx}`)
          .set('selectedFareTicket', selectedTicket + 1)
          .set('popcornFlag', true)
          .set('popcornText', CONSTANT.popcorn.preferential.add);
      }
      // 優惠只能選一個，若已選其他優惠，則不加+1
      return state.set('popcornFlag', true).set('popcornText', CONSTANT.popcorn.preferential.bankExcess);
    },

    // 銀行優惠_紅利折抵 -1
    [reduceBankPoint]: (state, { payload }) => {
      const nSelected = state.getIn(['bank', 'selected']);
      const nQty = state.getIn(['bank', 'point', payload.idx, 'quantity']);
      let selectedTicket = state.get('selectedFareTicket');
      let selected = nSelected;

      // 優惠只能選一個，若目前該優惠為0，則清空目前已選優惠
      if (nSelected === selected && nQty - 1 === 0) selected = '';
      selectedTicket -= 1;
      return state
        .setIn(['bank', 'quantity'], state.getIn(['bank', 'quantity']) - 1)
        .setIn(['bank', 'point', payload.idx, 'quantity'], nQty - 1)
        .setIn(['bank', 'selected'], selected)
        .set('selectedFareTicket', selectedTicket)
        .set('popcornFlag', false);
    },

    // 銀行優惠_滿額贈票 +1
    [addBankPurchases]: (state, { payload }) => {
      // 檢查檢核狀態
      if (!payload.check && payload.check !== undefined) {
        return state.set('popcornFlag', true).set('popcornText', CONSTANT.popcorn.preferential.notCheck);
      }

      // 優惠選擇數量，超過可搭配優惠的張數
      const selectedTicket = state.get('selectedFareTicket');
      const maxFareTicket = state.get('maxFareTicket');
      if (maxFareTicket === 0) {
        return state.set('popcornFlag', true).set('popcornText', CONSTANT.popcorn.preferential.noPreferential);
      }
      if (selectedTicket + 1 > maxFareTicket) {
        return state.set('popcornFlag', true).set('popcornText', CONSTANT.popcorn.preferential.excess);
      }

      // 優惠檢查 判斷是否 +1
      const nSelected = state.getIn(['bank', 'selected']);
      const nQty = state.getIn(['bank', 'purchase', payload.idx, 'quantity']);
      if (nSelected === '' || nSelected === `1-${payload.idx}`) {
        if (nQty + 1 > payload.maxQty) {
          // 若超過最高指定數，則不加 1
          return state.set('popcornFlag', true).set('popcornText', CONSTANT.popcorn.preferential.bankMaxExcess);
        }
        // 通過檢核 +1
        return state
          .setIn(['bank', 'quantity'], state.getIn(['bank', 'quantity']) + 1)
          .setIn(['bank', 'purchase', payload.idx, 'quantity'], nQty + 1)
          .setIn(['bank', 'selected'], `1-${payload.idx}`)
          .set('selectedFareTicket', selectedTicket + 1)
          .set('popcornFlag', true)
          .set('popcornText', CONSTANT.popcorn.preferential.add);
      }
      // 優惠只能選一個，若已選其他優惠，則不加 1
      return state.set('popcornFlag', true).set('popcornText', CONSTANT.popcorn.preferential.bankExcess);
    },

    // 銀行優惠_滿額贈票 -1
    [reduceBankPurchases]: (state, { payload }) => {
      const nSelected = state.getIn(['bank', 'selected']);
      const nQty = state.getIn(['bank', 'purchase', payload.idx, 'quantity']);
      let selectedTicket = state.get('selectedFareTicket');
      let selected = nSelected;

      // 優惠只能選一個，若目前該優惠為0，則清空目前已選優惠
      if (nSelected === selected && nQty - 1 === 0) selected = '';
      selectedTicket -= 1;
      return state
        .setIn(['bank', 'quantity'], state.getIn(['bank', 'quantity']) - 1)
        .setIn(['bank', 'purchase', payload.idx, 'quantity'], nQty - 1)
        .setIn(['bank', 'selected'], selected)
        .set('selectedFareTicket', selectedTicket)
        .set('popcornFlag', false);
    },

    // 銀行優惠_滿額贈票 設定檢核碼
    [setBankPurchasesCheckNumber]: (state, { payload }) => {
      let setIdx = null;
      state.getIn(['bank', 'purchase']).map((item, idx) => {
        if (item.id === payload.id) {
          setIdx = idx;
        }
      });
      return state.setIn(['bank', 'purchase', setIdx, 'checkInfo'], payload);
    },

    /** 會員紅利 */
    [setMemberRedPoint]: (state, { payload }) => {
      if (Object.keys(state.getIn(['redPoint'])).length > 0) {
        return state
          .setIn(['redPoint', 'memberPoint'], payload.point)
          .setIn(['redPoint', 'maxQty'], parseInt(payload.point / payload.basePoint, 10));
      }
      return state;
    },

    // 設定會員紅利 +1
    [addRedPoint]: state => {
      // 優惠選擇數量，超過可搭配優惠的張數
      const selectedTicket = state.get('selectedFareTicket');
      const maxFareTicket = state.get('maxFareTicket');
      if (maxFareTicket === 0) {
        return state.set('popcornFlag', true).set('popcornText', CONSTANT.popcorn.preferential.noPreferential);
      }
      if (selectedTicket + 1 > maxFareTicket) {
        return state.set('popcornFlag', true).set('popcornText', CONSTANT.popcorn.preferential.excess);
      }

      return state
        .setIn(['redPoint', 'quantity'], state.getIn(['redPoint', 'quantity']) + 1)
        .set('selectedFareTicket', state.get('selectedFareTicket') + 1)
        .set('popcornFlag', true)
        .set('popcornText', CONSTANT.popcorn.preferential.add);
    },

    // 設定會員紅利 -1
    [reduceRedPoint]: state =>
      state
        .setIn(['redPoint', 'quantity'], state.getIn(['redPoint', 'quantity']) - 1)
        .set('selectedFareTicket', state.get('selectedFareTicket') - 1)
        .set('popcornFlag', false),

    /** 優惠序號 */
    // 設定歸戶優惠序號
    [setPersonalCoupon]: (state, { payload }) => state.setIn(['serialNum', 'personalCoupon'], payload),

    // 設定新輸入優惠序號
    [addOneCoupon]: (state, { payload }) => {
      // 防止User連按加入couopn，造成coupon重複寫入
      if (state.getIn(['serialNum', 'tempCouponCode']).includes(payload.data.code)) return state;
      return state
        .setIn(['serialNum', 'tempCoupon'], state.getIn(['serialNum', 'tempCoupon']).concat(payload.data))
        .setIn(['serialNum', 'tempCouponCode'], state.getIn(['serialNum', 'tempCouponCode']).concat(payload.data.code));
    },

    // 設定選擇 / 取消選擇的Coupon
    [setSelectedCoupon]: (state, { payload }) => {
      const type = payload.selectID.split('-')[0] === 'temp' ? 'tempCoupon' : 'personalCoupon';
      const idx = payload.selectID.split('-')[1];
      const nSelected = state.getIn(['serialNum', type, idx, 'selected']);

      // 添加Coupon
      if (!nSelected) {
        // 優惠檢查 判斷是否 +1
        // 優惠選擇數量，超過可搭配優惠的張數
        const selectedTicket = state.get('selectedFareTicket');
        const maxFareTicket = state.get('maxFareTicket');
        if (maxFareTicket === 0) {
          return state.set('popcornFlag', true).set('popcornText', CONSTANT.popcorn.preferential.noPreferential);
        }
        if (selectedTicket + 1 > maxFareTicket) {
          return state.set('popcornFlag', true).set('popcornText', CONSTANT.popcorn.preferential.excess);
        }

        // 通過檢核 +1
        return (
          state
            // Coupon +1
            .setIn(['serialNum', 'quantity'], state.getIn(['serialNum', 'quantity']) + 1)
            // 總優惠數量 +1
            .set('selectedFareTicket', state.get('selectedFareTicket') + 1)
            // 設定Flag
            .setIn(['serialNum', type, idx, 'selected'], true)
            // 爆米花
            .set('popcornFlag', true)
            .set('popcornText', CONSTANT.popcorn.preferential.add)
        );
      }
      // 取消Coupon
      return (
        state
          // Coupon +1
          .setIn(['serialNum', 'quantity'], state.getIn(['serialNum', 'quantity']) - 1)
          // 總優惠數量 +1
          .set('selectedFareTicket', state.get('selectedFareTicket') - 1)
          // 設定Flag
          .setIn(['serialNum', type, idx, 'selected'], false)
          // 爆米花
          .set('popcornFlag', false)
      );
    },

    // 移除Temp Coupon
    [delTempCoupon]: (state, { payload }) => {
      const type = payload.selectID.split('-')[0];
      const idx = payload.selectID.split('-')[1];

      if (type === 'temp') {
        const quantity = state.getIn(['serialNum', 'tempCoupon', idx, 'selected']) ? -1 : 0;
        state.getIn(['serialNum', 'tempCoupon']).splice(idx, 1);
        state.getIn(['serialNum', 'tempCouponCode']).splice(idx, 1);

        // 重新給定順序
        if (state.getIn(['serialNum', 'tempCoupon']).length > 0) {
          const result = state.getIn(['serialNum', 'tempCoupon']).map((item, id) => {
            return { ...item, id, selectID: `temp-${id}` };
          });

          return (
            state
              .setIn(['serialNum', 'tempCoupon'], result)
              // Temp Coupon 本身加減
              .setIn(['serialNum', 'quantity'], state.getIn(['serialNum', 'quantity']) + quantity)
              // 總優惠數量加總
              .set('selectedFareTicket', state.get('selectedFareTicket') + quantity)
              // 爆米花
              .set('popcornFlag', false)
          );
        }
        // 無資料，直接清空
        return (
          state
            .setIn(['serialNum', 'tempCoupon'], [])
            .setIn(['serialNum', 'tempCouponCode'], [])
            // Temp Coupon 本身加減
            .setIn(['serialNum', 'quantity'], state.getIn(['serialNum', 'quantity']) + quantity)
            // 總優惠數量加總
            .set('selectedFareTicket', state.get('selectedFareTicket') + quantity)
            // 爆米花
            .set('popcornFlag', false)
        );
      }

      if (type === 'personal') {
      }
      return state;
    },

    /** 消費點數 */
    // 設定消費點數 +1
    [addPoint]: (state, { payload }) => {
      // 檢查檢核狀態
      if (!payload.check && payload.check !== undefined) {
        return state.set('popcornFlag', true).set('popcornText', CONSTANT.popcorn.preferential.notCheck);
      }

      // 優惠選擇數量，超過可搭配優惠的張數
      const selectedTicket = state.get('selectedFareTicket');
      const maxFareTicket = state.get('maxFareTicket');
      if (maxFareTicket === 0) {
        return state.set('popcornFlag', true).set('popcornText', CONSTANT.popcorn.preferential.noPreferential);
      }
      if (selectedTicket + 1 > maxFareTicket) {
        return state.set('popcornFlag', true).set('popcornText', CONSTANT.popcorn.preferential.excess);
      }

      // 優惠檢查 判斷是否 +1
      const nQty = state.getIn(['salesPoint', 'list', payload.idx, 'quantity']);
      // 若超過最高指定數，則不加 1
      if (nQty + 1 > payload.maxQty) {
        return state.set('popcornFlag', true).set('popcornText', CONSTANT.popcorn.preferential.bankMaxExcess);
      }
      // 通過檢核 +1
      return state
        .setIn(['salesPoint', 'list', payload.idx, 'quantity'], nQty + 1)
        .setIn(['salesPoint', 'quantity'], state.getIn(['salesPoint', 'quantity']) + 1)
        .set('selectedFareTicket', state.get('selectedFareTicket') + 1)
        .set('popcornFlag', true)
        .set('popcornText', CONSTANT.popcorn.preferential.add);
    },

    // 設定消費點數 -1
    [reducePoint]: (state, { payload }) =>
      state
        .setIn(
          ['salesPoint', 'list', payload.Idx, 'quantity'],
          state.getIn(['salesPoint', 'list', payload.Idx, 'quantity']) - 1,
        )
        .setIn(['salesPoint', 'quantity'], state.getIn(['salesPoint', 'quantity']) - 1)
        .set('selectedFareTicket', state.get('selectedFareTicket') - 1)
        .set('popcornFlag', false),

    // 設定檢核資料
    [setCheckInfoPoint]: (state, { payload }) =>
      state.setIn(['salesPoint', 'list', payload.Idx, 'trans_info'], payload.data),
  },
  initState,
);

export default PreferentialReducer;

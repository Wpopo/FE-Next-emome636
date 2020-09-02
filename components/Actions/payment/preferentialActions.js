import { createAction } from 'redux-actions';

export const preferentialReset = createAction('PREFERENTIAL_RESET');

// 爆米花
export const setPreferentialPopcornFlag = createAction('SET_PREFERENTIAL_POPCORN_Flag');
export const setPreferentialPopcornText = createAction('SET_PREFERENTIAL_POPCORN_TEXT');

// 設定最多可搭優惠數量
export const setMaxFareTicket = createAction('SET_MAX_FARE_TICKET');

// 設定初始優惠
export const setInitPreferential = createAction('SET_INIT_PREFERENTIAL');

// 銀行優惠 - 紅利折抵
export const addBankPoint = createAction('ADD_BANK_POINT');
export const reduceBankPoint = createAction('REDUCE_BANK_POINT');

// 銀行優惠 - 滿額贈票
export const addBankPurchases = createAction('ADD_BANK_PURCHASES');
export const reduceBankPurchases = createAction('REDUCE_BANK_PURCHASES');
export const setBankPurchasesCheckNumber = createAction('SET_BANK_PURCHASES_CHECK_NUMBER');

// 會員紅利
export const setMemberRedPoint = createAction('SET_MEMBER_REDPOINT');
export const addRedPoint = createAction('ADD_REDPOINT');
export const reduceRedPoint = createAction('REDUCE_REDPOINT');

// 優惠序號
export const setPersonalCoupon = createAction('SET_PERSONAL_COUPONE');
export const addOneCoupon = createAction('ADD_ONE_COUPONE');
export const setSelectedCoupon = createAction('SET_SELECTED_COUPONE');
export const delTempCoupon = createAction('DEL_TEMP_COUPONE');

// 消費點數
export const addPoint = createAction('ADD_POINT');
export const reducePoint = createAction('REDUCE_POINT');
export const setCheckInfoPoint = createAction('SET_CHECK_INFO_POINT');

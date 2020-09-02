import axios from 'axios';
import store from 'Store';

let EVN = {};

export default EVN = (item = '') => {
  const state = store.getState();

  switch (item) {
    case 'website':
      return 3;
    case 'token':
      return global.window !== undefined ? localStorage.getItem('access_token') : '';
    default:
      return '';
  }
};

export const payment_EVN = (item = '') => {
  const state = store.getState();

  switch (item) {
    case 'ecmID':
      return state.getIn(['payment', 'main', 'movieInfo', 'ecm_id']) === undefined
        ? '0'
        : state.getIn(['payment', 'main', 'movieInfo', 'ecm_id']);
    case 'ecdID':
      return state.getIn(['payment', 'main', 'movieInfo', 'ecd_id']) === undefined
        ? '0'
        : state.getIn(['payment', 'main', 'movieInfo', 'ecd_id']);
    case 'erpCode':
      return state.getIn(['payment', 'main', 'erpCode']) === '' ? '0' : state.getIn(['payment', 'main', 'erpCode']);
    case 'movieID':
      return state.getIn(['payment', 'main', 'movieInfo', 'movie_id']) === undefined
        ? ''
        : state.getIn(['payment', 'main', 'movieInfo', 'movie_id']);
    case 'version':
      return state.getIn(['payment', 'main', 'movieInfo', 'movie_version']) === undefined
        ? ''
        : state.getIn(['payment', 'main', 'movieInfo', 'movie_version']);
    case 'channelCode':
      return state.getIn(['payment', 'main', 'orderInfo', 'channelCode']) === undefined
        ? ''
        : state.getIn(['payment', 'main', 'orderInfo', 'channelCode']);
    default:
      return '';
  }
};

// 預設 call API request
export const apiRequest = (param = {}) => {
  const baseURL = param.baseURL === undefined ? '' : param.baseURL;
  const header = param.headers === undefined ? '' : param.headers;

  return axios.create({
    baseURL,
    headers: header,
    // timeout: 10000, // 10s
  });
};

// New Payment Web API request
export const paymentRequest = (param = {}) => {
  const baseURL = param.baseURL === undefined ? 'newPaymentWeb/new_ezding' : param.baseURL;
  const header = param.headers === undefined ? '' : param.headers;

  return axios.create({
    baseURL,
    headers: header,
    // timeout: 10000, // 10s
  });
};

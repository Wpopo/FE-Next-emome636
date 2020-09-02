import store from 'Store';
import HelperData from './data';
import Immutable from 'immutable';
import Router from 'next/router';

// 導頁系統
const Helper = {
  // 初始化
  init() {
    console.log('init');
    if (this.getStorageData('open')) return;
    // 若非從座位頁帶資料進來，一律強制驅離
    const initCheck =
      sessionStorage.getItem('paymentViewInit') === null || sessionStorage.getItem('paymentViewInit') === undefined;

    // 參數
    const obj = {
      // 準備前往的網址
      goToUrl: '/',
      // 從此離開的網址
      leaveFromUrl: null,
      // 是否開起警告視窗
      open: false,
      // 強制離開
      forceLeave: initCheck,
    };
    sessionStorage.setItem('redirect', JSON.stringify(obj));
  },

  // get sessionStorage
  getStorage() {
    return JSON.parse(sessionStorage.getItem('redirect'));
  },

  getStorageData(key) {
    let value = null;
    const data = this.getStorage();
    if (data === null) return null;
    if (data.hasOwnProperty(key)) value = data[key];
    return value;
  },

  // set sessionStorage
  setStorage(key, value) {
    const data = this.getStorage();
    if (data === null) return null;
    if (data.hasOwnProperty(key)) data[key] = value;
    sessionStorage.setItem('redirect', JSON.stringify(data));
  },

  // 檢查Payment資料是否存在
  checkData() {
    const view = HelperData.getUrlParam(window.location.href).pages;

    if (view !== 'servicePolicy') {
      const state = store.getState();
      const movieInfo = state.getIn(['main', 'movieInfo']);

      if (Object.getOwnPropertyNames(movieInfo instanceof Immutable.Map ? movieInfo.toJS() : movieInfo).length <= 0) {
        // 無資料 強制導回首頁
        this.setStorage('goToUrl', '/');
        this.setStorage('forceLeave', true);
        Router.push('/');
      }
    }
  },

  // 處理頁面轉跳行為
  handleRouteChange(url) {
    const redirect = this.getStorage();

    if (url === undefined || redirect === null) return;

    // 強制離開
    if (redirect.forceLeave) {
      return;
    }

    // url 符合這些的網址，直接離開paymentWeb
    if (
      url.indexOf('/endingPage') > -1 ||
      url.indexOf('/repairPage') > -1 ||
      url.indexOf('/bookingError') > -1 ||
      url.indexOf('ezding.movieOrder') > -1
    ) {
      this.setStorage('goToUrl', url);
      this.setStorage('forceLeave', true);
      return;
    }

    if (!url.startsWith('/paymentWeb')) {
      // 導頁網址為離開paymentWeb
      // 打開Alert視窗，判斷是否確定離開訂購
      // if (url.startsWith('/Login?page=seatmap')) {
      //   this.setStorage('goToUrl', '/');
      // } else {
      //   this.setStorage('goToUrl', url);
      // }
      this.setStorage('goToUrl', url);
      this.setStorage('leaveFromUrl', HelperData.getUrlParam(window.location.href).pages);
      this.setStorage('open', true);
    }
  },

  resetData() {
    if (sessionStorage.getItem('bodyData') !== null) {
      sessionStorage.removeItem('bodyData');
    }
    if (sessionStorage.getItem('redirect') !== null) {
      sessionStorage.removeItem('redirect');
    }
  },
};

export default Helper;

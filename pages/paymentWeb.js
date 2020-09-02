import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Helper from 'Lib/helper';
import Checkout from 'Components/paymentWeb/Checkout';
import ServicePolicy from 'Components/paymentWeb/servicePolicy';
import SelectProduct from 'Components/paymentWeb/selectProduct';
import Information from 'Components/paymentWeb/Information';
import Button from '@material-ui/core/Button';
import Router from 'next/router';
import AlertDialog from 'Components/common/EzAlertDialog';
import { setView, mainReset } from 'Actions/payment/mainActions';
import { preferentialReset } from 'Actions/payment/preferentialActions';
import { productReset } from 'Actions/payment/productCartActions';
// import PaymentWebContainer from 'Components/paymentWeb/paymentWebContainer';
// import * as memberAPI from '../actions/memberAPI';

const PaymentWeb = ({ ...props }) => {
  const { view, setView, mainReset, preferentialReset, productReset } = props;

  const [open, setOpen] = useState(false);
  // 處理重新整理事件
  const handleBeforeunload = (e) => {
    e.returnValue = '本頁所選內容將不會保留，確定結束此次訂購嗎？';
  };
  // Reset PaymentWeb
  const leaveReset = () => {
    // 離開Payment時，清空Redux資料 & storage資料
    Router.events.off('routeChangeStart', Helper.redirect.handleRouteChange());
    window.onbeforeunload = null;
    Helper.redirect.resetData();
    productReset();
    preferentialReset();
    mainReset();
  };

  useEffect(() => {
    if (props.view === undefined || props.view === '') {
      leaveReset();
      Router.push('/');
    }
    // 檢查Payment資料是否存在
    // const nView = Helper.data.getUrlParam(window.location.href).pages;
    // if (nView === null || nView === undefined || nView === '') {
    // } else {
    //   Helper.redirect.checkData();
    // }
  });

  useEffect(() => {
    console.log('useEffect[]');
    Helper.redirect.init();
    // 監聽重新整理
    window.onbeforeunload = handleBeforeunload;
    const nView = Helper.data.getUrlParam(window.location.href).pages;

    // 是否開起警告視窗
    setOpen(Helper.redirect.getStorageData('open'));
    Helper.redirect.setStorage('open', false);

    // 若初始畫面無帶參數時，給定預設頁面
    // 若有設定，則直接帶入指定頁面
    if (nView === null || nView === undefined || nView === '') {
      Router.push({
        pathname: '/paymentWeb',
        query: { pages: 'servicePolicy' },
      });
    } else {
      setView(nView);
    }

    // 重新整理 導回首頁
    if (Helper.redirect.getStorageData('forceLeave')) {
      console.log('leaveReset');
      leaveReset();
      window.location.href = '/';
      // Router.push('/');
    }
    sessionStorage.removeItem('paymentViewInit');

    // 處理頁面轉跳行為
    Router.events.on('routeChangeStart', (url) => {
      if (url.startsWith('/paymentWeb')) {
        console.log('畫面跳轉囉');
        setView(Helper.data.getUrlParam(url).pages);
      }
      Helper.redirect.handleRouteChange(url);
    });

    return () => {
      const redirect = Helper.redirect.getStorage();
      console.log('redirect', redirect);

      if (redirect === null || redirect === undefined) {
        leaveReset();
        return;
      }
      // 強制離開
      if (redirect.forceLeave) {
        leaveReset();
        Router.push(redirect.goToUrl);
        return;
      }

      if (redirect.open) {
        Router.push({
          pathname: '/paymentWeb',
          query: { pages: redirect.leaveFromUrl },
        });
        return;
      }

      // 以上情況皆不符合
      // 離開Payment Web
      leaveReset();
    };
  }, []);

  // 監聽頁面轉跳時，需將參數寫入網址
  useEffect(() => {
    console.log('useEffect[view]');
    if (location.pathname === '/paymentWeb' && view !== undefined && view !== null && view !== '') {
      // 到選商品頁時，清空優惠內容，防止User使用瀏覽器亂跳頁
      if (view === 'selectProduct') {
        preferentialReset();
      }
      // 到選規則頁時，清空優惠、商品內容，防止User使用瀏覽器亂跳頁
      if (view === 'servicePolicy') {
        productReset();
        preferentialReset();
      }
      Router.push({
        pathname: '/paymentWeb',
        query: { pages: view },
      });
    }
  }, [view]);

  return (
    <div>
      {/* Debug專用 - START */}
      {/* <div style={{ marginBottom: '30px', border: '1px solid #ffffff' }}>
        <Button onClick={() => setView('servicePolicy')}>會員條款</Button>
        <Button onClick={() => setView('selectProduct')}>選商品</Button>
        <Button onClick={() => setView('checkOut')}>去結帳</Button>
      </div> */}
      {/* Debug專用 - END */}
      <AlertDialog
        open={open}
        style={'YESNO'}
        handleCancle={() => setOpen(false)}
        handleClose={() => {
          Router.push(Helper.redirect.getStorageData('goToUrl'));
          Helper.redirect.setStorage('forceLeave', true);
        }}
        title={'注意'}
        context={'本頁所選內容將不會保留，確定結束此次訂購嗎？'}
      />
      <div className="fullPage">
        {(() => {
          switch (view) {
            // 會員條款
            case 'servicePolicy':
              return <ServicePolicy />;
            // 選商品
            case 'selectProduct':
              return <SelectProduct />;
            // 去結帳
            case 'checkOut':
              return <Checkout />;
            default:
              return null;
          }
        })()}
        {/* 顯示訂票詳細頁的頁面 */}
        {view === 'selectProduct' || view === 'checkOut' ? <Information /> : null}
      </div>
    </div>
  );
};
export default connect(
  (state) => ({ view: state.getIn(['payment', 'main', 'view']) }),
  (dispatch) => ({
    setView(view) {
      dispatch(setView(view));
    },
    mainReset() {
      dispatch(mainReset());
    },
    productReset() {
      dispatch(productReset());
    },
    preferentialReset() {
      dispatch(preferentialReset());
    },
  }),
)(PaymentWeb);

import React, { useEffect } from 'react';
import Router from 'next/router';
import CONSTANT from 'CONSTANTS';
import API from 'CONSTANTS/API/memberAPI';
import Helper from 'Lib/helper';
import Loading from 'Components/common/EzLoading';

const Login = () => {
  useEffect(() => {
    // Url 所帶參數
    // 授權token所使用 (拿code換token)
    const code = Helper.data.getUrlParam().code;
    // 前一頁頁面 但流程結束後 會根據此參數導頁至特定頁面
    const page = Helper.data.getUrlParam().page;
    // back=true, 代表成功從中華登入頁回來
    const back = Helper.data.getUrlParam().back;

    if (page) sessionStorage.setItem('page', page);

    // 進行登入判斷
    if (localStorage.getItem('access_token')) {
      // 已登入狀態
      // 檢查Token
      fetch_check_token();
      // 直接進行導頁
      // router_page();
    } else if (!back) {
      // 第一次登入
      Router.push(`${CONSTANT.RentUrl()}`);
    } else {
      // 中華影城通申租 登入回來
      // 若有帶code,，則進行換token
      fetch_token(code, page);
    }
  }, []);

  // 拿code 換token
  const fetch_token = (code) => {
    Helper.axios.fetch(
      API.MEMBER.GET_TOKEN(code),
      (cb) => {
        // 將token 存入Local Storage
        if (cb.access_token) localStorage.setItem('access_token', cb.access_token);
        // 完成登入後 進行導頁
        router_page();
      },
      {
        errorFn: () => {
          console.log('error123');
        },
      },
    );
  };

  // 查詢token資訊
  const fetch_check_token = () => {
    Helper.axios.fetch(
      API.MEMBER.CHECK_TOKEN(),
      (cb) => {
        // 完成登入後 進行導頁
        router_page();
      },
      {
        errorFn: () => {
          Router.push({ pathname: '/repairPage' });
        },
        cusCode: {
          // Token 失效
          401: () => {
            // 將token 移除
            localStorage.removeItem('access_token');
            // 進行登入
            Router.push(`${CONSTANT.RentUrl()}`);
          },
        },
      },
    );
  };

  // 完成登入後 進行導頁
  const router_page = () => {
    const page = sessionStorage.getItem('page');
    sessionStorage.removeItem('page');

    if (page === 'seatmap') {
      // paymentInit : 第一次進行 結帳流程
      console.log('router_page');
      Router.push({ pathname: '/paymentWeb' });
    } else if (page === 'member') {
      // 座位頁進來 則導去登入
      Router.push({ pathname: '/memberCenter' });
    } else {
      // 預設 導回首頁
      Router.push({ pathname: '/' });
    }
  };

  return <Loading open />;
};

export default Login;

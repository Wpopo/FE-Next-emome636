import CONSTANTS from 'CONSTANTS/payment';
import Router from 'next/router';
import HelperAxios from './axios';
import HelperPayment from './paymentData';
import API from 'CONSTANTS/API/paymentWebAPI';

const Helper = {
  // 檢查設備是否可使用Apple Pay
  checkDevice: () => {
    if (window.ApplePaySession) {
      if (ApplePaySession.canMakePayments) {
        return true;
      }
    }
    return false;
  },
  // 檢查設備是否可使用Apple Pay，以及電子錢包中是否有卡片。
  checkDeviceAndActiveCard: (success, fail) => {
    // 檢查環境未通過
    if (!window.ApplePaySession) return fail();

    // 申請的Apple Pay Merchant Identifier
    const merchantIdentifier = CONSTANTS.applePay.merchantIdentifier;

    // 檢查 insecure document 環境
    if (location.protocol !== 'https:') return fail();

    // 進行付款驗證設備是否能夠支援Apple Pay付款
    const promise = ApplePaySession.canMakePaymentsWithActiveCard(merchantIdentifier);

    // 可支援Apple Pay付款
    promise.then(canMakePayments => {
      if (canMakePayments) {
        return success();
      } else {
        return fail();
      }
    });
  },

  sendOrder: (checkFn, UIData, money) => {
    if (!checkFn()) return;

    let orderData = UIData;
    orderData.booking_product = HelperPayment.getCheckOutOrder();
    orderData = Object.assign(orderData, HelperPayment.getCheckOutEVN());
    const { ez_trans_master_id } = orderData;
    const session = new ApplePaySession(1, CONSTANTS.applePay.paymentRequest(money));

    session.oncancel = event => {
      // console.log('oncancel');
      // console.log(event);
    };

    /**
     * Merchant Validation
     * We call our merchant session endpoint, passing the URL to use
     */
    session.onvalidatemerchant = event => {
      const validationURL = event.validationURL;
      // console.log('validate merchant');
      // console.log(`validation url=${validationURL}`);
      // 環境驗證, 授權
      HelperAxios.fetch(
        API.ORDERS.CREATE_APPLEPAY_ORDER(ez_trans_master_id),
        cb => {
          session.completeMerchantValidation({
            displayName: cb.validation_info.display_name,
            domainName: cb.validation_info.domain_name,
            epochTimestamp: cb.validation_info.epoch_timestamp,
            expiresAt: cb.validation_info.expires_at,
            merchantIdentifier: cb.validation_info.merchant_identifier,
            merchantSessionIdentifier: cb.validation_info.merchant_session_identifier,
            nonce: cb.validation_info.nonce,
            signature: cb.validation_info.signature,
          });
        },
        {
          errorFn: () =>
            // 錯誤導頁
            Router.push({
              pathname: '/bookingError',
            }),
        },
      );
    };

    /**
     * Shipping Method Selection
     * If the user changes their chosen shipping method we need to recalculate
     * the total price. We can use the shipping method identifier to determine
     * which method was selected.
     */
    session.onshippingmethodselected = event => {
      // console.log('onshippingmethodselected');
    };

    /**
     * Payment Authorization
     * Here you receive the encrypted payment data. You would then send it
     * on to your payment provider for processing, and return an appropriate
     * status in session.completePayment()
     */
    // 取得New Payment授權 並完成訂單
    session.onpaymentauthorized = event => {
      // console.log('onpaymentauthorized');
      // 取得授權payload並傳入API
      const payment = event.payment;
      orderData.use_data.payload = JSON.stringify(payment.token);

      HelperAxios.fetch(
        API.ORDERS.CREATE_CREDIT_ORDER(orderData),
        cb => {
          // 執行付款，關閉導頁監控
          window.onbeforeunload = null;

          const orderID = cb.ez_order_id;
          const redirectPage = localStorage.getItem('redirectPage');

          session.completePayment(ApplePaySession.STATUS_SUCCESS);
          if (redirectPage === 'comeFromApp') {
            // 導回 app
            const urlLine = encodeURI(orderID);
            window.location.href = `ezding.movieOrder://${urlLine}`;
          } else {
            sessionStorage.setItem('orderID', orderID);
            Router.push({
              pathname: '/endingPage',
            });
          }
        },
        {
          errorFn: () =>
            // 錯誤導頁
            Router.push({
              pathname: '/bookingError',
            }),
        },
      );
    };

    // All our handlers are setup - start the Apple Pay payment
    session.begin();
  },
};

export default Helper;

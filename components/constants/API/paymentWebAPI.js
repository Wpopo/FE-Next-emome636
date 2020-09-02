import EVN, { paymentRequest as apiRequest, payment_EVN as pEVN } from './EVN';

const AxiosAPI = {
  CINEMAS: {
    // 取得影城系列資訊
    GET_INFO: (ecmID = pEVN('ecmID')) => apiRequest().get(`/cinemas/series?ecm_id=${ecmID}`),
  },
  PRODUCT: {
    // 取得票價項目資訊-商品
    GET_PRODUCT: (erpCode = pEVN('erpCode'), productType = '1', fareType = '4,6,7,8,9', ecdID = pEVN('ecdID')) =>
      apiRequest().get(
        `/ez_product/fares?erp_product_code=${erpCode}&product_type=${productType}&fare_type=${fareType}&ecd_id=${ecdID}`,
      ),
  },

  ORDERS: {
    // 與影城交易(用戶選擇座位資料)
    LOCK_SEATS: (data, token = EVN('token')) =>
      apiRequest({
        headers: {
          'Content-Type': 'application/json',
          'X-Ftc-Authorization': token,
        },
      }).post('/orders/booking_selected_seats', JSON.stringify(data)),

    // 新增訂購資訊
    NEW_ORDER: (data, token = EVN('token')) =>
      apiRequest({
        headers: {
          'Content-Type': 'application/json',
          'X-Ftc-Authorization': token,
        },
      }).post('/ez_product/new_order_info', JSON.stringify(data)),

    // 取得付款工具資訊
    GET_PAYMENT_TOOL: (emfmID = 0) => apiRequest().get(`/ez_product/payment_method?epfm_id=${emfmID}`),

    //   // 成立訂單：信用卡, Apple Pay
    CREATE_CREDIT_ORDER: (data, token = EVN('token')) =>
      apiRequest({
        headers: {
          'Content-Type': 'application/json',
          'X-Ftc-Authorization': token,
        },
      }).post('/ez_product/complete_order_info', JSON.stringify(data)),

    //   // 成立訂單：LINE PAY, 遠傳
    //   CREATE_EXTERNAL_ORDER: (data, token = EVN('token')) =>
    //     apiRequest({
    //       headers: {
    //         'Content-Type': 'application/json',
    //         'X-Ftc-Authorization': token,
    //       },
    //     }).post('/ez_product/apply_external_order_info', JSON.stringify(data)),

    //   // 成立訂單：APPLE PAY
    //   CREATE_APPLEPAY_ORDER: (ez_trans_master_id, token = EVN('token')) =>
    //     apiRequest({
    //       headers: {
    //         'Content-Type': 'application/json',
    //         'X-Ftc-Authorization': token,
    //       },
    //     }).post('/ez_product/pay_verification', {
    //       data: [
    //         {
    //           key: 'validationURL',
    //           value: 'https://apple-pay-gateway-cert.apple.com/paymentservices/startSession',
    //         },
    //       ],
    //       ez_trans_master_id,
    //       use_type: 'applepay',
    //     }),

    //   // 完成訂單：外部
    //   COMPLETE_EXTERNAL_ORDER: (data, token = EVN('token')) =>
    //     apiRequest({
    //       headers: {
    //         'Content-Type': 'application/json',
    //         'X-Ftc-Authorization': token,
    //       },
    //     }).post('/ez_product/complete_external_order_info', JSON.stringify(data)),
    // },
    // MEMBER: {
    //   // 取得會員有效紅利總點數
    //   GET_RED_POINT: (token = EVN('token'), type = 'ez_member_point') =>
    //     apiRequest({
    //       headers: { 'x-ftc-authorization': token },
    //     }).get(`/api/members/points?point_type=${type}`),
    //   GET_INFO: (token = EVN('token')) =>
    //     apiRequest({
    //       baseURL: '',
    //       headers: { 'x-ftc-authorization': token },
    //     }).get('/MemberUI/api/members/detail'),
  },
};

export default AxiosAPI;

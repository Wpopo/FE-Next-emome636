import EVN, { apiRequest } from './EVN';

const AxiosAPI = {
  MEMBER: {
    // 使用授權code換取token
    GET_TOKEN: (code = 0) => apiRequest({ baseURL: '' }).post(`MemberUI/api/authorization/code/${code}`, {}),
    // 查詢token資訊
    CHECK_TOKEN: (token = EVN('token')) => apiRequest().get(`MemberUI/api/oauth/token?token=${token}`),
    // 取得會員有效紅利總點數
    GET_RED_POINT: (token = EVN('token'), type = 'ez_member_point') =>
      apiRequest({
        headers: { 'x-ftc-authorization': token },
      }).get(`/api/members/points?point_type=${type}`),
    // 取得會員紅利清單及明細
    GET_RED_POINT_LIST: (token = EVN('token'), website = EVN('website'), type = 'ez_member_point') =>
      apiRequest({
        baseURL: '',
        headers: { 'x-ftc-authorization': token },
      }).get(
        `/new_ezding/members/point_list?website=${website}&point_type=${type}&begin_time=1514736000000&end_time=4070908800000&page=1&page_size=10`,
      ),
    // 取得會員資料
    GET_INFO: (token = EVN('token')) =>
      apiRequest({
        baseURL: '',
        headers: { 'x-ftc-authorization': token },
      }).get('/MemberUI/api/members/detail_for_payment?is_login_id=1&login_type=5'),

    // 取得會員訂票清單及明細
    // is_show=1 已開演
    // is_show=0 未開演
    GET_ORDER_RECORD: (is_show = 1, type = 1, page = 1, page_size = 50, token = EVN('token')) =>
      apiRequest({
        baseURL: '',
        headers: { 'x-ftc-authorization': token },
      }).get(`/new_ezding/v2/members/order_list?is_show=${is_show}&type=${type}&page=${page}&page_size=${page_size}`),

    GET_ORDER: (orderID = '', token = EVN('token')) =>
      apiRequest({
        headers: {
          'Content-Type': 'application/json',
          'X-Ftc-Authorization': token,
        },
      }).get(`/new_ezding/members/order?ez_order_id=${orderID}`),

    GET_TOTAL_POINTS: (point_type = 'ez_member_point', website = 3, token = EVN('token')) =>
      apiRequest({
        headers: {
          'Content-Type': 'application/json',
          'x-ftc-authorization': token,
        },
      }).get(`/new_ezding/api/members/points?point_type=${point_type}&website=${website}`),

    GET_SUB: (website = 3, token = EVN('token')) =>
      apiRequest({
        headers: {
          'Content-Type': 'application/json',
          'X-Ftc-Authorization': token,
        },
      }).post(`/new_ezding/members/sub?website=${website}`),

    CANCEL_BOOKING: (orderID = '', token = EVN('token')) =>
      apiRequest({
        headers: {
          'Content-Type': 'application/json',
          'x-ftc-authorization': token,
        },
      }).post(`/new_ezding/orders/cancel_booking_record/?order_id=${orderID}`),
  },
};

export default AxiosAPI;

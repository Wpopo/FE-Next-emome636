import EVN, { apiRequest } from './EVN';

const AxiosAPI = {
  BANNER: {
    GET_BANNER: (size = 1) =>
      apiRequest().get(
        `/new_ezding/ads?ad_type=1&ad_category=636.banner&ad_channel=636.web&page_code=home&area_code=mainBanner&ad_size=${size}`,
      ),
  },
  SHOWTIME: {
    // 取得現正熱映電影排行榜清單
    GET_HOTLINE_MOVIE: (page = 1, size = 100) =>
      apiRequest().get(`/new_ezding/ranking_list/order_top?page=${page}&page_size=${size}`),
    // 取得即將上映電影清單
    GET_COMING_MOVIE: (page = 1, size = 100) =>
      apiRequest().get(`/new_ezding/ranking_list/coming?page=${page}&page_size=${size}`),
    // 取得一部電影詳細資料
    GET_MOVIE_DETAIL_INFO: (id = '3a0a04776d9e44fe8159042ebdd24d0d') => apiRequest().get(`/new_ezding/movies/${id}`),
    // 取得指定電影及指定影城區域開演電影場次清單
    GET_MOVIE_DETAIL_TIME: (id = '3a0a04776d9e44fe8159042ebdd24d0d', location = 0, page = 1, page_size = 200) =>
      apiRequest().get(
        `/new_ezding/orders/find_location_cinema?movie_id=${id}&location=${location}&page=${page}&page_size=${page_size}`,
      ),
    // 取得指定電影場次座位資訊
    GET_SEAT_DETAIL: (sessionID = 'c40b7ed524d242959bfb7222ba0cde52', ticket = '1') =>
      apiRequest().post('/new_ezding/orders/booking_start_trans', {
        session_id: sessionID,
        tickets: ticket,
      }),
    GET_Garage_Play_LIST: () => apiRequest().get('/GarageplayAPI/api_fullerton_636/vods'),
  },
  PREFERENTIAL: {
    // 取得一筆優惠詳細價格
    GET_PREFERENTIAL_DETAIL_INFO: (payment_id = '56', movie_version = '1') =>
      apiRequest().get(`/new_ezding/payment/payment_detail/${payment_id}?movie_version=${movie_version}`),
  },
};

export default AxiosAPI;

import HelperAxios from './helper/axios';
import HelperData from './helper/data';
import HelperPaymentData from './helper/paymentData';
import HelperRedirect from './helper/redirect';
import HelperDatetime from './helper/datetime';
import HelperApplePay from './helper/applePay';

const Helper = {
  axios: HelperAxios,
  data: HelperData,
  payment: HelperPaymentData,
  redirect: HelperRedirect,
  datetime: HelperDatetime,
  applePay: HelperApplePay,
};

export default Helper;

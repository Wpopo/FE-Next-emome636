import React, { Fragment, Component } from 'react';
import Router from 'next/router';
import CONSTANTS from 'CONSTANTS';
import Helper from 'Lib/helper';
import API from 'CONSTANTS/API/paymentWebAPI';
import MemberAPI from 'CONSTANTS/API/memberAPI';
import CheckoutUI from 'Components/paymentWeb/CheckoutUI';
import AlertDialog from 'Components/common/EzAlertDialog';
import { setView } from 'Actions/payment/mainActions';
import { connect } from 'react-redux';

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowAlert: false,
      alertText: '',
      useTool: [],
      isLoading: false,
      isLoading2: false,
      // 消費金額
      money: 0,
      UIData: {
        /* 支付方式 */
        // 1:信用卡 2:LINE PAY 3:遠傳電信帳單 4:APPLY PAY 5:AFTEE先享後付
        use_method: 1,

        /* Apple 授權專用參數 */
        use_data: {
          payload: '',
          device_info: '',
        },

        /* 發票種類 */
        // 0:捐贈 1:個人戶 2:公司戶
        finv_type: 0,
        // 發票統編
        finv_tax_no: '',
        // 發票抬頭
        finv_title: '',
        // 發票地址-郵遞區號
        finv_zip: '',
        // 發票地址-縣市代碼
        finv_county_id: '',
        // 發票地址-區鄉鎮代碼
        finv_town_id: '',
        // 發票地址
        finv_address: '',
        // 發票收件人姓名
        finv_receiver: '',
        // 發票載具
        // 1:捐贈 2:會員載具 3:手機條碼 4:自然人憑證
        finv_device: 1,
        // 載具顯碼ID
        finv_device_show_id: '',
        // 載具隱碼ID
        finv_device_hide_id: '',
        // 發票捐贈愛心碼 (default: 創世基金會919)
        finv_donate_code: '919',

        /* 信用卡 */
        // 信用卡卡號
        pan: '',
        // 到期年
        expire_year: '',
        // 到期月
        expire_month: '',
        // 檢核碼
        cvv2: '',

        /* 訂購人資料 */
        // 電話號碼
        mobile: '',
        // 電子郵件
        email: '',
        // 亞萬序號
        asiamiles_no: '',

        /* 其他 */
        // ez訂交易資料ID
        ez_trans_master_id: '',
        // 平台代碼
        channel_code: '',
        // 活動代碼
        campaign_code: '',
        // 平台參數
        options: '',
        // 作業系統
        os_type: '',
      },
    };

    // const backPage = sessionStorage.getItem('back');
    // const { view, setView } = props;
    // if (backPage !== null && backPage === 'selectProduct') {
    //   setView('selectProduct');
    // } else {
    //   sessionStorage.setItem('back', 'selectProduct');
    // }
  }

  componentDidMount() {
    // 取得會員資料
    this.fetchMemberInfo();
    // 取得付款工具資訊
    // this.fetchPaymentTool();
    // 取得消費金額
    // const productList = Helper.payment.getInformatData();
    // this.setState({ money: productList[0] });
  }

  componentWillUnmount() {
    // 執行付款，關閉導頁監控
    window.onbeforeunload = null;
  }

  // 取得付款工具資訊
  fetchPaymentTool = () => {
    Helper.axios.fetch(
      API.ORDERS.GET_PAYMENT_TOOL(Helper.payment.getCheckOutID()),
      (cb) => {
        if (cb !== undefined) {
          const useMethod = cb.use_method;

          if (useMethod.includes(4)) {
            // 若付款方式可支援Apple Pay的情況 (method: 4)
            // 須先檢查環境是否支援
            // 若不支援，則將Apple Pay付款方式移除
            const index = useMethod.indexOf(4);
            if (index !== -1) useMethod.splice(index, 1);

            Helper.applePay.checkDeviceAndActiveCard(
              () => this.setState({ useTool: useMethod.concat(4), isLoading: false }),
              () => this.setState({ useTool: useMethod, isLoading: false }),
            );
          } else {
            this.setState({ useTool: useMethod, isLoading: false });
          }
        }
      },
      {
        errorFn: () => {
          // 錯誤導頁
          Router.push({
            pathname: '/bookingError',
          });
        },
        cusCode: { 300: (msg) => this.setState({ isShowAlert: true, alertText: msg, isLoading: false }) },
      },
    );
  };

  // 取得會員資料
  fetchMemberInfo = () => {
    Helper.axios.fetch(
      MemberAPI.MEMBER.GET_INFO(),
      (cb) => {
        if (cb !== undefined) {
          const { mobile, email, asiamiles_no } = cb;
          this.setState((prevState) => ({
            isLoading2: false,
            UIData: { ...prevState.UIData, mobile, email, asiamiles_no: asiamiles_no === null ? '' : asiamiles_no },
          }));
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

  // 檢查必填欄位
  checkData = () => {
    // 主錯誤
    const error_main = [];
    // 格式錯誤
    const error_format = [];
    const { UIData } = this.state;

    // 檢核付款方式
    // 信用卡
    if (UIData.use_method === 1) {
      // 檢核 到期年, 到期月, 檢核碼, cvv2
      if (UIData.pan.length < 10 || UIData.pan.length > 20 || !Helper.data.isNumber(UIData.pan)) {
        error_format.push('信用卡卡號');
      }
      if (UIData.expire_month.length <= 0) {
        error_format.push('信用卡到期月');
      }
      if (UIData.expire_year.length <= 0) {
        error_format.push('信用卡到期年');
      }
      if (UIData.cvv2.length !== 3 || !Helper.data.isNumber(UIData.cvv2)) {
        error_format.push('信用卡末三碼');
      }

      // 2:LINE PAY 3:遠傳電信帳單 4:APPLY PAY
    } else if (UIData.use_method === 2 || UIData.use_method === 3 || UIData.use_method === 4) {
      // nothing to check
    } else {
      error_main.push('請選擇付款方式');
    }

    // 檢核電子發票
    // 0:捐贈
    if (UIData.finv_type === 0) {
      if (
        UIData.finv_donate_code.length < 3 ||
        UIData.finv_donate_code.length > 7 ||
        !Helper.data.isNumber(UIData.finv_donate_code)
      ) {
        error_format.push('捐贈碼');
      }

      // 1:個人戶
    } else if (UIData.finv_type === 1) {
      // device 2:會員載具
      if (UIData.finv_device === 2) {
        if (UIData.finv_receiver.length <= 0) {
          error_format.push('發票收件人姓名');
        }
        if (UIData.finv_county_id.length <= 0) {
          error_format.push('發票縣市');
        }
        if (UIData.finv_town_id.length <= 0) {
          error_format.push('發票鄉鎮地區');
        }
        if (UIData.finv_address.length <= 0) {
          error_format.push('發票收件地址');
        }
        // device 3:手機條碼
      } else if (UIData.finv_device === 3) {
        if (UIData.finv_device_show_id.length !== 8 || !Helper.data.isPhoneCode(UIData.finv_device_show_id)) {
          error_format.push('載具條碼');
        }
        // device 4:自然人憑證
      } else if (UIData.finv_device === 4) {
        if (UIData.finv_device_show_id.length !== 16 || !Helper.data.isNaturalPerson(UIData.finv_device_show_id)) {
          error_format.push('自然人憑證');
        }
      }

      // 2:公司戶
    } else if (UIData.finv_type === 2) {
      if (UIData.finv_tax_no.length !== 8 || !Helper.data.isNumber(UIData.finv_tax_no)) {
        error_format.push('統一編號');
      }
      if (UIData.finv_title.length <= 0) {
        error_format.push('統一抬頭');
      }
      if (UIData.finv_receiver.length <= 0) {
        error_format.push('發票收件人姓名');
      }
      if (UIData.finv_county_id.length <= 0) {
        error_format.push('發票縣市');
      }
      if (UIData.finv_town_id.length <= 0) {
        error_format.push('發票鄉鎮地區');
      }
      if (UIData.finv_address.length <= 0) {
        error_format.push('發票收件地址');
      }
    }

    // 訂購人資料
    // 非必填，但填了會做檢查
    if (UIData.email !== null && UIData.email.length > 0) {
      if (!Helper.data.isEmailAddress(UIData.email)) error_format.push('Email');
    }
    if (UIData.asiamiles_no.length > 0) {
      if (UIData.asiamiles_no.length !== 10 || !Helper.data.isNumber(UIData.asiamiles_no)) {
        error_format.push('亞洲萬里通');
      }
    }

    if (error_main.length > 0) {
      this.setState({ isShowAlert: true, alertText: error_main.map((t) => t).join('、') });
    } else if (error_format.length > 0) {
      this.setState({ isShowAlert: true, alertText: `${error_format.map((t) => t).join('、')} 格式錯誤` });
    } else if (UIData.use_method === 4) {
      // apple pay
      return true;
    } else {
      this.sendCheckOut();
    }
  };

  // 執行付款
  sendCheckOut = () => {
    const { UIData } = this.state;
    let orderData = UIData;
    orderData.booking_product = Helper.payment.getCheckOutOrder();

    orderData = Object.assign(orderData, Helper.payment.getCheckOutEVN());

    const { use_method, ez_trans_master_id } = orderData;

    if (use_method !== 4) {
      this.setState({ isLoading: true });
    }

    if (use_method === 1) {
      // 1:信用卡
      Helper.axios.fetch(
        API.ORDERS.CREATE_CREDIT_ORDER(orderData),
        (cb) => {
          // 執行付款，關閉導頁監控
          window.onbeforeunload = null;
          console.log(cb);
          const redirectPage = localStorage.getItem('redirectPage');
          const orderID = cb.ez_order_id;

          // 進行導頁
          if (redirectPage === 'lineToday') {
            // 導回 line today
            const urlLine = encodeURI(`mypage/movie?orderId=${orderID}`);
            window.location.href = `line://nv/news?page=${urlLine}`;
          } else if (redirectPage === 'comeFromApp') {
            // 導回 app
            const urlLine = encodeURI(orderID);
            window.location.href = `ezding.movieOrder://${urlLine}`;
          } else {
            // sessionStorage.setItem('orderID', orderID);
            Router.push({
              pathname: '/endingPage',
              query: { orderID: orderID },
            });
          }
        },
        {
          errorFn: () => this.setState({ isLoading: false }),
          cusCode: { 300: (msg) => this.setState({ isShowAlert: true, alertText: msg, isLoading: false }) },
        },
      );
    } else if (use_method === 2 || use_method === 3) {
      // 2:LINE PAY 3:遠傳電信帳單
      Helper.axios.fetch(
        API.ORDERS.CREATE_EXTERNAL_ORDER(orderData),
        (cb) => {
          // 第三方付款導頁
          const { temporary_trans_id } = cb;
          const orderValue = [{ name: 'temporary_trans_id', value: temporary_trans_id }];
          Helper.data.formPostSubmit(CONSTANTS.temporary.paymentUrl(), orderValue);
        },
        {
          errorFn: () =>
            // 錯誤導頁
            Router.push({
              pathname: '/bookingError',
            }),
          cusCode: { 300: (msg) => this.setState({ isShowAlert: true, alertText: msg, isLoading: false }) },
        },
      );
    } else if (use_method === 4) {
      // 4:Apple Pay
      Helper.axios.fetch(
        API.ORDERS.CREATE_APPLEPAY_ORDER(ez_trans_master_id),
        (cb) => {
          this.changeData('validation_info', {
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
          // cusCode: { 300: msg => this.setState({ isShowAlert: true, alertText: msg, isLoading: false }) },
        },
      );
    }
  };

  changeData = (fieldId, value) => {
    // 客製化 設定值
    if (fieldId === 'finv_device') {
      // finv_type 發票種類 0:捐贈 1:個人戶 2:公司戶
      // finv_device 發票載具 1:捐贈 2:會員載具 3:手機條碼 4:自然人憑證
      const { finv_type } = this.state.UIData;

      if (finv_type === 0) {
        // 捐贈
        this.setState((prevState) => ({ UIData: { ...prevState.UIData, finv_device: 1 } }));
      } else if (finv_type === 1) {
        // 個人戶 sid:0 = 會員載具, sid:1 = 手機條碼, sid:2 = 自然人憑證
        if (value === 0) {
          // 會員載具
          this.setState((prevState) => ({ UIData: { ...prevState.UIData, finv_device: 2 } }));
        } else if (value === 1) {
          // 手機條碼
          this.setState((prevState) => ({ UIData: { ...prevState.UIData, finv_device: 3 } }));
        } else if (value === 2) {
          // 自然人憑證
          this.setState((prevState) => ({ UIData: { ...prevState.UIData, finv_device: 4 } }));
        }
      }
    } else if (fieldId === 'finv_type') {
      if (value === 0) {
        // 捐贈
        this.setState((prevState) => ({ UIData: { ...prevState.UIData, finv_device: 1, [fieldId]: value } }));
      } else if (value === 1) {
        // 個人戶，預設設備為會員載具
        // 會員載具
        this.setState((prevState) => ({ UIData: { ...prevState.UIData, finv_device: 2, [fieldId]: value } }));
      } else {
        this.setState((prevState) => ({ UIData: { ...prevState.UIData, [fieldId]: value } }));
      }
    } else {
      // Default 設定值
      this.setState((prevState) => ({ UIData: { ...prevState.UIData, [fieldId]: value } }));
    }
  };

  getData = () => {
    const { UIData } = this.state;
    console.log({ UIData });
    // console.log({ booking: Helper.payment.getCheckOutOrder(), UIData });
  };

  render() {
    const { isShowAlert, alertText, isLoading, isLoading2, useTool, UIData, money } = this.state;
    const style = { display: 'none', background: '#e52981', width: '100px', cursor: 'pointer', marginBottom: '10px' };
    return (
      <Fragment>
        {isLoading || isLoading2 ? (
          // <UrlChange />
          'loading'
        ) : (
          <Fragment>
            <CheckoutUI useTool={[1, 5]} UIData={UIData} changeData={this.changeData} />
            <div style={style} id={UIData.use_method !== 4 ? 'checkOutBtn' : ''} onClick={() => this.checkData()}>
              去結帳
            </div>
            {/* <div style={style} onClick={() => this.getData()}>
              GET DATA
            </div>
            <div
              style={style}
              id={UIData.use_method === 4 ? 'checkOutBtn' : ''}
              onClick={() => Helper.applePay.sendOrder(this.checkData, UIData, money)}
            >
              APPLE PAY123
            </div> */}
          </Fragment>
        )}
        {/* 警告訊息 */}
        <AlertDialog
          open={isShowAlert}
          handleClose={() => this.setState({ isShowAlert: false })}
          title={'資料錯誤'}
          context={alertText}
        />
      </Fragment>
    );
  }
}

export default connect(
  (state) => ({ view: state.getIn(['payment', 'main', 'view']) }),
  (dispatch) => ({
    setView(view) {
      dispatch(setView(view));
    },
  }),
)(Checkout);

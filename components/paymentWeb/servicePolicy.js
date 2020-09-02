import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import { connect } from 'react-redux';
import Helper from 'Lib/helper';
import API from 'CONSTANTS/API/paymentWebAPI';
import MemberAPI from 'CONSTANTS/API/memberAPI';
import ScrollContent from 'Components/common/EzScrollContent';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import { setView, setInitOrderInfo, setMovieInfo, setErpCode } from 'Actions/payment/mainActions';
import { setIsApply } from 'Actions/member/memberActions';
import Palette from 'Styled/palette';
import { withStyles } from '@material-ui/core/styles';

const servicePolicy = ({ ...props }) => {
  const { ecmID, setView, classes } = props;
  const [context, setContext] = useState(['目前暫無資訊']);
  const [isAgree, setAgree] = useState(false);
  let orderInfo = {};

  useEffect(() => {
    // payment 初始化 call Api
    if (sessionStorage.getItem('paymentInit')) {
      // 初始設定
      init();
      // 鎖位 影城交易(用戶選擇座位資料)
      fetch_lock_seats();
      // 新增訂購資訊
      fetch_new_order();
      // 會員申租資格
      fetch_is_apply();

      sessionStorage.removeItem('paymentInit');
    } else {
      //Router.push('/');
      // 取得影城規定
      fetch_rule(ecmID);
    }
    // if (sessionStorage.getItem('back') !== null) {
    //   sessionStorage.removeItem('back');
    // }
  }, []);

  // 初始設定
  const init = () => {
    const { setInitOrderInfo } = props;
    orderInfo = JSON.parse(sessionStorage.getItem('bodyData'));
    setInitOrderInfo(orderInfo);
  };

  // 鎖位 影城交易(用戶選擇座位資料)
  const fetch_lock_seats = () => {
    const {
      session_id,
      cinema_id,
      movie_id,
      transaction_id,
      seat_idx_list,
      hall_id,
      area_num,
      area_category_code,
      cinema_trans_id,
    } = orderInfo;
    const orderData = {
      session_id,
      cinema_id,
      movie_id,
      transaction_id,
      seat_idx_list,
      hall_id,
      area_num,
      area_category_code,
      cinema_trans_id,
    };

    Helper.axios.fetch(API.ORDERS.LOCK_SEATS(orderData), (cb) => {}, {
      errorFn: () => {
        Router.push({ pathname: '/repairPage' });
      },
    });
  };

  // 新增訂購資訊
  const fetch_new_order = () => {
    const { setMovieInfo, setErpCode } = props;
    const { cinema_trans_id, session_id, channel_code, campaign_code, seat_idx_list } = orderInfo;
    const orderData = {
      cinema_trans_id,
      session_id,
      seats_info: seat_idx_list,
      channel_code,
      campaign_code,
    };

    Helper.axios.fetch(
      API.ORDERS.NEW_ORDER(orderData),
      (cb) => {
        const erpCode = cb.erp_product_code.join();
        setMovieInfo(cb);
        setErpCode(erpCode);

        // 取得影城規定
        fetch_rule(cb.ecm_id);
      },
      {
        errorFn: () => {
          //console.log('error123');
          Router.push({ pathname: '/repairPage' });
        },
      },
    );
  };

  // 取得 影城規定
  const fetch_rule = (ecm_id) => {
    Helper.axios.fetch(
      API.CINEMAS.GET_INFO(ecm_id),
      (cb) => {
        if (cb[0] !== undefined) {
          setContext(decodeURIComponent(escape(window.atob(cb[0].cinema_provision))));
        }
      },
      {
        errorFn: () => {
          //console.log('error123');
          Router.push({ pathname: '/repairPage' });
        },
      },
    );
  };

  const fetch_is_apply = () => {
    const { setIsApply } = props;
    Helper.axios.fetch(
      MemberAPI.MEMBER.GET_SUB(),
      (cb) => {
        let is_apply = 'N';
        cb.map((item) => {
          if (item.is_apply === 'Y') {
            is_apply = 'Y';
          }
        });
        setIsApply(is_apply);
      },
      {
        errorFn: () => {
          Router.push({ pathname: '/repairPage' });
        },
      },
    );
  };

  return (
    <div className={classes.root}>
      <ScrollContent children={<p dangerouslySetInnerHTML={Helper.data.createMarkup(context)} />} />

      <div className="provision">
        <Checkbox checked={isAgree} onChange={() => setAgree(true)} />
        <div className="provision_text">
          <span>我已閱讀並同意以上訂票規定、</span>
          <span
            className="tag"
            onClick={() => {
              window.open('/terms', '_blank');
            }}
          >
            <u>會員條款</u>
          </span>
          及
          <span
            className="tag"
            onClick={() => {
              window.open('/personal', '_blank');
            }}
          >
            <u>個資蒐集條款</u>
          </span>
        </div>
      </div>

      <Button variant={isAgree ? 'contained' : 'outlined'} disabled={!isAgree} onClick={() => setView('selectProduct')}>
        同意
      </Button>
    </div>
  );
};

const styles = (theme) => ({
  root: {
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    'align-items': 'center',
    '& .tag': { color: 'White', cursor: 'pointer' },
    '& .provision': {
      display: 'flex',
      'align-items': 'flex-start',
      padding: '16px 0',
      color: Palette.FIFTH[10],
      '& .provision_text': { lineHeight: '24px' },
    },
    '& .MuiButton-root': { width: '270px' },
    // pad
    [theme.breakpoints.down('md')]: {},
    // mobile
    [theme.breakpoints.down('sm')]: {
      '& .MuiButton-root': { width: '100%', maxWidth: '270px' },
    },
  },
});

export default connect(
  (state) => ({
    ecmID: state.getIn(['payment', 'main', 'movieInfo', 'ecm_id']),
  }),
  (dispatch) => ({
    setView(view) {
      dispatch(setView(view));
    },
    setInitOrderInfo(data) {
      dispatch(setInitOrderInfo(data));
    },
    setMovieInfo(data) {
      dispatch(setMovieInfo(data));
    },
    setErpCode(data) {
      dispatch(setErpCode(data));
    },
    setIsApply(data) {
      dispatch(setIsApply(data));
    },
  }),
)(withStyles(styles)(servicePolicy));

import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import { setView } from 'Actions/payment/mainActions';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import Helper from 'Lib/helper';
import API from 'CONSTANTS/API/paymentWebAPI';
import MemberAPI from 'CONSTANTS/API/memberAPI';
import ButtonControlGroup from 'Components/paymentWeb/ButtonControlGroup';
import { setInitTicketList, addTicket, reduceTicket } from 'Actions/payment/productCartActions';
import store from 'Store';
import Palette from 'Styled/palette';
import { withStyles } from '@material-ui/core/styles';

const selectProduct = ({ ...props }) => {
  const { addTicket, reduceTicket, ticketList, setInitTicketList, classes } = props;
  const [memberPoint, setMemberPoint] = useState(null);
  const state = store.getState();
  const isApply = state.getIn(['member', 'main', 'isApply']);
  // const backPage = sessionStorage.getItem('back');
  //const { view, setView } = props;
  const tickets = state.getIn(['payment', 'product', 'selectedTicket']);
  const [selectReq, setSelectReq] = useState(tickets);

  const seatCount = state.getIn(['payment', 'main', 'orderInfo', 'seat_idx_list']).split(',').length;

  useEffect(() => {
    console.log('useEffect');
    // 取得 票價項目資訊 - 商品
    fetech_product();
    fetch_member_point();
    // if (backPage !== null && backPage === 'servicePolicy') {
    //   setView('servicePolicy');
    // } else {
    //   sessionStorage.setItem('back', 'servicePolicy');
    // }
  }, []);

  // 取得 票價項目資訊-商品
  const fetech_product = () => {
    // 檢查Redux是否有資料，若有資料，則不再重新取得
    if (ticketList.size !== 0) {
      return;
    }

    Helper.axios.fetch(
      API.PRODUCT.GET_PRODUCT(),
      (cb) => {
        if (cb.length < 0) return;
        //轉換票不秀
        let new_info;
        // 非 VIP 會員 不賣紅利票
        if (isApply == 'N') {
          new_info = cb[0].product_info.filter((item) => item.epfm_id !== 56 && item.epfm_id !== 62);
        } else {
          new_info = cb[0].product_info.filter((item) => item.epfm_id !== 62);
        }

        // 整理存進redux的資料
        const result = new_info.map((item) => ({
          sort: item.sort,
          id: item.epfm_id,
          code: item.erp_product_code,
          name: item.fare_name,
          summary: item.short_fare_name,
          desc: item.product_description,
          image: item.img_url,
          price: item.price,
          fee: item.fare_fee,
          point: item.bonus_point,
          quantity: 0,
        }));
        setInitTicketList(Immutable.fromJS(result));
      },
      {
        errorFn: () => {
          //console.log('error123');
          Router.push({ pathname: '/repairPage' });
        },
      },
    );
  };
  const fetch_member_point = () => {
    Helper.axios.fetch(
      MemberAPI.MEMBER.GET_TOTAL_POINTS(),
      (cb) => {
        setMemberPoint(cb);
      },
      {
        errorFn: () => {
          //console.log('error123');
          Router.push({ pathname: '/repairPage' });
        },
      },
    );
  };

  const checkAddTicket = (idx) => {
    if (seatCount > selectReq) {
      setSelectReq(selectReq + 1);
      addTicket(idx);
    }
    //  console.log('selectReq', selectReq);
  };

  const checkReduceTicket = (idx) => {
    if (selectReq > 0) {
      setSelectReq(selectReq - 1);
      reduceTicket(idx);
    }
    // console.log('selectReq', selectReq);
  };

  return memberPoint !== null ? (
    <div className={classes.root}>
      <div className="pointInfo">
        <div className="pointInfoText">
          你的會員紅利點數 <span className="pointInfoTextG">{memberPoint.point_sum}</span> 點
        </div>
        <div className="pointInfoText">
          可兌換 <span className="pointInfoTextG">{parseInt(memberPoint.point_sum / 500)}</span> 張
        </div>
      </div>
      {ticketList.size > 0
        ? ticketList.map((ticket, idx) => (
            <div className="productWrap" key={idx}>
              <div>
                <div>{ticket.get('name')}</div>
                <div className="price">{Helper.data.formatPaymentPrice(ticket.get('price'), ticket.get('point'))}</div>
              </div>
              <ButtonControlGroup
                quantity={ticket.get('quantity')}
                add={() => checkAddTicket(idx)}
                reduce={() => checkReduceTicket(idx)}
              />
            </div>
          ))
        : '無資料'}
    </div>
  ) : null;
};

const styles = (theme) => ({
  root: {
    '& .productWrap': {
      width: '100%',
      height: '65px',
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: `1px solid ${Palette.FIFTH[60]}`,
      color: '#FFFFFF',
      fontSize: '18px',
      '& .price': {
        color: Palette.FIFTH[10],
      },
    },
    '& .pointInfo': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '48px',
      backgroundColor: `${Palette.SECOND[80]}`,
      [theme.breakpoints.down('sm')]: {
        justifyContent: 'space-between',
      },
    },
    '& .pointInfoText': {
      fontSize: '18px',
      color: '#ffffff',
      margin: '0px 20px',
    },
    '& .pointInfoTextG': {
      color: `${Palette.FIRST[30]}`,
      margin: '0px 5px',
    },
  },
  // pad
  [theme.breakpoints.down('md')]: {},
  // mobile
  [theme.breakpoints.down('sm')]: {},
});
export default connect(
  (state) => ({
    ticketList: state.getIn(['payment', 'product', 'ticketList']),
    selectedTicket: state.getIn(['payment', 'product', 'selectedTicket']),
    view: state.getIn(['payment', 'main', 'view']),
  }),
  (dispatch) => ({
    setInitTicketList(data) {
      dispatch(setInitTicketList(data));
    },
    addTicket(tIdx) {
      dispatch(addTicket({ ticketIdx: tIdx }));
    },
    reduceTicket(tIdx) {
      dispatch(reduceTicket({ ticketIdx: tIdx }));
    },
    setView(view) {
      dispatch(setView(view));
    },
  }),
)(withStyles(styles)(selectProduct));

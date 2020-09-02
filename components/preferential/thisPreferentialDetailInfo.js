import React, { useState, useEffect } from 'react';
import Helper from 'Lib/helper';
import Swiper from 'Components/common/EzSwiper/movieDate';
import API from 'CONSTANTS/API/movieInfoAPI';
import CONSTANT from 'CONSTANTS';
import EzTable from 'Components/common/EzTable';
import Palette from 'Styled/palette';
import { withStyles } from '@material-ui/core/styles';

const thisPreferentialDetailInfo = ({ classes }) => {
  const [locationList, setLocationList] = useState(null);
  const [selLocation, setSelLocation] = useState(null);
  const [selLocationItem, setSelLocationItem] = useState(null);

  const changeLocation = (location, item) => {
    setSelLocation(location);
    setSelLocationItem(item);
  };

  const vipHeader = (
    <div>
      <span className="header_vip">VIP價</span>
      <span className="header_vip_desc">(500點紅利加自付額)</span>
    </div>
  );
  const cinemaHeader = <div className="cinema header_cinema">影城</div>;
  const priceHeader = <div className="header_price">原價</div>;

  const tbHeader = [
    { id: 0, title: cinemaHeader, align: 'left', classes: '' },
    { id: 1, title: priceHeader, align: 'right', classes: '' },
    { id: 2, title: vipHeader, align: 'center', classes: '' },
  ];

  useEffect(() => {
    fetch_preferential_detail_info();
  }, []);

  // 取得一筆優惠詳細價格
  const fetch_preferential_detail_info = () => {
    Helper.axios.fetch(
      API.PREFERENTIAL.GET_PREFERENTIAL_DETAIL_INFO(),
      (cb) => {
        if (cb.length < 0) return;
        process_location_list(cb);
      },
      {
        errorFn: () => {
          console.log('error123');
        },
      },
    );
  };

  const process_location_list = (preferentialInfo) => {
    const result = {};
    preferentialInfo.list.map((item) => {
      result[item.location] === undefined ? (result[item.location] = []) : null;
      result[item.location].push(item);
    });
    setLocationList(result);
  };

  const getTbBodyData = (data) => {
    //console.log(data);
    const result = data.map((item) => {
      const { cinema_name, movie_version, cinema_price, price } = item;
      return {
        0: {
          title: '影城',
          dom: (
            <div className={`cinema`}>
              <span>{cinema_name.zh_tw}</span>
              <span className={`EZ_ObliqueCube movie_version`}>{movie_version}</span>
            </div>
          ),
          align: 'left',
        },
        1: {
          title: '原價',
          dom: <span className="price">{cinema_price}元</span>,
          align: 'right',
        },
        2: {
          title: 'VIP價',
          dom: <span className="vip_price">{price}元</span>,
          align: 'center',
        },
      };
    });
    return result;
  };

  return locationList !== null ? (
    <div className={`control_wrap ${classes.content}`}>
      <Swiper
        slideList={Object.entries(locationList).map(([location, item]) => (
          <div
            className={`slide_location_wrap EZ_ObliqueCube btn${selLocation === location ? ' selected' : ''}`}
            onClick={() => changeLocation(location, item)}
          >
            <span>{CONSTANT.LConverter(location)}</span>
          </div>
        ))}
      />
      {selLocation !== null ? <EzTable headerList={tbHeader} dataList={getTbBodyData(selLocationItem)} /> : null}
    </div>
  ) : null;
};
const styles = (theme) => ({
  content: {
    '& .EZ_ObliqueCube': {
      marginLeft: '16px',
      //width: '60px',
      padding: '0 8px',
      minWidth: '35px',
      fontSize: '10px',
      height: '20px',
    },
    '& .EzSwiper_date': {
      maxWidth: '850px',
    },
    '& .slide_location_wrap': {
      width: '75px',
      height: '70px',
      '& span': { fontSize: '18px' },
    },
    '& .price': {
      color: Palette.FIFTH[10],
    },
    '& .vip_price': {
      color: Palette.FIRST[30],
    },
    '& .header_vip': {
      color: Palette.FIRST[30],
      display: 'block',
      fontSize: '16px',
    },
    '& .EzTable': {
      color: Palette.FIRST[30],
      display: 'block',
      '& tbody td': {
        padding: '32px 8px',
        '& span': {
          fontSize: '20px',
        },
      },
      '& .EZ_ObliqueCube': {
        display: 'inline-block',
      },
      '& .movie_version': {
        fontSize: '12px',
      },
      '& .cinema': {
        paddingLeft: '24px',
      },
    },
    '& .header_cinema': {
      fontSize: '16px',
    },
    '& .header_price': {
      fontSize: '16px',
      color: Palette.FIFTH[10],
    },
  },
});
export default withStyles(styles)(thisPreferentialDetailInfo);

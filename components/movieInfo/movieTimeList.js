import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import Helper from 'Lib/helper';
import IMAGE from 'CONSTANTS/image';
import Swiper from 'Components/common/EzSwiper/movieTime';
import EzLabel from 'Components/common/EzLabel';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Palette from 'Styled/palette';
import { withStyles } from '@material-ui/core/styles';

const MovieTimeList = ({
  title = null,
  data = [],
  seeMore = false,
  seeMoreFn,
  hasTime = false,
  show_rank,
  classes,
}) => {
  const [dataList, setdataList] = useState([]);
  const [loading, setLoading] = useState(true);
  // // 無限滾輪模式 電影顯示數量
  // const [movieNum, setMovieNum] = useState(0);

  // useEffect(() => {
  //   // 無限滾輪模式
  //   if (seeMore) window.addEventListener('scroll', onScroll);

  //   return () => {
  //     // 移除 Scroll 監聽
  //     window.removeEventListener('scroll', onScroll);
  //   };
  // }, [movieNum]);

  useEffect(() => {
    if (data.length > 0 && dataList.length <= 0) {
      setdataList(processData(data));
      setLoading(false);
      // setMovieNum(18);
    }
  });

  // 處理電影顯示資料
  const processData = (dataList) =>
    dataList.map((item) => (
      <div
        className="movie_info_wrap"
        onClick={() => Router.push({ pathname: '/movieInfo', query: { movie_id: item.movie_id } })}
      >
        {/* 排名 */}
        {show_rank ? (
          <div className="EZ_ObliqueCube rank">
            {Helper.data.formatNumber(item.current_ranking)}
            <div
              className={
                item.current_ranking < item.last_ranking || item.last_ranking === null
                  ? 'up'
                  : item.current_ranking === item.last_ranking
                  ? 'flat'
                  : 'down'
              }
            />
          </div>
        ) : null}
        <img src={item.poster_url !== null ? item.poster_url : IMAGE.ICON.noMovieIMG} />
        <div className="text_ellipsis">{item.movie_title.zh_tw}</div>
        <div className="eng_title text_ellipsis">{item.movie_title.en_us}</div>
        <div className="detail_info">
          <div>
            {hasTime ? <span className="EZ_movie_date">{Helper.datetime.MsToformat(item.release_date)}</span> : null}
          </div>
          <div className="grade_wrap">
            <EzLabel type="grade" number={item.grade} className="grade" />
          </div>
        </div>
      </div>
    ));

  //
  // const onScroll = () => {
  //   // 留100px當緩衝，若快捲到底部時，則觸發載入更多電影
  //   if (window.scrollY + window.innerHeight >= document.body.scrollHeight - 100) {
  //     setMovieNum(movieNum + 6);
  //   }
  // };
  return (
    <div className={classes.root}>
      <div className="movie_time_wrap">
        {/* 標題列 */}
        <div className="EZ_movie_title">
          {title}
          {/* 進到 更多電影詳細頁 則隱藏 更多電影 控制項 */}
          <Box display={seeMore || loading ? 'none' : 'block'}>
            <span className="seeMore" onClick={() => seeMoreFn()}>
              更多電影
              <KeyboardArrowRight />
            </span>
          </Box>
        </div>

        {/* 顯示電影資訊 */}
        {loading && global.window ? <LoadingBox /> : <Movie_info_detail seeMore={seeMore} dataList={dataList} />}
      </div>
    </div>
  );
};

// Component - 顯示電影資訊
const Movie_info_detail = ({ seeMore, dataList }) => {
  return seeMore ? (
    // 更多電影
    <div className="seemore_movie_wrap">
      {dataList.map((item, idx) => (
        <div className="box_wrap" key={idx}>
          {item}
        </div>
      ))}
    </div>
  ) : (
    // 輪播
    <Swiper slideList={dataList} />
  );
};

// Component - Loding Skeleton
const LoadingBox = () => {
  const result = [];
  const count = Math.floor(window.innerWidth / (166 + 16));

  for (let i = 0; i < count; i += 1) {
    result.push(<Loading key={i} />);
  }
  return global.window !== undefined ? result : '';
};

// Component - Loding Skeleton 細節
const Loading = () => (
  <div className="loadingBox">
    <Skeleton animation="pulse" className="top" variant="rect" width={166} height={245} />
    <Skeleton animation="pulse" className="bottom" variant="rect" width={150} height={12} />
    <Skeleton animation="pulse" className="bottom" variant="rect" width={150} height={12} />
    <Skeleton animation="pulse" className="bottom" variant="rect" width={150} height={12} />
  </div>
);
const styles = {
  root: {
    padding: '24px',
    '& .movie_time_wrap': {
      maxWidth: '1092px',
      margin: 'auto',
      display: 'flex',
      justifyContent: 'space-between',
      position: 'relative',
      '& .EZ_movie_title': {
        position: 'absolute',
        zIndex: 99,

        '& .seeMore': {
          display: 'flex',
          alignItems: 'center',
          paddingLeft: '8px',
          fontSize: '12px',
          color: Palette.FIFTH[10],
          cursor: 'pointer',
          '& .MuiSvgIcon-root': {
            width: '12px',
            height: '20px',
          },
        },
      },
    },
    '& .movie_info_wrap': {
      width: '166px',
      fontSize: '12px',
      color: '#FFFFFF',
      cursor: 'pointer',

      '& .rank': {
        position: 'absolute',
        right: 3,
        top: '-10px',
      },
      '& img': {
        width: '166px',
        height: '245px',
      },
      '& .eng_title': {
        color: Palette.FIFTH[10],
      },
      '& .detail_info': {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      '& .grade_wrap': {
        float: 'right',
        paddingRight: '5px',
      },
    },
    // 更多電影
    '& .seemore_movie_wrap': {
      padding: '40px 0 0 0',
      display: 'inline-flex',
      flexWrap: 'wrap',
      // justifyContent: 'space-between',

      '& .box_wrap': {
        padding: '0 16px 24px 0',
      },
    },
    '& .loadingBox': {
      display: 'inline-flex',
      flexDirection: 'column',
      alignItems: 'center',
      '& .box': {},
      '& .top': {
        margin: '24px 0 12px 0',
      },
      '& .bottom': {
        marginBottom: '4px',
      },
    },
  },
};

export default withStyles(styles)(MovieTimeList);

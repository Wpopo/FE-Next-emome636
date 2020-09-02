import React, { Fragment, useState, useEffect } from 'react';
import Router from 'next/router';
import Helper from 'Lib/helper';
import API from 'CONSTANTS/API/movieInfoAPI';
import MovieTimeList from 'Components/movieInfo/newMovieTimeList';
import GaragePlayMovieTimeList from 'Components/movieInfo/garagePlayMovieTimeList';
import EzTabs from 'Components/common/EzTabs';
import Palette from 'Styled/palette';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';

/**
 *
 * movie_count 顯示的電影數量
 * show_rank 是否顯示排名
 */
const newMovieInfo = ({ movie_count = 10, show_rank = false, classes }) => {
  const [hotLineList, setHotLineList] = useState([]);
  const [comingList, setComingList] = useState([]);
  const [garagePlayList, setGaragePlayList] = useState([]);
  const [page, setPage] = useState('index');

  useEffect(() => {
    Router.events.on('routeChangeStart', handleRouteChange);
    // 第一次載入
    handleRouteChange(window.location.href);

    fetch_hot_line_list(movie_count);
    fetch_coming_list(movie_count);
    fetch_garage_play_list(movie_count);

    return () => {
      Router.events.off('routeChangeStart', handleRouteChange);
    };
  }, []);

  // 取得 現正熱映 資料
  const fetch_hot_line_list = (movie_count) => {
    Helper.axios.fetch(
      API.SHOWTIME.GET_HOTLINE_MOVIE(),
      (cb) => {
        if (cb.list.length < 0) return;
        setHotLineList(cb.list.slice(0, movie_count));
      },
      {
        errorFn: () => {
          console.log('error123');
        },
      },
    );
  };

  // 取得 即將上映 資料
  const fetch_coming_list = (movie_count) => {
    Helper.axios.fetch(
      API.SHOWTIME.GET_COMING_MOVIE(),
      (cb) => {
        if (cb.list.length < 0) return;
        setComingList(cb.list.slice(0, movie_count));
      },
      {
        errorFn: () => {
          console.log('error123');
        },
      },
    );
  };

  // 取得 車庫上映清單
  const fetch_garage_play_list = (movie_count) => {
    Helper.axios.garageplayfetch(
      API.SHOWTIME.GET_Garage_Play_LIST(),
      (cb) => {
        if (cb.length < 0) return;
        //console.log(cb.最新上架.slice(0, movie_count));
        setGaragePlayList(cb.最新上架.slice(0, movie_count));
      },
      {
        errorFn: () => {
          console.log('error123');
        },
      },
    );
  };

  // 處理轉跳頁面 (首頁, 現正熱映, 即將上映)
  const handleRouteChange = (url) => {
    // 轉跳頁面
    //    電影時刻首頁 -> index
    //    即將上映 -> intheaters
    //    現正熱映 -> comingsoon
    //    電影場次/介紹 -> movieSession
    const part = Helper.data.getUrlParam(url).part;
    const id = Helper.data.getUrlParam(url).movie_id;

    if (id !== undefined) {
      setPage('movieSession');
    } else {
      setPage(part === 'intheaters' || part === 'comingsoon' ? part : 'index');
    }
  };

  // 切換至 現正熱映
  const goHotLine = () => Router.push({ pathname: '/movieInfo', query: { part: 'intheaters' } });
  // 切換至 即將上映
  const goComing = () => Router.push({ pathname: '/movieInfo', query: { part: 'comingsoon' } });

  const goGarageplay = () => Router.push({ pathname: '/garageplayMovieInfo' });

  const tabList = {
    0: {
      title: '現正熱映',
      children: (
        <MovieTimeList
          title="現正熱映"
          data={hotLineList}
          seeMoreFn={goHotLine}
          seeMore={page === 'intheaters'}
          show_rank={true}
          show_title={false}
          show_info={false}
        />
      ),
    },
    1: {
      title: '即將上映',
      children: (
        <MovieTimeList
          title="即將上映"
          data={comingList}
          seeMoreFn={goComing}
          hasTime
          seeMore={page === 'comingsoon'}
          show_rank={false}
          show_title={false}
          show_info={false}
        />
      ),
    },
  };

  return (
    <div className={classes.root}>
      {hotLineList.length > 0 && comingList.length > 0 ? (
        <div>
          <div className="movie">
            <div className="titleBlock">
              <div className="title">去電影院看</div>
              <div className="subTitle">大螢幕的震撼、免排隊、自選最佳好座位！</div>
            </div>
            <div className="block">
              <div className="movieList">
                <EzTabs tabList={tabList} />
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {garagePlayList.length > 0 ? (
        <div>
          <div className="movieLine">
            <Divider className="line" />
          </div>
          <div className="movie2">
            <div className="block">
              <GaragePlayMovieTimeList
                title="本週最新"
                data={garagePlayList}
                seeMoreFn={goGarageplay}
                hasTime
                seeMore={page === 'comingsoon'}
                show_rank={false}
                show_title={false}
                show_info={false}
              />
            </div>
            <div className="titleBlock">
              <div className="title">線上直播</div>
              <div className="subTitle">影城通會員限定，精選電影無限暢看</div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

const styles = (theme) => ({
  root: {
    backgroundColor: '#1c1d21',
    '& .movie': {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      height: '450px',
      // Pad
      [theme.breakpoints.down('md')]: { flexDirection: 'column', height: '540px', alignItems: 'baseline' },
    },
    '& .movie2': {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      height: '450px',
      // Pad
      [theme.breakpoints.down('md')]: { flexDirection: 'column-reverse', height: '540px', alignItems: 'baseline' },
    },
    '& .movieLine': {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    '& .titleBlock': { margin: '20px 0px 20px 22px ' },
    '& .block': {
      width: '100%',
      maxWidth: '1280px',
    },
    '& .movieList': {
      transform: 'scale(1.1)',
    },
    '& .title': {
      color: '#FFFFFF',
      fontSize: '36px',
    },
    '& .subTitle': {
      color: '#b6b8c6',
      fontSize: '12px',
    },
    '& .MuiTabs-flexContainer': {
      margin: '0px 160px',
      [theme.breakpoints.down('md')]: { margin: '0px 20px' },
    },
    '& .line': {
      border: `1px solid ${Palette.FIFTH[60]}`,
      margin: '20px',
      height: 'auto',
      width: '90%',
    },
  },
});

export default withStyles(styles)(newMovieInfo);

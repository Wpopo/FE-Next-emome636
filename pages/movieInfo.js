import React, { Fragment, useState, useEffect } from 'react';
import Router from 'next/router';
import Helper from 'Lib/helper';
import API from 'CONSTANTS/API/movieInfoAPI';
import MovieTimeList from 'Components/movieInfo/movieTimeList';
import MovieSession from 'Components/movieInfo/movieSession';

/**
 *
 * movie_count 顯示的電影數量
 * show_rank 是否顯示排名
 */
const movieInfo = ({ movie_count = 100, show_rank = false }) => {
  const [hotLineList, setHotLineList] = useState([]);
  const [comingList, setComingList] = useState([]);
  const [page, setPage] = useState('index');

  useEffect(() => {
    Router.events.on('routeChangeStart', handleRouteChange);
    // 第一次載入
    handleRouteChange(window.location.href);

    fetch_hot_line_list(movie_count);
    fetch_coming_list(movie_count);

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

  return (
    <Fragment>
      {/* 現正熱映 */}
      {page === 'index' || page === 'intheaters' ? (
        <MovieTimeList
          title="現正熱映"
          data={hotLineList}
          seeMoreFn={goHotLine}
          seeMore={page === 'intheaters'}
          show_rank={show_rank}
        />
      ) : null}
      {/* 即將上映 */}
      {page === 'index' || page === 'comingsoon' ? (
        <MovieTimeList
          title="即將上映"
          data={comingList}
          seeMoreFn={goComing}
          hasTime
          seeMore={page === 'comingsoon'}
          show_rank={false}
        />
      ) : null}
      {/* 電影場次/介紹 */}
      {page === 'movieSession' ? <MovieSession /> : null}
    </Fragment>
  );
};

export default movieInfo;

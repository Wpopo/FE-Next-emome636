import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import Helper from 'Lib/helper';
import API from 'CONSTANTS/API/movieInfoAPI';
import GaragePlayMovieTimeList from 'Components/movieInfo/garagePlayMovieTimeList';
import MovieSession from 'Components/movieInfo/garageplayMovieSession';
import { withStyles } from '@material-ui/core/styles';

/**
 *
 * movie_count 顯示的電影數量
 * show_rank 是否顯示排名
 */
const garageplayMovieInfo = ({ movie_count = 100, show_rank = false, classes }) => {
  const [newList, setNewList] = useState([]);
  const [worldList, setWorldList] = useState([]);
  const [koreaList, setKoreaList] = useState([]);
  const [japanList, setJapanList] = useState([]);
  const [artList, setArtList] = useState([]);
  const [classicsList, setClassicsList] = useState([]);
  const [page, setPage] = useState('index');

  // 取得 車庫上映清單
  const fetch_garage_play_list = (movie_count) => {
    Helper.axios.garageplayfetch(
      API.SHOWTIME.GET_Garage_Play_LIST(),
      (cb) => {
        if (cb.length < 0) return;
        setNewList(cb.最新上架);
        setWorldList(cb.世界大觀);
        setKoreaList(cb.熱門韓影);
        setJapanList(cb.嚴選日片);
        setArtList(cb.藝術電影);
        setClassicsList(cb.不敗經典);
      },
      {
        errorFn: () => {
          console.log('error123');
        },
      },
    );
  };

  useEffect(() => {
    Router.events.on('routeChangeStart', handleRouteChange);
    // 第一次載入
    handleRouteChange(window.location.href);
    fetch_garage_play_list(movie_count);
    return () => {
      Router.events.off('routeChangeStart', handleRouteChange);
    };
  }, []);

  // 處理轉跳頁面 (首頁, 現正熱映, 即將上映)
  const handleRouteChange = (url) => {
    console.log('url', url);
    // 轉跳頁面
    const id = Helper.data.getUrlParam(url).movie_id;

    if (id !== undefined) {
      setPage('movieSession');
    } else {
      setPage('index');
    }
  };

  const goGarageplayMovieInfo = () =>
    Router.push({
      pathname: '/garageplayMovieInfo',
    });

  return newList.length > 0 &&
    worldList.length > 0 &&
    koreaList.length > 0 &&
    japanList.length > 0 &&
    artList.length > 0 &&
    classicsList.length > 0 ? (
    <div className={classes.root}>
      {page === 'index' ? (
        <div>
          <GaragePlayMovieTimeList
            title="最新上架"
            data={newList}
            show_rank={false}
            seeMore={goGarageplayMovieInfo}
            show_title={true}
            show_info={true}
          />
          <GaragePlayMovieTimeList
            title="世界大觀"
            data={worldList}
            show_rank={false}
            seeMore={goGarageplayMovieInfo}
            show_title={true}
            show_info={true}
          />

          <GaragePlayMovieTimeList
            title="熱門韓影"
            data={koreaList}
            show_rank={false}
            seeMore={goGarageplayMovieInfo}
            show_title={true}
            show_info={true}
          />
          <GaragePlayMovieTimeList
            title="嚴選日片"
            data={japanList}
            show_rank={false}
            seeMore={goGarageplayMovieInfo}
            show_title={true}
            show_info={true}
          />
          <GaragePlayMovieTimeList
            title="藝術電影"
            data={artList}
            show_rank={false}
            seeMore={goGarageplayMovieInfo}
            show_title={true}
            show_info={true}
          />
          <GaragePlayMovieTimeList
            title="不敗經典"
            data={classicsList}
            show_rank={false}
            seeMore={goGarageplayMovieInfo}
            show_title={true}
            show_info={true}
          />
        </div>
      ) : null}

      {/* 電影場次/介紹 */}
      {page === 'movieSession' ? <MovieSession /> : null}
    </div>
  ) : null;
};

const styles = (theme) => ({
  root: {},
});

export default withStyles(styles)(garageplayMovieInfo);

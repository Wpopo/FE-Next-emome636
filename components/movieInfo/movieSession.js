import React, { Fragment, useState, useEffect } from 'react';
import Helper from 'Lib/helper';
import API from 'CONSTANTS/API/movieInfoAPI';
import IMAGE from 'CONSTANTS/image';
import ThisMovieInfo from 'Components/movieInfo/thisMovieInfo';
import ThisMovieTime from 'Components/movieInfo/thisMovieTime';
import EzLabel from 'Components/common/EzLabel';
import EzTabs from 'Components/common/EzTabs';
import Player from 'react-player';
import TriangleIcon from '@material-ui/icons/ChangeHistoryOutlined';
import Modal from '@material-ui/core/Modal';
import CircularProgress from '@material-ui/core/CircularProgress';
import Palette from 'Styled/palette';
import { withStyles } from '@material-ui/core/styles';

const movieSession = ({ classes }) => {
  // 電影詳細資料
  const [movieInfo, setMovieInfo] = useState(null);
  // 電影海報
  const [moviePoster, setMoviePoster] = useState(null);
  // 電影時刻表
  const [movieTime, setMovieTime] = useState(null);

  const [loading, setLoading] = useState(true);

  const [mid, setMid] = useState(null);

  useEffect(() => {
    // 取得 movie_id
    const movie_id = Helper.data.getUrlParam().movie_id;
    setMid(movie_id);
    // 取得 一部電影詳細資料
    fetch_movie_detail_info(movie_id);
    // 取得指定電影及指定影城區域開演電影場次清單
    fetch_movie_detail_time(movie_id, 1);
  }, []);

  // 取得 一部電影詳細資料
  const fetch_movie_detail_info = (movie_id) => {
    Helper.axios.fetch(
      API.SHOWTIME.GET_MOVIE_DETAIL_INFO(movie_id),
      (cb) => {
        if (cb.length < 0) return;
        setMovieInfo(cb);
        if (cb.movie_poster.length > 0) {
          setMoviePoster(
            cb.movie_poster[0].poster_url !== null ? cb.movie_poster[0].poster_url : IMAGE.ICON.noMovieIMG,
          );
        }
        // setLoading(false);
      },
      {
        errorFn: () => {
          console.log('error123');
        },
      },
    );
  };

  // 取得指定電影及指定影城區域開演電影場次清單
  const fetch_movie_detail_time = (movie_id, location) => {
    Helper.axios.fetch(
      API.SHOWTIME.GET_MOVIE_DETAIL_TIME(movie_id, location),
      (cb) => {
        if (cb.list.length < 0) return;
        setMovieTime(cb.list);
        setLoading(false);
      },
      {
        errorFn: () => {
          console.log('error123');
        },
      },
    );
  };

  // Tab Config
  const tabList = {
    0: { title: '電影時刻', children: <ThisMovieTime movieInfo={movieTime} mid={mid} /> },
    1: { title: '電影資訊', children: <ThisMovieInfo movieInfo={movieInfo} /> },
  };

  return (
    <div className={classes.root}>
      {/* 上方電影資訊 */}
      {moviePoster !== null ? <MovieTopInfo movieInfo={movieInfo} moviePoster={moviePoster} classes={classes} /> : null}
      {/* Tab */}
      <div className="content">
        {!loading ? (
          <EzTabs tabList={tabList} />
        ) : (
          <div className="loading">
            <CircularProgress color="primary" />
          </div>
        )}
      </div>
      {/* Modal */}
    </div>
  );
};

// 上方電影資訊
const MovieTopInfo = ({ movieInfo, moviePoster, classes }) => {
  // 打開電影預告片
  const [openPreview, setOpenPreview] = useState(false);

  return (
    <Fragment>
      <Modal className={classes.player} open={openPreview} onClose={() => setOpenPreview(false)} disableAutoFocus>
        <Player className="video" url={movieInfo.movie_preview[0].preview_link} controls width="100%" height="100%" />
      </Modal>

      <div
        className="bg_poster"
        style={{
          background: `linear-gradient(to bottom, rgba(64, 68, 85, 0.6) 23%, #535664 100%),url(${moviePoster}) center no-repeat`,
          backgroundSize: 'cover',
        }}
      />

      <div className="movie_info_wrap">
        {/* 海報 */}
        <img className="poster" src={moviePoster} />
        {/* 電影資訊 */}
        <div className="movie_info">
          <span className="movie_info_en_title">{movieInfo.movie_title.en_us}</span>
          <span className="movie_info_zh_title">{movieInfo.movie_title.zh_tw}</span>
          <div className="movie_info_detail">
            <EzLabel type="grade" number={movieInfo.grade} />
            <EzLabel type="IMDB" number={movieInfo.imdb_score} showNum />
            <EzLabel type="RottenTomatoes" number={movieInfo.rt_score} showNum />
            <span className="movie_info_date">{Helper.datetime.MsToformat(movieInfo.release_date)}</span>
            <span className="divider" />
            <span className="movie_info_length">{`${movieInfo.movie_length}分鐘`}</span>
          </div>
          <div className="movie_info_video">
            預告片
            <TriangleIcon onClick={() => setOpenPreview(true)} />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const styles = (theme) => ({
  root: {
    position: 'relative',
    '& .bg_poster': {
      width: '100%',
      height: '300px',
    },
    '& .movie_info_wrap': {
      position: 'absolute',
      top: '60px',
      left: '10%',
      width: '80%',
      display: 'flex',
      margin: 'auto',
      '& .poster': {
        width: '150px',
        height: '100%',
      },
      '& .movie_info': {
        position: 'absolute',
        bottom: '16px',
        left: '166px',

        '& .movie_info_en_title': {
          display: 'block',
          paddingBottom: '12px',
          fontSize: '16px',
          color: Palette.FIRST[30],
        },
        '& .movie_info_zh_title': {
          display: 'block',
          paddingBottom: '16px',
          fontSize: '36px',
          color: '#FFFFFF',
        },
        '& .movie_info_detail': {
          display: 'flex',
          alignItems: 'center',
          '& .movie_info_date, & .movie_info_length': {
            color: Palette.FIFTH[10],
            padding: '0 8px',
          },

          '& .divider': { border: `1px solid ${Palette.FIFTH[60]}` },
          '& .EzLabel': { paddingRight: '8px' },
        },
        '& .movie_info_video': {
          display: 'flex',
          alignItems: 'center',
          paddingTop: '24px',
          fontSize: '12px',
          color: '#FFFFFF',
          '& .MuiSvgIcon-root': {
            transform: 'rotate(90deg)',
            width: '20px',
            height: '20px',
            color: Palette.FIRST[30],
            paddingBottom: '8px',
            cursor: 'pointer',
          },
        },
      },
    },
    '& .content': {
      maxWidth: '1000px',
      padding: '60px 24px 0 24px',
      margin: 'auto',
    },
    // Pad
    [theme.breakpoints.down('md')]: {
      '& .bg_poster': {
        height: '340px',
      },
    },
    // mobile
    [theme.breakpoints.down('sm')]: {
      '& .bg_poster': {
        height: '226px',
      },
      '& .movie_info_wrap': {
        '& .poster': { width: '60px !important' },
        '& .movie_info': {
          width: '85%',
          left: '68px  !important',
          '& .movie_info_en_title': {
            fontSize: '12px !important',
            paddingBottom: '8px !important',
          },
          '& .movie_info_zh_title': {
            fontSize: '18px !important',
            paddingBottom: '0px !important',
          },
          '& .movie_info_detail': {
            position: 'absolute',
            left: '-60px',
            top: '80px',
            '& .movie_info_date': { position: 'absolute', top: '36px', left: '-10px' },
            '& .divider': { position: 'absolute', height: '100%', top: '36px', left: '80px' },
            '& .movie_info_length': { position: 'absolute', top: '36px', left: '88px' },
          },
          '& .movie_info_video': {
            position: 'absolute',
            right: '24px',
            top: '90px',
          },
        },
      },
      '& .content': {
        padding: '30px 16px 0 16px',
      },
    },
    '& .MuiCircularProgress-colorPrimary': {
      color: Palette.FIRST[30],
    },
    '& .loading': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100px',
    },
  },
  player: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& .video': {
      maxWidth: '1280px',
      maxHeight: '720px',
      padding: '24px',
      boxSizing: 'border-box',
      outline: 0,
    },
    // Pad
    [theme.breakpoints.down('md')]: {
      '& .video': {
        maxWidth: '768px !important',
        maxHeight: '576px !important',
      },
    },
    // mobile
    [theme.breakpoints.down('sm')]: {
      '& .video': {
        maxWidth: '426px !important',
        maxHeight: '320px !important',
      },
    },
  },
});
export default withStyles(styles)(movieSession);

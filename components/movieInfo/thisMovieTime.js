import React, { Fragment, useState, useEffect } from 'react';
import Router from 'next/router';
import Helper from 'Lib/helper';
import CONSTANT from 'CONSTANTS';
import Swiper from 'Components/common/EzSwiper/movieDate';
import Select from 'Components/common/EzSelect';
import Expansion from 'Components/common/EzExpansion';
import ButtomControl from 'Components/movieInfo/movieTimeBottom';
import IMAGE from 'CONSTANTS/image';
import API from 'CONSTANTS/API/movieInfoAPI';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Palette from 'Styled/palette';
import { withStyles } from '@material-ui/core/styles';

const thisMovieTime = ({ movieInfo, mid, classes }) => {
  // 日期清單
  // [
  //    {key: 1586534400000, date: "04.11", day: "11", month: "04月", week: "星期六"},...
  // ]
  const [dateList, setDateList] = useState([]);
  // 時間表資料
  // {
  //    cinema_code: {}
  // }
  const [dataList, setDataList] = useState({});
  // 目前選擇的日期
  const [selDate, setSelDate] = useState({ key: null });
  // 目前選擇的時間
  const [selTime, setSelTime] = useState(null);
  // 目前選擇的session
  const [session, setSession] = useState(null);

  useEffect(() => {
    processData(movieInfo);
  }, []);

  // 日期切換
  const changeDate = (v) => {
    setSelDate(v);
    setSelTime(null);
    setSession(null);
  };

  const processData = (info) => {
    if (info === null) return;
    const lsDate = [];
    const objMovieTime = {};
    info.map((info) => {
      // date key
      const dateSession = info.date;
      const objMovieTimeData = {};
      // 整理日期
      const objDate = Helper.datetime.MsToformatObj({
        time: dateSession,
        monthPattern: 'MM月',
      });
      lsDate.push({
        key: dateSession,
        date: objDate.date,
        day: objDate.day,
        month: objDate.month,
        week: objDate.cn_week,
      });

      // 整理時刻表
      info.sdata.map((item) => {
        const key = item.cinema_data.cinema_code;
        // 整理版本和時間
        const objData = {
          version: item.movie_version,
          lsTime: item.data_session.map((date) => {
            return {
              time: Helper.datetime.MsToformatObj(date.session_time).time,
              session: date.session_id,
            };
          }),
        };

        // 判斷此戲院是否已建檔
        objMovieTimeData[key] === undefined
          ? (objMovieTimeData[key] = {
              cinema_name: item.cinema_data.cinema_name.zh_tw,
              cinema_id: item.cinema_data.cinema_id,
              timeTable: [],
            })
          : null;
        // 將版本與時間 塞入戲院obj
        objMovieTimeData[key].timeTable.push(objData);
      });
      objMovieTime[dateSession] = objMovieTimeData;
    });
    // console.log(objMovieTime);
    setDateList(lsDate);
    setDataList(objMovieTime);
  };

  // 取得指定電影及指定影城區域開演電影場次清單
  const fetch_movie_detail_time = (movie_id, location) => {
    Helper.axios.fetch(
      API.SHOWTIME.GET_MOVIE_DETAIL_TIME(movie_id, location),
      (cb) => {
        if (cb.list.length > 0) {
          processData(cb.list);
        }
      },
      {
        errorFn: () => {
          console.log('error123');
        },
      },
    );
  };

  const changeMovieInfo = (e) => {
    fetch_movie_detail_time(mid, e.target.value);
  };

  return movieInfo !== null && dateList.length > 0 ? (
    <div className={classes.root}>
      {/* 選擇列 (日期、地點) */}
      <div className="control_wrap">
        <Swiper
          slideList={dateList.map((date) => (
            <div
              className={`slide_date_wrap EZ_ObliqueCube btn${selDate.key === date.key ? ' selected' : ''}`}
              onClick={() => changeDate(date)}
            >
              <span className="week">{date.week}</span>
              <span className="date">{date.day}</span>
              <span className="month">{date.month}</span>
            </div>
          ))}
        />
        <Select defaultValue="全部" list={CONSTANT.MOVIE_TIME_ADDRESS} cusHandleChange={(e) => changeMovieInfo(e)} />
      </div>
      {/* 時刻表 */}
      <div>
        <Divider />
        {selDate.key !== null
          ? Object.entries(dataList[selDate.key]).map(([key, cinema]) => {
              // 時刻表細項
              const timeDetail = (
                <div className="time_table_wrap">
                  {cinema.timeTable.map((table, idx) => (
                    <Fragment key={idx}>
                      <div className="EZ_movie_title">{table.version}</div>
                      <div className="time_wrap">
                        {table.lsTime.map((data, idx2) => {
                          const { time, session } = data;
                          return (
                            <span
                              className={`time${selTime === `${time}-${key}-${idx}-${idx2}` ? ' selected' : ''}`}
                              key={idx2}
                              onClick={() => {
                                setSelTime(`${time}-${key}-${idx}-${idx2}`);
                                setSession(session);
                              }}
                            >
                              {time}
                            </span>
                          );
                        })}
                      </div>
                    </Fragment>
                  ))}
                </div>
              );

              return <Expansion key={key} title={cinema.cinema_name} children={timeDetail} />;
            })
          : null}
      </div>
      {/*  下方 控制項 */}
      <ButtomControl
        infoList={
          selDate.key !== null
            ? [
                { title: '日期', data: selDate.date },
                {
                  title: '時間',
                  data: selTime !== null ? selTime.split('-')[0] : null,
                },
              ]
            : []
        }
        btnList={[
          <Button
            size="large"
            variant="contained"
            disabled={session === null}
            onClick={() =>
              Router.push({
                pathname: '/seatMap',
                query: { session_id: session },
              })
            }
          >
            選擇座位
          </Button>,
        ]}
      />
    </div>
  ) : (
    <div className={classes.root}>
      <div className="noSession">
        <img src={IMAGE.ICON.noMovie} />
        <div className="noSessionText">沒有開放訂票場次</div>
      </div>
    </div>
  );
};

const styles = (theme) => ({
  root: {
    padding: '0px 8px 180px 8px',
    '& .control_wrap': {
      display: 'flex',
      justifyContent: 'space-between',
    },
    // 日期 Slide
    '& .slide_date_wrap': {
      width: '65px',
      height: '70px',
      fontSize: '12px',

      '& .date': {
        color: '#FFFFFF',
        fontSize: '28px',
      },
      '& .week': { paddingRight: '2px' },
      '& .month': { paddingLeft: '8px' },
    },
    '& .MuiDivider-root': { backgroundColor: Palette.FIFTH[40] },
    // 時刻表
    '& .time_table_wrap': {
      display: 'flex',
      flexDirection: 'column',
      '& .EZ_movie_title': {
        paddingTop: '8px',
      },
      '& .time_wrap': {
        padding: '8px 0',
        '& .time': {
          display: 'inline-flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '90px',
          height: '32px',
          color: Palette.FIFTH[10],
          cursor: 'pointer',
          '&.selected': {
            color: '#FFFFFF',
            backgroundColor: Palette.THIRD[90],
            borderBottom: `1px solid ${Palette.FIRST[30]}`,
          },
        },
      },
    },
    '& .noSession': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '200px',
      flexDirection: 'column',
    },
    '& .noSessionText': {
      width: '128px',
      height: '18px',
      fontSize: '16px',
      color: '#ffffff',
    },

    // Pad
    [theme.breakpoints.down('md')]: {},
    // mobile
    [theme.breakpoints.down('sm')]: {
      '& .control_wrap': {
        flexDirection: 'column-reverse',
        '& .EzSelect': {
          margin: '30px 0 0 0',
          '& .MuiSelect-select': { width: '100%' },
        },
      },
    },
  },
});
export default withStyles(styles)(thisMovieTime);

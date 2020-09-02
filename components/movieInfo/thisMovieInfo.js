import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';

const thisMovieInfo = ({ movieInfo, classes }) => {
  const [staffList, setStaffList] = useState([]);
  useEffect(() => {
    setStaffList(processStaff());
  }, []);

  // 處理演員名單
  // 1:導演、2:演員、3:編劇
  // 排序為 導演 > 演員 > 編劇
  const processStaff = () => {
    if (movieInfo.movie_staff === null || movieInfo.movie_staff === undefined) return [];
    const result = [
      { title: '導演', list: [] },
      { title: '演員', list: [] },
      { title: '編劇', list: [] },
    ];
    movieInfo.movie_staff.map(staff => {
      switch (staff.staff_type) {
        case '1':
          result[0].list.push(staff.staff_name);
          break;
        case '2':
          result[1].list.push(staff.staff_name);
          break;
        case '3':
          result[2].list.push(staff.staff_name);
          break;
      }
    });
    return result;
  };
  return movieInfo !== null ? (
    <div className={classes.root}>
      {/* 演員名單 */}
      <div className="staff_wrap">
        {staffList.map(staff =>
          staff.list.length > 0 ? (
            <div className="staff_box" key={staff.title}>
              <span className="staff_title">{staff.title}</span>
              <span>{staff.list.join('  ,')}</span>
            </div>
          ) : null,
        )}
      </div>
      {/* 文章 */}
      <div className="article">{movieInfo.movie_description}</div>
    </div>
  ) : null;
};

const styles = theme => ({
  root: {
    padding: '40px 8px',
    display: 'flex',
    fontSize: '20px',
    lineHeight: '30px',
    color: '#FFFFFF',

    '& .staff_wrap': {
      paddingRight: '36px',
      '& .staff_box': {
        display: 'flex',
        width: '300px',
        paddingBottom: '24px',
        '& .staff_title': {
          width: '40px',
          paddingRight: '16px',
          whiteSpace: 'nowrap',
        },
      },
    },
    '& .article': {
      lineHeight: '40px',
    },
    // Pad
    [theme.breakpoints.down('md')]: {
      padding: '24px 40px 40px 40px',
      flexDirection: 'column',
      fontSize: '16px',
      lineHeight: '24px',
      '& .staff_wrap': {
        '& .staff_box': {
          width: '100% !important',
          paddingBottom: '8px !important',
          '& .staff_title': {
            paddingRight: '8px !important',
          },
        },
      },
      '& .article': {
        paddingTop: '8px',
        lineHeight: '24px',
      },
    },
    // mobile
    [theme.breakpoints.down('sm')]: {},
  },
});
export default withStyles(styles)(thisMovieInfo);

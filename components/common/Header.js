import React, { useState, useEffect } from 'react';
import IMAGE from 'CONSTANTS/image';
import Router from 'next/router';
import Palette from 'Styled/palette';
import Hidden from '@material-ui/core/Hidden';
import { withStyles } from '@material-ui/core/styles';

const Header = ({ classes }) => {
  // 目前所在的頁面
  const [activeMenu, setActiveMenu] = useState(null);
  // 僅 作用於mobile版
  const [openHanberger, setOpenHanberger] = useState(false);
  useEffect(() => {
    setActiveMenu(window.location.pathname);
  }, []);

  const logo = { routerUrl: { pathname: '/' } };
  const menus = [
    { id: 0, title: '優惠查詢', icon: IMAGE.ICON.menu_preferential, routerUrl: { pathname: '/preferential' } },
    { id: 1, title: '電影時刻', icon: IMAGE.ICON.menu_movieInfo, routerUrl: { pathname: '/movieInfo' } },
    { id: 2, title: '客服中心', icon: IMAGE.ICON.menu_FAQ, routerUrl: { pathname: '/FAQ' } },
    { id: 3, title: '車庫娛樂', icon: IMAGE.ICON.menu_FAQ, routerUrl: { pathname: '/garageplayMovieInfo' } },
  ];

  // 轉跳畫面
  const changeRedirect = (config) => {
    setActiveMenu(config.pathname);
    Router.push(config);
  };

  return (
    <div className={classes.root}>
      <div className="header_wrap">
        {/* Logo */}
        <div className="icon logo" onClick={() => changeRedirect(logo.routerUrl)} />
        {/* menu */}
        <div
          className={`icon hanberger${openHanberger ? ' active' : ''}`}
          onClick={() => setOpenHanberger(!openHanberger)}
        >
          {/* menu_wrap 僅作用於 mobile  */}
          <div className="menu_wrap">
            {menus.map((menu) => (
              <div
                key={menu.id}
                className={`menu_item${activeMenu === menu.routerUrl.pathname ? ' active' : ''}`}
                onClick={() => changeRedirect(menu.routerUrl)}
              >
                {/* Mobile 顯示ICON */}
                <Hidden mdUp>
                  <img src={menu.icon} />
                </Hidden>
                {menu.title}
              </div>
            ))}
          </div>
        </div>
        {/* Account Icon */}
        <div className="icon account" onClick={() => Router.push({ pathname: '/Login', query: { page: 'member' } })} />
      </div>
    </div>
  );
};

const styles = (theme) => ({
  root: {
    position: 'fixed',
    width: '100%',
    boxShadow: ' 0 2px 5px 0 rgba(0, 0, 0, 0.2)',
    backgroundColor: Palette.FIFTH[70],
    zIndex: 999,
    fontFamily: [
      'PingFangTC',
      'Microsoft JhengHei',
      'system',
      '-apple-system',
      'BlinkMacSystemFont',
      '"PingFang SC"',
      'Helvetica',
      'Arial',
      'sans-serif',
    ].join(','),

    '& .header_wrap': {
      maxWidth: '1024px',
      height: '80px',
      padding: '0 24px',
      margin: 'auto',
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },

    // logo
    '& .logo': {
      fontSize: '40px',
      cursor: 'pointer',
    },

    // menu
    '& .menu_wrap': {
      display: 'flex',
      alignItems: 'center',
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#FFFFFF',
      '& .menu_item': {
        padding: '0 16px',
        cursor: 'pointer',
        '&.active': {
          color: Palette.FIRST[30],
        },
      },
    },

    '& .icon': {
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      cursor: 'pointer',

      '&.logo': {
        width: '35px',
        height: '35px',
        backgroundImage: `url(${IMAGE.ICON.logo})`,
      },

      '&.account': {
        width: '50px',
        height: '44px',
        backgroundImage: `url(${IMAGE.ICON.Account})`,
      },
    },
    // Pad
    [theme.breakpoints.down('md')]: {},
    // mobile
    [theme.breakpoints.down('sm')]: {
      backgroundColor: Palette.FIFTH[100],
      '& .header_wrap': {
        '& .logo': { order: 1 },
        '& .account': { order: 2 },
      },
      '& .hanberger': {
        width: '50px',
        height: '44px',
        backgroundImage: `url(${IMAGE.ICON.hangerger})`,
        '& .menu_wrap': {
          fontSize: '14px',
          '& .menu_item': { display: 'none' },
        },
        // 打開漢堡
        '&.active': {
          backgroundImage: `url(${IMAGE.ICON.hanberger_active})`,
          '& .menu_wrap': {
            position: 'absolute',
            left: 0,
            top: '80px',
            width: 'calc(100% - 24px)',
            margin: '0 0 0 12px', // 為了置中
            padding: '32px 0',

            display: 'flex',
            justifyContent: 'space-around',
            backgroundColor: Palette.THIRD[90],

            '& .menu_item': {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              '& img': {
                width: '50px',
                height: '50px',
                paddingBottom: '8px',
              },
            },
          },
        },
      },
    },
  },
});
export default withStyles(styles)(Header);

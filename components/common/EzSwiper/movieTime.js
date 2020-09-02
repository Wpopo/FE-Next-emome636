import React, { useEffect } from 'react';
import Palette from 'Styled/palette';
import { withStyles } from '@material-ui/core/styles';

const customPagination = (type = 'dash', current, total) => {
  if (type === 'dash') {
    let dashes = '';
    for (let i = 1; i <= total; i += 1) {
      dashes = dashes.concat(`
        <div
          class="dice ${current === i ? 'selected' : ''}"
          style="width: ${(160 - 8 * total) / total}px"
        ></div>
      `);
    }

    return `
    <div class="wrap ${type}">
      ${dashes}
    </div>
    `;
  }
  return null;
};

const EzSwiper = ({ slideList = [], id, classes }) => {
  useEffect(() => {
    const swiper = new Swiper('.swiper-container', {
      slidesPerView: 'auto',
      spaceBetween: 16,
      loop: true,
      // Disable preloading of all images
      preloadImages: false,
      // Enable lazy loading
      lazy: true,

      breakpoints: {
        1200: {
          slidesPerView: 6,
          slidesPerGroup: 6,
        },
      },

      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        // 分頁樣式 官方提供 "bullets", "fraction", "progressbar"
        // 可自行在自訂樣式
        type: 'custom',
        renderCustom(swiper, current, total) {
          return customPagination('dash', current, total);
        },
      },
      navigation: {
        prevEl: '.swiper-button-prev',
        nextEl: '.swiper-button-next',
      },
    });
  }, []);

  return (
    <div className={`${classes.root}`}>
      <div className="swiper-container">
        <div className="swiper-pagination" />
        <div className="swiper-wrapper">
          {slideList.map((item, idx) => (
            <div className="swiper-slide" key={idx}>
              {item}
            </div>
          ))}
        </div>
        <div className="swiper-control swiper-button-prev" />
        <div className="swiper-control swiper-button-next" />
      </div>
    </div>
  );
};

const styles = (theme) => ({
  root: {
    position: 'relative',
    maxWidth: '1144px',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',

    '& .swiper-container': {
      position: 'unset',
      maxWidth: '1076px',
      width: '100%',
      margin: 'unset',
      boxSizing: 'border-box',
    },
    '& .swiper-wrapper': {
      width: '166px',
    },
    '& .swiper-pagination': {
      paddingBottom: '32px',
      position: 'unset',
      '& .dash': {
        width: '160px',
        float: 'right',
        '& .dice': {
          height: '2px',
          margin: '4px 0px 4px 4px',
          backgroundColor: Palette.FIFTH[60],
          display: 'inline-block',
          '&.selected': { backgroundColor: '#FFFFFF' },
        },
      },
    },
    '& .swiper-control': {
      color: Palette.FIRST[30],
    },
    '& .swiper-button-prev': { left: '-24px' },
    '& .swiper-button-next': { right: '-24px' },
    // Mobile, Pad
    [theme.breakpoints.down('1200')]: {
      '& .swiper-container': {
        width: 'calc(100vw - 48px)',
      },
      '& .swiper-control,& .swiper-pagination .wrap': { display: 'none' },
    },
  },
});

export default withStyles(styles)(EzSwiper);

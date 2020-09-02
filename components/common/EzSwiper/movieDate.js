import React, { useEffect } from 'react';
import Palette from 'Styled/palette';
import { withStyles } from '@material-ui/core/styles';

const EzSwiper = ({ slideList = [], classes }) => {
  useEffect(() => {
    const swiper = new Swiper('.swiper-container', {
      slidesPerView: 'auto',
      navigation: {
        prevEl: '.swiper-button-prev',
        nextEl: '.swiper-button-next',
      },
    });
  }, []);

  return (
    <div className={`EzSwiper_date ${classes.root}`}>
      <div className="swiper-container">
        <div className="swiper-wrapper">
          {slideList.map((item, idx) => (
            <div className="swiper-slide" key={idx}>
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className="swiper-control swiper-button-prev" />
      <div className="swiper-control swiper-button-next" />
    </div>
  );
};

const styles = theme => ({
  root: {
    position: 'relative',
    maxWidth: '700px',
    padding: '30px 0',
    width: '100%',

    '& .swiper-container': {
      width: '90%',
      paddingLeft: '16px',
      margin: '0 30px',
      boxSizing: 'border-box',
    },
    '& .swiper-wrapper': {
      width: '100px',
    },

    '& .swiper-button-prev': { left: 0 },
    // Pad
    [theme.breakpoints.down('md')]: {
      '& .swiper-control': { display: 'none' },
    },
  },
});

export default withStyles(styles)(EzSwiper);

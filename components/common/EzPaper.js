import React, { useState, useEffect, useLayoutEffect } from 'react';
// import Carousel from 'react-material-ui-carousel';
import Carousel from 'Components/common/Carousel';
import { Paper } from '@material-ui/core';
import API from 'CONSTANTS/API/movieInfoAPI';
import Helper from 'Lib/helper';
import { withStyles } from '@material-ui/core/styles';

const Ezpaper = ({ classes }) => {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  //console.log(size[0]);

  const [items, setItems] = useState([]);
  const [midItems, setMidItems] = useState([]);
  const [smallItems, setSmallItems] = useState([]);
  useEffect(() => {
    fetch_banner(1);
    fetch_banner(2);
    fetch_banner(3);
  }, []);
  const fetch_banner = (type) => {
    Helper.axios.fetch(
      API.BANNER.GET_BANNER(type),
      (cb) => {
        if (cb.length < 0) return;
        let temp = [];
        cb.map((item) => {
          temp.push({
            imgUrl: 'https://img.ezding.com.tw' + item.ad_content,
            link: item.ad_link,
          });
        });
        if (type == 3) {
          setSmallItems(temp);
        } else if (type == 2) {
          setMidItems(temp);
        } else {
          setItems(temp);
        }
      },
      {
        errorFn: () => {
          console.log('error123');
        },
      },
    );
  };
  const newItems = size[0] > 320 ? (size[0] > 768 ? items : midItems) : smallItems;

  return (
    <Carousel className={classes.root}>
      {newItems.map((item) => (
        <Item item={item} classes={classes} />
      ))}
    </Carousel>
  );
};

function Item(props) {
  return (
    <Paper>
      <a href={props.item.link} target="_blank">
        <img src={props.item.imgUrl} className={props.classes.root} />
      </a>
    </Paper>
  );
}

const styles = {
  root: {
    width: '100%',
    height: '460px',
    '& .Carousel-indicators-2': {
      top: '420px',
      position: 'absolute',
    },
  },
};

export default withStyles(styles)(Ezpaper);

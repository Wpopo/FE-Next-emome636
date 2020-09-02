import React, { useState } from 'react';
import Helper from 'Lib/helper';
import EzTabs from 'Components/common/EzTabs';
import EzTable from 'Components/common/EzTable';
import EzPaper from 'Components/common/EzPaper';
import media from 'Components/common/mediaQuery';
import {
  FlexStartStart,
  FlexStartBetween,
  FlexCenterEnd,
  FlexCenterAround,
  FlexCenterBetween,
  FlexBottomBetween,
} from 'Components/common/Flexbox/index';
import Footer from 'Components/common/Footer';
import Buttom from '@material-ui/core/Button';
import Palette from 'Styled/palette';
import { withStyles } from '@material-ui/core/styles';

const Demo = ({ ...props }) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <br />
      <Buttom variant="contained">contained</Buttom>
      <Buttom variant="contained" disabled>
        disabled
      </Buttom>
      <Buttom variant="contained" className="btn-loading">
        loading
      </Buttom>
      <br />
      <Buttom variant="outlined">outlined</Buttom>
      <Buttom variant="outlined" disabled>
        disabled
      </Buttom>
      <Buttom variant="outlined" className="btn-loading">
        loading
      </Buttom>
      <br />
      <br />
      <div>
        <div className="EZ_ObliqueCube" style={{ width: 80 }}>
          123
        </div>
        <div className="EZ_ObliqueCube btn" style={{ width: 80 }}>
          123
        </div>
        <div className="EZ_ObliqueCube btn selected" style={{ width: 80 }}>
          123
        </div>
      </div>
      <br />

      <EzPaper />
    </div>
  );
};

const styles = {
  root: {
    maxWidth: '1200px',
    margin: 'auto',
    fontSize: '16px',
    '& .orderNumber': {
      color: Palette.FIRST[30],
      fontSize: '18px',
      fontWeight: 'bold',
    },
  },
  detailInfo: {
    width: '100%',
    position: 'relative',
    // padding: '16px',
    borderRight: '1px solid #848899',
    borderBottom: '1px solid #848899',
    borderLeft: '1px solid #848899',
    borderRadius: '8px',
    '& .triangle': {
      position: 'absolute',
      border: 'solid #848899',
      'border-width': '0 1px 1px 0',
      display: 'inline-block',
      padding: '4px',
      top: '-4.2px',
      left: 'calc(328px / 2)',
      transform: 'rotate(-135deg)',
      '-webkit-transform': 'rotate(-135deg)',
    },
    '&:before': {
      borderRadius: '8px 0 0 0',
      position: 'absolute',
      top: 0,
      left: '2.5px',
      width: 'calc(328px / 2 - 4px)',
      content: '""',
      flex: '2 0 0',
      height: '1px',
      borderTop: '1px solid #848899',
    },
    '&:after': {
      borderRadius: '0 8px 0 0',
      position: 'absolute',
      top: 0,
      right: '2.5px',
      width: 'calc(100% - 164px - 13px)',
      content: '""',
      height: '1px',
      borderTop: '1px solid #848899',
    },
  },
  redPointList: {},
  recordIsShow: {
    '& img': {
      width: '38px',
      height: '51px',
    },
    '& .showDate': {
      fontSize: '20px',
    },
    '& .showYear': {
      fontSize: '12px',
      color: Palette.FIFTH[10],
      paddingLeft: '7px',
    },
    '& .showTime': {
      fontSize: '20px',
    },
  },
};
export default withStyles(styles)(Demo);

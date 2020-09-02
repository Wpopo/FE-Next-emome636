import React, { Fragment } from 'react';
import Palette from 'Styled/palette';
import { withStyles } from '@material-ui/core/styles';

const Bottom = ({ infoList = [], btnList = [], classes }) => {
  return (
    <div className={classes.root}>
      <div className="bottom_content">
        {/* 左方資訊 */}
        <div className="bottom_info_wrap">
          {infoList.map((info, idx) => (
            <div key={idx} className="bottom_info">
              <span className="bottom_title">{info.title}</span>
              <span className="bottom_data">{info.data}</span>
            </div>
          ))}
        </div>
        {/* 右方按鈕 */}
        <div className="bottom_btn_wrap">
          {btnList.map((button, idx) => (
            <Fragment key={idx}>{button}</Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = (theme) => ({
  root: {
    position: 'fixed',
    left: 0,
    bottom: 0,
    width: '100%',
    backgroundColor: Palette.FIFTH[100],
    zIndex: 999,
    '& .bottom_content': {
      maxWidth: '1000px',
      height: '76px',
      margin: 'auto',
      padding: '0 24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    '& .bottom_info_wrap': {
      display: 'inline-flex',
      '& .bottom_info': {
        paddingRight: '16px',
        fontSize: '14px',
        color: '#FFFFFF',
        '& .bottom_title': {
          color: Palette.FIFTH[30],
          paddingRight: '8px',
        },
        '& .bottom_data': {
          '& span': {
            paddingRight: '8px',
            whiteSpace: 'nowrap',
          },
        },
      },
    },
    '& .bottom_btn_wrap': {
      '& button': { marginLeft: '8px' },
    },
    // Pad
    [theme.breakpoints.down('md')]: {},
    // mobile
    [theme.breakpoints.down('sm')]: {
      '& .bottom_content': {
        height: '88px',
        padding: '0 8px 8px 8px',
        justifyContent: 'center',
        flexDirection: 'column',
      },
      '& .bottom_info_wrap': {
        paddingBottom: '8px',
      },
    },
  },
});
export default withStyles(styles)(Bottom);

import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FaqSelect from 'Components/faq/faqSelect';
import FaqExpansion from 'Components/faq/faqExpansion';
import Palette from 'Styled/palette';

export default function FAQ() {
  const classes = useStyles();
  const [selGroupId, setSelGroupId] = useState('groupA');

  const passGroupId = (val) => {
    setSelGroupId(val);
  };

  return (
    <div className={classes.root}>
      <FaqSelect passGroupId={passGroupId} />
      <div className="wrap">
        <FaqExpansion groupId={selGroupId} />
        <div className={classes.info}>
          <div className="list">
            <div className="item">客服信箱</div>
            <div className="content">service@fullerton.com.tw</div>
          </div>
          <div className="list">
            <div className="item">客服專線</div>
            <div className="content">(02)8912-6600</div>
          </div>
          <div className="list">
            <div className="item">服務時間</div>
            <div className="content">
              <div className="detail">
                  <span>週一～週六</span>
                  <span>09:00～21:00</span>
              </div>
              <div className="detail">
                  <span>週日及國定假日</span>
                  <span>09:00～18:00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '1200px',
    margin: 'auto',
    '& .wrap': {
      display: 'flex',
      'flex-wrap': 'wrap',
      'padding-bottom': '200px',
    },
  },
  info: {
    'margin-left': '57px',
    '& .list': {
      'margin-top': '20px',
      '& .item': {
        'font-size': '12px',
        'padding-bottom': '4px',
        color: Palette.FIFTH[10],
      },
      '& .content': {
        'font-size': '20px',
        color: '#FFF',
        '& .detail': {
          display: 'flex',
          'justify-content': 'space-between',
          '& span:first-child': {
            'margin-right': '30px',
          },
        },
      },
    },
  },
  // Pad
  [theme.breakpoints.down('md')]: {
    root: {
      maxWidth: '95%',
      '& .wrap': {
        'padding-bottom': '0px',
      },
    },
    info: {
      margin: '0 0 120px 15px',
    },
  },
  // mobile
  [theme.breakpoints.down('sm')]: {
    info: {
      margin: '30px auto 120px',
      '& .list .content .detail': {
        '& span:first-child': {
          'margin-right': '10px',
        },
      },
    },
  },
}));

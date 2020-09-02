import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import Collapse from '@material-ui/core/Collapse';
import { withStyles } from '@material-ui/core/styles';
import Palette from 'Styled/palette';

const EzExpansion = ({ dataList = [], classes }) => {
  const [expandedIdx, setExpandedIdx] = useState(null);
  const handleExpand = (idx) => setExpandedIdx(idx !== expandedIdx ? idx : null);

  return (
    <div className={classes.root}>
      {dataList.map((item, idx) => (
        <Card key={idx} className={expandedIdx === idx ? 'selecded' : ''}>
          <Content item={item} handleExpand={() => handleExpand(idx)} />
          <Collapse in={expandedIdx === idx} timeout="auto" unmountOnExit>
            123
          </Collapse>
        </Card>
      ))}
    </div>
  );
};

// 卡片內容
const Content = ({ item, handleExpand }) => {
  return (
    <div className="content">
      <div>{item[0].dom}</div>
      <div className="info_wrap">
        <div className="title_wrap">
          {item[1].dom}
          <div onClick={handleExpand}>{item[5].dom}</div>
        </div>
        <span>電影序號</span>
        <br />
        {item[2].dom}
        <div className="show_date_wrap">
          {item[3].dom}
          {item[4].dom}
        </div>
      </div>
    </div>
  );
};

const styles = {
  root: {
    color: '#FFFFFF',
    '& img': {
      width: '60px !important',
      height: 'auto !important',
      paddingRight: '8px',
    },
    '& .selecded': {
      backgroundColor: Palette.THIRD[90],
    },
    '& .content': {
      display: 'flex',
      padding: '20px 8px',
      '& .info_wrap': {
        flex: 1,
      },
      '& .title_wrap': {
        display: 'flex',
        'justify-content': 'space-between',
      },
      '& .show_title': {
        color: '#FFFFFF',
      },
      '& .showTime': {
        paddingLeft: '16px',
      },
      '& .show_date_wrap': {
        display: 'flex',
        paddingRight: '60px',
      },
    },
  },
};
export default withStyles(styles)(EzExpansion);

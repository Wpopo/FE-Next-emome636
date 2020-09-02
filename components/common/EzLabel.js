import React from 'react';
import Palette from 'Styled/palette';
import { withStyles } from '@material-ui/core/styles';

// type='grade' => 電影分級
// 0 普遍級
// 1 保護級
// 2 輔12級
// 3 輔15級
// 4 限制級

// type='IMDB' => IMDB
// type='RottenTomatoes' => 爛番茄
const EzLabel = ({ type, number = 0, showNum = false, classes }) => {
  let text = '';
  if (type === 'grade') {
    switch (number) {
      case 0:
        text = '普遍級';
        break;
      case 1:
        text = '保護級';
        break;
      case 2:
        text = '輔12級';
        break;
      case 3:
        text = '輔15級';
        break;
      case 4:
        text = '限制級';
        break;
      default:
        text = '';
        break;
    }
  } else if (type === 'garagePlay') {
    text = number;
  } else if (type === 'RottenTomatoes') {
    text = '爛番茄';
  } else {
    text = type;
  }

  return (
    <div className={`EzLabel ${classes.root}`}>
      <div className={`EZ_ObliqueCube ${type}`}>
        <span className="EzLabel_text">{text}</span>
      </div>
      {showNum ? <span className="EzLabel_num">{number}</span> : null}
    </div>
  );
};

const styles = {
  root: {
    display: 'inline-flex',
    '& .EZ_ObliqueCube': {
      width: '46px',
      height: '20px',
      '&.IMDB, &.RottenTomatoes': { backgroundColor: '#000000' },
    },
    '& .garagePlay': {
      width: '100%',
      height: '100%',
    },
    '& .EzLabel_num': {
      fontSize: '18px',
      color: Palette.FIRST[30],
      paddingLeft: '4px',
    },
  },
};

export default withStyles(styles)(EzLabel);

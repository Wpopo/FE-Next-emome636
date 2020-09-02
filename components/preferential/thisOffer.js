import React from 'react';
import Buttom from '@material-ui/core/Button';
import Palette from 'Styled/palette';
import { withStyles } from '@material-ui/core/styles';

const thisOffer = ({ classes }) => {
  const title = '方案介紹';
  const dataList = [
    {
      title: { first: '49', second: '元/月' },
      sub_title: 'VIP影音雙享包',
      desc_list: [{ color: '', v: '每月可獲3000點會員紅利點數' }],
      action: '立即申租',
    },
    {
      title: { first: '109', second: '元/月' },
      sub_title: 'VIP影音雙享包',
      desc_list: [
        { color: '', v: '每月可獲3000點會員紅利點數' },
        { color: 'G', v: '線上影音每月20部電影免費看' },
      ],
      action: '立即申租',
    },
  ];

  return (
    <div className={`${classes.content}`}>
      <div className="root">
        <div className="title">{title}</div>
        <div className="Rectangle_root">
          {dataList.map((data, idx) => (
            <div key={idx} className="Rectangle_title">
              <div>
                <span className="title_first">{data.title.first}</span>
                <span className="title_second">{data.title.second}</span>
              </div>
              <div>
                <span className="sub_title">{data.sub_title}</span>
              </div>
              <div className="Rectangle_desc">
                {Object.entries(data.desc_list).map(([key, value]) => (
                  <span key={key} className={` EZ_movie_title  desc_list${value.color}`}>
                    {value.v}
                  </span>
                ))}
              </div>

              <div>
                <Buttom>{data.action}</Buttom>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = (theme) => ({
  content: {
    '& .root': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      margin: '30px 0',
    },
    '& .Rectangle_root': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      margin: '30px 0',
      flexWrap: 'wrap',
    },
    '& .Rectangle_title': {
      width: '280px',
      height: '244px',
      borderRadius: '8px',
      border: `solid 1px ${Palette.FIFTH[40]}`,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      margin: '10px 10px',
    },
    '& .Rectangle_desc': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      margin: '6px 0',
    },
    '& .title': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      width: '80px',
      height: '29px',
      fontSize: '20px',
      color: '#ffffff',
    },
    '& .title_first': {
      width: '67px',
      height: '89px',
      fontSize: '60px',
      textAlign: 'center',
      color: Palette.FIRST[30],
    },
    '& .title_second': {
      width: '35px',
      height: '16px',
      fontSize: '12px',
      color: Palette.FIRST[30],
    },
    '& .sub_title': {
      width: '117px',
      height: '27px',
      fontSize: '18px',
      color: '#ffffff',
    },
    '& .desc_list': {
      height: '16px',
      fontSize: '14px',
      color: Palette.FIFTH[10],
      margin: '6px 0',
    },
    '& .desc_listG': {
      height: '16px',
      fontSize: '14px',
      color: Palette.FIRST[30],
      margin: '6px 0',
    },
  },
});
export default withStyles(styles)(thisOffer);

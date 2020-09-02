import React, { useState, useEffect } from 'react';
import Helper from 'Lib/helper';
import IMAGE from 'CONSTANTS/image';
import API from 'CONSTANTS/API/memberAPI';
import EzTable from 'Components/common/EzTable';
import Palette from 'Styled/palette';
import { withStyles } from '@material-ui/core/styles';

// 紅利點數列表
const Redpoint = ({ classes }) => {
  const [pointList, setPointList] = useState(null);
  const fetchMemberPoint = () => {
    Helper.axios.fetch(API.MEMBER.GET_RED_POINT_LIST(), (cb) => {
      if (cb.length < 0) return;
      setPointList(cb);
    });
  };
  useEffect(() => {
    fetchMemberPoint();
  }, []);

  const data = { list: [] };
  const tbHeader = [
    { id: 0, title: '紅利使用明細', align: 'left', classes: '' },
    { id: 1, title: '紅利點數', align: 'right', classes: '' },
    { id: 2, title: '起始日期', align: 'right', classes: '' },
    { id: 3, title: '到期日期', align: 'right', classes: '' },
  ];

  const getTbBodyData = (data) => {
    console.log(data);
    const result = data.list.map((item, idx) => {
      const { generate_behavior, point_name, created_time, expired_date, point } = item;
      const createdTime = Helper.datetime.MsToformatObj(created_time);
      const expiredDate = Helper.datetime.MsToformatObj(expired_date);
      let text = '';
      switch (generate_behavior) {
        case 1:
          text = '消費贈點';
          break;
        case 2:
          text = '活動贈點';
          break;
        case 3:
          text = '退貨還點';
          break;
        case 4:
          text = '兌換使用';
          break;
        case 5:
          text = '活動扣點';
          break;
        case 6:
          text = '退貨扣點';
          break;
        case 7:
          text = '點數調整';
          break;
        case 8:
          text = '其他';
          break;
        default:
          text = '';
          break;
      }
      return {
        0: {
          title: '紅利使用明細',
          dom: (
            <div>
              <span className="show_point_type">{text}</span>
              <span className="show_point_name">{point_name}</span>
            </div>
          ),
          align: 'left',
        },
        1: {
          title: '紅利點數',
          dom: <span className="order_number">{point}</span>,
          align: 'right',
        },
        2: {
          title: '起始日期',
          dom: (
            <div>
              <span className="show_date">{createdTime.date}</span>
              <span className="show_year">{createdTime.year}</span>
            </div>
          ),
          align: 'right',
        },
        3: {
          title: '到期日期',
          dom: (
            <div>
              <span className="show_date">{expiredDate.date}</span>
              <span className="show_year">{expiredDate.year}</span>
            </div>
          ),
          align: 'right',
        },
      };
    });
    return result;
  };

  return pointList !== null ? (
    <div className={classes.content}>
      <div className="title">紅利點數列表</div>
      <EzTable
        headerList={tbHeader}
        dataList={getTbBodyData(pointList)}
        noDataImg={IMAGE.noData.redpoint}
        noDataText={'目前沒有紅利紀錄'}
      />
      {console.log(data)}
    </div>
  ) : null;
};

const styles = (theme) => ({
  content: {
    '& .show_date': {
      fontSize: '20px',
    },
    '& .show_year': {
      fontSize: '12px',
      color: Palette.FIFTH[10],
      paddingLeft: '7px',
    },
    '& .show_point_type': {
      color: Palette.FIFTH[10],
    },
    '& .show_point_name': {
      paddingLeft: '7px',
    },
  },
});

export default withStyles(styles)(Redpoint);

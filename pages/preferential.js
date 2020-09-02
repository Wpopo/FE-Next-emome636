import React, { Fragment, useState, useEffect } from 'react';
import EzTabs from 'Components/common/EzTabs';
import ThisPreferentialDetailInfo from 'Components/preferential/thisPreferentialDetailInfo';
import ThisOffer from 'Components/preferential/thisOffer';
import { withStyles } from '@material-ui/core/styles';

//優惠查詢
const Preferential = ({ classes }) => {
  const tabList = {
    0: { title: '優惠方案', children: <ThisOffer /> },
    1: { title: '訂票優惠', children: <ThisPreferentialDetailInfo /> },
  };

  return (
    <div className={classes.root}>
      <EzTabs tabList={tabList} />
    </div>
  );
};

const styles = (theme) => ({
  root: {
    maxWidth: '1000px',
    padding: '0 16px',
    margin: 'auto',
  },
});
export default withStyles(styles)(Preferential);

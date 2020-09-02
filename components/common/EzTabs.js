import React, { Fragment, useState } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withStyles } from '@material-ui/core/styles';

/**
 * EzTabs
 *    tabList : {
 *      idx: Index
 *      title: 標題
 *      children: Body Component
 *    }
 *    classes: material withStyles class
 */
const EzTabs = ({ tabList = {}, classes }) => {
  const [tabIdx, setTabIdx] = useState(0);
  const [body, setBody] = useState(tabList[tabIdx].children);

  // 根據tab的數量給定className，以計算寬度
  const tabClasses = (() => {
    switch (Object.keys(tabList).length) {
      case 1:
        return 'one_tabs';
      case 2:
        return 'two_tabs';
      case 3:
        return 'three_tabs';
      case 4:
        return 'four_tabs';
      default:
        return '';
    }
  })();

  return (
    <Fragment>
      <Tabs
        value={tabIdx}
        onChange={(e, idx) => {
          setBody(tabList[idx].children);
          setTabIdx(idx);
        }}
      >
        {Object.keys(tabList).map((tab) => (
          <Tab className={tabClasses} key={tab} label={tabList[tab].title} />
        ))}
      </Tabs>
      <div className={classes.content}>{body}</div>
    </Fragment>
  );
};

const styles = {
  content: {
    // padding: '0px 12px',
  },
};
export default withStyles(styles)(EzTabs);

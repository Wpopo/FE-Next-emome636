import React, { useState } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Info from '@material-ui/icons/Info';
import Zoom from '@material-ui/core/Zoom';
import { withStyles } from '@material-ui/core/styles';

const tip = ({ cusClass = '', text = '', classes }) => {
  return (
    <Tooltip
      TransitionComponent={Zoom}
      className={`${cusClass} ${classes.root}`}
      title={text}
      placement="bottom-start"
      arrow
    >
      <Info />
    </Tooltip>
  );
};

const styles = {
  root: {
    width: '16px',
    height: '16px',
    lineHeight: '16px',
    paddingLeft: '5px',
    color: '#B2B5BF',
  },
};

export default withStyles(styles)(tip);

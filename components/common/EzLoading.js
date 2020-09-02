import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

const EzLoading = ({ open = false, classes }) => {
  return (
    <Backdrop className={classes.root} open={open}>
      <CircularProgress />
    </Backdrop>
  );
};

const styles = {
  root: {
    zIndex: 10,
    cursor: 'wait',
  },
};
export default withStyles(styles)(EzLoading);

import React from 'react';
import Palette from 'Styled/palette';
import { withStyles } from '@material-ui/core/styles';

const EzScrollContent = ({ children, classes }) => (
  <div className={classes.root}>
    <div className="box Ez_Scroll_Bar">{children}</div>
  </div>
);

const styles = (theme) => ({
  root: {
    margin: 'auto',
    height: '400px',
    padding: '10px 0px',
    color: '#FFFFFF',
    backgroundColor: Palette.THIRD[90],

    '& .box': {
      height: '100%',
      padding: '0px 100px',
      '-webkit-overflow-scrolling': 'touch',
      overflowY: 'auto',

      '&::-webkit-scrollbar-thumb': {
        backgroundColor: Palette.FIFTH[80],
      },
    },
    // pad
    [theme.breakpoints.down('md')]: {
      width: '600px',
      height: '640px',
    },
    // mobile
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: '360px',
      '& .box': { padding: '0px 16px' },
    },
  },
});

export default withStyles(styles)(EzScrollContent);

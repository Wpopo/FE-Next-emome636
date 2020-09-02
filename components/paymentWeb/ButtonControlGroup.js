import React, { Fragment } from 'react';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Palette from 'Styled/palette';
import { withStyles } from '@material-ui/core/styles';

const ButtonControlGroup = ({ quantity = 0, add, reduce, classes }) => (
  <div className={classes.root}>
    <RemoveIcon
      onClick={(e) => {
        // 防止冒泡(stopPropagation)，
        reduce();
        e.stopPropagation();
      }}
    />
    <span className="quantity">{quantity}</span>
    <AddIcon
      onClick={(e) => {
        // 防止冒泡(stopPropagation)，
        add();
        e.stopPropagation();
      }}
    />
  </div>
);

const styles = {
  root: {
    display: 'flex',
    alignItems: 'center',

    '& .quantity': {
      padding: '0 16px',
      color: Palette.FIRST[30],
    },
    '& svg': {
      border: `1px solid ${Palette.FIFTH[40]}`,
      borderRadius: '5px',
      cursor: 'pointer',
    },
  },
};
export default withStyles(styles)(ButtonControlGroup);

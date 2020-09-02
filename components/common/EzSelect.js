import React, { useState } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Palette from 'Styled/palette';
import { withStyles } from '@material-ui/core/styles';

/**
 *
 */
const EzSelect = ({ list = [], defaultValue = '', renderValue, cusHandleChange, cusClass, classes }) => {
  const [value, setValue] = useState(defaultValue);
  const [text, setText] = useState(defaultValue);

  const handleChange = (e, v) => {
    setValue(e.target.value);
    setText(v.props.children);
    if (cusHandleChange !== undefined && typeof cusHandleChange === 'function') cusHandleChange(e, value);
  };

  return (
    <Select
      className={`EzSelect ${classes.root} ${cusClass}`}
      value={value}
      renderValue={(v) => (renderValue !== undefined ? renderValue(v) : text)}
      onChange={(e, v) => handleChange(e, v)}
      MenuProps={{
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left',
        },
        transformOrigin: {
          vertical: 'top',
          horizontal: 'left',
        },
        getContentAnchorEl: null,
      }}
      disableUnderline
    >
      {list.map((i, idx) => (
        <MenuItem className={i.text === text ? 'Mui-selected' : ''} key={idx} value={i.value}>
          {i.text}
        </MenuItem>
      ))}
    </Select>
  );
};

const styles = {
  root: {
    '& .options': {},

    '& .MuiSelect-icon': {
      color: '#FFFFFF',
      right: '8px',
    },
    '&.EzSelect.lg > .MuiSelect-select': { width: '288px' },
  },
};
export default withStyles(styles)(EzSelect);

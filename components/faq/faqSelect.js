import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { itemList } from 'Components/constants/faqContext';

export default function FaqSelect({ passGroupId }) {
  const classes = useStyles();

  const [selItem, setSelTtem] = useState('groupA');

  const handleClick = (groupId) => {
    setSelTtem(groupId);
    passGroupId(groupId);
  };

  return (
    <div className={classes.root}>
      {itemList.map((item) => {
        return (
          <div
            className={`item EZ_ObliqueCube btn ${selItem === item.id ? 'selected' : ''}`}
            key={item.id}
            onClick={() => handleClick(item.id)}
          >
            <span className="label">{item.name}</span>
          </div>
        );
      })}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    'flex-wrap': 'wrap',
    padding: '30px 20px',

    '& .item': {
      height: '70px',
      marginRight: '8px',
      padding: '0 15px',
    },

    '& .item .label': {
      fontSize: '18px',
    },
    // Pad
    [theme.breakpoints.down('md')]: {
      '& .item': {
        height: '63px',
        padding: '0 10px',
      },
      '& .item .label': {
        fontSize: '16.2px',
      },
    },
    // mobile
    [theme.breakpoints.down('sm')]: {
      '& .item': {
        height: '41px',
        padding: '0 14px',
        marginBottom: '9px',
      },
    },
  },
}));

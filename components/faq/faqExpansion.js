import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Expansion from 'Components/common/EzExpansion';
import Palette from 'Styled/palette';
import { faqContents } from 'Components/constants/faqContext';

export default function FaqExpansion({ groupId }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {faqContents[groupId].map((item, key) => {
        const ansList = (
          <div className="ans">
            <div className="ansItem">A</div>
            {item.ans}
          </div>
        );
        return <Expansion
          key={`${groupId}-${key}`}
          title={`Q ${item.que}`}
          children={ansList}
          expandedColor={Palette.FIRST[30]}
          expandedBg={Palette.THIRD[90]}
          expandedMagin={'0'}
        />;
      })}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '640px',
    '& .ans': {
      color: '#FFF',
      display: 'flex',
      'margin-bottom': '10px',
      'font-size': '16px',

      '& .ansItem': {
        marginRight: '8px',
      },
      '& .part': {
        'margin-bottom': '16px',

        '& .section': {
          'margin-bottom': '5px',
        },
        '& .section:last-child': {
          'margin-bottom': '0px',
        },
        '& .bold': {
          fontWeight: 'bold',
        },
        '& ul, & ol': {
          'padding-inline-start': '18px',
          'margin-block-start': '0em',
        },
        '& ul li': {
          'list-style-type': 'none',
          'margin-bottom': '5px',
          position: 'relative',

          '&::before': {
            content: '"-"',
            display: 'inline-block',
            'font-size': '10px',
            position: 'absolute',
            left: '-15px',
          },
          '& .bold': {
            fontWeight: 'bold',
          },
        },
        '& ol li': {
          'margin-bottom': '5px',

          '& .bold': {
            fontWeight: 'bold',
          },
        },
        '& .notice': {
          'font-size': '14px',
          'margin-top': '24px',
        },
      },
    },
    // Pad
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
    // mobile
    [theme.breakpoints.down('sm')]: {},
  },
}));

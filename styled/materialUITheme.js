import { createMuiTheme } from '@material-ui/core/styles';
import Palette from './palette';

const theme = createMuiTheme({
  breakpoints: {
    values: {
      // ref bootstrap breakpoint
      xs: 0,
      sm: 541, //  540
      md: 769, //  768
      lg: 1025, // 1024
      xl: 1441, // 1440
    },
  },
  typography: {
    fontFamily: [
      'PingFangTC',
      'Microsoft JhengHei',
      'system',
      '-apple-system',
      'BlinkMacSystemFont',
      '"PingFang SC"',
      'Helvetica',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  overrides: {
    MuiButton: {
      root: {
        width: '140px',
        height: '44px',
        color: Palette.SECOND[80],
        backgroundColor: Palette.FIRST[30],
        borderRadius: '3px',
        boxShadow: 'unset !important',
        '&.btn-loading': {
          '& .MuiButton-label': {
            display: 'none',
          },
        },
        '&:hover': {
          backgroundColor: 'unset',
          '& .MuiTouchRipple-root': {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
          },
        },
        '&.Mui-disabled': {
          color: `${Palette.FIFTH[30]} !important`,
          backgroundColor: `${Palette.FIFTH[60]} !important`,
        },
      },

      outlinedSizeLarge: { padding: 'unset !important' },
      containedSizeLarge: { padding: 'unset !important' },

      contained: {
        color: Palette.SECOND[80],
        backgroundColor: Palette.FIRST[30],
        '&:hover': {
          color: Palette.SECOND[80],
          backgroundColor: Palette.FIRST[30],
        },
        '&.btn-loading:after': {
          borderColor: '#FFFFFF',
        },
      },
      outlined: {
        color: Palette.FIRST[30],
        backgroundColor: 'unset',
        border: `1px solid ${Palette.FIRST[30]}`,
        '&.btn-loading:after': {
          borderColor: Palette.FIRST[30],
        },
      },
      sizeLarge: {
        width: '288px',
      },
    },
    MuiTabs: {
      boxShadow: 'unset !important',
      backgroundColor: 'unset',
      root: {},
      indicator: {
        backgroundColor: Palette.FIRST[30],
      },
      '@media (min-width:769px)': {
        flexContainer: {
          'justify-content': 'space-between',
        },
        indicator: {
          backgroundColor: '#f50057',
        },
      },
    },
    MuiTab: {
      root: {
        fontSize: '16px',

        '@media (min-width:0px)': {
          '&.one_tabs': { minWidth: '100%' },
          '&.two_tabs': { minWidth: 'calc(100% / 2)' },
          '&.three_tabs': { minWidth: 'calc(100% / 3)' },
          '&.four_tabs': { minWidth: 'calc(100% / 4)' },
        },
        '@media (min-width:769px)': {
          minWidth: '100px !important',
        },
      },
      textColorInherit: {
        color: Palette.FIFTH[10],
        '&.Mui-selected': {
          color: '#FFFFFF',
        },
      },
    },
    MuiPagination: {
      root: {
        '& button': {
          color: Palette.FIFTH[10],
          '&.Mui-selected': {
            color: Palette.FIFTH[70],
            backgroundColor: Palette.FIRST[30],
          },
          '&:hover': {
            backgroundColor: `${Palette.FIRST[30]} !important`,
          },
        },
      },
      ul: {
        'justify-content': 'center',
        paddingTop: '30px',
      },
    },
    MuiTable: {
      root: {
        '& th,& td': {
          color: '#FFFFFF',
          borderBottom: `1px solid ${Palette.FIFTH[60]}`,
          padding: '4px 8px',
        },
      },
    },
    MuiTableHead: {
      root: {
        backgroundColor: Palette.FIFTH[60],
        whiteSpace: 'nowrap',
        '& th,& td': {
          padding: '8px',
          fontSize: '12px',
          borderBottom: 'none',
        },
      },
    },
    MuiCard: {
      root: {
        color: '#FFFFFF',
        backgroundColor: Palette.FIFTH[70],
        boxShadow: 'unset',
      },
    },
    MuiTooltip: {
      tooltip: {
        padding: '16px',
        fontSize: '12px',
        border: `solid 1px ${Palette.FIFTH[60]}`,
        borderRadius: '1px',
        backgroundColor: Palette.THIRD[90],
      },
      arrow: {
        color: Palette.THIRD[90],
      },
      tooltipPlacementBottom: {
        '@media (min-width: 375px)': {
          margin: '8px 0',
        },
      },
    },
    MuiSkeleton: {
      root: {
        backgroundColor: Palette.FIFTH[60],
      },
    },
    MuiSelect: {
      select: {
        padding: '0 16px',
        boxSizing: 'border-box',
        width: '140px',
        color: '#FFFFFF',
        backgroundColor: Palette.FIFTH[80],
        borderRadius: '2px',
        display: 'flex',
        alignItems: 'center',
        '& .options': {
          color: Palette.FIFTH[30],
          backgroundColor: Palette.FIFTH[80],
          cursor: 'pointer',
        },
      },
      selectMenu: {
        height: '44px',
      },
    },
    MuiList: {
      root: {
        maxHeight: '250px',

        '& li.list-mid': {
          display: 'flex !important',
          'justify-content': 'center !important',
        },
      },
    },

    MuiMenu: {
      paper: {
        marginTop: '4px',
        boxShadow: 'unset',
        color: Palette.FIFTH[30],
        backgroundColor: Palette.FIFTH[80],
        '& .Mui-selected': {
          color: '#FFFFFF',
          backgroundColor: `${Palette.FIFTH[80]} !important`,
        },
        '& .MuiListItem-button:hover': {
          backgroundColor: Palette.FIFTH[60],
        },
      },
      // scroll bar
      list: {
        padding: 0,
        '&::-webkit-scrollbar': {
          width: '7px',
        },
        '&::-webkit-scrollbar-track': {
          '-webkit-border-radius': '10px',
          borderRadius: '10px',
        },
        '&::-webkit-scrollbar-thumb': {
          '-webkit-border-radius': '4px',
          borderRadius: '4px',
          backgroundColor: Palette.FIFTH[90],
        },
        'overflow-y': 'auto',
      },
    },

    // 縮和樣式
    MuiPaper: {
      root: {
        backgroundColor: 'unset',
        boxShadow: 'unset',
        border: 'unset',
      },
      elevation1: {
        boxShadow: 'unset',
      },
    },

    // 懸浮視窗
    MuiDrawer: {
      paper: {
        backgroundColor: Palette.FIFTH[100],
      },
      paperAnchorBottom: {
        height: '270px',
        // mobile
        '@media (max-width:768px)': {
          height: '380px',
        },
      },
    },

    // 核取方塊
    MuiCheckbox: {
      root: {
        padding: '0px 8px 0 0',
        borderRadius: '2px',
        color: Palette.FIFTH[60],
        '&:hover': { backgroundColor: 'unset !important' },
        '&.Mui-checked': { color: `${Palette.FIRST[30]} !important` },
      },
    },
  },
});

export default theme;

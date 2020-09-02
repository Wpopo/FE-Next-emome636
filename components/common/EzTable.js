import React, { Fragment } from 'react';
import IMAGE from 'CONSTANTS/image';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Pagination from '@material-ui/lab/Pagination';
import Palette from 'Styled/palette';
import { withStyles } from '@material-ui/core/styles';

/**
 * EzTable
 *    idx: Index
 *    title: 標題
 *    children: Body Component
 */
const EzTable = ({
  headerList = [],
  dataList = [],
  // 展開設定
  expendID = '',
  expendComponent = null,
  colSpan = 0,
  // 沒資料 顯示 設定
  noDataImg = IMAGE.noData.default,
  noDataText = '目前沒有資料',
  // 分頁設定
  hasPagination = true, // 是否開啟分頁功能
  paginationCount = 10, // 分頁筆數 (預設 每10筆分一頁)
  classes,
}) => {
  if (headerList.length <= 0) return null;

  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => setPage(value);

  // 若有開啟分頁設定，則先對dataList處理顯示筆數
  const nData = hasPagination ? dataList.slice((page - 1) * paginationCount, page * paginationCount) : dataList;

  return (
    <div className={`EzTable Ez_Scroll_Bar ${classes.content}`}>
      <Table>
        <TableHead>
          <TableRow>
            {headerList.map((header) => (
              <TableCell key={header.id} align={header.align}>
                {header.title}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {dataList.map((data, idx) => (
            <Fragment key={idx}>
              <TableRow className={expendID === idx ? 'expend_tr' : ''}>
                {Object.entries(data).map(([key, value]) => (
                  <TableCell key={key} align={value.align}>
                    {value.dom}
                  </TableCell>
                ))}
              </TableRow>

              {expendID === idx ? (
                <TableRow className="expend_wrap">
                  <TableCell colSpan={colSpan}>{expendComponent}</TableCell>
                </TableRow>
              ) : null}
            </Fragment>
          ))}
        </TableBody>
      </Table>
      {/* 分頁功能 */}
      {hasPagination && dataList.length > 0 && dataList.length > paginationCount ? (
        <TablePagination page={page} handleChange={handleChange} count={paginationCount} dataCount={dataList.length} />
      ) : null}
      {dataList.length == 0 ? (
        <div className="noDataDiv">
          <img className="noDataImg" src={noDataImg} />
          <div className="noData">{noDataText}</div>
        </div>
      ) : null}
    </div>
  );
};

// 分頁 Component
const TablePagination = ({ page, handleChange, count, dataCount }) => {
  const totalPage = Math.floor(dataCount / count) + 1;

  return <Pagination className="pagination" page={page} count={totalPage} onChange={handleChange} showLastButton />;
};

const styles = {
  content: {
    overflow: 'auto',
    '& .expend_tr, .expend_wrap': {
      backgroundColor: Palette.THIRD[90],
    },
    '& .expend_wrap td': {
      padding: '24px 40px',
    },
    '& .noData': {
      padding: '32px 0',
      fontSize: '16px',
      textAlign: 'center',
      color: '#ffffff',
      '& img': {
        margin: 'auto',
        display: 'block',
        width: '80px',
        height: '80px',
      },
    },
    '& .noDataImg': {
      width: '70px',
      height: '70px',
    },
    '& .noDataDiv': {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      margin: '20px 0px',
    },
  },
};
export default withStyles(styles)(EzTable);

import React, { Component, Fragment, useState } from 'react';
import Helper from 'Lib/helper';
import CONSTANTS from 'CONSTANTS/payment';
import AddressCode from 'CONSTANTS/addressCode';
import Button from '@material-ui/core/Button';
import Select from 'Components/common/EzSelect';
import ToolTip from 'Components/common/ToolTip';
import InputCancel from 'Components/common/EzInputCancel';
import Palette from 'Styled/palette';
import { withStyles } from '@material-ui/core/styles';

// 取得 縣市 清單
const cityMenu = () => {
  const obj = [];
  // 依照CityCode排序
  AddressCode.sort((a, b) => parseInt(a.CityCode, 10) - parseInt(b.CityCode, 10)).map((item) =>
    obj.push({ text: item.CityName, value: item }),
  );

  return obj;
};

// 取得 鄉鎮地區 清單
const AreaMenu = (list) => {
  const obj = [];
  // 依照ZipCode排序
  list
    .sort((a, b) => parseInt(a.ZipCode, 10) - parseInt(b.ZipCode, 10))
    .map((item) => obj.push({ text: item.AreaName, value: item }));

  return obj;
};

// 卡號輸入Input
const CreditInput = ({ id, next, onChange }) => (
  <InputCancel
    cusClass="credit_input"
    align="center"
    placeholder="- - - -"
    placeholderAlign="center"
    checkItems={{ isNum: true, length: 4 }}
    cusOnChange={() =>
      onChange !== undefined
        ? onChange(
            document
              .getElementById('credit_card_1')
              .value.concat(document.getElementById('credit_card_2').value)
              .concat(document.getElementById('credit_card_3').value)
              .concat(document.getElementById('credit_card_4').value),
          )
        : null
    }
    id={id}
    maxLength={4}
    autoTabNext={next}
  />
);

class CheckoutUI extends Component {
  constructor(props) {
    super(props);

    this.paymentTool = [
      { id: 1, title: '信用卡' },
      { id: 2, title: 'LINE PAY' },
      { id: 3, title: '遠傳電信帳單' },
      { id: 4, title: '', icon: 'applepay' },
      { id: 5, title: 'AFTEE先享後付' },
    ];

    this.invoiceType = [
      {
        id: 0,
        first: '捐贈',
        second: [
          { sid: 0, title: '創世基金會' },
          { sid: 1, title: '其他' },
        ],
        detailComponent: (sid) => <Donation sid={sid} changeData={this.props.changeData} />,
      },
      {
        id: 1,
        first: '個人戶',
        second: [
          {
            sid: 0,
            title: '會員載具',
            // tooltip:
            //   '以會員帳號為載具，由本網站進行對獎、通知；若已歸戶則由財政部進行對獎、通知、匯入獎金。(歸戶請至財政部－電子發票整合服務平台)',
          },
          {
            sid: 1,
            title: '手機條碼',
            // tooltip: '需先完成申請方可使用，由財政部進行對獎、通知、匯入獎金。(申請請至財政部－電子發票整合服務平台)',
          },
          {
            sid: 2,
            title: '自然人憑證',
            // tooltip: '需先完成歸戶方可使用，由財政部進行對獎、通知、匯入獎金。(歸戶請至財政部－電子發票整合服務平台)',
          },
        ],
        detailComponent: (sid) => <Individual sid={sid} changeData={this.props.changeData} />,
      },
      {
        id: 2,
        first: '公司戶',
        second: null,
        detailComponent: () => <Corporate changeData={this.props.changeData} />,
      },
    ];
    this.state = { finv_sub_type: 0 };
  }

  render() {
    const { finv_sub_type } = this.state;
    const { useTool, UIData, changeData, classes } = this.props;
    // use_method 支付方式
    //  1:信用卡 2:LINE PAY 3:遠傳電信帳單 4:APPLY PAY 5:AFTEE先享後付
    // finv_type 發票種類 0:捐贈 1:個人戶 2:公司戶
    const { use_method, finv_type, mobile, email, asiamiles_no } = UIData;

    return (
      <div className={`${classes.root}`}>
        {/* 付款工具 */}
        <div className="wrap">
          <div className="title">付款工具</div>
          <div className="toolWrap">
            {this.paymentTool.map((tool) => {
              const { id, title, icon } = tool;
              return useTool.includes(id) ? (
                <Fragment key={id}>
                  <Button
                    className="checkout-btn"
                    variant={use_method === id ? 'contained' : 'outlined'}
                    size="large"
                    onClick={() => changeData('use_method', id)}
                  >
                    {icon !== undefined ? <img className={icon} /> : title}
                  </Button>
                </Fragment>
              ) : null;
            })}
          </div>
          <PayTool toolID={use_method} changeData={changeData} />
        </div>

        {/* 電子發票 */}
        <div className="wrap invoice">
          <div className="title">電子發票</div>
          {/* invoiceType-First 電子發票 第一欄 */}
          <Select
            cusClass="checkout-select lg"
            defaultValue={this.invoiceType[finv_type].first}
            renderValue={() => this.invoiceType[finv_type].first}
            cusHandleChange={(e) => {
              changeData('finv_type', e.target.value);
              this.setState({ finv_sub_type: 0 });
            }}
            list={this.invoiceType.map((invoice) => ({ text: invoice.first, value: invoice.id }))}
          />

          {/* invoiceType-Second */}
          {this.invoiceType[finv_type].second !== null ? (
            <Fragment>
              {/* tooltip */}
              {this.invoiceType[finv_type].second[finv_sub_type].tooltip !== undefined ? (
                <Tooltip cusClass="checkout-tooltip" text={this.invoiceType[finv_type].second[finv_sub_type].tooltip} />
              ) : null}

              {/* invoiceType-Second 電子發票 第二欄 */}
              <Select
                cusClass="checkout-select lg"
                defaultValue={this.invoiceType[finv_type].second[finv_sub_type].title}
                renderValue={() => this.invoiceType[finv_type].second[finv_sub_type].title}
                cusHandleChange={(e) => {
                  changeData('finv_device', e.target.value);
                  this.setState({ finv_sub_type: e.target.value });
                }}
                list={this.invoiceType[finv_type].second.map((type) => ({ text: type.title, value: type.sid }))}
              />
            </Fragment>
          ) : null}

          {/* 子項目資料 */}
          {this.invoiceType[finv_type].detailComponent(finv_sub_type)}
        </div>

        {/* 訂購人資料 */}
        <div className="wrap">
          <div className="title">訂購人資料</div>
          <div className="textWrap">
            <span className="EZ_movie_title">{mobile}</span>
          </div>
          <div className="textWrap">
            <InputCancel
              cusClass="lg"
              placeholder="請輸入電子郵件地址(必填)"
              defaultValue={email}
              cusOnChange={(e) => changeData('email', e.target.value)}
            />
          </div>
        </div>
      </div>
    );
  }
}

// 付款工具
const PayTool = ({ toolID = 1, changeData }) => {
  // 今年年份
  const nYear = new Date().getFullYear();
  // 預設顯示月份 / 年份 文字
  const defaultYear = '到期年';
  const defaultMonth = '到期月';

  // 信用卡
  if (toolID === 1) {
    // 到期月
    const monthItems = () => {
      const months = [];
      for (let month = 1; month <= 12; month++) {
        months.push({ text: month, value: Helper.data.formatNumber(month) });
      }
      return months;
    };

    // 到期年
    const yearItems = () => {
      const years = [];

      for (let year = nYear; year < nYear + 30; year++) {
        years.push({ text: year, value: year });
      }
      return years;
    };

    return (
      <div className="paytool">
        <CreditInput id="credit_card_1" next="credit_card_2" onChange={(v) => changeData('pan', v)} />
        <CreditInput id="credit_card_2" next="credit_card_3" onChange={(v) => changeData('pan', v)} />
        <CreditInput id="credit_card_3" next="credit_card_4" onChange={(v) => changeData('pan', v)} />
        <CreditInput id="credit_card_4" next="credit_card_4" onChange={(v) => changeData('pan', v)} />

        <div className="break" />
        {/* 到期年 */}
        <Select
          defaultValue={defaultYear}
          cusHandleChange={(e) => changeData('expire_year', e.target.value)}
          list={yearItems()}
        />
        {/* 到期月 */}
        <Select
          defaultValue={defaultMonth}
          cusHandleChange={(e) => changeData('expire_month', e.target.value)}
          list={monthItems()}
        />

        <InputCancel
          placeholder="卡片背後3碼"
          checkItems={{ isNum: true, length: 3 }}
          cusOnChange={(e) => changeData('cvv2', e.target.value)}
        />
      </div>
    );
  }

  return null;
};
// 捐贈
const Donation = ({ sid, changeData }) => {
  // 創世基金會
  if (sid === 0) return null;

  // 其他
  if (sid === 1) {
    return (
      <div className="detailWrap">
        <InputCancel
          cusClass="lg"
          placeholder="請輸入捐贈碼"
          checkItems={{ isNum: true, length: 7 }}
          cusOnChange={(e) => changeData('finv_donate_code', e.target.value)}
        />
        <div className="break" />
        <div className="loveSearch" onClick={() => window.open(CONSTANTS.LoveCode)}>
          愛心碼查詢
        </div>
      </div>
    );
  }

  return null;
};

// 個人戶
const Individual = ({ sid, changeData }) => {
  // 預設顯示縣市 / 鄉鎮 文字
  const defaultCity = '縣市';
  const defaultArea = '鄉鎮地區';
  // 縣市替換時，必須重設鄉鎮地區
  // 所以值的存取必須在此控制
  const [area, setArea] = useState(defaultArea);
  const [areaList, setAreaList] = useState([]);

  // 會員載具
  if (sid === 0) {
    return (
      <div className="detailWrap">
        <InputCancel
          cusClass="lg"
          placeholder="發票收件人"
          cusOnChange={(e) => changeData('finv_receiver', e.target.value)}
        />

        {/* 縣市 */}
        <Select
          cusClass="lg"
          defaultValue={defaultCity}
          renderValue={(value) => (value.CityName === undefined ? value : value.CityName)}
          cusHandleChange={(e, value) => {
            const { CityName, CityCode, AreaList } = e.target.value;
            if (CityName === value.CityName) return;

            setAreaList(AreaList);
            setArea(defaultArea);
            changeData('finv_county_id', CityCode);
            changeData('finv_zip', '');
            changeData('finv_town_id', '');
          }}
          list={cityMenu()}
        />
        <div className="break" />
        {/* 鄉鎮地區 */}
        <Select
          cusClass="lg"
          defaultValue={defaultArea}
          renderValue={() => area}
          cusHandleChange={(e, value) => {
            const { ZipCode, AreaName } = e.target.value;
            if (AreaName === value.AreaName) return;

            setArea(AreaName);
            changeData('finv_zip', ZipCode);
            changeData('finv_town_id', ZipCode);
          }}
          list={AreaMenu(areaList)}
        />
        <InputCancel
          cusClass="lg"
          placeholder="發票收件地址"
          cusOnChange={(e) => changeData('finv_address', e.target.value)}
        />
      </div>
    );
  }

  // 手機條碼
  if (sid === 1) {
    return (
      <div className="detailWrap">
        <InputCancel
          cusClass="lg"
          placeholder="請輸入載具條碼"
          checkItems={{ type: 'phoneCode' }}
          cusOnChange={(e) => {
            changeData('finv_device_show_id', e.target.value);
            changeData('finv_device_hide_id', e.target.value);
          }}
        />
      </div>
    );
  }

  // 自然人憑證
  if (sid === 2) {
    return (
      <div className="detailWrap">
        <InputCancel
          cusClass="lg"
          placeholder="請輸入自然人憑證"
          checkItems={{ type: 'naturalPerson' }}
          cusOnChange={(e) => {
            changeData('finv_device_show_id', e.target.value);
            changeData('finv_device_hide_id', e.target.value);
          }}
        />
      </div>
    );
  }
  return null;
};

// 公司戶
const Corporate = ({ changeData }) => {
  // 預設顯示縣市 / 鄉鎮 文字
  const defaultCity = '縣市';
  const defaultArea = '鄉鎮地區';
  // 縣市替換時，必須重設鄉鎮地區
  // 所以值的存取必須在此控制
  const [area, setArea] = useState(defaultArea);
  const [areaList, setAreaList] = useState([]);

  return (
    <div className="detailWrap">
      <InputCancel
        cusClass="lg"
        placeholder="統一編號"
        checkItems={{ isNum: true, length: 8 }}
        cusOnChange={(e) => changeData('finv_tax_no', e.target.value)}
      />
      <InputCancel cusClass="lg" placeholder="統一抬頭" cusOnChange={(e) => changeData('finv_title', e.target.value)} />
      <div className="break" />
      <InputCancel
        cusClass="lg"
        placeholder="發票收件人"
        cusOnChange={(e) => changeData('finv_receiver', e.target.value)}
      />
      {/* 縣市 */}
      <Select
        cusClass="lg"
        defaultValue={defaultCity}
        renderValue={(value) => (value.CityName === undefined ? value : value.CityName)}
        cusHandleChange={(e, value) => {
          const { CityName, CityCode, AreaList } = e.target.value;
          if (CityName === value.CityName) return;

          setAreaList(AreaList);
          setArea(defaultArea);
          changeData('finv_county_id', CityCode);
          changeData('finv_zip', '');
          changeData('finv_town_id', '');
        }}
        list={cityMenu()}
      />
      <div className="break" />
      {/* 鄉鎮地區 */}
      <Select
        cusClass="lg"
        defaultValue={defaultArea}
        renderValue={() => area}
        cusHandleChange={(e, value) => {
          const { ZipCode, AreaName } = e.target.value;
          if (AreaName === value.AreaName) return;

          setArea(AreaName);
          changeData('finv_zip', ZipCode);
          changeData('finv_town_id', ZipCode);
        }}
        list={AreaMenu(areaList)}
      />

      <InputCancel
        cusClass="lg"
        placeholder="發票收件地址"
        cusOnChange={(e) => changeData('finv_address', e.target.value)}
      />
    </div>
  );
};

const styles = (theme) => ({
  root: {
    margin: 'auto',
    '& .wrap': { padding: '0 0 20px 0' },
    '& .title': {
      color: '#FFFFFF',
      fontSize: '16px!important',
      padding: '0 0 16px 0',
    },
    // 付款工具
    '& .toolWrap': {
      '& button': { margin: '0 8px 0 0' },
      // apple pay ICON ---------
      '& button img': {
        '&.applepay': {
          width: '36px',
          height: '15px',
          content: 'url("../static/paymentWeb/applepayIcon.png")',
        },
      },
      '& button.MuiButton-contained img': {
        '&.applepay': { content: 'url("../static/paymentWeb/applepayIcon_focus.png")' },
      },
      '& button.Mui-disabled img': {
        '&.applepay': { content: 'url("../static/paymentWeb/applepayIcon_disabled.png")' },
      },
      // apple pay ICON ---------
    },

    '& .paytool': { margin: '8px 0 0 0' },
    '& .EzInput, .EzSelect': { margin: '0 8px 0 0' },

    '& .detailWrap': {
      display: 'flex',
      flexWrap: 'wrap',
      padding: '8px 0 0 0',

      '& .loveSearch': {
        fontSize: '12px',
        color: Palette.FIFTH[10],
        textDecoration: 'underline',
        cursor: 'pointer',
        verticalAlign: 'bottom',
        paddingBottom: '12px',
      },
    },
    // pad
    [theme.breakpoints.down('md')]: {
      maxWidth: '300px',
      display: 'flex',
      'flex-direction': 'column',
      alignItems: 'center',

      '& .break': { padding: 'unset' },

      // 付款工具
      '& .toolWrap': {
        '& button.MuiButton-sizeLarge': { width: '140px', fontSize: '14px' },
      },
      '& .paytool': {
        margin: 'unset',
        '& .EzInput, .EzSelect': {
          margin: '8px 8px 0 0',
        },
        // 信用卡 input
        '& .credit_input': { width: '66px' },
      },

      '& .invoice': {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',

        '& .detailWrap': {
          padding: 'unset',
          flexDirection: 'column',
        },
        '& .EzInput, .EzSelect': {
          margin: '0 0 8px 0',
          width: '288px',
        },
      },
    },
    // mobile
    [theme.breakpoints.down('sm')]: {},
  },
});

export default withStyles(styles)(CheckoutUI);

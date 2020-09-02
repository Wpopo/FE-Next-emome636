import React, { useState } from 'react';
import Helper from 'Lib/helper';
import Palette from 'Styled/palette';
import CancelIcon from '@material-ui/icons/CancelOutlined';
import { withStyles } from '@material-ui/core/styles';

/**
 * @param  {string}} [type=''] Input模式
 * @param  {string}} [placeholder=''] 提醒文字
 * @param  {string} [defaultValue=''] 預設文字
 * @param  {boolean} [Locked=false] 輸入框為唯獨狀態
 * @param  {string} [cusClass=''] 欲加入的className
 * @param  {string} [cusRef=''] Parent參照的值
 * @param  {function} [cusOnChange=''] 客製變更值時執行的動作
 * @param  {Object} [checkItems={}] 正規表達式檢查項目
 * @param  {Object} [classes] materialUI style system
 *
 * type = cancle 取消模式
 *        normal or '' 一般模式 (預設)
 *
 * checkItems = {
 *    type=string, 特殊檢核規則
 *    isNum=false, 是否需輸入半形純數字
 *    length: num, 是否限制長度
 * }
 *
 * checkItems.type
 *    phoneCode 電子發票手機條碼
 *    naturalPerson 電子發票自然人憑證
 */
const InputCancel = ({
  id,
  type = '',
  placeholder = '',
  placeholderAlign = 'left',
  align = 'left',
  defaultValue = '',
  Locked = false,
  showWaring = false,
  bindIsWaring = null,
  maxLength,
  autoTabNext,
  cusClass = '',
  cusRef = null,
  cusOnChange = null,
  checkItems = { isNum: false },
  classes,
}) => {
  const [value, setValue] = useState(defaultValue);
  const [waring, setWaring] = useState('');
  const [isFocus, setIsFocus] = useState(false);

  const clearValue = () => {
    setValue('');
    setWaring('');
    if (bindIsWaring !== null) bindIsWaring(true);

    // 客製變更值時執行的動作
    if (cusOnChange !== null) cusOnChange({ target: { value: '' } });
  };

  // 客製化檢核
  const checkRegex = (e) => {
    const nValue = e.target.value;
    let result = true;
    clearValue();
    setValue(nValue);

    if (nValue === '') return;
    if (bindIsWaring !== null) bindIsWaring(false);

    // 客製變更值時執行的動作
    if (cusOnChange !== null) cusOnChange(e);

    if (checkItems.type) {
      if (checkItems.type === 'phoneCode') {
        // 電子發票手機條碼
        if (!Helper.data.isPhoneCode(nValue)) {
          result = false;
          if (bindIsWaring !== null) bindIsWaring(true);
        }
      } else if (checkItems.type === 'naturalPerson') {
        // 電子發票自然人憑證
        if (!Helper.data.isNaturalPerson(nValue)) {
          result = false;
          if (bindIsWaring !== null) bindIsWaring(true);
        }
      }
    }

    if (checkItems.isNum) {
      if (!Helper.data.isNumber(nValue)) {
        result = false;
        if (bindIsWaring !== null) bindIsWaring(true);
      }
    }
    if (checkItems.length) {
      if (!Helper.data.limitLength(nValue, checkItems.length)) {
        result = false;
        if (bindIsWaring !== null) bindIsWaring(true);
      }
    }

    if (!result) setWaring('輸入格式不符合');
  };

  const autotab = (e, to) => {
    if (e.target.value.length === e.target.maxLength) document.getElementById(to).focus();
  };

  return (
    <div className={`EzInput ${classes.root} Input${type}`}>
      <div className={classes.inputWrap}>
        <input
          id={id}
          className={`InputCommon ${cusClass} ${
            Locked ? 'locked' : ''
          } align${align} placeholderAlign${placeholderAlign}`}
          type="text"
          placeholder={placeholder}
          value={value}
          maxLength={maxLength}
          onChange={(e) => checkRegex(e)}
          ref={cusRef === undefined || cusRef === null ? null : cusRef}
          readOnly={Locked}
          onFocus={() => setIsFocus(true)}
          // 需延遲150ms，防止CancelIcon未啟動就被關閉
          onBlur={() => setTimeout(() => setIsFocus(false), 150)}
          // auto Tab
          onKeyUp={(e) => (autoTabNext !== undefined ? autotab(e, autoTabNext) : null)}
        />
        {/* 取消模式 */}
        {type === 'cancle' ? (
          // 非Focus狀態, 空直, 鎖定狀態, 皆不顯示 CancelIcon
          !isFocus || value === '' || Locked ? null : (
            <CancelIcon className="cancelIcon" onClick={() => clearValue()} />
          )
        ) : null}
      </div>

      {/* 檢核警告訊息 */}
      {waring !== '' && showWaring ? <span className="waring">{waring}</span> : null}
    </div>
  );
};

const styles = (theme) => ({
  root: {
    display: 'inline-block',

    '& .waring': {
      paddingLeft: '16px',
      // color: Palette.Check.Error,
    },
  },
  inputWrap: {
    position: 'relative',
    display: 'flex',
    '& input': {
      boxSizing: 'border-box',
      fontFamily: 'inherit',
      padding: '0 16px 0 16px',
      width: '140px',
      height: '44px',
      fontSize: '14px',
      color: '#FFFFFF',
      backgroundColor: Palette.FIFTH[80],
      borderRadius: '3px',
      border: 'unset',
      // Align
      '&.alignleft': { textAlign: 'left' },
      '&.aligncenter': { textAlign: 'center' },
      '&.alignright': { textAlign: 'right' },

      // placeholder
      '&.placeholderAlignleft::-webkit-input-placeholder': { textAlign: 'left' },
      '&.placeholderAligncenter::-webkit-input-placeholder': { textAlign: 'center' },
      '&.placeholderAlignright::-webkit-input-placeholder': { textAlign: 'right' },
      '&::-webkit-input-placeholder': {
        color: Palette.FIFTH[30],
      },

      '&.locked': {},

      '&:focus': {
        outline: 'unset',
      },

      '&.lg': {
        width: '288px',
      },
    },
    '& .cancelIcon': {
      position: 'absolute',
      right: '5px',
      top: '25%',
      cursor: 'pointer',
    },
    [theme.breakpoints.down('sm')]: {},
  },
});

export default withStyles(styles)(InputCancel);

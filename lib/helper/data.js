const Helper = {
  // 使用 dangerouslySetInnerHTML
  createMarkup: (elem) => {
    return { __html: elem };
  },

  // 依據是否傳遞參數來判別取得 hash; search 參數
  getUrlParam: (sUrl, paramType) => {
    let url = sUrl;
    if (sUrl === undefined) {
      url = paramType == 'hash' ? document.location.hash.toLowerCase() : document.location.search.toLowerCase();
    }

    const queryString = {};

    url.replace(
      new RegExp(paramType == 'hash' ? '([^#=&]+)(=([^&]*))+' : '([^?=&]+)(=([^&]*))+', 'g'),
      ($0, $1, $2, $3) => {
        queryString[$1] = $3;
      },
    );

    return queryString;
  },

  formPostSubmit: (url, arrValue) => {
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = url;

    // 產生input
    arrValue.forEach((item) => {
      const node = document.createElement('input');
      node.name = item.name;
      node.value = item.value;
      form.appendChild(node.cloneNode());
    });

    form.style.display = 'none';
    document.body.appendChild(form);

    // 執行付款，關閉導頁監控
    window.onbeforeunload = null;
    form.submit();
  },

  formatPaymentPrice: (price = 0, point = 0, unit = '元', pUnit = '點') => {
    // 有點數 有價錢 -> X點+X元
    if (price > 0 && point > 0) {
      return `${point}${pUnit}+${price}${unit}`;
    }
    // 僅有點數 -> X點
    if (price <= 0 && point > 0) {
      return `${point}${pUnit}`;
    }

    // 預設 or 僅有價錢 -> X元
    return `${price}${unit}`;
  },

  // format Number
  // EX: 01,02...11,12...
  formatNumber: (elem) => {
    return (elem < 10 ? '0' : '') + elem;
  },

  // format coupon display price
  // mode = 1 (減法)
  // mode = 1 && price = 50 --> -$50
  //
  // mode = 2 (趴數)
  // mode = 2 && price = 50 --> 5折
  // mode = 2 && price = 0 (全額折抵) --> FREE
  formatCouponPrice: (price, mode = 1) => {
    let result = price;

    if (mode === 1) {
      // 減法
      result = `-$${price}`;
    } else if (mode === 2) {
      // 趴數
      if (price === 0) {
        // 全額折抵
        result = 'FREE';
      } else {
        result = `${price / 10}折`;
      }
    } else {
      result = price;
    }
    return result;
  },

  // 計算Coupon的價錢
  // mode = 1 (減法) --> price - discount
  // mode = 2 (趴數) --> price * discount
  // mode = 2 && price = 0 (全額折抵) --> 0
  calCouponPrice: (price, discount, mode = 1) => {
    let result = price;

    if (mode === 1) {
      // 減法
      result = price - discount;
    } else if (mode === 2) {
      // 趴數
      if (price === 0) {
        // 全額折抵
        result = 0;
      } else {
        result = (price * discount) / 100;
      }
    } else {
      result = price;
    }

    // 四捨五入至整入
    return Math.round(result);
  },

  isEmailAddress: (str) => {
    const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(str); // returns a boolean
  },
  isNotEmpty: (str) => {
    const pattern = /\S+/;
    return pattern.test(str); // returns a boolean
  },
  isNumber: (str) => {
    const pattern = /^\d+$/;
    return pattern.test(str); // returns a boolean
  },
  isSame: (str1, str2) => {
    return str1 === str2;
  },
  limitLength: (str, maxLength) => {
    const pattern = new RegExp(`^.{0,${maxLength}}$`);
    return pattern.test(str); // returns a boolean
  },

  // 電子發票手機條碼
  // 第一碼必為『/』
  // 其餘七碼則由數字【0-9】、大寫英文【A-Z】與特殊符號【.】【-】【+】組成
  isPhoneCode: (str) => {
    const pattern = /^\/[0-9A-Z+.-]{0,7}$/;
    return pattern.test(str); // returns a boolean
  },

  // 電子發票自然人憑證
  // 總長度為16碼字元
  // 前兩碼為大寫英文【A-Z】
  // 後14碼為數字【0-9】
  isNaturalPerson: (str) => {
    const pattern = /^[A-Z]{0,2}[0-9]{0,14}$/;
    return pattern.test(str); // returns a boolean
  },
};

export default Helper;

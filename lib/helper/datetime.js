import moment from 'moment';

const Helper = {
  //  格式化日期
  format: (dateString, pattern = 'YYYY/MM/DD') => {
    if (moment.isMoment(dateString)) {
      return dateString.format(pattern);
    }

    // is not a valid date string
    if (isNaN(Date.parse(dateString))) {
      return dateString;
    }

    const datetime = new Date(dateString);

    return moment(datetime).format(pattern);
  },

  formatUTC: ({ dateString, utc = '+0800', pattern = 'YYYY.MM.DD' }) => {
    if (moment.isMoment(dateString)) {
      return dateString.utcOffset(utc).format(pattern);
    }

    // is not a valid date string
    if (isNaN(Date.parse(dateString))) {
      return dateString;
    }

    const datetime = new Date(dateString);

    return moment(datetime)
      .utcOffset(utc)
      .format(pattern);
  },

  // Milliseconds 格式化日期
  // output: {year: 'YYYY', date: 'MM.DD', time: 'HH:mm'}
  MsToformatObj(...args) {
    let { time } = args[0];
    const {
      utc = '+0800',
      yearPattern = 'YYYY',
      monthPattern = 'MM',
      dayPattern = 'DD',
      datePattern = 'MM.DD',
      timePattern = 'HH:mm',
    } = args[0];

    if (typeof args[0] !== 'object') time = args[0];

    let cn_week = '';
    // 轉換星期
    switch (
      moment(time)
        .utcOffset(utc)
        .day()
    ) {
      case 1:
        cn_week = '星期一';
        break;
      case 2:
        cn_week = '星期二';
        break;
      case 3:
        cn_week = '星期三';
        break;
      case 4:
        cn_week = '星期四';
        break;
      case 5:
        cn_week = '星期五';
        break;
      case 6:
        cn_week = '星期六';
        break;
      case 0:
        cn_week = '星期日';
        break;

      default:
        break;
    }
    const session = {
      year: moment(time)
        .utcOffset(utc)
        .format(yearPattern),
      month: moment(time)
        .utcOffset(utc)
        .format(monthPattern),
      day: moment(time)
        .utcOffset(utc)
        .format(dayPattern),
      date: moment(time)
        .utcOffset(utc)
        .format(datePattern),
      time: moment(time)
        .utcOffset(utc)
        .format(timePattern),
      week: moment(time)
        .utcOffset(utc)
        .day(),
      cn_week: cn_week,
    };

    return session;
  },

  //  Milliseconds格式化日期
  MsToformat: (dateString, pattern = 'YYYY/MM/DD') => {
    if (moment.isMoment(dateString)) {
      return dateString.format(pattern);
    }

    // Unix Timestamp (milliseconds)
    dateString = moment(dateString);

    // is not a valid date string
    if (isNaN(Date.parse(dateString))) {
      return dateString;
    }

    const datetime = new Date(dateString);

    return moment(datetime).format(pattern);
  },
};

export default Helper;

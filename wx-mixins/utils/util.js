// '/'年月日时分秒
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
// '-'年月日
const formatTimeDay = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-')
}
// '.'年月日
const formatSpotTimeDay = date => {
  var dateTime = new Date(date);
  const year = dateTime.getFullYear()
  const month = dateTime.getMonth() + 1
  const day = dateTime.getDate()

  return [year, month, day].map(formatNumber).join('.')
}
// '.'年月日时分
const formatSpotDayHourMinute = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()

  return [year, month, day].map(formatNumber).join('.') + ' ' + [hour, minute].map(formatNumber).join(':')
}
//文字年月
const formatWordsYM = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  return year + '年' + formatNumber(month) + '月';
}
//文字月
const formatWordsYD = date => {
  const month = date.getMonth() + 1
  const day = date.getDate()
  return month + '月' + day + '日';
}
//文字年月日
const formatWordsDay = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return year + '年' + formatNumber(month) + '月' + formatNumber(day) + '日';
}
// '-'年月日时分
const formatTimeMinute = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute].map(formatNumber).join(':')
}
//文字年月日时分
const formatWordsTimeMinute = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()

  return year + '年' + formatNumber(month) + '月' + formatNumber(day) + '日' + ' ' + [hour, minute].map(formatNumber).join(':')
}
// '-'时分
const formatTimeHourMonth = date => {
  const hour = date.getHours()
  const minute = date.getMinutes()

  return [hour, minute].map(formatNumber).join(':')
}
// 转化时间几分钟前 小时前 昨天 多少天前 '-'年月日
const formatTimeHours = timespan => {
  var dateTimeStamp = new Date(timespan.replace(/-/g, '/'));
  var minute = 1000 * 60;
  var hour = minute * 60;
  var day = hour * 24;
  var result = '';
  var now = new Date().getTime();
  var diffValue = now - dateTimeStamp;
  if (diffValue < 0) {
    console.log("时间不对劲,服务器创建时间与当前时间不同步");
    return result = "刚刚";
  }
  var dayC = diffValue / day;
  var hourC = diffValue / hour;
  var minC = diffValue / minute;
  if (parseInt(dayC) > 7) {
    result = "" + formatTimeMinute(dateTimeStamp)
  } else if (parseInt(dayC) > 1) {
    result = "" + parseInt(dayC) + "天前" + '  ' + formatTimeHourMonth(dateTimeStamp);
  } else if (parseInt(dayC) == 1) {
    result = "昨天" + '  ' + formatTimeHourMonth(dateTimeStamp);
  } else if (hourC >= 1) {
    result = "" + parseInt(hourC) + "小时前";
  } else if (minC >= 5) {
    result = "" + parseInt(minC) + "分钟前";
  } else {
    result = "刚刚";
  }
  return result;
};
// 转化时间几分钟前 (今天 昨天 多少天前)+文字月日
const formatHandleDate = timespan => {
  var dateTimeStamp = new Date(timespan.replace(/-/g, '/'));
  var minute = 1000 * 60;
  var hour = minute * 60;
  var day = hour * 24;
  var result = '';
  var now = new Date().getTime();
  var diffValue = now - dateTimeStamp;
  if (diffValue < 0) {
    console.log("时间不对劲,服务器创建时间与当前时间不同步");
    return result = "刚刚";
  }
  var dayC = diffValue / day;
  var hourC = diffValue / hour;
  var minC = diffValue / minute;
  if (daysBetween(formatTimeDay(dateTimeStamp), formatTimeDay(new Date())) > 7) {
    result = "" + formatWordsYD(dateTimeStamp)
  } else if (daysBetween(formatTimeDay(dateTimeStamp), formatTimeDay(new Date())) > 1) {
    result = "" + parseInt(dayC) + "天前"
  } else if (daysBetween(formatTimeDay(dateTimeStamp), formatTimeDay(new Date())) == 1) {
    result = "昨天" + '  ' + formatTimeHourMonth(dateTimeStamp);
  } else if (daysBetween(formatTimeDay(dateTimeStamp), formatTimeDay(new Date())) == 0 && hourC >= 1) {
    result = "" + parseInt(hourC) + "小时前";
  } else if (minC >= 1) {
    result = "" + parseInt(minC) + "分钟前";
  } else {
    result = "刚刚";
  }
  return result;
};
// 日期补0
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
//计算两个日期差
function daysBetween(sDate1, sDate2) {
  //Date.parse() 解析一个日期时间字符串，并返回1970/1/1 午夜距离该日期时间的毫秒数
  var time1 = (new Date(sDate1)).getTime();
  var time2 = (new Date(sDate2)).getTime();
  var nDays = parseInt((time2 - time1) / 1000 / 3600 / 24);
  return nDays;
};

function isPhone(phone) {
  if (!(/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/.test(phone)) || phone == '') {
    return true;
  }
}

function isIDcard(value) {
  if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(value)) {
    return true
  }
}

/**
 * 处理富文本里的图片宽度自适应
 * 1.去掉img标签里的style、width、height属性
 * 2.img标签添加style属性：max-width:100%;height:auto
 * 3.修改所有style里的width属性为max-width:100%
 * 4.去掉<br/>标签
 * @param html
 * @returns {void|string|*}
 */
function formatRichText(html) {
  let newContent = html.replace(/<img[^>]*>/gi, function (match, capture) {
    match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
    match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
    match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
    return match;
  });
  newContent = newContent.replace(/style="[^"]+"/gi, function (match, capture) {
    match = match.replace(/width:[^;]+;/gi, 'width:100%;').replace(/width:[^;]+;/gi, 'width:100%;');
    return match;
  });
  newContent = newContent.replace(/<br[^>]*\/>/gi, '');
  newContent = newContent.replace(/\<img/gi, '<img style="width:100%;height:auto;display:block;margin-top:0;margin-bottom:0;"');
  return newContent;
};
//图片转base64
function toImageBase64(url) {
  return 'data:image/jpg;base64,' + wx.getFileSystemManager().readFileSync(url, "base64")
}

// 更新数组月份日期
function getDateStr(dayCount = 0) {
  var dd = new Date();
  dd.setDate(dd.getDate() + dayCount); //设置日期
  var m = dd.getMonth() + 1; //获取当前月份的日期
  var d = dd.getDate();
  return `${m}月${d<10?'0'+d:d}日`

}
//更新数组星期
function getWeekDateStr(dayCount = 0) {
  //更新数组星期
  var weekStr = "周" + "日一二三四五六".charAt((new Date().getDay() + dayCount) % 7);
  return weekStr;
}

// 更新数组年月份日期-
function getfullDateStr(dayCount = 0) {
  var dd = new Date();
  dd.setDate(dd.getDate() + dayCount); //设置日期
  const year = dd.getFullYear()
  const month = dd.getMonth() + 1
  const day = dd.getDate()
  return [year, month, day].map(formatNumber).join('-')

}

// 获取多少天后的日期
function dateChange(num = 1, date = false) {
  if (!date) {
    date = new Date(); //没有传入值时,默认是当前日期
    date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  }
  date += " 00:00:00"; //设置为当天凌晨12点
  date = Date.parse(new Date(date)) / 1000; //转换为时间戳
  date += (86400) * num; //修改后的时间戳
  var newDate = new Date(parseInt(date) * 1000); //转换为时间
  return newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate();
}

// 生成随机数字
function RandomNumBoth(Min, Max) {
  var Range = Max - Min;
  var Rand = Math.random();
  var num = Min + Math.round(Rand * Range); //四舍五入
  return num;
}
// 随机字符串
function randomName(len) {
  len = len || 23;
  var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  var maxPos = chars.length;
  var str = '';
  for (var i = 0; i < len; i++) {
    str += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return new Date().getTime() + str;
}
// 随机颜色值
function buildColor() {
  var color = "#" + Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, "0");
  return color;
}

module.exports = {
  formatWordsYM: formatWordsYM, //文字年月
  formatTime: formatTime, // '/'年月日时分秒
  formatTimeDay: formatTimeDay, // '-'年月日
  formatSpotTimeDay: formatSpotTimeDay, // '.'年月日
  formatSpotDayHourMinute: formatSpotDayHourMinute, //'.'年月日时分
  formatWordsDay: formatWordsDay, //文字年月日
  formatWordsYD: formatWordsYD,
  formatTimeMinute: formatTimeMinute, // '-'年月日时分
  formatWordsTimeMinute: formatWordsTimeMinute, //文字年月日时分
  formatTimeHourMonth: formatTimeHourMonth, // '-'时分
  formatTimeHours: formatTimeHours, // 转化时间几分钟前 小时前 昨天 多少天前 '-'年月日
  formatHandleDate: formatHandleDate, // 转化时间几分钟前 (今天 昨天 多少天前)+时分 文字年月日时分
  daysBetween: daysBetween, //计算两个日期差
  isPhone: isPhone, //判断手机号是否合法
  isIDcard: isIDcard, //身份证号验证
  formatRichText, //富文本解析
  formatNumber: formatNumber, //日期补0
  toImageBase64: toImageBase64, //本地图片转base64
  getDateStr: getDateStr, //获取距今天几天后的月日
  getWeekDateStr: getWeekDateStr, //获取距今天几天后的星期几
  getfullDateStr: getfullDateStr, ////获取距今天几天后格式化的年月日
  dateChange: dateChange, // 获取多少天后的日期
  RandomNumBoth: RandomNumBoth, //范围内的随机数字
  randomName: randomName, //随机字符串
  buildColor:buildColor,
}
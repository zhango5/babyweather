import {
  parseDateTime
} from '../../utils/util.js';
import config from '../../config/config.js';

Page({
  data: {
    date: '', // 日期
    updateTime: '', // 更新时间
    city: {}, // 城市信息
    weather: {}, // 实时数据
    sun: {}, // 日出日落
    days: {}, // 逐天数据
    indices: {}, // 生活指数
    air: {}, // 空气指数
    daily: {}, // 逐天天气预报
    hours: {}, // 24小时预报
    inputContent: '', // 输入框内容
  },

  localCity: null, // 本地城市

  onLoad(options) {
    this.updateTime(); // 设置时间


    let hoursdata = new Array;
    hoursdata.push({
      "fxTime": "15:00",
      "temp": "2",
      "icon": "100",
      "text": "晴",
      "wind360": "335",
      "windDir": "西北风",
      "windScale": "3-4",
      "windSpeed": "20",
      "humidity": "11",
      "pop": "0",
      "precip": "0.0",
      "pressure": "1025",
      "cloud": "0",
      "dew": "-25"
    });
    hoursdata.push({
      "fxTime": "16:00",
      "temp": "1",
      "icon": "100",
      "text": "晴",
      "wind360": "339",
      "windDir": "西北风",
      "windScale": "3-4",
      "windSpeed": "24",
      "humidity": "11",
      "pop": "0",
      "precip": "0.0",
      "pressure": "1025",
      "cloud": "0",
      "dew": "-26"
    });
    hoursdata.push({
      "fxTime": "17:00",
      "temp": "0",
      "icon": "100",
      "text": "晴",
      "wind360": "341",
      "windDir": "西北风",
      "windScale": "4-5",
      "windSpeed": "25",
      "humidity": "11",
      "pop": "0",
      "precip": "0.0",
      "pressure": "1026",
      "cloud": "0",
      "dew": "-26"
    });
    hoursdata.push({
      "fxTime": "18:00",
      "temp": "0",
      "icon": "150",
      "text": "晴",
      "wind360": "344",
      "windDir": "西北风",
      "windScale": "4-5",
      "windSpeed": "25",
      "humidity": "12",
      "pop": "0",
      "precip": "0.0",
      "pressure": "1025",
      "cloud": "0",
      "dew": "-27"
    });
    hoursdata.push({
      "fxTime": "19:00",
      "temp": "-2",
      "icon": "150",
      "text": "晴",
      "wind360": "349",
      "windDir": "西北风",
      "windScale": "3-4",
      "windSpeed": "24",
      "humidity": "13",
      "pop": "0",
      "precip": "0.0",
      "pressure": "1025",
      "cloud": "0",
      "dew": "-27"
    });
    hoursdata.push({
      "fxTime": "20:00",
      "temp": "-3",
      "icon": "150",
      "text": "晴",
      "wind360": "353",
      "windDir": "北风",
      "windScale": "3-4",
      "windSpeed": "22",
      "humidity": "14",
      "pop": "0",
      "precip": "0.0",
      "pressure": "1025",
      "cloud": "0",
      "dew": "-27"
    });
    hoursdata.push({
      "fxTime": "21:00",
      "temp": "-3",
      "icon": "150",
      "text": "晴",
      "wind360": "355",
      "windDir": "北风",
      "windScale": "3-4",
      "windSpeed": "20",
      "humidity": "14",
      "pop": "0",
      "precip": "0.0",
      "pressure": "1026",
      "cloud": "0",
      "dew": "-27"
    });
    hoursdata.push({
      "fxTime": "22:00",
      "temp": "-4",
      "icon": "150",
      "text": "晴",
      "wind360": "356",
      "windDir": "北风",
      "windScale": "3-4",
      "windSpeed": "18",
      "humidity": "16",
      "pop": "0",
      "precip": "0.0",
      "pressure": "1026",
      "cloud": "0",
      "dew": "-27"
    });
    hoursdata.push({
      "fxTime": "23:00",
      "temp": "-4",
      "icon": "150",
      "text": "晴",
      "wind360": "356",
      "windDir": "北风",
      "windScale": "3-4",
      "windSpeed": "18",
      "humidity": "16",
      "pop": "0",
      "precip": "0.0",
      "pressure": "1026",
      "cloud": "0",
      "dew": "-27"
    });
    hoursdata.push({
      "fxTime": "00:00",
      "temp": "-4",
      "icon": "150",
      "text": "晴",
      "wind360": "354",
      "windDir": "北风",
      "windScale": "3-4",
      "windSpeed": "16",
      "humidity": "16",
      "pop": "0",
      "precip": "0.0",
      "pressure": "1027",
      "cloud": "0",
      "dew": "-27"
    });
    hoursdata.push({
      "fxTime": "01:00",
      "temp": "-4",
      "icon": "150",
      "text": "晴",
      "wind360": "351",
      "windDir": "北风",
      "windScale": "3-4",
      "windSpeed": "16",
      "humidity": "16",
      "pop": "0",
      "precip": "0.0",
      "pressure": "1028",
      "cloud": "0",
      "dew": "-27"
    });
    hoursdata.push({
      "fxTime": "02:00",
      "temp": "-4",
      "icon": "150",
      "text": "晴",
      "wind360": "350",
      "windDir": "北风",
      "windScale": "3-4",
      "windSpeed": "16",
      "humidity": "16",
      "pop": "0",
      "precip": "0.0",
      "pressure": "1028",
      "cloud": "0",
      "dew": "-27"
    });
    hoursdata.push({
      "fxTime": "03:00",
      "temp": "-5",
      "icon": "150",
      "text": "晴",
      "wind360": "350",
      "windDir": "北风",
      "windScale": "3-4",
      "windSpeed": "16",
      "humidity": "16",
      "pop": "0",
      "precip": "0.0",
      "pressure": "1028",
      "cloud": "0",
      "dew": "-27"
    });
    hoursdata.push({
      "fxTime": "04:00",
      "temp": "-5",
      "icon": "150",
      "text": "晴",
      "wind360": "351",
      "windDir": "北风",
      "windScale": "3-4",
      "windSpeed": "16",
      "humidity": "15",
      "pop": "0",
      "precip": "0.0",
      "pressure": "1027",
      "cloud": "0",
      "dew": "-28"
    });
    hoursdata.push({
      "fxTime": "05:00",
      "temp": "-5",
      "icon": "150",
      "text": "晴",
      "wind360": "352",
      "windDir": "北风",
      "windScale": "3-4",
      "windSpeed": "16",
      "humidity": "14",
      "pop": "0",
      "precip": "0.0",
      "pressure": "1026",
      "cloud": "0",
      "dew": "-29"
    });
    hoursdata.push({
      "fxTime": "06:00",
      "temp": "-5",
      "icon": "150",
      "text": "晴",
      "wind360": "355",
      "windDir": "北风",
      "windScale": "3-4",
      "windSpeed": "14",
      "humidity": "16",
      "pop": "0",
      "precip": "0.0",
      "pressure": "1025",
      "cloud": "0",
      "dew": "-27"
    });
    hoursdata.push({
      "fxTime": "07:00",
      "temp": "-7",
      "icon": "150",
      "text": "晴",
      "wind360": "359",
      "windDir": "北风",
      "windScale": "3-4",
      "windSpeed": "16",
      "humidity": "20",
      "pop": "0",
      "precip": "0.0",
      "pressure": "1024",
      "cloud": "0",
      "dew": "-26"
    });
    hoursdata.push({
      "fxTime": "08:00",
      "temp": "-5",
      "icon": "100",
      "text": "晴",
      "wind360": "1",
      "windDir": "北风",
      "windScale": "3-4",
      "windSpeed": "14",
      "humidity": "19",
      "pop": "0",
      "precip": "0.0",
      "pressure": "1023",
      "cloud": "0",
      "dew": "-26"
    });
    hoursdata.push({
      "fxTime": "09:00",
      "temp": "-4",
      "icon": "100",
      "text": "晴",
      "wind360": "356",
      "windDir": "北风",
      "windScale": "3-4",
      "windSpeed": "14",
      "humidity": "17",
      "pop": "0",
      "precip": "0.0",
      "pressure": "1023",
      "cloud": "0",
      "dew": "-25"
    });
    hoursdata.push({
      "fxTime": "10:00",
      "temp": "-1",
      "icon": "100",
      "text": "晴",
      "wind360": "344",
      "windDir": "西北风",
      "windScale": "3-4",
      "windSpeed": "14",
      "humidity": "14",
      "pop": "0",
      "precip": "0.0",
      "pressure": "1024",
      "cloud": "0",
      "dew": "-26"
    });
    hoursdata.push({
      "fxTime": "11:00",
      "temp": "0",
      "icon": "100",
      "text": "晴",
      "wind360": "333",
      "windDir": "西北风",
      "windScale": "3-4",
      "windSpeed": "14",
      "humidity": "12",
      "pop": "0",
      "precip": "0.0",
      "pressure": "1024",
      "cloud": "0",
      "dew": "-26"
    });
    hoursdata.push({
      "fxTime": "12:00",
      "temp": "1",
      "icon": "100",
      "text": "晴",
      "wind360": "325",
      "windDir": "西北风",
      "windScale": "3-4",
      "windSpeed": "14",
      "humidity": "10",
      "pop": "0",
      "precip": "0.0",
      "pressure": "1025",
      "cloud": "16",
      "dew": "-28"
    });
    hoursdata.push({
      "fxTime": "13:00",
      "temp": "2",
      "icon": "100",
      "text": "晴",
      "wind360": "319",
      "windDir": "西北风",
      "windScale": "3-4",
      "windSpeed": "16",
      "humidity": "8",
      "pop": "0",
      "precip": "0.0",
      "pressure": "1025",
      "cloud": "32",
      "dew": "-29"
    });
    hoursdata.push({
      "fxTime": "14:00",
      "temp": "2",
      "icon": "100",
      "text": "晴",
      "wind360": "313",
      "windDir": "西北风",
      "windScale": "3-4",
      "windSpeed": "16",
      "humidity": "9",
      "pop": "0",
      "precip": "0.0",
      "pressure": "1025",
      "cloud": "48",
      "dew": "-27"
    });

    this.setData({
      hours: hoursdata
    });

    // return;
    // 获取天气
    if (options.city) {
      this.getWeatherByName(options.city);
    } else {
      // 根据定位获取天气
      this.getWeatherByLocation();
    }
  },

  /**
   * 更新时间
   */
  updateTime() {
    this.setData({
      date: parseDateTime(new Date, "yyyy-MM-dd")
    }); // 保存
  },

  /**
   * 获取当前城市天气数据
   */
  getWeatherByLocation() {
    wx.showToast({
      title: '正在定位...',
      icon: 'loading',
      duration: 2000000,
    });
    // 获取当前经纬度
    wx.getLocation({
      success: (res) => {
        this.getCityByLocation(res.latitude, res.longitude);
      },
      fail: () => {
        wx.hideToast();
        wx.showModal({
          title: '定位失败',
          content: '获取不到本地天气了呢！',
          showCancel: false,
        });
      }
    });
  },

  /**
   * 通过经纬度查询城市信息
   * @param {*} lat 
   * @param {*} lng 
   */
  getCityByLocation(lat, lng) {
    wx.request({
      url: config.request.cityinfo,
      data: {
        key: config.request.key,
        location: lng + ',' + lat
      },
      success: (res) => {
        // 保存城市数据
        this.setData({
          city: res.data.location[0]
        });
        this.getWeatherInfos();
      },
      fail: (err) => {
        wx.hideToast()
        wx.showModal({
          title: err,
          content: '查询城市信息失败！',
          showCancel: false
        });
      }
    });
  },

  /**
   * 通过经纬度查询天气
   * @param {number} latitude 纬度
   * @param {number} longitude 经度
   */
  searchByLocation() {
    // 更新时间
    this.updateTime();
    wx.showToast({
      title: '正在查询...',
      icon: 'loading',
      duration: 2000000
    });
    // 通过经纬度获取天气数据
    wx.request({
      url: `${config.request.realtime}`,
      data: {
        key: config.request.key,
        location: this.data.city.id
      },
      success: (res) => {
        // 保存天气数据
        this.setData({
          weather: res.data.now,
          updateTime: parseDateTime(new Date(res.data.now.obsTime), "HH:mm")
        });
        wx.hideToast();
      },
      fail: (err) => {
        wx.hideToast();
        wx.showModal({
          title: err,
          content: '获取实时天气数据失败！',
          showCancel: false
        });
      }
    });
  },

  /**
   * 通过经纬度查询城市日出日落信息
   * @param {*} lat 
   * @param {*} lng 
   */
  getSunTime() {
    wx.request({
      url: `${config.request.sun}`,
      data: {
        key: config.request.key,
        location: this.data.city.id,
        date: parseDateTime(new Date, 'yyyyMMdd')
      },
      success: (res) => {
        var sun = {
          sunrise: parseDateTime(new Date(res.data.sunrise), 'HH:mm'),
          sunset: parseDateTime(new Date(res.data.sunset), 'HH:mm')
        }
        // 保存数据
        this.setData({
          sun: sun
        });
      },
      fail: (err) => {
        wx.hideToast()
        wx.showModal({
          title: err,
          content: '获取日出日落时刻失败！',
          showCancel: false
        });
      }
    });
  },

  /**
   * 通过经纬度查询城市生活指数信息
   * @param {*} lat 
   * @param {*} lng 
   */
  getCityIndices() {
    wx.request({
      url: `${config.request.indices}`,
      data: {
        key: config.request.key,
        location: this.data.city.id,
        type: "0"
      },
      success: (res) => {
        var indices = new Array
        var i
        for (i in res.data.daily) {
          indices[res.data.daily[i].type] = res.data.daily[i].category
        }
        // 保存数据
        this.setData({
          indices: indices
        });
      },
      fail: (err) => {
        wx.hideToast()
        wx.showModal({
          title: err,
          content: '获取城市生活指数失败！',
          showCancel: false
        });
      }
    });
  },

  /**
   * 通过经纬度查询城市空气指数信息
   * @param {*} lat 
   * @param {*} lng 
   */
  getAir() {
    wx.request({
      url: `${config.request.air}`,
      data: {
        key: config.request.key,
        location: this.data.city.id
      },
      success: (res) => {
        // 保存数据
        this.setData({
          air: res.data.now
        });
      },
      fail: (err) => {
        wx.hideToast()
        wx.showModal({
          title: err,
          content: '获取城市空气指数信息失败！',
          showCancel: false
        });
      }
    });
  },

  /**
   * 通过经纬度查询城市逐天天气预报
   * @param {*} lat 
   * @param {*} lng 
   */
  getDaily() {
    wx.request({
      url: `${config.request.daily}`,
      data: {
        key: config.request.key,
        location: this.data.city.id
      },
      success: (res) => {
        let d = new Array;
        let i;
        for (i in res.data.daily) {
          let info = res.data.daily[i];
          info.fxDate = this.differenceDay(new Date(info.fxDate));
          d.push(info);
        }

        // 保存数据
        this.setData({
          daily: d
        });
      },
      fail: (err) => {
        wx.hideToast()
        wx.showModal({
          title: err,
          content: '获取未来3天天气失败！',
          showCancel: false
        });
      }
    });
  },

  /**
   * 通过城市名查询天气
   * @param {string} city 
   */
  getWeatherByName(city) {
    // 更新时间
    this.updateTime();
    // loading
    wx.showToast({
      title: '正在加载...',
      icon: 'loading',
      duration: 2000000
    });
    // 通过城市名获取天气数据
    wx.request({
      url: `${config.request.cityinfo}`,
      data: {
        key: config.request.key,
        location: city
      },
      success: (res) => {
        wx.hideToast();
        // 保存城市数据
        this.setData({
          city: res.data.location[0]
        });
        this.getWeatherInfos();
      },
      fail: (err) => {
        wx.hideToast()
        wx.showModal({
          title: err,
          content: '查询城市信息失败！',
          showCancel: false
        });
      }
    });
  },

  /**
   * 获取天气信息
   */
  getWeatherInfos() {
    this.searchByLocation();
    this.getSunTime();
    this.getCityIndices();
    this.getAir();
    this.getDaily();
  },

  /**
   * 刷新
   */
  refresh() {
    this.getWeatherByName(this.data.city.name);
  },

  /**
   * 格式化星期数
   * @param {number} index 星期数
   */
  formatWeekday(index) {
    const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六', '周日'];
    return weekdays[index];
  },

  /**
   * 计算日期差值
   * @param {Date} date 日期
   */
  differenceDay(date) {
    let today = new Date();
    let n = date.getDay() - today.getDay();
    switch (n) {
      case -2:
        return "前天";
      case -1:
        return "昨天";
      case 0:
        return "今天";
      case 1:
        return "明天";
      case 2:
        return "后天";
      default:
        return this.formatWeekday(date.getUTCDay());
    }
  },

  /**
   * 清除输入框内容
   */
  clearInputContent() {
    this.setData({
      inputContent: ''
    });
  },

  /**
   * 输入触发函数
   * @param {object} event 事件
   */
  onInputFieldChange(event) {
    // 设置全局变量
    this.setData({
      inputContent: event.detail.value
    });
  },

  /**
   * 点击搜索按钮
   */
  onSearchBtnClick() {
    // 输入是否为空
    if (this.data.inputContent.length > 0) {
      // 调用搜索函数
      this.getWeatherByName(this.data.inputContent);
      // 清空输入
      this.clearInputContent();
    } else {
      wx.showToast({
        title: '请输入要查询的城市！',
        icon: 'none',
        duration: 1000
      });
    }
  },

  /**
   * 点击清除按钮
   */
  onClearBtnClick() {
    this.clearInputContent();
  },

  /**
   * 点击刷新按钮
   */
  onRefreshBtnClick() {
    this.refresh();
  },

  /**
   * 点击定位按钮
   */
  onLocalBtnClick() {
    this.clearInputContent();
    // if (this.localCity) {
    //   this.getWeatherByName(this.localCity);
    // } else {
    this.getWeatherByLocation();
    // }
  },

  /**
   * 下拉刷新
   */
  onPullDownRefresh() {
    this.getWeatherByName(this.data.city.name);
    wx.stopPullDownRefresh();
  },

  /**
   * 分享给朋友
   */
  onShareAppMessage() {
    const city = this.data.city.name;
    const now = this.data.weather;
    return {
      title: `${city}当前天气：${now.text} | ${now.temp}℃`,
      path: `/pages/index/index?city=${city}`,
    };
  },

  /**
   * 分享至朋友圈
   */
  onShareTimeline() {
    const city = this.data.city.name;
    const now = this.data.weather;
    return {
      title: `${city}当前天气：${now.text} | ${now.temp}℃`,
      path: `city=${city}`,
    };
  }

});
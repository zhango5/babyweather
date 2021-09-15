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
    inputContent: '', // 输入框内容
  },

  localCity: null, // 本地城市

  onLoad(options) {
    // this.checkVersion();  // 版本检查
    this.updateTime(); // 设置时间
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
   * 版本检查
   */
  checkVersion() {
    const localVersion = wx.getStorageSync('version');
    if (localVersion !== config.version) {
      wx.showModal({
        title: `${config.name} ${config.version}`,
        content: `${config.versionDate}${config.versionInfo}`,
        showCancel: false,
        confirmText: '我知道了',
        success: (res) => {
          if (res.confirm) {
            // 设置版本号
            wx.setStorage({
              key: 'version',
              data: config.version
            });
          }
        }
      });
    }
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
      fail: () => {
        wx.showModal({
          title: '网络超时',
          content: '连接服务器失败,请检查网络设置！',
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
      fail: () => {
        wx.hideToast();
        wx.showModal({
          title: '网络超时',
          content: '连接服务器失败,请检查网络设置！',
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
  getSunRise() {
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
      fail: () => {
        wx.showModal({
          title: '网络超时',
          content: '连接服务器失败,请检查网络设置！',
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
      fail: () => {
        wx.showModal({
          title: '网络超时',
          content: '连接服务器失败,请检查网络设置！',
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
      fail: () => {
        wx.showModal({
          title: '网络超时',
          content: '连接服务器失败,请检查网络设置！',
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
      fail: () => {
        wx.showModal({
          title: '网络超时',
          content: '连接服务器失败,请检查网络设置！',
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
      fail: () => {
        wx.hideToast()
        wx.showModal({
          title: '网络超时',
          content: '当前网络不可用,请检查网络设置！',
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
    this.getSunRise();
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
        return formatWeekday(date.getUTCDay());
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
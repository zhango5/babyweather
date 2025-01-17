import {
    parseDateTime
} from '../../utils/util.js';
import config from '../../config/config.js';

const weatheraudio = wx.createInnerAudioContext();

Page({
    data: {
        date: '', // 日期
        updateTime: '', // 更新时间
        altitude: '', // 高度
        city: {}, // 城市信息
        weather: {}, // 实时数据
        sun: {}, // 日出日落
        days: {}, // 逐天数据
        indices: {}, // 生活指数
        air: {}, // 空气指数
        daily: {}, // 逐天天气预报
        hours: {}, // 24小时预报
        inputContent: '', // 输入框内容
        audios: [{
                text: '阴',
                path: 'audios/1003.mp3'
            },
            {
                text: '多云',
                path: 'audios/cloud.mp3'
            },
            {
                text: '晴',
                path: 'audios/sunny.mp3'
            },
            {
                text: '雨',
                path: 'audios/1000.mp3'
            },
            {
                text: '小雨',
                path: 'audios/1000.mp3'
            },
            {
                text: '大雨',
                path: 'audios/1000.mp3'
            },
            {
                text: '雪',
                path: 'audios/1916.mp3'
            },
        ],
    },

    localCity: null, // 本地城市

    onLoad(options) {
        this.updateTime(); // 设置时间
        // 获取天气
        if (options.city) {
            console.log(options.city)
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
            isHighAccuracy: false,
            // altitude: true,
            // highAccuracyExpireTime: 10000,
            success: (res) => {
                console.log(res)
                // this.setData({
                //     altitude: res.altitude
                // });
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
                location: lng + ',' + lat,
                range: 'cn'
            },
            success: (res) => {
                // 保存城市数据
                // console.log(res)
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
     * 查询天气
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
                weatheraudio.src = '';
                let i;
                for (i in this.data.audios) {
                    if (this.data.audios[i].text == res.data.now.text) {
                        weatheraudio.src = this.data.audios[i].path;
                        break;
                    }
                }

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
     * 获取未来24小时信息
     */
    getHours() {
        wx.request({
            url: `${config.request.hours}`,
            data: {
                key: config.request.key,
                location: this.data.city.id
            },
            success: (res) => {
                var hourly = new Array;
                var i = 0;
                for (i in res.data.hourly) {
                    let h = res.data.hourly[i];
                    h.fxTime = parseDateTime(new Date(res.data.hourly[i].fxTime), "HH:mm");
                    h.wind360 = res.data.hourly[i].wind360 - 45 + 180; // 减去图片自身45度角，加上180换算风向，0度是北风，但却指向南方，90度是东风，却指向西方

                    if (h.wind360 >= 360) {
                        h.wind360 -= 360;
                    }
                    hourly.push(h);
                }

                // 保存数据
                this.setData({
                    hours: hourly
                });
            },
            fail: (err) => {
                wx.hideToast()
                wx.showModal({
                    title: err,
                    content: '获取未来24小时信息失败！',
                    showCancel: false
                });
            }
        });
    },

    /**
     * 度查询城市日出日落信息
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
     * 查询城市生活指数信息
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
     * 查询城市空气指数信息
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
     * 查询城市逐天天气预报
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
                console.log(res)
                if (res.data.location == undefined) {
                    return
                }
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
        this.getHours();
        this.getDaily();
        this.getSunTime();
        this.getCityIndices();
        this.getAir();
    },

    /**
     * 计算地区显示名称
     */
    getLocationName(city) {
        let name = ""
        if (city.adm2 == city.name) {
            name = city.adm1
        } else if (city.adm1 == city.adm2 + '市') {
            name = city.adm1 + " " + city.name + "区"
        } else {
            name = city.adm1 + " " + city.adm2 + "市 " + city.name + "区"
        }

        return name
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
            // case -2:
            //   return "前天";
            // case -1:
            //   return "昨天";
            case 0:
                return "今天";
            case 1:
                return "明天";
            case 2:
                return "后天";
            default:
                if (n < 0) {
                    n = 7 - n;
                }
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
        const city = this.getLocationName(this.data.city);
        const now = this.data.weather;
        return {
            title: `${city}当前天气：${now.text} | ${now.temp}℃`,
            path: `/pages/index/index?city=${this.data.city.name}`,
        };
    },

    /**
     * 分享至朋友圈
     */
    onShareTimeline() {
        const city = this.getLocationName(this.data.city);
        const now = this.data.weather;
        return {
            title: `${city}当前天气：${now.text} | ${now.temp}℃`,
            path: `city=${this.data.city.name}`,
        };
    },

    /**
     * 
     */
    broadcastWeather() {
        weatheraudio.play();
    }
});
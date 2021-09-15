const config = {
  name: '宝贝天气',
  version: '1.0.0',
  versionDate: '2021-09-9',
  versionInfo: '',
  request: {
    cityinfo: 'https://geoapi.qweather.com/v2/city/lookup',
    realtime: 'https://devapi.qweather.com/v7/weather/now',
    sun: 'https://devapi.qweather.com/v7/astronomy/sun',
    indices: 'https://devapi.qweather.com/v7/indices/1d',
    air: 'https://devapi.qweather.com/v7/air/now',
    daily: 'https://devapi.qweather.com/v7/weather/3d',
    key: 'a0676be9fd74407cb1b34cba1cf8ac68',
  },
}

export default config;

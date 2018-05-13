//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    banner: {
      indicatorDots: false,
      autoplay: false,
      interval: 5000,
      duration: 1000,
      imgUrls: [
        'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
        'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
      ]
    },
    tip: {
      cookieQuantity: 123,
      quantity: 100
    },
    category: [
      {
        name: '动植物',
        value: 1
      },
      {
        name: '动植物',
        value: 2
      },
      {
        name: '动植物',
        value: 3
      },
      {
        name: '动植物',
        value: 4
      },
      {
        name: '动植物',
        value: 5
      },
      {
        name: '动植物',
        value: 6
      },
      {
        name: '动植物',
        value: 7
      },
      {
        name: '动植物',
        value: 8
      },
    ],
    goods: [
      {
        headImage: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: "臭臭",
        city: "北京市",
        goodsImage: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        intro: "苏泊尔榨汁机家用果汁机",
        eggQuantity: "250",
        time: "三天前"
      },
      {
        headImage: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: "臭臭",
        city: "北京市",
        goodsImage: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        intro: "苏泊尔榨汁机家用果汁机",
        eggQuantity: "250",
        time: "三天前"
      },
      {
        headImage: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: "臭臭",
        city: "北京市",
        goodsImage: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        intro: "苏泊尔榨汁机家用果汁机",
        eggQuantity: "250",
        time: "三天前"
      },
      {
        headImage: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: "臭臭",
        city: "北京市",
        goodsImage: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        intro: "苏泊尔榨汁机家用果汁机",
        eggQuantity: "250",
        time: "三天前"
      },
      {
        headImage: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: "臭臭",
        city: "北京市",
        goodsImage: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        intro: "苏泊尔榨汁机家用果汁机",
        eggQuantity: "250",
        time: "三天前"
      },
      {
        headImage: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        name: "臭臭",
        city: "北京市",
        goodsImage: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        intro: "苏泊尔榨汁机家用果汁机",
        eggQuantity: "250",
        time: "三天前"
      },
    ]

  },
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  }
})

//index.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util.js')
Page({
  data: {
    banner: {
      indicatorDots: true,
      autoplay: true,
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
    category: [],
    goods: []

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
  },
  getCategory: function () {
    var that = this;
    return util.http.get("/api/Product/GetCategory")
      .then(function (data) {
        that.setData({
          category: data
        });
      }, function (res) {
        wx.showToast({
          title: '加载分类失败',
        })
      })
  },
  getProduct:function(){
    var that=this;
    util.http.get("/api/Product/GetProductList")
    .then(function(data){
      that.setData({
        goods:data
      });
    })
  },
  onLoad: function () {
    this.getCategory();
    this.getProduct();
  }
})

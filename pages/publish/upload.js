// pages/publish/upload.js
var app = getApp();
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "",
    description: "",
    images: [],
    isNew: true,
    category: [],
    categoryId: null,
    price: null,
    address: null,
    contectId: null
  },
  onSelectFile: function (e) {
    var self = this;
    console.log(this.data.images.length);
    wx.chooseImage({
      success: function (res) {
        var imgArr = [];
        self.setData({
          images: self.data.images.concat(res.tempFiles)
        });
        var i = 0;
        self.data.images.map(function (t) {
          t.index = i++;
        })
      },
    })
  },
  onPublish: function (e) {
    var that = this;
    console.log("开始上传图片")
    wx.showLoading({ "title": "上传图片中" })
    this.uploadImage().then(() => {
      wx.hideLoading();
      var formData = e.detail.value;
      formData.images = this.data.images.map(function (t) {
        return t.url;
      })
      console.log("地址编号为:" + that.data.contectId);
      util.http.post("/api/Product/Publish", formData)
        .then((data) => {
          wx.hideLoading();
          wx.navigateTo({
            url: '/pages/publish/uploadSuccess?id=' + data,
          })
        }, () => {
          wx.showToast({
            title: '发布失败,请重新尝试.',
          })
        })
    })
  },
  getSign: function (callback) {
    return util.http.get("/api/Oss/GetSign")
      .then((data) => {
        wx.setStorageSync("sign", data);
        return data;
      }, (err) => {
        console.log("获取oss签名失败");
      })
  },
  uploadImage: function () {
    var promise;
    var that = this;
    for (var i = 0; i < this.data.images.length; i++) {
      (function () {
        var image = that.data.images[i];
        var prom = util.http.uploadImage(that, image);
        promise = promise ? promise.then(prom) : prom;
      })()
    }
    return promise;
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
  onCategoryPickerChange: function (e) {
    console.log('选择分类值为:', e.detail.value)
    this.setData({ categoryId: e.detail.value })

  },
  onLoadPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({ loadIndex: e.detail.value })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCategory();
    this.getSign();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
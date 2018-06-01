// pages/publish/upload.js
var app = getApp();
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    product:null,
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
  chooseImage: function (e) {
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
  previewImage:function(e){
    wx.previewImage({
      current:e.target.id,
      urls: this.data.images,
    })
  },
  onPublish: function (e) {
    var that = this;
    var formData = e.detail.value;
    if (!formData.name) {
      wx.showToast({
        title: '名称不能为空',
      })
      return;
    }
    if (!formData.description) {
      wx.showToast({
        title: '简介不能为空',
      })
      return;
    }
    if (!formData.productCategory) {
      wx.showToast({
        title: '请选择分类',
      })
      return;
    }
    if (!formData.price) {
      wx.showToast({
        title: '请输入价格',
      })
      return;
    }
    if (!formData.contectId) {
      wx.showToast({
        title: '选择发货地址',
      })
      return;
    }


    wx.showLoading({ "title": "上传图片中" })
    this.uploadImage()
      .then(list => {
        // if (list.length <= 0) {
        //   wx.showToast({
        //     title: '必须上传图片',
        //   })
        //   return;
        // }
        console.log(list)
        wx.hideToast();
        formData.images = list;
        return util.http.post("/api/Product/Publish", formData);
      })
      .then((data) => {
        wx.redirectTo({
          url: '/pages/publish/uploadSuccess?id=' + data,
        })
      }, () => {
        wx.showToast({
          title: '发布失败,请重新尝试.',
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
    var promises = new Array();
    var that = this;
    for (var i = 0; i < this.data.images.length; i++) {
      (function () {
        var image = that.data.images[i];
        promises.push(util.http.uploadImage(that, image));
      })()
    }
    return Promise.all(promises)
  },
  getProductDetails: function (id) {
    var that = this;
    util.http.get("/api/Product/GetProductDetails?id=" + id)
      .then(function (data) {
        that.setData({
          product: data
        })
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
    if(options.id){
      this.getProductDetails(options.id);
    }
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
    if (options.id) {
      this.getProductDetails(options.id);
    }
    this.getCategory();
    this.getSign();
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
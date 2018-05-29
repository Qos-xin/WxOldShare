// pages/index/placeAnOrder.js
const util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    product: null,
    address: null,
    appUser: null,
  },
  /**
   * 下单
   */
  placeAnOrder: function () {
    var that = this;
    if(this.data.address==null){
      wx.showToast({
        title: '请选择收货地址',
      })
      return;
    }
    var formData = {
      productId: this.data.product.id,
      contectId: this.data.address.id
    }
    util.http.post("/api/Order/PlaceAnOrder", formData)
      .then(data => {
        wx.redirectTo({
          url: '/pages/index/placeAnOrderSuccess',
        })
      })
  },
  /**
   * 获取产品详情
   */
  getProductDetails: function (id) {
    var that = this;
    util.http.get("/api/Product/GetProductDetails?id=" + id)
      .then(function (data) {
        that.setData({
          product: data
        })
      })
  },
  /**
   * 获取用户信息
   */
  getAppUser: function () {
    var that = this;
    util.http.get("/api/User/GetAppUser")
      .then(data => {
        that.setData({
          appUser:data
        })

      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getProductDetails(options.id)
    this.getAppUser();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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
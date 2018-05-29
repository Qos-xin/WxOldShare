// pages/my/myPublish.js
const util = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeTap: "on",
    publish: []
  },
  getProduct: function (productState) {
    return util.http.get("/api/Product/GetUserProductList?productState=" + productState);
  },
  tapName: function (event) {
    var that = this;
    this.setData({
      activeTap: event.target.id
    })
    var state = event.target.id == 'on' ? 3 : 1
    this.getProduct(state)
      .then(function (list) {
        that.setData({
          publish: list
        })
      })

  },
  onDown: function (e) {
    var that = this;
    var id = e.target.dataset.id;
    util.http.get("/api/Product/ChangeProductState?productState=1&id=" + id)
      .then(function (data) {
        return that.getProduct(3)
      })
      .then(function (list) {
        that.setData({
          publish: list
        })
        wx.showToast({
          title: '下架成功',
        })
      })
  },
  onUp: function (e) {
    var that=this;
    var id = e.target.dataset.id;
    util.http.get("/api/Product/ChangeProductState?productState=3&id=" + id)
      .then(function (data) {
        return that.getProduct(1)
      })
      .then(function (list) {
        that.setData({
          publish: list
        })
        wx.showToast({
          title: '上架成功',
        })
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.getProduct(3)
      .then(function (list) {
        that.setData({
          publish: list
        })
      })

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
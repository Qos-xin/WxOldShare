// pages/my/myReceive.js
const util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: []
  },
  onConfirmReceipt: function (e) {
    var that = this;
    var id = e.target.id;
    wx.showModal({
      title: '确认收货提醒',
      content: '你确定要确认收货吗?',
      success: function (res) {
        if (res.confirm) {
          util.http.post("/api/Order/ConfirmReceipt?id=" + id)
            .then(data => {
              return that.getReceive();
            }).then(data => {
              wx.showToast({
                title: '确认收货成功!',
              })
            })
        }
      }
    })
  },
  getReceive() {
    var that = this;
    util.http.get("/api/Order/GetMyReceive")
      .then(function (data) {
        that.setData({
          order: data
        })
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getReceive();
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
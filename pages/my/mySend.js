// pages/my/mySend.js
const util = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: []
  },
  onConfirmSend: function (e) {
    var that = this;
    var id = e.target.id;
    wx.showModal({
      title: '发货提醒',
      content: '你确定要发货吗?',
      success: function (res) {
        if (res.confirm) {
          util.http.post("/api/Order/DeliverGoods?id=" + id)
            .then(data => {
              return that.getMySend();
            }).then(data => {
              wx.showToast({
                title: '发货成功!',
              })
            })
        }
      }
    })
  },
  getMySend() {
    var that = this;
    util.http.get("/api/Order/GetMySend")
      .then(data => {
        that.setData({
          order: data
        })
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMySend();
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
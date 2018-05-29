// pages/index/details.js
const util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner: {
      indicatorDots: true,
      autoplay: true,
      interval: 5000,
      duration: 1000,
    },
    product: null,
    comment: null,
    commentContent:""
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
  getComment: function (id) {
    var that = this;
    util.http.get("/api/Product/GetMessage?id=" + id)
      .then(function (data) {
        that.setData({
          comment: data
        })
      })
  },
  postComment: function (e) {
    var that = this;
    var pid = this.data.product.id;
    var comment = e.detail.value.comment;
    if(comment&&comment!="")
    {
    util.http.post("/api/Product/Comment?id=" + pid, comment)
      .then(data => {
        that.setData({
          commentContent:""
        });
        that.getComment(pid);
        wx.showToast({
          title: '评论成功',
        }, data => {
          wx.showToast({
            title: '评论失败',
          })
        })
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getProductDetails(options.id);
    this.getComment(options.id);
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
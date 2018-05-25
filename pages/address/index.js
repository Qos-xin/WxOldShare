// pages/address/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: []
  },

  onGetAddress: function () {
    wx.showLoading({
      title: '正在获取地址...',
    })
    var self = this;
    wx.request({
      url: 'http://os.qos.xin/api/User/GetContect',
      header: {
        Authorization: wx.getStorageSync('token')
      },
      success: function (res) {
        if (res.data.code == 0) {
          self.setData({
            address: res.data.result
          })
        }
      }, fail: function (res) {

      }, complete: function (res) {
        wx.hideLoading()
      }
    })
  },
  onSelectAddress:function(event){
    var self=this;
    var id=event.target.id;
    wx.navigateBack({
      delta:-1,
    })
  },
  onDeleteAddress: function (event) {
    var self = this;
    var id = event.target.id
    wx.showLoading({
      title: '正在删除...',
    })
    wx.request({
      method: "POST",
      url: 'http://os.qos.xin/api/User/DeleteContect/' + id,
      header: {
        Authorization: wx.getStorageSync('token')
      },
      success: function (res) {
        if (res.data.code == 0) {
          wx.showToast({ "title": "删除成功" });
          self.onGetAddress();
        }
      }, fail: function (res) {

      }, complete: function (res) {
        wx.hideLoading();
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.onGetAddress()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.onGetAddress()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.onGetAddress()
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
// pages/publish/upload.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: [],
    address: null,
    array: [
      { name: "奶粉", val: 1 },
      { name: "玩具", val: 2 }
    ],
    index: 0,

    loadArray: [
      "1kg以下",
      "1-2kg",
      "2-3kg"
    ],
    loadIndex: 0,

  },
  selectFile: function (e) {
    var self=this;
    console.log(this.data.images.length);
    wx.chooseImage({
      success: function (res) {
        self.setData({
          images:self.data.images.concat(res.tempFilePaths)
        });
      },
    })
  },
  onPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({ index: e.detail.value })

  },
  onLoadPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({ loadIndex: e.detail.value })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
// pages/address/add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "",
    phone: "",
    address: ""
  },
  saveContect: function (event) {
    var token = wx.getStorageSync("token")
    wx.request({
      url: 'http://os.qos.xin/api/User/AddContect',
      data: {
        name: this.data.name,
        phone: this.data.phone,
        address: this.data.address
      },
      method: "POST",
      header: {
        "Authorization": token
      },
      success: function (data) {
        if (data.data.errCode == 0) {
          wx.showToast({
            title: '添加成功',
            icon: "success"
          });
          wx.navigateBack({
            delta: 1
          })
        }
      }
    })

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
// pages/publish/upload.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:"",
    description:"",
    images: [],
    isNew:true,    
    category: [
      { name: "奶粉", val: 1 },
      { name: "玩具", val: 2 }
    ],
    categoryId: 0,
    price:0,
    address: null,
  },
  onSelectFile: function (e) {
    var self = this;
    console.log(this.data.images.length);
    wx.chooseImage({
      success: function (res) {
        self.setData({
          images: self.data.images.concat(res.tempFilePaths)
        });
      },
    })
  },
  onPublish: function (e) {
    wx.showLoading({ "title": "上传图片中"})
    const uploadTask = wx.uploadFile({
      url: 'http://os.qos.xin/api/file/upload',
      filePath: this.data.images[0],
      name: 'wxUploadFile',
      header:{"Authorization":wx.getStorageSync("token")},
      success: function (res) {
        wx.showToast({"title":"上传成功"});
      },
      fail: function (res) {
        wx.showToast({"title":"上传失败"});
      },
      complete: function (res) {
        console.log("上传完成")
        wx.hideLoading();
      }

    })
    uploadTask.onProgressUpdate((res) => {
      console.log(res.progress);
    });
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
// pages/address/add.js
import { validate, validateRequired } from "../../utils/validate.js"
const util = require("../../utils/util.js")
let self = {}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    submiting: false,
    name:"",
    phone:"",
    address:""
  },
  onSubmit: function (event) {
    validateRequired(['name', 'phone', 'address'], self)
    if ('' === self.data.form.$invalidMsg) {
      console.log('invalid')
    } else {
      console.log('valid')
    }
    var that = this;
    var token = wx.getStorageSync("token");
    var formData = event.detail.value;
    console.log("hah" + JSON.stringify(formData))
    util.http.post("/api/User/AddContect", formData)
      .then(data => {
        wx.showToast({
          title: '添加成功',
          icon: "success"
        });
        wx.navigateBack({
          delta: 1
        })
      })
  },
  validate(e) {
    this.setData({
      [e.currentTarget.dataset.name]: e.detail.value
    })
    validate(e, this)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    self = this
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
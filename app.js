//app.js
App({
  onLogin:function(){
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res.code);
        wx.showLoading({
          title: '正在登陆...',
        })
        wx.request({
          url: 'http://os.qos.xin/api/Account/Login?code=' + res.code,
          success: function (data) {
            if (data.statusCode == 200 && data.data.code == 0) {
              let token = "Bearer " + data.data.result;
              wx.setStorageSync('token', token);
            }
          },
          fail: function (data) {
            wx.showToast({
              title: '登陆失败',
            })
          },
          complete: function (data) {
            wx.hideLoading();
          }
        })
      }
    })
  },
  onLaunch: function () {
    var that=this;
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.checkSession({
      success: function () {
        var token=wx.getStorageSync("token");
        if(!token){
          that.onLogin();
        }
      },
      fail: function () {
        that.onLogin();
      }
    })

    // 获取用户信息
    //  wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  },
  globalData: {
    userInfo: null
  },


})
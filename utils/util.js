const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const GenerateFileName = fileName => {
  var ext = /\.\w{3,4}$/.exec(fileName);
  var date = formatTime(new Date()).split(" ")[0];
  var fileName = "Product/" + date + "/" + new Date().valueOf() + parseInt(Math.random() * 10000000) + ext;
  return fileName;
}


const http = (function () {
  var baseUrl = "https://boss.fcleyuan.com";
  function get(url) {
    url = baseUrl + "/" + url;
    console.log("开始Get请求地址:" + url)
    wx.showLoading({
      title: '加载中...',
    })
    var promise = new Promise((resolve, reject) => {
      var token = wx.getStorageSync("token");
      wx.request({
        url: url,
        header: {
          Authorization: token
        },
        success: function (res) {
          console.log("Get请求完成,地址:" + url + " 数据:" + JSON.stringify(res.data))
          if (res.statusCode == 200) {
            if (res.data.code == 0) {
              resolve(res.data.result);
            } else {
              wx.showToast({
                title: res.data.msg,
              })
            }
          } else if (res.statusCode == 401) {
            wx.removeStorageSync("token");
            wx.showToast({
              title: '未登录',
            })
          } else {
            wx.showToast({
              title: '未知错误',
            })
          }
        },
        fail: function (res) {
          reject(res);
        },
        complete: function () {
          wx.hideLoading();
        }
      })
    });
    return promise;
  }
  function post(url, data) {
    url = baseUrl + "/" + url;
    console.log("开始Post请求地址:" + url)
    var promise = new Promise((resolve, reject) => {
      var token = wx.getStorageSync("token");
      wx.request({
        url: url,
        header: {
          Authorization: token
        },
        method: "POST",
        data: JSON.stringify(data),
        success: function (res) {
          if (res.statusCode == 200) {
            if (res.data.code == 0) {
              resolve(res.data.result);
            } else {
              wx.showModal({
                title: '发生错误',
                content: res.data.msg,
              })
            }
          } else if (res.statusCode == 401) {
            wx.showToast({
              title: '未登录',
            })
          } else {
            wx.showToast({
              title: '未知错误',
            })
          }
        },
        fail: function (res) {
          reject(res);
        },
        complete: function (res) {
          console.log("Post请求完成,地址:" + url)
        }

      })
    });
    return promise;
  }
  function uploadImage(base, image) {
    var that = this;
    var token = wx.getStorageSync("token")
    var promise = new Promise((resolve, reject) => {
      var fileName = GenerateFileName(image.path);
      var host = 'https://boss.fcleyuan.com';
      const uploadTask = wx.uploadFile({
        url: host + "/api/File/Upload",
        filePath: image.path,
        name: 'wxUploadFile',
        header: {
          "Authorization": token,
        },
        success: function (res) {

          if (res.statusCode == 200) {
            res.data = JSON.parse(res.data);
            if (res.data.code == 0) {
              console.log("图片[" + image.index + "]上传成功,后台返回:" + res.data.result);
              resolve(host + "/" + res.data.result);
            }
          }
        },
        fail: function (res) {
          console.lo("图片[" + image.index + "]上传失败")
          reject(res);
        }

      });
      uploadTask.onProgressUpdate((res) => {
        base.data.images[image.index].percent = res.progress;
        console.log("【" + image.index + "】了看法" + base.data.images[image.index].percent)
        base.setData({
          images: base.data.images
        })
      });
    });
    return promise;
  }

  function uploadImageToOSS(base, image) {
    var that = this;
    var sign = wx.getStorageSync("sign");
    var promise = new Promise((resolve, reject) => {
      var fileName = GenerateFileName(image.path);
      var host = 'https://old-share.oss-cn-beijing.aliyuncs.com';
      console.log(image.path);
      const uploadTask = wx.uploadFile({
        url: host,
        filePath: image.path,
        name: 'file',
        formData: {
          key: fileName,
          policy: sign.policy,
          OSSAccessKeyId: sign.ossAccessKeyId,
          success_action_status: "200",
          signature: sign.signature
        },
        success: function (res) {
          if (res.statusCode == 200) {
            base.data.images[image.index].url = host + "/" + fileName;
            console.log(base.data.images[image.index].url)
            resolve(image);
          }
        },
        fail: function (res) {
          reject(res);
        }

      });
      uploadTask.onProgressUpdate((res) => {
        console.log("[" + image.index + "]]" + res.progress);
        base.data.images[image.index].percent = res.progress;
        console.log("【" + image.index + "】了看法" + base.data.images[image.index].percent)
        base.setData({
          images: base.data.images
        })
      });
    });
    return promise;
  }
  return {
    get: function (url) {
      return get(url);
    },
    post: function (url, data) {
      return post(url, data)
    },
    uploadImage: function (base, image) {
      return uploadImage(base, image)
    }
  }
})()




module.exports = {
  GenerateFileName: GenerateFileName,
  formatTime: formatTime,
  http: http
}

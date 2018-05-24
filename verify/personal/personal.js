// verify/personal/personal.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.userInfo);
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
        accredit: 1,
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
          accredit: 1,
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
            accredit: 1,
          })
          console.log(app.globalData.userInfo);
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */

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
  
  },

  
  onGotUserInfo: function (e) {
    var that = this;
    this.setData({
      accredit: 1,
    });
    var userInfos = e.detail.userInfo;
    console.log(userInfos.nickName);
    wx.login({
      success: res => {
        console.log(res);
        code = res.code;
        //  var result = getInterFace.getOpenId(code);
        //  console.log(result);
        getInterFace.getOpenId({
          data: {
            key: app.globalData.key,
            secret_key: app.globalData.secret_key,
            code: code
          },
          success: function (res) {
            app.globalData.openid = JSON.parse(res.data).openid
            wx.setStorage({
              key: "openid",
              data: JSON.parse(res.data).openid
            });
            getInterFace.setInfoCheckUser({
              data: {
                key: app.globalData.key,
                secret_key: app.globalData.secret_key,
                name: userInfos.nickName,
                type: 1,
                headimgurl: userInfos.avatarUrl,
                user_id: app.globalData.openid,
              },
              success: function (res) {
                getInterFace.getInfoCheckUser({
                  data: {
                    key: app.globalData.key,
                    secret_key: app.globalData.secret_key,
                    type: 1,
                    user_id: app.globalData.openid,
                  },
                  success: function (myUserInfo) {
                    wx.setStorage({
                      key: "myUserInfo",
                      data: myUserInfo
                    });
                  }
                });
              }
            });
          }
        });
      }
    })
    app.globalData.userInfo = e.detail.userInfo;
  },
  onShow: function () {
    console.log(app.globalData.userInfo)
    if (app.globalData.userInfo == null) {
      this.setData({
        accredit: 0,
      });
    }else{
      this.setData({
        accredit: 1,
      });
    }
    console.log(app.globalData.userInfo);
  }
})
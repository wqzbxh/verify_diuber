//index.js
//获取应用实例
const app = getApp()
var util = require('../../utils/util.js');
var getInterFace = require('../../utils/getInterFace.js')
var arr = [];
var money = 0;
var code = 0;
var arrStr = '';
var myid = 0
Page({
  data: {
    imgs: ['http://www.diuber.com/images/xcx/idNo2.jpg'],
    imgState:'',
    motto: 'Hello World',
    money: 0, 
    accredit: 0,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  }, 
  onLoad: function () {
    var that = this;
    getInterFace.getInfoCheckItem({
      data: {
        key: app.globalData.key,
        secret_key: app.globalData.secret_key
      },
      success: function (da) {
        console.log(da.data.data);
        that.setData({
          items: da.data.data
        });
      }
    });

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
         accredit: 1
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
          accredit: 1
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
            accredit: 1
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  
  /**
   * 
   */
  checkboxChange: function (e) {
    var that = this;
    money = 0;
    arr = [];
    for (var i = 0; i < e.detail.value.length;i++){

      if (e.detail.value[i]==1){
        money = money + 3;
      } else if (e.detail.value[i] == 2) {
        money = money + 2;
      } else if (e.detail.value[i] == 3) {
        money = money + 1;
      } else if (e.detail.value[i] == 4) {
        money = money + 10;
      } else if (e.detail.value[i] == 5) {
        money = money + 1;
      }
    }
    arr[i] = arr.push(e.detail.value);
    arrStr = arr[0].toString();
    console.log(arrStr);
    that.setData({
      money: money
    });
  }, 
  
  chooseImg: function (e) {
    var that = this;
    var imgs = this.data.imgs;
    if (imgs.length >= 9) {
      this.setData({
        lenMore: 1
      });
      setTimeout(function () {
        that.setData({
          lenMore: 0
        });
      }, 2500);
      return false;
    }
    wx.chooseImage({
      sizeType: ['original', 'compressed'], 
      sourceType: ['album', 'camera'],
      success: function (res) {
        wx.showLoading({
          title: '正在识别中……',
        })
        var tempFilePaths = res.tempFilePaths;
        var imgs = that.data.imgs;
        for (var i = 0; i < tempFilePaths.length; i++) {
          if (imgs.length >= 9) {
            that.setData({
              imgs: imgs
            });
            return false;
          } else {
            var imgState = 1;
            imgs = [];
            imgs.push(tempFilePaths[i]);
          }
        }
        console.log(imgs);
        wx.uploadFile({
          url: 'https://gc.diuber.com/diuber/info_check/idcradfx', //仅为示例，非真实的接口地址
          filePath: imgs[0],
          name: 'file',
          formData: {
            'user': 'test'
          },
          success: function (res) {
            console.log(res)
            console.log(JSON.parse(res.data))
            that.setData({
              id_no: JSON.parse(res.data).info.id_no,
              name: JSON.parse(res.data).info.name,
            });
            if (res) {
              wx.hideLoading()
            }
          }
        })
        that.setData({
          imgState: imgState,
          imgs: imgs
        });
      }
    });
  }, 
  // 删除图片
  deleteImg: function (e) {
    var imgs = this.data.imgs;
    var index = e.currentTarget.dataset.index;
    imgs.splice(index, 1);
    if(imgs == ''){
      imgs = ['http://www.diuber.com/images/xcx/idNo2.jpg'];
    }
    var imgState = '';
    console.log(imgs);
    this.setData({
      imgs: imgs,
      imgState:imgState
    });
  },
  // 预览图片
  previewImg: function (e) {
    //获取当前图片的下标
    var index = e.currentTarget.dataset.index;
    //所有图片
    var imgs = this.data.imgs;
    wx.previewImage({
      //当前显示图片
      current: imgs[index],
      //所有图片
      urls: imgs
    })
  },

  //表单提交
   formSubmit: function (e) {
     wx.getStorage({
       key: 'myUserInfo',
       success: function (data) {
         myid = data.data.data.data.id
       }
     })
    var that = this;
    var userName = util.trim(e.detail.value.userName);
    var idNo = util.trim(e.detail.value.idNo);
    var phone = util.trim(e.detail.value.phone);
    if (userName != '') {
      var userNameResult = util.IsChinese(userName);
      if (userNameResult) {
        if (idNo != '') {
          var idNoResult = util.verifyIdNo(idNo);
          if (idNoResult){
            if (phone != '') {
              var phoneResult = util.verifyPhone(phone);
              if (phoneResult) {
                if (money > 0) {
                  this.setData({
                    btnState: 1
                  });
                  console.log(phone);
                  console.log(userName);
                  console.log(idNo);
                  console.log(arr[0]);
                  console.log(money);
                  console.log('开始请求')
                  wx.getStorage({
                    key: 'openid',
                    success: function (openid) {
                      console.log(openid.data)
                      getInterFace.checkInfoPay({
                        data: {
                          key: app.globalData.key,
                          secret_key: app.globalData.secret_key,
                          checkType: arrStr,
                          openid: openid.data
                        },
                        success: function (res) {
                          console.log(res.data.data);
                          wx.requestPayment({
                            'timeStamp': res.data.data.timeStamp,
                            'nonceStr': res.data.data.nonceStr,
                            'package': res.data.data.package,
                            'signType': 'MD5',
                            'paySign': res.data.data.paySign,
                            'success': function (pay) {

                              getInterFace.infoCheck({
                                data: {
                                  key: app.globalData.key,
                                  secret_key: app.globalData.secret_key,
                                  idNo: idNo,
                                  name: userName,
                                  telephone: phone,
                                  userId: myid,
                                  security_code: res.data.data.security_code
                                },
                                success: function (c) {
                                  wx.showLoading({
                                    title: '核查进行中……',
                                  })
                                  that.setData({
                                    btnState: 1
                                  });
                                  console.log(c.data.data);

                                  console.log(c.data);

                                  if (c.data.code == 1) {
                                    try {
                                      wx.setStorageSync('driver', c.data.data)
                                      wx.navigateTo({
                                        url: '../examineResult/index'
                                      })
                                      wx.hideLoading()
                                    } catch (e) {
                                    }



                                  }
                                }
                              });
                            },
                            'fail': function (res) {

                            }
                          })
                        }
                      })
                    }
                  })

                } else {
                  wx.showModal({
                    title: '请至少选择一种核查条件！',
                    content: '请从下面几种核查条件里面至少选择一种',
                    success: function (res) {
                      if (res.confirm) {
                        console.log('用户点击确定')
                      } else {
                        console.log('用户点击取消')
                      }

                    }
                  })
                }
              } else {
                wx.showModal({
                  title: '手机号码格式错误！',
                  content: '您输入的手机号码格式错误，请您重新填写',
                  success: function (res) {
                    if (res.confirm) {
                      console.log('用户点击确定')
                    } else {
                      console.log('用户点击取消')
                    }

                  }
                })
              }
            } else {
              wx.showModal({
                title: '手机号码不能为空！',
                content: '您好，请您填写非空并且正确的手机号码',
                success: function (res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                  } else {
                    console.log('用户点击取消')
                  }

                }
              })
            }
          }else{
            wx.showModal({
              title: '身份证格式不合法！',
              content: '您输入的身份证格式错误，请您重新填写',
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                } else {
                  console.log('用户点击取消')
                }

              }
            })
          }
         } else {
          wx.showModal({
            title: '身份证号不能为空！',
            content: '您好，请您填写非空并且正确的身份证号码',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else {
                console.log('用户点击取消')
              }

            }
          })
        }
      } else {
        wx.showModal({
          title: '姓名必须为中文',
          content: '您输入的姓名格式错误，请您重新填写',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else {
              console.log('用户点击取消')
            }

          }
        })
      }
    } else {
      wx.showModal({
        title: '姓名不能为空!',
        content: '您好，请您填写非空并且正确的姓名',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else {
            console.log('用户点击取消')
          }

        }
      })
    }
    //提交

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
         btnState: 0,
         accredit: 0,
       });
     }
   },
   onPullDownRefresh: function () {

     wx.showNavigationBarLoading();
     this.setData({
       btnState: 0
     });
     wx.hideNavigationBarLoading();
     wx.stopPullDownRefresh()
   },
  onShareAppMessage: function () {
    return {
      title: '司机核查',
      desc: '最靠谱的网约车租车平台！',
      path: '/verify/examine/index'
    }
  }
})

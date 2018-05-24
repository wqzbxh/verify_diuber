//index.js
//获取应用实例
const app = getApp()
var util = require('../../utils/util.js');
var getInterFace = require('../../utils/getInterFace.js')
var money = 0;
var arr = [];
var code = 0;
var arrStr = ''; 
var myid = 0;
Page({  
  data: {
    imgs: ['http://www.diuber.com/images/xcx/xsz1.jpg'],
    imgState: '',
    motto: 'Hello World',
    money: 0,
    btnState: 0,
    accredit:0,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    items: [
      { name: '6', value: '套牌、假行驶证核查：　　1元/次' },
      { name: '7', value: '自动查询品牌车型信息：　　1元/次' }
    ]
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this;
    
    console.log(that.data.items); 
    getInterFace.getInfoCheckItem({
      data:{
        key: app.globalData.key,
        secret_key: app.globalData.secret_key,
        type: 2,
      },
      success:function(da){
        console.log(da.data.data ); 
       // console.log(JSON.parse(da.data));
        
        that.setData({
          items : da.data.data 
        });
      }
    });
    if (app.globalData.userInfo == null) {
      this.setData({
        accredit: 0,
      });
    }
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
            hasUserInfo: true
          })
          console.log(app.globalData.userInfo);
        }
      })
    }
  
  },

  getUserInfo: function (e) {
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
    for (var i = 0; i < e.detail.value.length; i++) {

      if (e.detail.value[i] == 6) {
        money = money + 1;
      } else if (e.detail.value[i] == 7) {
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
        console.log(res);
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

        wx.uploadFile({
          url: 'https://gc.diuber.com/diuber/info_check/xszcard', //仅为示例，非真实的接口地址
          filePath: imgs[0],
          name: 'file',
          formData: {
            'user': 'test'
          },
          success: function (res) {
            that.setData({
              frame_number: JSON.parse(res.data).info.frame_number,
              license_plate_no: JSON.parse(res.data).info.license_plate_no,
              engine_number: JSON.parse(res.data).info.engine_number
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
    if (imgs == '') {
      imgs = ['https://mail.163.com/dashi/activity/rsact1/actsources/img/1965'];
    }
    var imgState = '';
    console.log(imgs);
    this.setData({
      imgs: imgs,
      imgState: imgState
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
     var carNo = util.trim(e.detail.value.carNo);
     var engine = util.trim(e.detail.value.engine);
     var vin = util.trim(e.detail.value.vin);
     if (carNo != ''){
       var carNoResult = util.verifycarNo(carNo);
       if (carNoResult)
       {
         if (engine != '')
         {
           if (vin !='')
            {
              var vinResult = util.verifyVin(vin);
              if (vinResult)
              {
                if(money > 0){
                  this.setData({
                    btnState:1
                  });
                  console.log(vin);
                  console.log(engine);
                  console.log(carNo);
                  console.log(arrStr);
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
                              console.log()
                              getInterFace.infoCheck({
                                data: {
                                  key: app.globalData.key,
                                  secret_key: app.globalData.secret_key,
                                  vehicleNo: carNo,
                                  engineNo: engine,
                                  vehicleVin: vin,
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
                                    if (c.data.code== 1){
                                      try {
                                        wx.setStorageSync('ecamine', c.data.data);
                                        wx.navigateTo({
                                          url: '../driverResult/index'
                                        })
                                        wx.hideLoading()
                                       } catch (e) {
                                      }


                                    }
                                }
                              });
                            },
                            'fail': function (res) {
                              that.setData({
                                btnState: 0
                              });
                            }
                          })
                        }
                      })
                    }
                  })
                }else{
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
              }else
              {
                wx.showModal({
                  title: '车架号格式错误！',
                  content: '您输入的车架号（VIN）格式错误，请您重新填写',
                  success: function (res) {
                    if (res.confirm) {
                      console.log('用户点击确定')
                    } else {
                      console.log('用户点击取消')
                    }

                  }
                })
              }
            }else
            {
              wx.showModal({
                title: '车架号不能为空！',
                content: '您好，请您填写非空并且正确的车架号码',
                success: function (res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                  } else {
                    console.log('用户点击取消')
                  }

                }
              })
            }
         }else
         {
           wx.showModal({
             title: '发动机号不能为空！',
             content: '您好，请您填写非空并且正确的发动机号码',
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
           title: '车牌号格式有误！',
           content: '您输入的车牌号格式错误，请您重新填写',
           success: function (res) {
             if (res.confirm) {
               console.log('用户点击确定')
             } else {
               console.log('用户点击取消')
             }

           }
         })
       }
     }else
     {
       wx.showModal({
         title: '车牌号不能为空!',
         content: '您好，请您填写非空并且正确的车牌号码',
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


//获取用户信息
   onGotUserInfo:function (e){
     var that  = this;
     this.setData({
       accredit: 1, 
     });
     var userInfos = e.detail.userInfo;
     console.log(userInfos.nickName);
     wx.login({
       success: res => {
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
               data:{
                 key: app.globalData.key,
                 secret_key: app.globalData.secret_key,
                 name: userInfos.nickName,
                 type: 1,
                 headimgurl: userInfos.avatarUrl,
                 user_id: app.globalData.openid,},
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





    //  //首页车型



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
         btnState: 0,
         accredit:1,
       });
     }
     console.log(app.globalData.userInfo);
   },
   /**
  * 用户点击右上角分享
  */
  //  onShareAppMessage: function (res) {
  //    if (res.from === 'button') {
  //      // 来自页面内转发按钮
  //      console.log(res.target)
  //    }
  //    return {
  //      title: '自定义转发标题',
  //      path: '/page/user?id=123'
  //    }
  //    wx.showShareMenu({
  //      withShareTicket: true
  //    })
  //  },
   /**
    * 下拉刷新
    */
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
       title: '车辆核查',
       desc: '最靠谱的网约车租车平台！',
       path: '/verify/driver/index'
     }
   },
   getfocus:function(){
     console.log(112);
   },
   loseblur:function (){

    cosole.log(1111)
   }

})

// verify/examineRecode/index.js
const app = getApp()
var getInterFace = require('../../utils/getInterFace.js');
var page = 0;
var id = 1;
var myid = -1
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recodeList: [
      { id: '1', date: '2018-05-16', name: '王华阳', idNo: '412728199301015075', phone: '13512169551', recodeType :'1' },
      { id: '2', date: '2018-05-16', name: '王海阳', idNo: '412728199301015075', phone: '13512169551', recodeType:'2' }
    ],
    carList: [
      { id: '1', date: '2018-05-16', vin: 'FAS454HSFFSKHFSLD', engine: '412728199301015075', carNo: '沪A88888', recodeType: '1' },
      { id: '2', date: '2018-05-16', vin: 'FAS454HSQWEPAZXCV', engine: '412728199301015075', carNo: '沪A00000', recodeType: '2' }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorage({
      key: 'myUserInfo',
      success: function (data) {
        myid = data.data.data.data.id
      }
    })
    var that = this;
    that.data.id = options.id;
    that.setData({
      id: options.id
    })
    if (options.id == 2)
    {
      
      wx.setNavigationBarTitle({
        title: '车辆核查记录列表'//页面标题为路由参数
      })
      wx.getStorage({
        key: 'openid',
        success: function (openid) {
          getInterFace.getInfoCheckLists({
            data: {
              key: app.globalData.key,
              secret_key: app.globalData.secret_key,
              offset: 0, 
              limit:10,
              user_id: myid,
              info_type:2,
            },
            success:function(carlist){
              console.log(carlist.data.data);
              console.log(openid.data);
              if (carlist.data.code){
                that.setData({
                  carList: carlist.data.data.rows
                })
              }
             }
          });
        },
      })
    } else if (options.id == 1){
      wx.getStorage({
        key: 'openid',
        success: function (openid) {
          getInterFace.getInfoCheckLists({
            data: {
              key: app.globalData.key,
              secret_key: app.globalData.secret_key,
              offset: 0,
              limit: 10,
              user_id: myid,
              info_type: 1,
            },
            success: function (carlist) {
              console.log(carlist.data.data);
              if (carlist.data.code) {
                that.setData({
                  recodeList: carlist.data.data.rows
                })
              }
            }
          });
        },
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
    wx.getStorage({
      key: 'myUserInfo',
      success: function (data) {
        myid = data.data.data.data.id
      }
    })
    wx.showNavigationBarLoading();  
    var that  = this;
    page = 0;
    wx.getStorage({
      key: 'openid',
      success: function (openid) {
        getInterFace.getInfoCheckLists({
          data: {
            key: app.globalData.key,
            secret_key: app.globalData.secret_key,
            offset: 0,
            limit:10,
            user_id: myid,
            info_type: that.data.id,
          },
          success: function (carlist) {
            console.log(carlist.data.data);
            if (carlist.data.code & that.data.id==2) {
              that.setData({
                carList: carlist.data.data.rows
              })
              wx.hideNavigationBarLoading();  
              wx.stopPullDownRefresh()  
            } else if (carlist.data.code & that.data.id == 1){
              that.setData({
                recodeList: carlist.data.data.rows
              })
              wx.hideNavigationBarLoading();
              wx.stopPullDownRefresh() 
            }else{
              wx.hideNavigationBarLoading();  
              wx.stopPullDownRefresh()  
            }
           
          }
        });
      },
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    wx.getStorage({
      key: 'myUserInfo',
      success: function (data) {
        myid = data.data.data.data.id
      }
    })
      var that = this;
      page = page + 10;
      wx.getStorage({
        key: 'openid',
        success: function (openid) {
          getInterFace.getInfoCheckLists({
            data: {
              key: app.globalData.key,
              secret_key: app.globalData.secret_key,
              offset: page,
              limit: 10,
              user_id: myid,
              info_type: that.data.id,
            },
            success: function (carlist) {
              console.log(carlist.data.data);
              if (carlist.data.code & that.data.id == 2) {
                that.setData({
                  carList: that.data.carList.concat(carlist.data.data.rows)
                })
                wx.hideNavigationBarLoading();
                wx.stopPullDownRefresh()
              } else if (carlist.data.code & that.data.id == 1){
                console.log(page);
                console.log(carlist.data.data);
                that.setData({
                  
                  recodeList: that.data.recodeList.concat(carlist.data.data.rows)
                })
              }else {
                wx.hideNavigationBarLoading();
                wx.stopPullDownRefresh()
              }
            }
          });
        },
      })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
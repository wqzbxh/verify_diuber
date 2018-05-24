// verify/detail/detail.js
const app = getApp()
var util = require('../../utils/util.js');
var getInterFace = require('../../utils/getInterFace.js')
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
    var that= this;
    var id = options.id ;
    getInterFace.getInfoCheckInfo({
        data:{
          id: id
        },
        success:function(e){
          console.log(e)
          switch (e.data.data.type) {
            case 1:
                if (e.data.data.data != '') {
                      if (e.data.data.data.verifystatus == 0) {
                        that.setData({
                          type: 1,
                          verifystatus: 0
                        })
                      } else if (e.data.data.data.verifystatus = 1) {
                        that.setData({
                          type: 1,
                          //不一致
                          verifystatus: 1
                        })
                      }
                  } else {
                    that.setData({
                      type: 1,
                      //异常
                      verifystatus: 3
                    })
                  }
              break;
            case 2:
              if (e.data.data.data != '') {
                if (e.data.data.data.verifystatus == 0) {
                  that.setData({
                    type: 2,
                    verifystatus: 0
                  })
                } else if (e.data.data.data.verifystatus = 1) {
                  that.setData({
                    type: 2,
                    //不一致
                    verifystatus: 1
                  })
                }
              } else {
                that.setData({
                  type: 2,
                  //异常
                  verifystatus: 3
                })
              }
              break;
            case 3:
              if (e.data.data.data != '') {
                if (e.data.data.data.list != null ) {
                  console.log(e.data.data.data.list)
                  that.setData({
                    type: 3,
                    loseArray: e.data.data.data.list,
                    verifystatus: 0
                  })
                } else{
                  that.setData({
                    type: 3,
                    //不一致
                    verifystatus: 1
                  })
                }
              } else {
                that.setData({
                  type: 3,
                  //异常
                  verifystatus: 3
                })
              }
              break;
            case 4:
              if (e.data.data.data != '') {
                if (e.data.data.data.res == 1) {
                  that.setData({
                    type: 4,
                    loseArray: e.data.data.data,
                    verifystatus: 0
                  })
                } else if (e.data.data.data.res = 2) {
                  that.setData({
                    type: 4,
                    verifystatus: 1
                  })
                }else{
                  that.setData({
                    type: 4,
                    verifystatus: 1
                  })
                }
              } else {
                that.setData({
                  type: 4,
                  //异常
                  verifystatus: 3
                })
              }
               break;
            case 5:
                if (e.data.data.data !='') {
                  console.log(11); 
                  that.setData({
                    type: 5,
                    badAction: e.data.data.data,
                    verifystatus: 0
                  })
                } else if (e.data.data.data == '') {
                  that.setData({
                    type: 5,
                    verifystatus: 1
                  })
                } else {
                  that.setData({
                    type:5,
                    verifystatus: 1
                  })
                }

              break;
            case 6:
              if (e.data.data.data != '') {
                if (e.data.data.data.verifystatus == 0) {
                  that.setData({
                    type: 6,
                    verifymsg: e.data.data.data.verifymsg,
                    verifystatus: 0
                  })
                } else if (e.data.data.data.verifystatus = 1) {
                  that.setData({
                    type:6,
                    //不一致
                    verifymsg: e.data.data.data.verifymsg,
                    verifystatus: 1
                  })
                }
              } else {
                that.setData({
                  type: 6,
                  //异常
                  verifymsg:"核查异常",
                  verifystatus: 1
                })
              }
              break;
            case 7:
                if (e.data.data.data != '') {
                    that.setData({
                      type: 7,
                        cartype: e.data.data.data.cartype,
                        brand: e.data.data.data.brand,
                        carbody: e.data.data.data.carbody,
                        manufacturer: e.data.data.data.manufacturer,
                        comfuelconsumption: e.data.data.data.comfuelconsumption,
                        displacement: e.data.data.data.displacement,
                        drivemode: e.data.data.data.drivemode,
                        engine: e.data.data.data.engine,
                        environmentalstandards: e.data.data.data.environmentalstandards,
                        fronttiresize: e.data.data.data.fronttiresize,
                        fuelgrade: e.data.data.data.fuelgrade,
                        gearbox: e.data.data.data.gearbox,
                        name: e.data.data.data.name,
                        price: e.data.data.data.price,
                        reartiresize: e.data.data.data.reartiresize,
                        vin: e.data.data.data.vin,
                        yeartype: e.data.data.data.yeartype,
                      verifystatus: 0
                    })
                
                } else {
                  that.setData({
                    type: 7,
                    //异常
                    verifymsg: "核查异常，请检查车架号",
                    verifystatus: 1
                  })
                }
              break;
            default:
             
              break;
          } 
        }
    })

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
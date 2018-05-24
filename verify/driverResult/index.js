// verify/driverResult/index.js
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
    var that = this;
    try {
      var value = wx.getStorageSync('ecamine')
      console.log(value)
      if (value) {
        console.log(value[7]);
        if (value[7] != undefined){
          that.setData({
            brandType: 1,
            cartype: value[7].result.cartype,
            brand: value[7].result.brand,
            carbody: value[7].result.carbody,
            manufacturer: value[7].result.manufacturer,
            comfuelconsumption: value[7].result.comfuelconsumption,
            displacement: value[7].result.displacement,
            drivemode: value[7].result.drivemode,
            engine: value[7].result.engine,
            environmentalstandards: value[7].result.environmentalstandards,
            fronttiresize: value[7].result.fronttiresize,
            fuelgrade: value[7].result.fuelgrade,
            gearbox: value[7].result.gearbox,
            name: value[7].result.name,
            price: value[7].result.price,
            reartiresize: value[7].result.reartiresize,
            vin: value[7].result.vin,
            yeartype: value[7].result.yeartype,
          });
        }else{
          that.setData({
            brandType: 0, 
          });
        } 
        console
        if (value[6] != undefined) {
          that.setData({
            verifymsg: value[6].result.verifymsg,
            verifystatus: value[6].result.verifystatus,
          });
        } else {
          that.setData({
            plateType: 0,
          });
        }
      }
    } catch (e) {
      
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
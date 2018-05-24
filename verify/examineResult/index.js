// verify/examineResult/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statues:2,
    loseArray: [
      { id: '1', date: '2018-05-16', controlNo: '法院文书编号110-1213', content: '被告人张三伙同罪犯李四、王二，持砍刀、铁管等物窜至调皮乡捣蛋村麻子的小卖部，无故将麻子打成轻微伤，并小卖部内设施、物品等砸毁' },
      { id: '2', date: '2018-04-16', controlNo: '法院文书编号110-1553', content: '被告人张三伙同罪犯李四、王二，持砍刀、铁管等物窜至调皮乡捣蛋村麻子的小卖部，无故将麻子打成轻微伤，并小卖部内设施、物品等砸毁' }
    ],
    badAction: [
      { id: '1', date: '2018-05-16', controlNo: '法院文书编号110-1213', content: '被告人张三伙同罪犯李四、王二，持砍刀、铁管等物窜至调皮乡捣蛋村麻子的小卖部，无故将麻子打成轻微伤，并小卖部内设施、物品等砸毁' },
      { id: '2', date: '2018-04-16', controlNo: '法院文书编号110-1553', content: '被告人张三伙同罪犯李四、王二，持砍刀、铁管等物窜至调皮乡捣蛋村麻子的小卖部，无故将麻子打成轻微伤，并小卖部内设施、物品等砸毁' }
    ],
    blackList: [
      { id: '1', date: '2018-05-16', controlNo: '法院文书编号110-1213', content: '被告人张三伙同罪犯李四、王二，持砍刀、铁管等物窜至调皮乡捣蛋村麻子的小卖部，无故将麻子打成轻微伤，并小卖部内设施、物品等砸毁' },
      { id: '2', date: '2018-04-16', controlNo: '法院文书编号110-1553', content: '被告人张三伙同罪犯李四、王二，持砍刀、铁管等物窜至调皮乡捣蛋村麻子的小卖部，无故将麻子打成轻微伤，并小卖部内设施、物品等砸毁' }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    try {
      var value = wx.getStorageSync('driver')
      if (value) {
        console.log(value);
        console.log(value[3]);
        console.log(value[4]);
        if (value[5]){
          console.log(value[5].result.length );
          if (value[5].result.length>0){
            this.setData({
              badActionType: 1,
              badAction: value[5].result
            })
          }else{
            this.setData({
              badActionType: 2,
            })
          }
        }else{
          this.setData({
            badActionType: 0,
          })
        }
        if (value[3]!=undefined) {
          console.log(value[3])
          this.setData({
            loseType :1,
            loseArray: value[3].result.list
          })
        } else {
          this.setData({
            loseType: 0,
          })
        }
        if (value[1]) {
          this.setData({
            idNoverifystatus: value[1].result.verifystatus,
            idNoReal: 1,
          })
        } else {
          this.setData({
            idNoReal: 0
          })
        }
        if (value[2]) {
          this.setData({
            telRealverifystatus: value[2].result.verifystatus,
            telReal:1
          })
        } else {
          this.setData({
            telReal: 0
          })
        }
        if (value[4]) {
          this.setData({
            badList : 1,
            loseArray: value[4].result
          })
        } else {
          this.setData({
            badList: 0
          })
        }
      }
    } catch (e) {
      // Do something when catch error
    }

    console.log(options);
    if(options.type==1){
      this.setData({ 
        statues: 1
      })
    } else if (options.type == 1){
      this.setData({
        statues: 2
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
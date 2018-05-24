var app = getApp()

function getOpenId(obj) {
  wx.request({
    url: 'https://gc.diuber.com/diuber/info_check/getOpenId',
    method: 'POST',
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: obj.data,
    success: function (objdata) {
      obj.success(objdata)
    }, 
  })
}
/**
 * 设置小程序用户信息
 */

function setInfoCheckUser(obj) {
  wx.request({
    url: 'https://gc.diuber.com/diuber/info_check/setInfoCheckUser',
    method: 'POST',
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: obj.data,
    success: function (objdata) {
      obj.success(objdata)
    }, 
  })
}
/**
 * 车辆核查调查结果
 */

function infoCheck(obj) {
  wx.request({
    url: 'https://gc.diuber.com/diuber/info_check/infoCheck',
    method: 'POST',
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: obj.data,
    success: function (objdata) {
      obj.success(objdata)
    },
  })
}

/**
 * 生成预支付订单
 */

function checkInfoPay(obj) {
  wx.request({
    url: 'https://gc.diuber.com/diuber/wx_info_check_pay/checkInfoPay',
    method: 'POST',
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: obj.data,
    success: function (objdata) {
      obj.success(objdata)
    },
  })
}


/**
 * 获取订单列表
 */

function getInfoCheckLists(obj) {
  wx.request({
    url: 'https://gc.diuber.com/diuber/info_check/getInfoCheckLists',
    method: 'POST',
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: obj.data,
    success: function (objdata) {
      obj.success(objdata)
    },
  })
}

/**
 * 获取分类列表
 * getInfoCheckUser
 */


function getInfoCheckItem(obj) {
  wx.request({
    url: 'https://gc.diuber.com/diuber/info_check/getInfoCheckItem',
    method: 'POST',
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: obj.data,
    success: function (objdata) {
      obj.success(objdata)
    },
  })
}

/***
 * 行驶证识别
 */

function xszcard(obj) {
  wx.request({
    url: 'https://gc.diuber.com/diuber/info_check/xszcard',
    method: 'POST',
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: obj.data,
    success: function (objdata) {
      obj.success(objdata)
    },
  })
}

/***
 * 行驶证识别
 */

function getInfoCheckInfo(obj) {
  wx.request({
    url: 'https://gc.diuber.com/diuber/info_check/getInfoCheckInfo',
    method: 'POST',
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: obj.data,
    success: function (objdata) {
      obj.success(objdata)
    },
  })
}


/***
 * 小程序用户信息
 */

function getInfoCheckUser(obj) {
  wx.request({
    url: 'https://gc.diuber.com/diuber/info_check/getInfoCheckUser',
    method: 'POST',
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: obj.data,
    success: function (objdata) {
      obj.success(objdata)
    },
  })
}
/**
 * return出函数
 */
module.exports = {
  getOpenId: getOpenId,
  setInfoCheckUser: setInfoCheckUser,
  infoCheck: infoCheck,
  checkInfoPay:checkInfoPay,
  getInfoCheckLists: getInfoCheckLists,
  getInfoCheckItem: getInfoCheckItem,
  xszcard: xszcard,
  getInfoCheckUser:getInfoCheckUser,
  getInfoCheckInfo: getInfoCheckInfo
}
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


function Regular(str, reg) {
  if (reg.test(str))
    return true;
  return false;
}

//是否为中文
function IsChinese(str) {
  var reg = /^[\u0391-\uFFE5]+$/;
  return Regular(str, reg);
 
}
//去左右空格;
function trim(s) {
  return s.replace(/(^\s*)|(\s*$)/g, "");

}

//手机号验证
function verifyPhone (telephone){
  var  reg = /^1[34578]\d{9}$/;
  return Regular(telephone,reg);
}

//身份证号验证
function verifyIdNo(idno){
  var reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
  var regOther = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
  if (Regular(idno, reg)){
    return Regular(idno, reg);
  }else{
    return Regular(idno, regOther);
  }
 
}
// 
//^[\u4e00-\u9fa5]{1}[a-zA-Z]{1}[a-zA-Z_0-9]{4}[a-zA-Z_0-9_\u4e00-\u9fa5]$
//车牌号验证
function verifyVin(vin) {
  var reg = /^[a-zA-Z0-9]{17}$/;
  return Regular(vin, reg);
}

function verifycarNo(carNo){
  var reg = /^[\u4e00-\u9fa5]{1}[a-zA-Z]{1}[a-zA-Z_0-9]{4}[a-zA-Z_0-9_\u4e00-\u9fa5]$/; 
  return Regular(carNo, reg);
}

module.exports = {
  formatTime: formatTime,
  IsChinese: IsChinese,
  trim: trim,
  verifyPhone: verifyPhone,
  verifyIdNo: verifyIdNo,
  verifyVin: verifyVin,
  verifycarNo: verifycarNo
}

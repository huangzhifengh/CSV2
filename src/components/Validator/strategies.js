export default {
  required (value) {
    return !!value
  },

  isNumber (value) {
    return /^\d+$/.test(value)
  },

  equalTo (value, target) {
    return value === target
  },

  pattern (value, pattern) {
    if(value!=='' && value!==undefined){
      return new RegExp(pattern).test(value)
    }
    return true
  },

  minLength (value, length) {
    return value.replace(/[\u4e00-\u9fa5]/g, '**').length >= Number(length)
  },

  maxLength (value, length) {
    return value.replace(/[\u4e00-\u9fa5]/g, '**').length <= Number(length)
  },

  maxValue (value, target) {
    return Number(value) <= target
  },

  notEqualTo (value, target) {
    return value !== target
  },

  minValue (value, min) {
    return Number(value) >= Number(min)
  },

  noSpecialChar (value) {
    var myReg = /[~`\-\_^@\/\'\\\"#$%&\*\?\(\),\+;\[\]\{\}\|\.:：<>!！￥？（），。、—]/
    return !myReg.test(value)
  },
}

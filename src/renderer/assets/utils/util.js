/**
 * 插入字符串
 * @param {String} soure 需要处理的字符串
 * @param {Number} start 插入字符串的位置
 * @param {String} newStr 要插入的新字符串
 */
const insertStr = (soure, start, newStr) => {
  return soure.slice(0, start) + newStr + soure.slice(start)
}

export {
  insertStr
}

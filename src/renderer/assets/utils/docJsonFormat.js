const fs = require('fs')
const path = require('path')
const { uniqBy } = require('lodash')

/**
 * 根据apidoc的json生成网关需要的json文件
 * @param {String} inputPath apidoc生成的json文件路径
 * @param {String} outputPath format之后的json输出路劲
 */
function fomartJson(outputPath, callback) {
  let json_data = require('../../../../static/apiDoc/api_data.json')
  let errorCodeAggregate = []
  let resApi = json_data.map(json => {
    let new_json = {}
    let descStr = `{${filterElmStr(json.description)}}`  //去掉字符串的p标签
    let mainInfo = JSON.parse(descStr.replace(/&quot;/ig, '"'))
    new_json.description = mainInfo.title
    new_json.origin = 'node' //mainInfo.origin,
    new_json.detail = mainInfo.detail ? mainInfo.detail : ''
    new_json.encryptionOnly = mainInfo.encryptionOnly
    new_json.groupOwner = mainInfo.groupOwner
    new_json.groupName = json.group
    new_json.methodName = `${json.group}.${json.title}`
    new_json.methodOwner = mainInfo.methodOwner
    new_json.needVerify = mainInfo.needVerify
    new_json.returnType = mainInfo.returnType
    new_json.securityLevel = mainInfo.securityLevel
    new_json.state = mainInfo.state

    //异常列表
    if (json.error && json.error.fields['Error']) {
      new_json.errorCodeList = json.error.fields['Error'].map((item) => {
        return {
          code: item.field,
          desc: filterElmStr(item.description),
          isDesign: true,
          name: item.type
        }
      })
      errorCodeAggregate = errorCodeAggregate.concat(new_json.errorCodeList)
    }

    //请求参数
    new_json.parameterInfoList = []
    if (json.parameter && json.parameter.fields) {
      new_json.parameterInfoList = json.parameter.fields.Parameter.map(item => {
        let result = {}
        if (item.defaultValue) {
          result.defaultValue = item.defaultValue
        }
        result.description = filterElmStr(item.description)
        result.injectOnly = false
        result.isList = item.type.indexOf('list') == 0 || item.type.indexOf('List') == 0
        result.isRequired = !item.optional
        result.isRsaEncrypt = false
        result.name = item.field
        result.sequence = item.type.split('__')[1] || ''
        result.type = item.type.split('__')[0] || ''
        if (result.isList) {
          let reg = /\[(.+?)\]/g;
          let match = reg.exec(result.type);
          result.type = match[1]
        }
        return result
      })
      //请求参数实体
      new_json.reqStructList = formartStructList(json.parameter.fields, json)
    }
    //返回结果
    if (json.success) {
      //返回实体
      new_json.respStructList = formartStructList(json.success.fields, json)
    }
    return new_json
  });

  const result_json = JSON.stringify({ apiList: resApi, codeList: uniqBy(errorCodeAggregate, 'code') })
  fs.writeFileSync(outputPath, result_json)

  callback && callback();
  console.log('接口列表json转化完毕')
}
/**
 * 格式化apidoc请求或者返回的实体对象
 * @param {Object} obj apidoc请求或者返回的实体对象
 * @param {Object} json apidoc整体json
 * @param {Boolean} mock 是否添加mock标识字段
 */
function formartStructList(obj, json, mock) {
  //返回实体
  let StructList = []
  for (let key in obj) {
    if (key !== 'Parameter') {

      let sValue = obj[key]
      let resultValue = {}
      resultValue.fieldList = sValue.map(pitem => {
        try {
          let ret = {
            desc: filterElmStr(pitem.description),
            isList: pitem.type.split('__')[0].indexOf('list') == 0 || pitem.type.split('__')[0].indexOf('List') == 0,
            name: pitem.field,
            type: pitem.type.split('__')[0]
          }
          if (pitem.type.split('__')[1]) {
            ret.sequence = pitem.type.split('__')[1]
          }
          if (mock) {
            ret.mock = pitem.type.split('__')
          }
          if (ret.type.indexOf('[') >= 0) {
            let reg = /\[(.+?)\]/g;
            let match = reg.exec(ret.type);
            ret.type = match[1]
          }
          if (ret.type == 'T') {
            ret.type = '[T]'
          }
          return ret
        } catch (err) {
          throw `${pitem.type}  定义出错`
        }
      })

      //动态类型不需要分组名
      if (key != 'Api_DynamicEntity') {
        resultValue.groupName = json.group
      }
      resultValue.name = key
      StructList.push(resultValue)
    }
  }
  return StructList
}

function filterElmStr(str) {
  return str.replace(/<p>|<\/p>/ig, '')
}

export {
  fomartJson
}

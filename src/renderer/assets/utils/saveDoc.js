import { insertStr } from '@/assets/utils/util'

const returnType = (str) => {
  let newReturnType = '';
  if(/^Api_/.test(str)) {
    if(!/^Api_Node/.test(str)) {
      newReturnType = insertStr(str, 4, 'Node');
    }
    return newReturnType
  }
  return str
}

const methodName = (str) => {
  if(!/^node_/.test(str)) {
    return insertStr(str, 0, 'node_').split('.');
  }
  return str.split('.')
}

const saveBase = (info) => {
  const str = `
    * @api {post} ${methodName(info.methodName)[0]}.${methodName(info.methodName)[1]} ${methodName(info.methodName)[1]}
    *
    * @apiDescription
    * "title":"${info.description}",
    * "groupOwner":"${info.groupOwner}",
    * "methodOwner":"${info.methodOwner}",
    * "securityLevel":"${info.securityLevel}",
    * "returnType":"${returnType(info.returnType)}",
    * "state":"${info.state}",
    * "detail":"${info.detail}",
    * "encryptionOnly":${info.encryptionOnly},
    * "needVerify":${info.needVerify}
    *
    * @apiGroup ${methodName(info.methodName)[0]}
  `;
  return {
    baseStr: str,
    methodName: methodName(info.methodName)[1]
  };
};

const saveDoc = (apiDate) => {
  const doc = `
    /**
    ${saveBase(apiDate.baseInfo).baseStr}
    */
  `;
  return {
    doc,
    methodName: saveBase(apiDate.baseInfo).methodName
  };
};

export {
  saveDoc
}

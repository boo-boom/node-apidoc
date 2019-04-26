import { methodName } from '@/assets/utils/nodes'

const saveBase = (info) => {
  const str = `
  * @api {post} ${methodName(info.methodName)[0]}.${methodName(info.methodName)[1]} ${methodName(info.methodName)[1]}
  *
  * @apiDescription
  * "title":"${info.description}",
  * "groupOwner":"${info.groupOwner}",
  * "methodOwner":"${info.methodOwner}",
  * "securityLevel":"${info.securityLevel}",
  * "returnType":"${info.returnType}",
  * "state":"${info.state}",
  * "detail":"${info.detail}",
  * "encryptionOnly":${info.encryptionOnly},
  * "needVerify":${info.needVerify}
  *
  * @apiGroup ${methodName(info.methodName)[0]}
  * `;
  return {
    baseStr: str,
    returnType: info.returnType,
    methodName: methodName(info.methodName)[1]
  };
};

const saveParams = (info) => {
  let str = '';
  console.log(info)
  return str;
}

const saveRespStructList = (info) => {
  let str = '';
  return str;
}

const saveDoc = (apiDate) => {
  const doc =
`/**
  *
  ${saveBase(apiDate.baseInfo).baseStr}
  ${saveParams(apiDate.params)}
  ${saveRespStructList(apiDate.respStructList, saveBase(apiDate.baseInfo).returnType)}
  */`;
  return {
    doc,
    methodName: saveBase(apiDate.baseInfo).methodName
  };
};

export {
  saveDoc
}

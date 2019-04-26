import { methodName } from '@/assets/utils/nodes'

// 检出所有字段对象
const flatten = (data) => {
  return data.reduce((arr, {...cur, nodes = []}) => {
    return arr.concat([{...cur}], flatten(nodes));
  }, [])
}
// 将所有的字段对应实体进行分组
const jsonGroup = (info) => {
  var arr = flatten(info);
  var map = {},
      dest = [];
  for (var i = 0; i < arr.length; i++) {
    var ai = arr[i];
    if (!map[ai.entity]) {
      dest.push({
        type: ai.entity,
        nodes: [ai]
      });
      map[ai.entity] = ai;
    } else {
      for (var j = 0; j < dest.length; j++) {
        var dj = dest[j];
        if (dj.type == ai.entity) {
          dj.nodes.push(ai);
          break;
        }
      }
    }
  }
  return dest;
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
  for(let i = 0; i < info.length; i++) {
    if(i === 0) {
      str += `* @apiParam {${info[i].type}} ${info[i].name} ${info[i].description}`;
    } else {
      str += `\n  * @apiParam {${info[i].type}} ${info[i].name} ${info[i].description}`;
    }
  }
  // console.log(info)
  return str;
}

const saveRespStructList = (info) => {
  let list = jsonGroup(info);
  let str = '';
  for(let i = 0; i < list.length; i++) {
    if(i === 0) {
      str += `*\n  * @block [${list[i].type}]`;
    } else {
      str += `\n  *\n  * @block [${list[i].type}]`;
    }
    for(let j = 0; j < list[i].nodes.length; j++) {
      str += `\n  * @apiSuccess (${list[i].type}) {${list[i].nodes[j].type}} ${list[i].nodes[j].name} ${list[i].nodes[j].desc}`;
    }
  }
  return str;
}

const saveDynamicEntity = (info) => {
  // let list = jsonGroup(info);
  var arr = flatten(info);
  console.log(arr)
  return ''
}

const saveDoc = (apiDate) => {
  const doc =
`/**
  *
  ${saveBase(apiDate.baseInfo).baseStr}
  ${saveParams(apiDate.params)}
  ${saveRespStructList(apiDate.respStructList, saveBase(apiDate.baseInfo).returnType)}
  ${saveDynamicEntity(apiDate.dynamicEntity)}
  */`;
  return {
    doc,
    methodName: saveBase(apiDate.baseInfo).methodName
  };
};

export {
  saveDoc
}

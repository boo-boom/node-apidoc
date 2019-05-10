import { methodName, nodeType } from '@/assets/utils/nodes'

// 检出所有字段对象
const flatten = (data) => {
  return data.reduce((arr, {...cur, nodes = []}) => {
    cur.nodes = [];
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
      if(ai.isParame) {
        dest.push({
          isList: ai.isList,
          type: ai.entity,
          nodes: [ai],
          isParame: ai.isParame
        });
      } else {
        dest.push({
          isList: ai.isList,
          type: ai.entity,
          nodes: [ai]
        });
      }
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

const unique = (arr) => {
  var hash = [];
  for (var i = 0; i < arr.length; i++) {
    for (var j = i+1; j < arr.length; j++) {
      if(arr[i].name === arr[j].name){
        ++i;
      }
    }
    hash.push(arr[i]);
  }
  return hash;
}

const saveBase = (info) => {
  const str =
`* @api {post} ${methodName(info.methodName)[0]}.${methodName(info.methodName)[1]} ${methodName(info.methodName)[1]}
 *
 * @apiDescription
 * "title":"${info.description}",
 * "groupOwner":"${info.groupOwner}",
 * "methodOwner":"${info.methodOwner}",
 * "securityLevel":"${info.securityLevel}",
 * "returnType":"${nodeType(info.returnType)}",
 * "state":"${info.state}",
 * "detail":${info.detail === '' ? '""' : info.detail},
 * "encryptionOnly":${info.encryptionOnly},
 * "needVerify":${info.needVerify}
 *
 * @apiGroup ${methodName(info.methodName)[0]}
 * `;
  return {
    baseStr: str,
    returnType: nodeType(info.returnType),
    methodName: methodName(info.methodName)[1]
  };
};

const saveParams = (info) => {
  let list = jsonGroup(info);
  if(!list.length) return '*';
  let str = '';
  for(let i = 0; i < list.length; i++) {
    if(list[i].type) {
      if(i === 0) {
        str += `*\n * @block [${list[i].type}]`;
      } else {
        str += `\n *\n * @block [${list[i].type}]`;
      }
    } else {
      str += `*`;
    }
    for(let j = 0; j < list[i].nodes.length; j++) {
      list[i].nodes = unique(list[i].nodes);
      const nodes = list[i].nodes[j];
      if(nodes.isParame) {
        str += `\n * @apiParam {${nodes.type}} ${nodes.isRequired ? nodes.name : '['+nodes.name+']'} ${nodes.desc || nodes.description}`;
      } else {
        str += `\n * @apiParam (${list[i].type}) {${nodes.type}} ${nodes.name} ${nodes.desc || nodes.description}`;
      }
    }
  }
  // console.log(info)
  return str;
}

const saveRespStructList = (info, dynamic, dynamicEntityName) => {
  let list = jsonGroup([...info, ...dynamic]);
  // console.log(list)
  let str = '';
  for(let i = 0; i < list.length; i++) {
    if(dynamicEntityName.includes(list[i].type) || list[i].type === 'Api_DynamicEntity') {
      if(i === 0) {
        str += `*\n * @block [${list[i].type}]`;
      } else {
        str += `\n *\n * @block [${list[i].type}]`;
      }
    } else {
      if(i === 0) {
        str += `*\n * @block [${nodeType(list[i].type)}]`;
      } else {
        str += `\n *\n * @block [${nodeType(list[i].type)}]`;
      }
    }
    for(let j = 0; j < list[i].nodes.length; j++) {
      list[i].nodes = unique(list[i].nodes);
      const nodes = list[i].nodes[j];
      if(!nodes.isDynamic) {
        if(dynamicEntityName.includes(list[i].type)) {
          str += `\n * @apiSuccess (${list[i].type}) {${nodeType(nodes.type)}} ${nodes.name} ${nodes.desc}`;
        } else {
          if(list[i].type === 'Api_DynamicEntity'){
            str += `\n * @apiSuccess (${list[i].type}) {${nodes.type}} ${nodes.name} ${nodes.desc}`;
          } else if(nodes.type === 'List[Api_DynamicEntity]') {
            str += `\n * @apiSuccess (${nodeType(list[i].type)}) {${nodes.type}} ${nodes.name} ${nodes.desc}`;
          } else {
            str += `\n * @apiSuccess (${nodeType(list[i].type)}) {${nodeType(nodes.type)}} ${nodes.name} ${nodes.desc}`;
          }
        }
      }
    }
  }
  return str;
}

const saveError = (info) => {
  let str = '';
  // console.log(info)
  for(let i = 0; i < info.length; i++) {
    str += `\n * @apiError (${info[i].group}) {${info[i].type}} ${info[i].field} ${info[i].description}`
  }
  return str;
}

const saveDoc = (apiDate, dynamicEntityName) => {
  const doc =
`/**
 ${saveBase(apiDate.baseInfo).baseStr}
 ${saveParams(apiDate.params)}
 *
 ${saveRespStructList(apiDate.respStructList, apiDate.dynamicEntity, dynamicEntityName)}
 *
 *${saveError(apiDate.error)}
 */`;
  return {
    doc,
    methodName: saveBase(apiDate.baseInfo).methodName
  };
};

export {
  saveDoc
}

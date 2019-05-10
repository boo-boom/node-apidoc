import { insertStr } from '@/assets/utils/util.js'

export const nodesPath = (tree = '0,', dir) => {
  // 将递归的层级进行转换
  const _tree = tree.split(",");
  _tree.splice(_tree.length - 1, 1);
  // 使用eval获取对应数据
  let evalStr = "";
  for (let i = 0; i < _tree.length; i++) {
    if (i == 0) {
      evalStr = `${dir}[${_tree[i]}]`;
    } else {
      evalStr += `.nodes[${_tree[i]}]`;
    }
  }
  return {
    evalStr,
    nodesLen: _tree.length,
  };
}

export const nodeType = (str, isList = false) => {
  let newReturnType = str;
  if (/^List\[Api_/.test(str) && !/^List\[Api_Node/.test(str)) {
    newReturnType = insertStr(str, 9, 'Node');
  }
  if (/^Api_/.test(str) && !/^Api_Node/.test(str)) {
    newReturnType = insertStr(str, 4, 'Node');
  }
  return newReturnType
}

export const methodName = (str, isStr = false) => {
  if (isStr) {
    if (!/^node_/.test(str)) {
      return insertStr(str, 0, 'node_');
    }
  } else {
    if (!/^node_/.test(str)) {
      return insertStr(str, 0, 'node_').split('.');
    }
    return str.split('.')
  }
}

export const isEntity = (type) => {
  const test = /^Api_/ig.test(type) ||
    /^list\[/ig.test(type);
  return test;
}

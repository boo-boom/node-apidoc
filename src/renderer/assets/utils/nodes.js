export const nodesPath = (tree='0,', dir) => {
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

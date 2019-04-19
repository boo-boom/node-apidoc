import jsonData from "./../../../../static/info.json";
import { nodesPath } from "../../assets/utils/nodes";

const state = {
  jsonData,
  apiGroupIndex: 0,
  respStructList: [],
  apiName: 123123,
  obj: {
    message: 12123123
  }
}

const getters = {
  jsonData: state => state.jsonData,
  apiGroupIndex: state => state.apiGroupIndex,        // 当前api分组的索引
  respStructList: state => state.respStructList,        // 当前api返回内容
}

const mutations = {
  SET_API_GROUP_INDEX(state, index) {
    state.apiGroupIndex = index;
  },
  SET_RES_LIST(state, params) {
    if(params.tree) {
      if(params.add) {
        const { evalStr, nodesLen } = nodesPath(params.tree, 'state.respStructList');
        if(nodesLen > 1) {
          if(params.tag === 'sibling') {
            // 递归多层时，取上一级，即当前的父级并push数据
            const _evalStr = evalStr.replace(/\.nodes\[[0-9]*\]$/gi, "");
            eval(_evalStr).nodes.splice(params.index + 1, 0, params.item);
          } else {
            eval(evalStr).nodes.push(params.item);
          }
        } else {
          // 最外层
          if(params.tag === 'sibling') {
            state.respStructList.splice(params.index + 1, 0, params.item);
          } else {
            state.respStructList[params.index].nodes.push(params.item);
          }
        }
      } else if(params.remove) {
        const { evalStr, nodesLen } = nodesPath(params.tree, 'state.respStructList');
        if (nodesLen > 1) {
          const _evalStr = evalStr.replace(/\.nodes\[[0-9]*\]$/gi, "");
          eval(_evalStr).nodes.splice(params.index, 1);
        } else {
          state.respStructList.splice(params.index, 1);
        }
      }
    } else if(params.tree === null) {
      state.respStructList = params.resList;
    }
  },
  REMOVE_RES_LIST(state, params) {
    const { evalStr, nodesLen } = nodesPath(params.tree, 'state.respStructList');
    if (nodesLen > 1) {
      const _evalStr = evalStr.replace(/\.nodes\[[0-9]*\]$/gi, "");
      eval(_evalStr).nodes.splice(params.index, 1);
    } else {
      state.respStructList.splice(params.index, 1);
    }
  },
  UPDATE_API(state, params) {
    const { evalStr } = nodesPath(params.tree, 'state.respStructList');
    switch(params.updateName) {
      case 'updateApiName':
        eval(evalStr).name = params.value;
        break;
      case 'updateApiType':
        eval(evalStr).type = params.value;
        break;
      case 'updateApiDesc':
        eval(evalStr).desc = params.value;
        break;
    }
  },
}

const actions = {
  setApiGroupIndex({ commit }, index) {
    commit('SET_API_GROUP_INDEX', index)
  },
  setRespStructList({ commit }, params) {
    commit('SET_RES_LIST', params);
  },
  removeResList({ commit }, params) {
    commit('REMOVE_RES_LIST', params);
  },
  updateApiName({ commit }, params) {
    commit('UPDATE_API', params);
  },
  updateApiType({ commit }, params) {
    commit('UPDATE_API', params);
  },
  updateApiDesc({ commit }, params) {
    commit('UPDATE_API', params);
  },
}

export default {
  state,
  getters,
  mutations,
  actions
}

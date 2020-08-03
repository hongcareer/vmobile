import { fetch, post } from '../../api/axios'
import {RECEIVE_DATA_CHANGE} from '../mutation-types'
// 开启命名空间
const namespaced = true

const state = {
  message:"",
  total:2
};
// 请求数据
const actions = {
  // async queryList({commit},param){
  //   // const data = await post('/customer/queryTagTotal')
  //   let message = 1111
  //   commit(RECEIVE_DATA_CHANGE,{message})
  // },
  change ({commit},payload) {
    commit(RECEIVE_DATA_CHANGE,{payload})
  }
};
// 修改数据
const mutations = {
  [RECEIVE_DATA_CHANGE](state,{payload}){
      state.message = payload
  },
};

export default{
  namespaced,
  state,
  actions,
  mutations
}

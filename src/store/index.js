import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    departments: [
      '技术部',
      '产品部',
      '淘宝运营部',
      '货源部',
      '流量中心-推广一部',
      '流量中心-推广二部',
      '流量中心-增长一部',
      '流量中心-增长二部',
      '销售部',
      '客服部',
      '品牌部',
      'APP运营部',
      '内容规划',
      '核算',
      '人事行政部',
      '优翔广告部'
    ],
    currentUpshow: '',
    currentUserName: '',
    currentUserDepartment: '流量中心-增长二部',
    // currentComponent: '项目管理',
    baseurl: 'http://127.0.0.1:3000/'
  },
  mutations: {
    changeCurrentUpshow (state,newvalue) {
       state.currentUpshow = newvalue
     },
    changecurrentUserName (state,newvalue) {
      state.currentUserName = newvalue
    },
    changeCurrentUserDepartment (state,newvalue) {
      state.currentUserDepartment = newvalue
    },
    // changeCurrentComponent (state,newvalue) {
    //   state.currentComponent = newvalue
    // }
  },
  actions: {
  },
  modules: {
  }
})

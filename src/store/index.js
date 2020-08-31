import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    departments: [
      '增长二部',
      '增长一部'
    ],
    currentUpshow: '项目预览',
    currentUserName: '',
    currentUserDepartment: '',
    currentComponent: 'projectScope'
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
    changeCurrentComponent (state,newvalue) {
      state.currentComponent = newvalue
    },
  },
  actions: {
  },
  modules: {
  }
})

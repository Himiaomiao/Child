import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {},
    openTab: [
    ], // 所有打开的路由
    activeIndex: '/home' // 激活状态
  },
  mutations: {
    getUserInfo(state, user) {
      state.userInfo = user
    },
    add_tabs(state, data) {
      this.state.openTab.push(data)
    },
    // 删除tabs
    delete_tabs(state, route) {
      let index = 0
      for (const option of state.openTab) {
        if (option.route === route) {
          break
        }
        index++
      }
      this.state.openTab.splice(index, 1)
    },
    // 设置当前激活的tab
    set_active_index(state, index) {
      this.state.activeIndex = index
      console.log('vuex页面' + this.state.activeIndex)
    }
  },
  actions: {
    getUserInfo({ commit }, user) {
      commit('getUserInfo', user)
    }
  },
  modules: {
  }
})

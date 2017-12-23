import Cookies from 'js-cookie'

const slack = {
  state: {
    name: Cookies.get('slackName')
  },
  mutations: {
    SET_SLACK_NAME: (state, name) => {
      state.name = name
    }
  },
  actions: {
    SetSlackName: ({ commit }, slackName) => {
      Cookies.set('slackName', slackName)
      commit('SET_SLACK_NAME', slackName)
    }
  }
}

export default slack

import Cookies from 'js-cookie'
import { get_team_info, get_channel_list } from '@/api/slack_data'

const slack = {
  state: {
    team_info: Cookies.get('team_info'),
    channel_list: null
  },
  mutations: {
    SET_SLACK_INFO: (state, team_info) => {
      state.team_info = team_info
    },
    SET_CHANNEL_LIST: (state, channel_list) => {
      state.channel_list = channel_list
    }
  },
  actions: {
    SetSlackInfo: ({ dispatch, commit }, domain) => {
      const domain_trimed = domain.trim()
      return new Promise((resolve, reject) => {
        get_team_info(domain_trimed).then(response => {
          // console.log(response)
          const data = response.data.team
          Cookies.set('team_info', data)
          commit('SET_SLACK_INFO', data)
          dispatch('UpdateChannelList', data.id)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    UpdateChannelList: ({ commit }, teamid) => {
      return new Promise((resolve, reject) => {
        get_channel_list(teamid).then(response => {
          const data = response.data.channel
          commit('SET_CHANNEL_LIST', data)
          // console.log(data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default slack

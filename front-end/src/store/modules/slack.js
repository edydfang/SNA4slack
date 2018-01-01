import Cookies from 'js-cookie'
import { get_team_info, get_channel_list } from '@/api/slack_data'

const extract_channel_list = channelArray => {
  const channelObj = {}
  // console.log(channelArray)
  for (var i = channelArray.length - 1; i >= 0; i--) {
    const idx = channelArray[i].id
    channelObj[idx] = channelArray[i]
    // console.log(channelObj[idx])
    delete channelObj[idx].id
  }
  return channelObj
}

const slack = {
  state: {
    team_info: Cookies.getJSON('team_info'),
    channel_list: Cookies.getJSON('channel_list'),
    selected_info: Cookies.getJSON('selected_info')
  },
  mutations: {
    SET_SLACK_INFO: (state, team_info) => {
      state.team_info = team_info
    },
    SET_CHANNEL_LIST: (state, channel_list) => {
      state.channel_list = channel_list
    },
    SET_SELECTED_INFO: (state, selected_info) => {
      state.selected_info = selected_info
    }
  },
  actions: {
    SetSlackInfo: ({ dispatch, commit }, domain) => {
      Cookies.remove('team_info')
      const domain_trimed = domain.trim()
      commit('SET_SLACK_INFO', null)
      return new Promise((resolve, reject) => {
        get_team_info(domain_trimed).then(response => {
          // console.log(response)
          const data = response.data[0]
          Cookies.set('team_info', data)
          commit('SET_SLACK_INFO', data)
          dispatch('UpdateChannelList', data.id)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    UpdateChannelList: ({ dispatch, commit }, teamid) => {
      Cookies.remove('channel_list')
      commit('SET_CHANNEL_LIST', null)
      return new Promise((resolve, reject) => {
        get_channel_list(teamid).then(response => {
          let data = response.data
          data = extract_channel_list(data)
          console.log('UpdateChannelList')
          Cookies.set('channel_list', data)
          commit('SET_CHANNEL_LIST', data)
          // console.log(data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    SetSelection: ({ dispatch, commit }, selected) => {
      Cookies.remove('selected_info')
      commit('SET_SELECTED_INFO', null)
      return new Promise((resolve, reject) => {
        Cookies.set('selected_info', selected)
        commit('SET_SELECTED_INFO', selected)
        // console.log(selected)
        resolve()
      })
    }
  }
}

export default slack

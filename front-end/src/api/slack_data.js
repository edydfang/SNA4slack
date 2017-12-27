import request from '@/utils/request'

export function get_all_team() {
  return request({
    url: '/api/team',
    method: 'get'
  })
}

export function get_team_info(domain) {
  return request({
    url: 'api/team',
    method: 'get',
    params: { domain }
  })
}

export function get_channel_list(teamid) {
  return request({
    url: 'api/channel',
    method: 'get',
    params: { team: teamid }
  })
}

export function get_team_user(teamid) {
  return request({
    url: 'api/user/all',
    method: 'get',
    params: { team: teamid }
  })
}

export function get_mention_info(teamid, channelid, start, end) {
  return request({
    url: 'api/mention',
    method: 'get',
    params: { team: teamid, channel: channelid, from: start, to: end }
  })
}

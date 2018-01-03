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
    url: 'api/user',
    method: 'get',
    params: { team: teamid }
  })
}

export function get_channel_user(teamid, channelid) {
  return request({
    url: 'api/user',
    method: 'get',
    params: { team: teamid, channel: channelid }
  })
}

export function get_mention_info(teamid, channelid, start, end) {
  // start and end are Date type
  return request({
    url: 'api/mention',
    method: 'get',
    params: { team: teamid, channel: channelid, from: Math.floor(start.getTime() / 1000), to: Math.floor(end.getTime() / 1000) }
  })
}

export function get_channel_info(teamid, channelid, start, end) {
  return request({
    url: 'api/channel/info',
    method: 'get',
    params: { team: teamid, channel: channelid, from: Math.floor(start.getTime() / 1000), to: Math.floor(end.getTime() / 1000) }
  })
}

export function get_chat_record_node(teamid, channelid, start, end, user) {
  return request({
    url: 'api/user/message',
    method: 'get',
    params: { team: teamid, channel: channelid, from: Math.floor(start.getTime() / 1000), to: Math.floor(end.getTime() / 1000), user: user }
  })
}

export function get_chat_record_edge(teamid, channelid, start, end, user1, user2) {
  return request({
    url: 'api/mention/message',
    method: 'get',
    params: { team: teamid, channel: channelid, from: Math.floor(start.getTime() / 1000), to: Math.floor(end.getTime() / 1000), user1: user1, user2: user2 }
  })
}

export function get_word_cloud(teamid) {
  return request({
    url: 'api/analysis/team-word-frequency/' + teamid,
    // url: 'api/analysis/channel-word-frequency/'+teamid+'/'+channelid,
    method: 'get'
  })
}

export function get_sentiment_node(teamid, channelid, start, end, user) {
  return request({
    url: 'api/analysis/sentiment-user/' + teamid + '/' + channelid + '/' + Math.floor(start.getTime() / 1000) + '/' + Math.floor(end.getTime() / 1000) + '/' + user,
    // url: 'api/analysis/channel-word-frequency/'+teamid+'/'+channelid,
    method: 'get'
  })
}

export function get_sentiment_edge(teamid, channelid, start, end, user1, user2) {
  return request({
    url: 'api/analysis/sentiment-two-user/' + teamid + '/' + channelid + '/' + Math.floor(start.getTime() / 1000) + '/' + Math.floor(end.getTime() / 1000) + '/' + user1 + '/' + user2,
    // url: 'api/analysis/channel-word-frequency/'+teamid+'/'+channelid,
    method: 'get'
  })
}

export function get_itimate_edge(teamid, channelid, start, end, user1, user2) {
  return request({
    url: 'api/analysis/intimate/' + teamid + '/' + channelid + '/' + Math.floor(start.getTime() / 1000) + '/' + Math.floor(end.getTime() / 1000) + '/' + user1 + '/' + user2,
    // url: 'api/analysis/channel-word-frequency/'+teamid+'/'+channelid,
    method: 'get'
  })
}

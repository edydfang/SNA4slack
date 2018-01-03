import { get_mention_info, get_channel_user, get_channel_info, get_user_rank_data, get_team_user } from '@/api/slack_data'

export function extract_nodes(data, userlist) {
  if (!data) return null
  let nodes = new Set()
  for (var i = data.length - 1; i >= 0; i--) {
    nodes.add(data[i].to_user)
    nodes.add(data[i].from_user)
  }
  // process user related info
  nodes = Array.from(nodes).map(idx => {
    var obj
    if (userlist.hasOwnProperty(idx)) {
      const user = userlist[idx]
      obj = { id: idx, name: user.real_name !== '' ? user.real_name : user.name, _color: '#' + userlist[idx].color, image: userlist[idx].image }
    } else {
      obj = { id: idx, name: idx }
    }
    return obj
  })
  // console.log(nodes)
  return nodes
}

export function extract_links(data) {
  if (!data) return null
  const links = []
  for (var i = data.length - 1; i >= 0; i--) {
    links.push({ id: data[i].from_user + '-' + data[i].to_user, sid: data[i].from_user, tid: data[i].to_user, _color: 'orange' })
  }
  // console.log(links)
  return links
}

export function get_userlist(context) {
  // console.log(context.channelId)
  // console.log(context.dateRange)
  get_channel_user(context.teamId, context.channelId).then(responce => {
    context.userlist = responce.data
    update_rawdata(context)
  })
}

export function update_rawdata(context) {
  // console.log(context.channelId)
  // console.log(context.dateRange)
  get_mention_info(context.teamId, context.channelId, context.dateRange[0], context.dateRange[1]).then(responce => {
    context.rawdata = responce.data
  })
}

export function get_channel_statistics(teamid, channelid_list, data) {
  const newdata = {}
  // async loop
  const loop = function(i) {
    // console.log(channelid_list)
    get_channel_info(teamid, channelid_list[i], new Date(2008, 1), new Date()).then(result => {
      // console.log(newdata)
      newdata[channelid_list[i]] = result.data
      if (i === channelid_list.length - 1) {
        // console.log(newdata)
        data = newdata
      }
      // console.log(i)
    }).then(() => { i >= channelid_list.length || loop(i + 1) })
  }
  loop(0)
}

export function get_user_rank(context) {
  const reducer_userid = (useridlist, cur) => {
    useridlist.push(cur.user)
    return useridlist
  }
  const reducer_userfre = (userfrelist, cur) => {
    userfrelist.push(cur.count)
    return userfrelist
  }
  let resp = null
  const set_final_result = (userinfo) => {
    // console.log(userinfo)
    // console.log(resp)
    context.labels = resp.reduce(reducer_userid, [])
    // console.log(userinfo.data)
    context.labels = context.labels.map((userid) => {
      const user = userinfo.data[userid]
      // console.log(userinfo.data[userid])
      return user.real_name !== '' ? user.real_name : user.name
    })
    context.numbers = resp.reduce(reducer_userfre, [])
    context.data = { labels: context.labels, numbers: context.numbers }
  }
  get_user_rank_data(context.team_info.id, new Date(2008, 1), new Date()).then((res) => {
    resp = res.data
    return get_team_user(context.team_info.id)
  }).then(set_final_result)
}

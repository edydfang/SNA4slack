import { get_mention_info, get_channel_user, get_channel_info } from '@/api/slack_data'

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
      obj = { id: idx, name: userlist[idx].name, _color: '#' + userlist[idx].color, image: userlist[idx].image }
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

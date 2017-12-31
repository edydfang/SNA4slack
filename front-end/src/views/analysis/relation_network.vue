<template>
    <d3-network v-if="ready" :net-nodes="nodes" :net-links="links" :options="options" @node-click='nodeClick' @link-click='linkClick'>
    </d3-network>
</template>
<script>
import D3Network from 'vue-d3-network'
import { get_mention_info } from '@/api/slack_data'
import { get_channel_user } from '@/api/slack_data'

var extract_nodes = (data, userlist) => {
  if (!data) return null
  let nodes = new Set()
  for (var i = data.length - 1; i >= 0; i--) {
    nodes.add(data[i].to_user)
    nodes.add(data[i].from_user)
  }
  // process user related info
  nodes = Array.from(nodes).map(idx => {
    if (userlist.hasOwnProperty(idx)) {
      return { id: idx, name: userlist[idx].name, _color: '#' + userlist[idx].color }
    } else {
      return { id: idx, name: idx }
    }
  })
  console.log(nodes)
  return nodes
}

var extract_links = (data) => {
  if (!data) return null
  const links = []
  for (var i = data.length - 1; i >= 0; i--) {
    links.push({ sid: data[i].from_user, tid: data[i].to_user, _color: 'orange' })
  }
  // console.log(links)
  return links
}

var get_userlist = function(context) {
  // console.log(context.channelId)
  // console.log(context.dateRange)
  get_channel_user(context.teamId, context.channelId).then(responce => {
    context.userlist = responce.data
    update_rawdata(context)
  })
}

var update_rawdata = function(context) {
  // console.log(context.channelId)
  // console.log(context.dateRange)
  get_mention_info(context.teamId, context.channelId, context.dateRange[0], context.dateRange[1]).then(responce => {
    context.rawdata = responce.data
  })
}

export default {
  name: 'network',
  props: ['nodesData', 'linksData', 'teamId', 'channelId', 'dateRange'],
  data() {
    return {
      rawdata: null,
      options:
      {
        force: 3000,
        nodeSize: 20,
        nodeLabels: true,
        linkWidth: 5
      }
    }
  },
  components: { D3Network },
  created() {
    get_userlist(this)
  },
  computed: {
    nodes: function() {
      return extract_nodes(this.rawdata, this.userlist)
    },
    links: function() {
      return extract_links(this.rawdata)
    },
    ready: function() {
      return this.nodes !== null && this.links !== null
    }
  },
  watch: {
    dateRange: function() {
      update_rawdata(this)
    },
    channelId: function() {
      get_userlist(this)
    }
  },
  methods: {
    nodeClick: function(evt, node) {
      console.log(node.name)
    },
    linkClick: function(evt, link) {
      console.log(link.sid, link.tid)
    }
  }
}
</script>

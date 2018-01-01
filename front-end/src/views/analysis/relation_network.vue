<template>
    <d3-network v-if="ready" :net-nodes="nodes" :net-links="links" :options="options" :selection="{nodes: selected, links: linkSelected}" @node-click='nodeClick' @link-click='linkClick'>
      <selection v-if="ready" @action="selectionEvent" :data="selection()">
      </selection>
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
    var obj
    if (userlist.hasOwnProperty(idx)) {
      obj = { id: idx, name: userlist[idx].name, _color: '#' + userlist[idx].color, image: userlist[idx].image }
    } else {
      obj = { id: idx, name: idx }
    }
    return obj
  })
  console.log(nodes)
  return nodes
}

var extract_links = (data) => {
  if (!data) return null
  const links = []
  for (var i = data.length - 1; i >= 0; i--) {
    links.push({ id: data[i].from_user + '-' + data[i].to_user, sid: data[i].from_user, tid: data[i].to_user, _color: 'orange' })
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
  props: ['nodesData', 'linksData', 'teamId', 'channelId', 'dateRange', 'selectedNode'],
  data() {
    return {
      rawdata: null,
      options:
      {
        force: 3000,
        nodeSize: 20,
        nodeLabels: true,
        linkWidth: 5
      },
      selected: {},
      linkSelected: {}
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
      return this.nodes !== null && this.links !== null && this.userlist !== null
    }
  },
  watch: {
    dateRange: function() {
      update_rawdata(this)
    },
    channelId: function() {
      get_userlist(this)
    },
    selectedNode: function() {
      console.log('gg')
    }
  },
  methods: {
    selection: function() {
      return {
        nodes: this.selected,
        links: this.linkSelected
      }
    },
    selectionEvent(action, args) {
      const method = this[action]
      if (typeof method === 'function') {
        if (args) method(...args)
        else method()
      } else {
        console.error('Call to undefined method:', action)
      }
      this.updateSelection()
    },
    selectNodeId: function(id) {
      for (var i = this.nodes.length - 1; i >= 0; i--) {
        if (this.nodes[i].id === id) {
          this.selectNode(this.nodes[i])
          return
        }
      }
    },
    selectNode: function(node) {
      this.selected[node.id] = node
      // console.log(this.selected)
      this.$store.dispatch('SetSelection', this.selected)
    },
    selectLink: function(link) {
      this.linkSelected[link.id] = link
    },
    clearSelection: function() {
      this.selected = {}
      this.linkSelected = {}
    },
    nodeClick: function(evt, node) {
      // console.log(node)
      this.clearSelection()
      this.selectNode(node)
    },
    linkClick: function(evt, link) {
      // console.log(link.id)
      this.clearSelection()
      this.selectNodeId(link.sid)
      this.selectNodeId(link.tid)
      this.selectLink(link)
    }
  }
}
</script>
<style lang="css">
  .node.selected {
    stroke-width: 3;
    stroke: orange;
    stroke-opacity: 0.8;
  }
  .link.selected {
    stroke-width: 8;
  }
</style>

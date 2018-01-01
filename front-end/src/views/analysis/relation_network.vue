<template>
    <d3-network v-if="ready" :net-nodes="nodes" :net-links="links" :options="options" :selection="{nodes: selected, links: linkSelected}" @node-click='nodeClick' @link-click='linkClick'>
      <selection v-if="ready" @action="selectionEvent" :data="selection()">
      </selection>
    </d3-network>
</template>
<script>
import D3Network from 'vue-d3-network'
import { extract_nodes, extract_links, get_userlist, update_rawdata } from '@/api/data_process'

export default {
  name: 'network',
  props: { teamId: String, channelId: String, dateRange: Array },
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

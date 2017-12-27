<template>
    <d3-network :net-nodes="nodes" :net-links="links" :options="options">
    </d3-network>
</template>
<script>
import D3Network from 'vue-d3-network'
import { get_mention_info } from '@/api/slack_data'

var extract_nodes = (data) => {
  let nodes = new Set()
  for (var i = data.length - 1; i >= 0; i--) {
    nodes.add(data[i].to_user)
    nodes.add(data[i].from_user)
  }
  // process user related info
  nodes = Array.from(nodes).map(idx => { return { id: idx } })
  // console.log(nodes)
  return nodes
}

var extract_links = (data) => {
  const links = []
  for (var i = data.length - 1; i >= 0; i--) {
    links.push({ sid: data[i].from_user, tid: data[i].to_user, _color: 'orange' })
  }
  // console.log(links)
  return links
}

export default {
  name: 'network',
  props: ['nodesData', 'linksData', 'teamId'],
  data() {
    return {
      nodes: [
        { id: 'abc', name: 'my node 1' },
        { id: 2, name: 'my node 2' },
        { id: 3, _color: 'orange' },
        { id: 4 },
        { id: 5 },
        { id: 6 },
        { id: 7 },
        { id: 8 },
        { id: 9 }
      ],
      links: [
        { sid: 'abc', tid: 2, _color: 'red' },
        { sid: 2, tid: 8, _color: 'f0f' },
        { sid: 3, tid: 4, _color: 'rebeccapurple' },
        { sid: 4, tid: 5 },
        { sid: 5, tid: 6 },
        { sid: 7, tid: 8 },
        { sid: 5, tid: 8 },
        { sid: 3, tid: 8 },
        { sid: 7, tid: 9 }
      ],
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
    const params = {
      teamId: this.teamId,
      channelId: this.channelId
    }
    console.log(params.teamId)
    get_mention_info().then(responce => {
      // console.log(responce)
      const nodes = extract_nodes(responce.data.mention)
      const links = extract_links(responce.data.mention)
      this.nodes = nodes
      this.links = links
    })
  }
}
</script>
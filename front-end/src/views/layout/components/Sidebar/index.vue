<template>
  <scroll-bar>
    <el-menu mode="vertical" unique-opened :default-active="$route.path" :collapse="isCollapse" background-color="#304156" text-color="#fff" active-text-color="#409EFF">
      <sidebar-item :routes="routes"></sidebar-item>
    </el-menu>
  </scroll-bar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import ScrollBar from '@/components/ScrollBar'
import { constantRouterMap } from '@/router'

export default {
  components: { SidebarItem, ScrollBar },
  computed: {
    ...mapGetters([
      'sidebar',
      'channel_list',
      'team_info'
    ]),
    routes() {
      const menu_items = JSON.parse(JSON.stringify(constantRouterMap))
      if (!this.channel_list) {
        return menu_items
      }
      // console.log(menu_items)
      const channelList = this.channel_list
      // console.log(channelList)
      for (const channelId in channelList) {
        // console.log(channel_list[i])
        // console.log(channelId)
        const new_item = { path: channelId, hidden: false, meta: { title: channelList[channelId].name }}
        menu_items[4].children.push(new_item)
      }
      return menu_items
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>

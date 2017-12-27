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
      'channel_list'
    ]),
    routes() {
      const menu_items = JSON.parse(JSON.stringify(constantRouterMap))
      // console.log(menu_items)
      const channel_list = this.channel_list
      for (let i = 0; i < channel_list.length; i++) {
        // console.log(channel_list[i])
        const new_item = { path: channel_list[i].name, hidden: false, meta: { title: channel_list[i].name }}
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

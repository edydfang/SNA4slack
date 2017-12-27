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

export default {
  components: { SidebarItem, ScrollBar },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      // need to use store to prevent duplication
      const original_router = this.$router.options.routes.slice()
      const new_item = { path: 'demochannel', hidden: false, meta: { title: 'demotitle' }}
      console.log(original_router)
      original_router[4].children.push(new_item)
      return original_router
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>

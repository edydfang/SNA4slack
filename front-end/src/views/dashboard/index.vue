<template>
  <div class="dashboard-container">
    <div class="dashboard-text">Welcome, {{name}}!!</div>
    <div class="dashboard-text">Your role: <span v-for='role in roles' :key='role'>{{role}}</span>
    <p>Current Chosen Team is {{team_info}} {{channel_list}}</p>
    </div>
    <!--barchart></barchart-->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import { get_channel_statistics } from '@/api/data_process'
// import Barchart from '../analysis/barchart'
export default {
  name: 'dashboard',
  created() {
    // get_channel_statistics(this.team_info.id, Object.keys(this.channel_list), this.channel_statistics)
  },
  data() {
    return {
      channel_statistics: null
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles',
      'team_info',
      'channel_list'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>

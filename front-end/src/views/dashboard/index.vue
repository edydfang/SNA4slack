<template>
  <div class="dashboard-container">
    <div class="dashboard-text text-small">Welcome, {{name}} !!!
    Your role: <span v-for='role in roles' :key='role'>{{role}}.</span>
    <br> Current Chosen Team is <el-tag class="text-small">{{team_info.name}}</el-tag>, Domain <el-tag class="text-small">{{team_info.domain}}</el-tag>.
    </div>
    <br>
    <h2 style="font-size: 2em; font-weight: bold;">Channel Description</h2>
      <el-table
    :data="Object.values(this.channel_list)"
    stripe
    style="width: 100%; margin-top: 10px; font-size:16px">
    <el-table-column
      prop="name"
      label="Channel Name"
      width="180">
    </el-table-column>
    <el-table-column
      prop="num_members"
      label="Number of members"
      width="180">
    </el-table-column>
    <el-table-column
      prop="purpose"
      label="Purpose">
    </el-table-column>
  </el-table>
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
.text-small {
    font-size: 20px;
}
</style>

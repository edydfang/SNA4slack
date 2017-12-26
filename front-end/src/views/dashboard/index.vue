<template>
  <div class="dashboard-container">
    <div class="dashboard-text">Welcome, {{name}}!!</div>
    <div class="dashboard-text">role:<span v-for='role in roles' :key='role'>{{role}}</span>
    <p>Current Chosen Team is {{slack_name}}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'dashboard',
  computed: {
    ...mapGetters([
      'name',
      'roles',
      'slack_name'
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

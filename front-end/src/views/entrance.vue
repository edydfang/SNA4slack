<template>
    <el-container>
        <el-header id="header">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item index="1">Homepage</el-menu-item>
                <el-menu-item index="2">About</el-menu-item>
            </el-menu>
        </el-header>
        <el-main>
        <el-row type="flex" justify="center">
            <el-col :span="3" :xs="6">
                <img src="../assets/logo.png">
            </el-col>
            <el-col :span="2" :xs="4">
                <img id="img-cross" src="../assets/cross.png">
            </el-col>
            <el-col :span="3" :xs="6">
                <img src="../assets/slack-logo.png">
            </el-col>
        </el-row>
        <el-row  type="flex" justify="center">
            <h1 class="title is-1">SNA4Slack</h1>
        </el-row>
        <el-row  type="flex" justify="center">
            <p id="tips">Find an existing workspace and start to explore.</p>
        </el-row>
        <el-row type="flex" justify="center">
            <el-col :span="5" :xs="16">
                <el-input v-model="input_slack" placeholder="example.slackarchive.io" @keyup.enter.native="analyze"></el-input>
            </el-col>
            <el-col :span="3" :xs="8">
                <div id="analyze-button">
                <el-button :style="{'width':'90%'}" @click='analyze' type="primary">Analysis</el-button>
                </div>
            </el-col>
        </el-row>
        <el-row type="flex" justify="center">
            <div class="box" id="allteams"><h3 class="title is-4">All available teams: </h3>
                <span v-if="all_teams" v-for="team in all_teams" class="tag available-team"> {{ team.domain  }} </span>
            </div>
        </el-row>
    </el-main>
        <el-footer>
            <el-row :style="{'margin-top':'3em'}" type="flex" justify="center">
                <el-col :span="24">
                    <hr>
                    <p>Copyright &copy; 2017, SUSTech</p>
                </el-col>
            </el-row>
        </el-footer>
   </el-container>
</template>
<script>
import { get_all_team } from '@/api/slack_data'
export default {
  name: 'entrypage',
  data() {
    return {
      input_slack: '',
      activeIndex: '1',
      all_teams: null
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
      this.activeIndex = key
    },
    analyze() {
      // console.log(this.$data.input_slack)
      this.$store.dispatch('SetSlackInfo', this.input_slack)
      this.$router.push('/dashboard')
    }
  },
  mounted: function() {
    // console.log(this)
    get_all_team().then(response => {
      this.all_teams = response.data.team
      // console.log(typeof(this.all_teams))
      // this.all_teams = "success"
    }).catch(error => {
      console.log(error)
    })
  }
}

</script>
<style>
img {
  width: 100%;
  height: auto;
  display: block;
}
#img-cross {
  width: 60%;
  margin-top: 50%;
  display: flex;
  margin-left: 15%;
}
#analyze-button {
  padding-left: 5%;
}
p#tips {
  line-height: 50px;
  font-size: 1.2rem;
  text-align: center;
}
div#allteams {
  margin-top: 30px;
}
.available-team {
  display: inline-block;
  margin: auto 5px 10px 5px;
}
</style>

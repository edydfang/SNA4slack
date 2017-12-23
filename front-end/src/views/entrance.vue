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
            <h1 class="title">SNA4Slack</h1>
        </el-row>
        <el-row  type="flex" justify="center">
            <p id="tips">Find an existing workspace and start to explore.</p>
        </el-row>
        <el-row type="flex" justify="center">
            <el-col :span="5" :xs="16">
                <el-input v-model="input_slack" placeholder="example.slackarchive.io"></el-input>
            </el-col>
            <el-col :span="3" :xs="8">
                <div id="analyze-button">
                <el-button :style="{'width':'90%'}" @click='analyze' type="primary">Analysis</el-button>
                </div>
            </el-col>
        </el-row>
    </el-main>
        <el-footer>
            <el-row :style="{'margin-top':'7em'}" type="flex" justify="center">
                <el-col :span="24">
                    <hr>
                    <p>Copyright &copy; 2017, SUSTech</p>
                </el-col>
            </el-row>
        </el-footer>
   </el-container>
</template>
<script>
  export default {
    name: 'entrypage',
    data() {
      return {
        input_slack: '',
        activeIndex: '1'
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath)
      },
      analyze() {
        // console.log(this.$data.input_slack)
        this.$store.dispatch('SetSlackName', this.$data.input_slack)
        this.$router.push('/dashboard')
      }
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
    }
</style>
<template>
  <div class="app-container">
    <el-row>
      <el-col :span='12'>
        <el-card class='box-card box1'>
          <div slot="header" class="clearfix">
            <span class="text">WordCloud</span>
          </div>
          <div>
            <mywordcloud
              :team-id="this.team_info.id"
            ></mywordcloud>
          </div>
        </el-card>
      </el-col> 
      <el-col :span='12'>
        <el-card class='box-card box2'>
          <div slot="header" class="clearfix">
            <span>graph2</span>
          </div>
          <div>
            ...
          </div>
        </el-card>
      </el-col> 
    </el-row>
    
     
  </div>
</template>

<script>
import mywordcloud from './word_cloud.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'analysis-chat',
  components: {
    mywordcloud
  },
  computed: {
    ...mapGetters([
      'team_info'
    ])
  }
}

</script>

<style scoped>
.box3{
  margin-left: 3%;
  margin-right: 3%;
  margin-top: 3%;
  height: 0px;
  padding-bottom: 27%;
}
.box1{
  margin-left: 6%;
  margin-right: 5%;

}
.box2{
  margin-left: 5%;
  margin-right: 6%;
  height: 0px;
  padding-bottom: 50%;
}
.text {
  font-size: 18px;
  font-family: 'Mukta Malar', sans-serif;
  font-weight: bold;
  color:#304156;
}
</style>


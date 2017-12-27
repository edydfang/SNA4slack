<template>
  <div class="app-container">
    <el-row  style="margin-bottom: 20px">
        <el-col :span="15">
        <span class="demonstration card-panel-text" style="font-size:16px">Date:</span>
        <el-date-picker
          v-model="date"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="to "
          start-placeholder="start"
          end-placeholder="end"
          :picker-options="pickerOptions">
        </el-date-picker>
        </el-col>
        <el-col :span="8">
        <p id="channel-choice"> <span v-if="isOverview"> Overview </span> <span v-else>Selected Channel {{channelId}}</span></p>
        </el-col>
    </el-row>
      <el-row>
        <el-col :span="15">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>Graph</span>
              <el-button style="float: right; padding: 3px " type="text"  v-on:click="changeType()">操作按钮</el-button>
            </div>
            <div>
              <network :team-id="this.team_info.id" :channel-id="this.channelId"></network>
              <!--img src="../../assets/graph.jpg" style="width:60%"-->
            </div>
          </el-card>
        </el-col>

        <el-col :span="8" class='margin'>
          <el-card v-if="type === 'edge'" class="box-card2">
            <div slot="header" class="clearfix">
              <span>Info-edge</span>
            </div>
            <div>
              <el-row class='addline'>
                <el-col :span="12" >
                  <img src="../../assets/friends.svg"  class="admin">
                  <div class="admin-name">{{admin1}}</div>
                </el-col>
                <el-col :span="12" >
                  <img src="../../assets/friends.svg"  class="admin">
                  <div class="admin-name">{{admin2}}</div>
                </el-col>
              </el-row>
              <el-row class='addline' style="margin-left:5%; margin-right:5%">
                <div class="text item">
                  <svg-icon icon-class="goodfriends" />
                  <span style='margin-left:3%'>Intimate Degree:</span>
                  <span>80%</span>
                </div>
                <div class="text item">
                  <svg-icon icon-class="smell" />
                  <span style='margin-left:3%'>Emotional Analysis:</span>
                  <span>80%</span>
                </div>
                <div class="text item">
                  <svg-icon icon-class="date" />
                  <span style='margin-left:3%'>Meet Days:</span>
                  <span>153 days</span>
                </div>
              </el-row>
              <div class='chat-div' >
                <article class="media" >
                <figure class="media-right" >
                  <p class="image is-64x64">
                    <img src="../../assets/friends.svg"  class="admin">
                  </p>
                </figure>
                <div class="media-content" >
                  <div class="content content-left" >
                    <p>
                      <br>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.
                    </p>
                  </div>
                </div>
              </article>
              <article class="media" >
                <div class="media-content content-right">
                  <div class="content">
                    <p>
                      <br>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.
                    </p>
                  </div>
                </div>
                <figure class="media-right"  >
                  <p class="image is-64x64">
                    <img src="../../assets/friends.svg"  class="admin">
                  </p>
                </figure>
              </article>
              </div>
            </div>
          </el-card>
          <el-card v-if="type === 'node'" class="box-card2">
            <div slot="header" class="clearfix">
              <span>Info-node</span>
            </div>
            <div>
              <el-row class='addline'>
                <el-col :span="6" >
                  <img src="../../assets/friends.svg"  class="admin2"><span>&nbsp</span>
                </el-col>
                <el-col :span="10" :offset='3'>
                  <div class="admin-name" style="text-align:left">{{admin1}}</div>
                  <div class="text" style="text-align:left">sustech.......</div>
                </el-col>
              </el-row>
              <el-row class='addline' style="margin-left:5%; margin-right:5%">
                <div class="text item">
                  <svg-icon icon-class="activity" /> 
                  <span style='margin-left:3%'>Activity Degree:</span>
                  <span>80%</span>
                </div>
                <div class="text item">
                  <svg-icon icon-class="smell" /> 
                  <span style='margin-left:3%'>Emotional Analysis:</span>
                  <span>80%</span>
                </div>
                <div class="text item">
                  <svg-icon icon-class="date" /> 
                  <span style='margin-left:3%'>Meet Days:</span>
                  <span>153 days</span>
                </div>
              </el-row>

              <div class='chat-div' >
              <article class="media" >
                <figure class="media-right" >
                  <p class="image is-64x64">
                    <img src="../../assets/friends.svg"  class="admin">
                  </p>
                </figure>
                <div class="media-content" >
                  <div class="content content-left" >
                    <p>
                      <br>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.
                    </p>
                  </div>
                </div>
              </article>
              <article class="media" >
                <figure class="media-right" >
                  <p class="image is-64x64">
                    <img src="../../assets/friends.svg"  class="admin">
                  </p>
                </figure>
                <div class="media-content" >
                  <div class="content content-left" >
                    <p>
                      <br>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.
                    </p>
                  </div>
                </div>
              </article>
            </div>
            </div>
          </el-card>
        </el-col>
      </el-row>

      <el-row style="margin-top:1%">
        <el-col :span="5" >
          <el-card  class='tag-card'>
            <el-col :span="14" >
              <img src="../../assets/friends.svg" class="tag-img">
            </el-col>
            <el-col :span="10" >
              <div class='card-panel-text'>Accounts</div>
              <span class='card-panel-num'>{{account}}</span>
            </el-col>
          </el-card>
        </el-col>
        <el-col :span="5" class='margin2'>
          <el-card class='tag-card'>
              <el-col :span="14" >
              <img src="../../assets/message.svg" class="tag-img">
            </el-col>
            <el-col :span="10" class=''>
              <div class='card-panel-text'>Messages</div>
              <span class='card-panel-num'>{{message}}</span>
            </el-col>
          </el-card>
        </el-col>
        <el-col :span="5" class='margin2'>
          <el-card class='tag-card'>
              <el-col :span="14" >
              <img src="../../assets/at.svg" height="60"  class="tag-img">
            </el-col>
            <el-col :span="10" class=''>
              <div class='card-panel-text'>Relations</div>
              <span class='card-panel-num'>{{at}}</span>
            </el-col>
          </el-card>
        </el-col>
        <el-col :span="5" class='margin2'>
          <el-card class='tag-card'>
              <el-col :span="14" >
              <img src="../../assets/date.svg" height="60"  class="tag-img">
            </el-col>
            <el-col :span="10" class=''>
             <div class='card-panel-text'>Created</div>
              <span class='card-panel-num'>{{created}}</span>
            </el-col>
          </el-card>
        </el-col>

      </el-row>
  </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Network from './relation_network.vue'
export default {
  name: 'analysis-utils',
  props: ['channelId', 'isOverview'],
  components: {
    Network
  },
  data() {
    return {
      type: 'edge',
      account: 1000,
      message: 500,
      at: 88,
      created: '2017.9',
      date: '',
      admin1: 'Fang',
      admin2: 'Xieyi',
      pickerOptions: {
        shortcuts: [{
          text: 'Latest week',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: 'Latest month',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  computed: {
    ...mapGetters([
      'team_info'
    ])
  },
  methods: {
    changeType: function() {
      if (this.type === 'edge') {
        this.type = 'node'
      } else {
        this.type = 'edge'
      }
    }
  }

}
</script>

<style>
  #channel-choice {
    line-height: 40px;
    font-size: 18px;
    padding-left: 40px;
  }
  .text {
    font-size: 16px;
    font-family: 'Nunito', sans-serif;
    color:#304156;
  }
  .item {
    margin-bottom: 4%;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .margin {
    margin-left: 2%;
  }
  .margin2 {
    margin-left: 4.8%;
  }
  .card-panel-text {
    line-height: 18px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 18px;
    margin-bottom: 6px;
    font-weight:bold;
    font-family: 'Mukta Malar', sans-serif;
  }
.card-panel-num{
    font-size: 20px;
    font-weight: bold;
    color:#666;
    font-family: 'Nunito', sans-serif;

}
.box-card {
    height: 0px;
    padding-bottom: 70%;
  }
  .box-card2 {
    height: 0px;
    padding-bottom: 131%;
  }
.tag-card
{
  position: relative;
  height:100px;
}
.tag-img{
  width:40%; 
  padding:6px;
  margin-bottom: 5%;
}

.admin {
  padding:1%;
  margin-left: 25%; 
  margin-top: 5%;
  width: 45%;
  border-radius: 50%;
  border: 3px solid #eee;
  overflow: hidden;
}
.admin2 {
  padding:1%;
  margin-left: 6%; 
  margin-top: 5%; 
  border-bottom-right-radius: 5px;
  width: 100%;
  border-radius: 50%;
  border: 3px solid #eee;
  overflow: hidden;
}
.admin-name{
  margin-bottom: 3px;
  font-size: 20px;
  color: rgba(0, 0, 0, 0.45);
  font-family: 'Nunito', sans-serif;
  text-align: center;
}
.addline{
  border-bottom: 2px solid #ebeef5;
  margin-bottom: 5%;
}

.chat-div{
  height:0px;
  width:95%;
  padding-bottom:43%;
  float:left; 
  overflow-y:scroll;
  margin-right: 5%;
}

.content-left{
  margin-right: 10%;
  width: 90%;
}
.content-right{
  margin-left: 10%;
  width: 90%;
}
.media+.media {
    margin-top: 0px;
    padding-top: 0px;
    border-top: 0px;
}


</style>

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
          :clearable="false"
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
            <div >
              <network
                :team-id="this.team_info.id"
                :channel-id="this.channelId"
                :date-range="this.date"
              ></network>
              <!--img src="../../assets/graph.jpg" style="width:60%"-->
            </div>
          </el-card>
        </el-col>

        <el-col :span="8" class='margin'>
          <el-card v-if="type === 'edge'" class="box-card2">
            <div>
              <el-row class='addline'>
                <el-col :span="12" >
                  <img :src='admin1.image' class="admin">
                  <div class="admin-name">{{admin1.name}}</div>
                </el-col>
                <el-col :span="12" >
                  <img :src='admin2.image'  class="admin">
                  <div class="admin-name">{{admin2.name}}</div>
                </el-col>
              </el-row>
              <el-row class='addline' style="margin-left:5%; margin-right:5%">
                <div class="text item">
                  <svg-icon icon-class="goodfriends" />
                  <span style='margin-left:3%'>Intimate Degree:</span>
                  <span>{{itimate}}</span>
                </div>
                <div class="text item">
                  <svg-icon icon-class="smell" />
                  <span style='margin-left:3%'>Emotional Analysis:</span>
                  <span>{{sentiment}}</span>
                </div>
                <div class="text item">
                  <svg-icon icon-class="date" />
                  <span style='margin-left:3%'>Meet Days:</span>
                  <span>153 days</span>
                </div>
              </el-row>
              <div class='chat-div' >
                <div v-for="record in chat_record">
                <article class="media" v-if="record.user === admin1.id">
                <figure class="media-right" >
                  <p class="image is-64x64">
                    <img :src='admin1.image'  class="admin">
                    <div class='time-text'>{{record.date1}}</div>
                    <div class='time-text2'>{{record.date2}}</div>
                  </p>
                </figure>
                <div class="media-content" >
                  <div class="content content-left" >
                    <p>
                      <br>
                      {{record.text}}
                    </p>
                  </div>
                </div>
              </article>
              <article class="media" v-if="record.user === admin2.id">
                <div class="media-content content-right">
                  <div class="content">
                    <p>
                      <br>
                      {{record.text}}
                    </p>
                  </div>
                </div>
                <figure class="media-right"  >
                  <p class="image is-64x64">
                    <img :src='admin2.image'  class="admin">
                    <div class='time-text'>{{record.date1}}</div>
                    <div class='time-text2'>{{record.date2}}</div>
                  </p>
                </figure>
              </article>
              </div>
              </div>
            </div>
          </el-card>
          <el-card v-if="type === 'node'" class="box-card2">
            <div>
              <el-row class='addline'>
                <el-col :span="6" >
                  <img :src='admin1.image' class="admin2"><span>&nbsp</span>
                </el-col>
                <el-col :span="10" :offset='2'>
                  <div class="admin-name-n" style="text-align:left">{{admin1.name}}</div>
                  <div class="text" style="text-align:left"></div>
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
                  <span>{{sentiment}}</span>
                </div>
                <div class="text item">
                  <svg-icon icon-class="date" /> 
                  <span style='margin-left:3%'>Meet Days:</span>
                  <span>153 days</span>
                </div>
              </el-row>

              <div class='chat-div' >
              <article class="media" v-for="record in chat_record" >
                <figure class="media-right" >
                  <p class="image is-64x64">
                    <img :src='admin1.image'  class="admin">
                    <div class='time-text'>{{record.date1}}</div>
                    <div class='time-text2'>{{record.date2}}</div>
                  </p>
                </figure>
                <div class="media-content" >
                  <div class="content content-left" >
                    <p>
                      <br>
                      {{record.text}}
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
            <el-col :span="6"  style="margin-right: 20px">
              <img src="../../assets/friends.svg" class="tag-img">
            </el-col>
            <el-col :span="10" >
              <div class='card-panel-text'>Accounts</div>
              <span class='card-panel-num'>{{info.accounts}}</span>
            </el-col>
          </el-card>
        </el-col>
        <el-col :span="5" class='margin2'>
          <el-card class='tag-card'>
              <el-col :span="6"  style="margin-right: 20px">
              <img src="../../assets/message.svg" class="tag-img">
            </el-col>
            <el-col :span="10">
              <div class='card-panel-text' >Messages</div>
              <span class='card-panel-num'>{{info.messages}}</span>
            </el-col>
          </el-card>
        </el-col>
        <el-col :span="5" class='margin2'>
          <el-card class='tag-card'>
              <el-col :span="6"  style="margin-right: 20px">
              <img src="../../assets/at.svg" class="tag-img">
            </el-col>
            <el-col :span="10" class=''>
              <div class='card-panel-text'>Relations</div>
              <span class='card-panel-num'>{{info.relations}}</span>
            </el-col>
          </el-card>
        </el-col>
        <el-col :span="5" class='margin2'>
          <el-card class='tag-card'>
              <el-col :span="6"  style="margin-right: 20px">
              <img src="../../assets/date.svg" class="tag-img">
            </el-col>
            <el-col :span="10" class=''>
             <div class='card-panel-text'>Created</div>
              <span class='card-panel-num'>{{info.earliest}}</span>
            </el-col>
          </el-card>
        </el-col>

      </el-row>
  </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { get_channel_info } from '@/api/slack_data'
import { get_chat_record_node } from '@/api/slack_data'
import { get_chat_record_edge } from '@/api/slack_data'
import { get_sentiment_node } from '@/api/slack_data'
import { get_itimate_edge } from '@/api/slack_data'
import { get_sentiment_edge } from '@/api/slack_data'
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
      info: '',
      sentiment: 0,
      itimate: 0,
      activityDegree: 0,
      date: [new Date(2008, 1, 1), new Date()],
      admin1: { id: 'Admin1', name: 'Admin1', image: 'static/friends.svg' },
      admin2: { id: 'Admin2', name: 'Admin2', image: 'static/friends.svg' },
      chat_record: [{ user: 'Admin', time: '', text: '', date1: '', date2: '' }, { user: 'Admin', time: '', text: '', date1: '', date2: '' }],
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
    ]),
    ...mapGetters([
      'selected_info'
    ])
  },
  watch: {
    selected_info: function() {
      this.clearSelection()
      var count = 0
      for (var s in this.selected_info) {
        if (count === 1) {
          this.admin2 = this.selected_info[s]
          this.type = 'edge'
        } else {
          this.admin1 = this.selected_info[s]
          count++
          this.type = 'node'
        }
      }
      if (this.type === 'edge') {
        this.edgeInfo()
      } else {
        this.nodeInfo()
      }
    },
    channelId: function() {
      this.clearSelection()
      get_channel_info(this.team_info.id, this.channelId, this.date[0], this.date[1]).then(response => {
        this.info = response.data
        this.dateFormat(this.info.earliest)
      }).catch(error => {
        console.log(error)
      })
    },
    date: function() {
      this.clearSelection()
      get_channel_info(this.team_info.id, this.channelId, this.date[0], this.date[1]).then(response => {
        this.info = response.data
        this.dateFormat(this.info.earliest)
      }).catch(error => {
        console.log(error)
      })
      if (this.type === 'edge') {
        this.edgeInfo()
      } else {
        this.nodeInfo()
      }
    }
  },
  methods: {
    nodeInfo: function() {
      get_sentiment_node(this.team_info.id, this.channelId, this.date[0], this.date[1], this.admin1.id).then(response => {
        this.sentiment = response.data.sentiment.positive
        if (this.sentiment === 2) {
          this.sentiment = 'not available :('
        }
      }).catch(error => {
        console.log(error)
      })
      get_chat_record_node(this.team_info.id, this.channelId, this.date[0], this.date[1], this.admin1.id).then(response => {
        this.chat_record = response.data
        for (var i in this.chat_record) {
          this.chat_record[i].date1 = this.dateFormat2(this.chat_record[i].timestamp).split(',')[0]
          this.chat_record[i].date2 = this.dateFormat2(this.chat_record[i].timestamp).split(',')[1]
        }
      }).catch(error => {
        console.log(error)
      })
    },
    edgeInfo: function() {
      get_sentiment_edge(this.team_info.id, this.channelId, this.date[0], this.date[1], this.admin1.id, this.admin2.id).then(response => {
        this.sentiment = response.data.sentiment.positive
        if (this.sentiment === 2) {
          this.sentiment = 'not available :('
        }
      }).catch(error => {
        console.log(error)
      })
      get_chat_record_edge(this.team_info.id, this.channelId, this.date[0], this.date[1], this.admin1.id, this.admin2.id).then(response => {
        this.chat_record = response.data
        for (var i in this.chat_record) {
          this.chat_record[i].date1 = this.dateFormat2(this.chat_record[i].timestamp).split(',')[0]
          this.chat_record[i].date2 = this.dateFormat2(this.chat_record[i].timestamp).split(',')[1]
        }
      }).catch(error => {
        console.log(error)
      })
      get_itimate_edge(this.team_info.id, this.channelId, this.date[0], this.date[1], this.admin1.id, this.admin2.id).then(response => {
        this.itimate = response.data.intimate
      }).catch(error => {
        console.log(error)
      })
    },
    clearSelection: function() {
      this.activityDegree = 0
      this.itimate = 0
      this.sentiment = 0
      this.type = 'edge'
      this.admin1 = { name: 'Admin1', image: 'static/friends.svg' }
      this.admin2 = { name: 'Admin2', image: 'static/friends.svg' }
      this.chat_record = [{ user: 'Admin', time: '', text: '', date1: '', date2: '' }, { user: 'Admin', time: '', text: '', date1: '', date2: '' }]
    },
    dateFormat: function(unixtime) {
      var unixTimestamp = new Date(unixtime * 1000)
      this.info.earliest = unixTimestamp.toLocaleString().split(',')[0]
    },
    dateFormat2: function(unixtime) {
      var unixTimestamp = new Date(unixtime * 1000)
      return unixTimestamp.toLocaleString()
    }
  },
  mounted: function() {
    get_channel_info(this.team_info.id, this.channelId, this.date[0], this.date[1]).then(response => {
      this.info = response.data
      this.dateFormat(this.info.earliest)
    }).catch(error => {
      console.log(error)
    })
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
  width:100%;
  padding:6px;
  margin-bottom: 5%;
}

.admin {
  padding:1%;
  margin-left: 25%;
  margin-top: 5%;
  width: 45%;
  border-radius: 50%;
  border: 3px solid #ebeef5;
  overflow: hidden;
}
.admin2 {
  padding:1%;
  margin-top: 5%;
  margin-left: 6%; 
  border-bottom-right-radius: 5px;
  width: 100%;
  border-radius: 50%;
  border: 3px solid #ebeef5;
  overflow: hidden;
}
.admin-name{
  margin-bottom: 3px;
  font-size: 20px;
  color: rgba(0, 0, 0, 0.45);
  font-family: 'Nunito', sans-serif;
  text-align: center;
  text-transform:capitalize;
}
.admin-name-n{
  margin-top: 8%;
  margin-bottom: 3px;
  font-size: 24px;
  color: rgba(0, 0, 0, 0.45);
  font-family: 'Nunito', sans-serif;
  text-align: center;
  text-transform:capitalize;
}
.addline{
  border-bottom: 2px solid #ebeef5;
  margin-bottom: 5%;
}

.chat-div{
  height:0px;
  width:95%;
  padding-bottom:60%;
  float:left; 
  overflow-y:scroll;
  overflow-x: hidden;
  margin-right: 5%;
  margin-left: 5%;
}

.content-left{
  width: 90%;
  word-break: break-all;
}
.content-right{
  margin-left: 3%;
  margin-right: 2%;
  width: 90%;
  text-align: right;
  word-break: break-all;
}
.media+.media {
  margin-top: 0px;
  padding-top: 0px;
  border-top: 0px;
}
.time-text{
  margin-left: 30%;
  text-align: center;
  color: rgba(0, 0, 0, 0.45);
  font-family: 'Nunito', sans-serif;
  font-size: 11px;
}
.time-text2{
  margin-left: 0%;
  text-align: center;
  color: rgba(0, 0, 0, 0.45);
  font-family: 'Nunito', sans-serif;
  font-size: 11px;
}
.media-right{
  margin-top:0em;
  margin-right: 40px;
  margin-left: 0px;
  margin-bottom:  5px; 
}

</style>

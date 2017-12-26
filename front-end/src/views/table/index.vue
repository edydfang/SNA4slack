<template>
  <div class="app-container">
     <div class="block">
        <span class="demonstration card-panel-text" style="font-size:16px">Date:&nbsp&nbsp</span>
        <el-date-picker
          v-model="date"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="to "
          start-placeholder="start"
          end-placeholder="end"
          :picker-options="pickerOptions2">
        </el-date-picker>
        {{date}}
      </div>

      <el-row>
        <el-col :span="15" :offset='0'>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>Graph</span>
              <el-button style="float: right; padding: 3px " type="text"  v-on:click="changeType()">操作按钮</el-button>
            </div>
            <div>
              <img src="../../assets/graph.jpg" height="600" >
            </div>
          </el-card>
        </el-col>

        <el-col :span="8" class='margin'>
          <el-card v-if="type === 'edge'" class="box-card">
            <div slot="header" class="clearfix">
              <span>Info-edge</span>
            </div>
            <div>
              <el-row class='addline'>
                <el-col :span="12" >
                  <img src="../../assets/friends.svg"  class="admin">
                </el-col>
                <el-col :span="12" >
                  <img src="../../assets/friends.svg"  class="admin">
                </el-col>
              </el-row>
            </div>
              
          </el-card>
          <el-card v-if="type === 'node'" class="box-card">
            <div slot="header" class="clearfix">
              <span>Info-node</span>
            </div>
            <div>
              <el-row class='addline'>
                <el-col :span="6" >
                  <img src="../../assets/friends.svg"  class="admin2">
                </el-col>
                <el-col :span="10" :offset='3'>
                  相关信息
                </el-col>
              </el-row>
              
            </div>
          </el-card>
        </el-col>
      </el-row>

      <el-row style="margin-top:2%">
        <el-col :span="5" >
          <el-card  class='tag-card'>
            <el-col :span="14" >
              <img src="../../assets/friends.svg" height="60"  style="padding:7px">
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
              <img src="../../assets/message.svg" height="60"  style="padding:7px">
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
              <img src="../../assets/at.svg" height="60"  style="padding:7px">
            </el-col>
            <el-col :span="10" class=''>
              <div class='card-panel-text'>Relationship</div>
              <span class='card-panel-num'>{{at}}</span>
            </el-col>
          </el-card>
        </el-col>
        <el-col :span="5" class='margin2'>
          <el-card class='tag-card'>
              <el-col :span="14" >
              <img src="../../assets/date.svg" height="60"  style="padding:8px">
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

export default {

  data() {
    return {
      type: 'edge',
      account: 1000,
      message: 500,
      at: 88,
      created: '2017.9',
      date: '',
      pickerOptions2: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
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

  .text {
    font-size: 14px;
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
.card-panel-num {
    font-size: 20px;
    font-weight: bold;
    color:#666;
    font-family: 'Nunito', sans-serif;

}
.box-card {
    position: relative;
    height: 680px;
  }
.tag-card
{
  position: relative;
  height: 100px;
}

.admin {
  padding:1%;
  margin-left: 25%; 
  margin-top: 5%;
  margin-bottom: 5%;
  width: 45%;
  border-radius: 50%;
  border: 3px solid #eee;
   overflow: hidden;
}
.admin2 {
  padding:1%;
  margin-left: 6%; 
  margin-top: 5%; 
  margin-bottom: 5%;
  width: 100%;
  border-radius: 50%;
  border: 3px solid #eee;
   overflow: hidden;
}
.addline{
  border-bottom: 2px solid #ebeef5;
}

</style>

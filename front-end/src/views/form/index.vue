<template>
  <div class="app-container">
    <el-row>
      <el-col :span='12'>
        <el-card class='box-card box1'>
          <div slot="header" class="clearfix">
            <span>graph1</span>
          </div>
          <div>
            ...
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
    <el-row>
      <el-col :span='24' >
        <el-card class='box-card box3'>
          <div slot="header" class="clearfix">
            <span>graph3</span>
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
  height: 0px;
  padding-bottom: 50%;
}
.box2{
  margin-left: 5%;
  margin-right: 6%;
  height: 0px;
  padding-bottom: 50%;
}

</style>


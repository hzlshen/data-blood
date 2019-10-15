<style scoped>
  .index-home {
    padding: 20px;
    min-height: 500px;
  }
</style>
<template>
 <div class="index-home">
   <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="echart" name="echart">
        
      </el-tab-pane>
      <el-tab-pane label="jsPlumb" name="jsPlumb">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
    </el-tabs>
 </div>


</template>

<script>

export default {
  data () {
    return {
      activeName: 'echart'
    }
  },
  methods: {
   handleClick() {
    },
  },
  computed: {
   
  },
  mounted() {
  }
}
</script>
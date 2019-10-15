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
        <echart-type></echart-type>
      </el-tab-pane>
      <el-tab-pane label="jsPlumb" name="jsPlumb">
        <jsplumb-type></jsplumb-type>
      </el-tab-pane>
      <el-tab-pane label="d3" name="d3">
        <d3-type></d3-type>
      </el-tab-pane>
      <el-tab-pane label="cyroscape" name="cyroscape">
        <cytoscape-type></cytoscape-type>
      </el-tab-pane>
    </el-tabs>
 </div>


</template>

<script>
import echartType from './type/echart'
import d3Type from './type/d3'
import jsplumbType from './type/jsplumb'
import cytoscapeType from './type/cytoscape'
export default {
  components: {
    echartType,
    d3Type,
    jsplumbType,
    cytoscapeType
  },
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
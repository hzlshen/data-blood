<template>
  <div class="feature">
    <div class="boxtop">
      <div class="posbtn">
          <el-input
            class="search"
            placeholder="请输入内容"
            v-model="input">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <span class="span">构建新特征</span>
          <span class="span">特征自动分析</span>
          <el-radio style="margin-right:20px;" v-model="resource" label="线上品牌商赞助"></el-radio>
        </div>
      <el-tabs class="tabsBox" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane v-for="list in featureList" :key="list.nodeName" :label="list.nodeName" :name="list.nodeName">
          <!-- {{list.nodeName}} -->
          <el-card class="boxLeft">
            <div v-for="(child,index) in list.children" :key="index" @click="clickList(child,index)" class="text">
              {{child.nodeName}}
            </div>
          </el-card>
          <el-card class="boxCenter">
            <div class="textFor" v-for="grand in childList" :key="grand.nodeName">
              <p >{{grand.nodeName}}</p>
              <div v-for="(item,index) in grandList" :key="item.nodeName" class="colorbtn" :class="{'textbtn':item.Active}" @click="btnclick(index,item)">
                {{item.nodeName }}
              </div>
            </div>
          </el-card>
          <div class="boxRight">
            <div class="numTitle">
              <p>已选特征: <b>11</b> </p>
              <p>标签取交集</p>
            </div>
            <div class="rightList">
              <div class="selectList" v-for="o in 4" :key="o">
                <p>user特征</p>
                <div v-for="o in 4" :key="o" class="selebtn">
                  {{'列表内容 ' + o }}
                </div>
              </div>
            </div>
          </div>

        </el-tab-pane>
        <!-- <el-tab-pane label="item特征" name="item">
          <el-card class="boxLeft">
            <div v-for="o in 4" :key="o" class="text">
              {{'列表内容 ' + o }}
            </div>
          </el-card>
          <el-card class="boxCenter">
            <div class="textFor" v-for="o in 4" :key="o">
              <p>自然属性</p>
              <div v-for="o in 8" :key="o" class="textbtn">
                {{'列表内容 ' + o }}
              </div>
            </div>
          </el-card>
          <div class="boxRight">
            <div class="numTitle">
              <p>已选特征: <b>11</b> </p>
              <p>标签取交集 </p>
            </div>
            <div class="rightList">
              <div class="selectList" v-for="o in 4" :key="o">
                <p>user特征</p>
                <div v-for="o in 4" :key="o" class="selebtn">
                  {{'列表内容 ' + o }}
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="context特征" name="context">
          <el-card class="boxLeft">
            <div v-for="o in 4" :key="o" class="text">
              {{'列表内容 ' + o }}
            </div>
          </el-card>
          <el-card class="boxCenter">
            <div class="textFor" v-for="o in 4" :key="o">
              <p>自然属性</p>
              <div v-for="o in 8" :key="o" class="textbtn">
                {{'列表内容 ' + o }}
              </div>
            </div>
          </el-card>
          <div class="boxRight">
            <div class="numTitle">
              <p>已选特征: <b>11</b> </p>
              <p>标签取交集 </p>
            </div>
            <div class="rightList">
              <div class="selectList" v-for="o in 4" :key="o">
                <p>user特征</p>
                <div v-for="o in 4" :key="o" class="selebtn">
                  {{'列表内容 ' + o }}
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane> -->
        <el-tab-pane label="交叉特征" name="cross">
          <el-card class="boxLeft">
            <div class="text">
              笛卡尔积特征
            </div>
            <div class="text">
              点积
            </div>
            <p class="strutext" @click="struClick">构造新交叉特征</p>
          </el-card>
          <el-card class="boxCenter">
            <div class="textFor">
              <p>自然属性</p>
              <div v-for="(item,index) in jsondata" :key="index" class="colorbtn" :class="{'textbtn':item.Active}" @click="btnclick(index,item)">
                
                {{item.name}}
              </div>
            </div>
          </el-card>
          <div class="boxRight">
            <div class="numTitle">
              <p>已选特征: <b>{{arrSelect.length}}</b> </p>
              <p>标签取交集 </p>
            </div>
            <div class="rightList">
              <div class="selectList">
                <p>自然属性</p>
                <div v-for="(list,index) in arrSelect" :key="index" class="selebtn">
                  {{list.name}}
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="next">
      <el-button round @click="previous">上一步</el-button>
      <el-button round type="primary" @click="goalg">下一步</el-button>
    </div>
    <el-dialog
      title="交叉规则"
      :visible.sync="dialogVisible"
      width="48.5%"
      top="18vh"
      :before-close="handleClose">
        <el-form ref="form" style="overflow:auto;" :model="form" :label-position="labelPosition" label-width="80px">
          <el-form-item class="formItem" label="特征类型">
            <el-select v-model="form.region"  size="small" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="formItem" label="特征表">
            <el-select v-model="form.region" size="small" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="formItem" label="特征主键">
            <el-select v-model="form.region" size="small" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="association">
          <el-select style="width:100px;" v-model="form.region" size="small" placeholder="请选择">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
          <p class="ruleDesc">规则说明</p>
        </div>
        <el-form style="overflow:auto;" ref="form" :model="form" :label-position="labelPosition" label-width="80px">
          <el-form-item class="formItem" label="">
            <el-select v-model="form.region"  size="small" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="formItem" label="">
            <el-select v-model="form.region" size="small" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="formItem" label="">
            <el-select v-model="form.region" size="small" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getJsonAjax } from '../axios/api.js'
export default {
  name: 'feature',
  data() {
    return {
      activeName: 'user特征',
      input:'',
      resource:'1', // radio
      dialogVisible:false, // dialog
      value:null,
      form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
      },
      labelPosition: 'top',
      jsondata:[
          {name:'笛卡尔积1'},
          {name:'笛卡尔积2'},
          {name:'笛卡尔积3'},
        {
          name:'笛卡尔积4',
        },
        {
          name:'笛卡尔积5',
        },
        {
          name:'笛卡尔积6',
        },
        {
          name:'笛卡尔积7',
        },
        
      ],
      featureList:[], // tab数组
      childList:[],  // 子
      grandList:[], // 孙子
      arrSelect:[],
      checkb:false
    }
  },
  created() {
    // this.featureUrl()
    this.getLocalData()
  },
  methods: {
    // ajax 
    async featureUrl() {
      let that = this;
      
      // let res = (await this.$venus.get(`/v1/feature/tree.action?modelId=1`)).data;
      if(res.data){
        this.featureList = res.data;
      }
    },
    getLocalData(){ // 请求数据
      getJsonAjax().then(res => {
        this.featureList = res.data;
        console.log(res)
      })
    },
    // 点击侧栏
    clickList(child,index) {
      this.childList = child.children;
      child.children.map((val)=>{
        // console.log(val.children)
        this.grandList = val.children;
      console.log(val.children)
      })
      // console.log(this.grandList)
    },
    // 选中
    btnclick(index,item) {
      if(item.Active){
        this.$set(item,'Active',false);
        this.arrSelect.forEach((val,ind)=>{
          if(val.name === item.name){
            this.arrSelect.splice(ind,1)
          }
        })
      }else{
        this.$set(item,'Active',true);
        this.arrSelect.push({'name':item.name,'active':item.Active})
      }
      // console.log(this.arrSelect)
    },
    // radio
    handleClick() {
      
    },
    // dialog
    async struClick() {
      this.dialogVisible = true;
      // this.featureQuery()
    },
    // async featureQuery() {
    //   let res = (await this.$venus.get(`/v1/feature/tree.action?modelId=1`)).data;
    //   console.log(res.data);
    // },
    // bclose
    handleClose() {
      this.dialogVisible = false;
    },
    // router
    previous() {
      // this.$router.push({path: '/model/config'})
    },
    goalg() {
      //  this.$router.push({path: 'algorithm'})
    }
  }
}
</script>

<style lang="postcss">
.feature {
  & .boxtop {
    width: 1040px;
    height:491px;
    position: relative;
    background: #e8eaf4;
    margin: 0 auto;
    & .posbtn {
      position: absolute;
      top: 0px;
      right: 0;
      z-index: 100;
      & .search {
        width: 200px;
        padding-right: 80px;
      }
      & .span {
        font-size:14px;
        color:#0486fe;
        line-height: 40px;
        height: 40px;
        padding-right: 25px;
      }
    }
    & .tabsBox {
      padding: 0px 0 0 20px;
    }
    & .boxLeft {
      width: 126px;
      height: 386px;
      background: #fff;
      border-radius: 4px;
      float: left;
      overflow-y: auto;
      & .el-card__body {
        padding: 10px 15px;
      }
      & .text {
        padding: 10px 0;
        font-size: 14px;
        cursor: pointer;
      }
    }
    & .boxCenter{
      background: #fff;
      border-radius: 4px;
      float: left;
      width: 652px;
      height: 386px;
      margin-left: 10px;
      overflow-y: scroll;
      & .el-card__body {
        padding: 10px 15px;
      }
      & .text {
        padding: 10px 0;
        font-size: 14px;
        cursor: pointer;
      }
      & .textFor {
        font-size: 14px;
        clear: both;
        width: 90%;
        & p {
          padding-bottom: 20px;
        }
        & .colorbtn {
          float: left;
          margin-right:15px;
          margin-bottom: 20px;
          background: #fff;
          color: #1890FF;
          border: 1px solid #1890FF; 
          border-radius: 4px;
          text-align: center;
          font-size: 12px;
          padding: 8px 16px;
          cursor: pointer;
        }
        & .textbtn{
          float: left;
          margin-right:15px;
          margin-bottom: 20px;
          background: #1890FF;
          border: 1px solid transparent; 
          color: #fff;
          border-radius: 4px;
          text-align: center;
          font-size: 12px;
          padding: 8px 16px;
          cursor: pointer;
        }
        
      }
    }
    & .boxRight {
      background: #fff;
      border-radius: 4px;
      float: left;
      width: 207px;
      height: 388px;
      margin-left: 15px;
      & .el-card__body {
        padding: 10px 15px;
      }
      & .numTitle {
        font-size:12px;
        color:#434649;
        text-align:left;
        /* width: 100%; */
        height: 30px;
        & p{
          float: left;
          /* padding-right: 20px; */
          padding: 10px 15px;
        }
        & b {
          font-weight: normal;
          color:#1890FF;
        }
      }
      & 
    }
  }
  & 
}
.rightList {
        background:#f0f2f5;
        width:197px;
        height:346px;
        margin: 0 5px;
        overflow-y: scroll;
      
      }
.selectList {
          padding:10px 0 0 12px;
          overflow: hidden;
        }
.selectList p {
            font-size:12px;
            color:#9b9b9b;
          }
.selebtn {
  margin: 10px 0 0 0;
  font-size: 12px;
  float: left;
  margin-right:15px;
  background: #1890FF;
  color: #fff;
  border-radius: 4px;
  text-align: center;
  padding: 6px 10px;
}
.next{
  width: 1040px;
  text-align: right;
  margin: 20px auto;
}
.el-scrollbar__wrap {
  overflow-x: hidden;
}
.strutext{
  position: absolute;
  bottom: 34px;
  color:#0486fe;
  font-size: 12px;
  cursor: pointer;
}
.formItem {
  width: 31.5%;
  float: left;
  text-align: center;
  margin-right: 10px;
}
.association{
  text-align: center;
  margin-bottom: 25px;
  & .ruleDesc {
    display: inline-block;
    font-size:12px;
    color:#0486fe;
    margin-left:21px;
  }
}
</style>
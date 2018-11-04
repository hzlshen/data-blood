

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
        </div>
      <el-tabs class="tabsBox" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane v-for="list in featureList1" :key="list.nodeName" :label="list.nodeName" :name="list.nodeName">
          <el-card class="boxLeft">
            <div v-for="(child,index) in list.children" :class="{classColor: index == ind}" :key="index" ref="page" @click="clickList(child,index)" class="text">
              {{child.nodeName}}
            </div>
            <p class="strutext" v-if="handIndex == 0" @click="struClick">构造新交叉特征</p>
          </el-card>
          <el-card class="boxCenter">
            <div class="textFor" v-show="handIndex == 0 || handIndex == 1" v-for="grand in childList" :key="grand.nodeName">
              <p >{{grand.nodeName}}</p>
              <div v-for="(item) in grand.children" :key="item.nodeName" class="colorbtn" :class="{'textbtn':item.Active }" @click="btnclick(item)">
                {{item.nodeName }}
              </div>
            </div>
            <div class="textFor" v-show="handIndex == 2" >
              <p ></p>
              <div v-for="item in childList" :key="item.nodeName" class="colorbtn" :class="{'textbtn':item.Active }" @click="btnclick(item)">
                {{item.nodeName }}
              </div>
            </div>
          </el-card>
          <div class="boxRight">
            <div class="numTitle">
              <p>已选特征: <b>{{arrSelect.length}}</b> </p>
              <p>标签取交集</p>
            </div>
            <div class="rightList">
              <div class="selectList">
                <p>{{userFea}}</p>
                <div v-for="(list,index) in arrSelect" :key="index" class="selebtn">
                  {{list.nodeName}}
                </div>
              </div>
              <!-- <div class="selectList">
                <p>{{itemFea}}</p>
                <div v-for="(list,index) in itemArr" :key="index" class="selebtn">
                  {{list.nodeName}}
                </div>
              </div> -->
              <div class="selectList">
                <p>{{chaFea}}</p>
                <div v-for="(list,index) in itemArr" :key="index" class="selebtn">
                  {{list.nodeName}}
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
      width="55.5%"
      top="18vh"
      :before-close="handleClose">
        <el-form ref="formTop" style="overflow:auto;" :model="form" :label-position="labelPosition" label-width="80px">
          <el-form-item class="formItem" label="特征类型">
            <el-select @change="changeNext($event)" v-model="formTop.featureType" size="small" placeholder="请选择">
              <el-option
                v-for="item in ruleData"
                :key="item.key"
                :label="item.key"
                :value="item.key">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="formItem" label="特征表">
            <el-select v-model="formTop.feaTable" @change="changeMo($event)" size="small" placeholder="请选择">
              <el-option
                v-for="item in ruleNext"
                :key="item.key"
                :label="item.key"
                :value="item.key">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="formItem" label="特征主键">
            <el-select v-model="formTop.feaKey" size="small" placeholder="请选择">
              <el-option
                v-for="item in keyData"
                :key="item.pkId"
                :label="item.pk"
                :value="item.pkId">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="association">
          <el-select style="width:100px;" v-model="form.region" size="small" placeholder="请选择">
            <el-option label="笛卡尔集" value="cartesian"></el-option>
            <el-option label="点集" value="crossDot"></el-option>
          </el-select>
          <p class="ruleDesc">规则说明</p>
        </div>
        <el-form style="overflow:auto;" ref="form" :model="form" :label-position="labelPosition" label-width="80px">
          <el-form-item class="formItem" label="">
            <el-select v-model="form.region"  size="small" placeholder="请选择">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="formItem" label="">
            <el-select v-model="form.region" size="small" placeholder="请选择">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="formItem" label="">
            <el-select v-model="form.region" size="small" placeholder="请选择">
              <el-option label="区域一" value="1"></el-option>
              <el-option label="区域二" value="2"></el-option>
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
import { getJsonAjax,getSelect,edit } from '../axios/api.js'
export default {
  name: 'feature',
  data() {
    return {
      activeName: 'user标题',
      input:'',
      resource:'1',
      dialogVisible:false,
      value:null,
      formTop:{
        featureType:'',
        feaTable:'',
        feaKey:''
      },
      form: {
          featureType:'',
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
      featureList:[],
      featureList1:[],
      childList:[],
      grandList:[],
      arrSelect:[],
      itemArr:[],
      titleList:[
        {
          "nodeName":'user特征'
        }
      ], 
      setObj:{
        data:[],
        nodeName:""
      },
      ind:0,
      shuaData:[],
      handIndex:0,
      userFea:'',
      itemFea:'',
      chaFea:'',
      ruleData:[],
      ruleNext:[],
      keyData:[]
    }
  },
  created() {
    this.getLocalData()
  },
  mounted () {
  },
  methods: {
    async edit(){
      let res = await edit();
      let data = res.data.data.extendParamsJson.feature;

      this.arrSelect = data.user.userData[0];
       this.arrSelect.map((i)=>{
        this.featureList.data.map((val)=>{
          val.children.map((item)=>{
            item.children.map((v)=>{
              v.children.map((lower)=>{
                if(i.nodeName  == lower.nodeName){
                  lower.Active = true;
                }
              })
            })
          })
        })
      })

      console.log(this.featureList,"22222")

    },
    async getLocalData () {
      try {
        let res = await getJsonAjax()
        if (!res) {
          return
        }

        this.featureList1 = res.data;
        this.featureList = res
        await this.init(res)
        this.edit()
      } catch (error) {
        console.log("错误")
      }
    },
    init (res) {
      // 初始化点击
      if(this.handIndex == '0'){
        this.shuaData = res.data[0].children[0]
        this.clickList(res.data[0].children[0])
      }else if(this.handIndex == '1'){
        this.shuaData = res.data[1].children[0]
        this.clickList(res.data[1].children[0])
      }else if (this.handIndex == '2'){
        this.shuaData = res.data[2].children[0]
        this.clickList(res.data[2].children[0])
      }
      this.ind = 0
    },
    // 点击侧栏
    clickList(child,index) {
      this.childList = child.children;
      this.ind = index;
    },
    // 选中
    btnclick(item) {
      if(this.handIndex == 0){
      
        this.userFea = item.mainType;

         if(item.Active){
          this.$set(item,'Active',false);
          this.arrSelect.forEach((val,ind)=>{
            if(val.nodeName === item.nodeName){
              this.arrSelect.splice(ind,1)
            }
          })
        }else{
          this.$set(item,'Active',true);
          this.arrSelect.push(item)
        }
      
      }else if (this.handIndex == 1){
        
        this.itemFea = item.mainType;
      
      }else  if (this.handIndex == 2){
        
        this.chaFea = item.mainType;
        console.log(item)
        if(item.Active){
          this.$set(item,'Active',false);
          this.itemArr.forEach((val,ind)=>{
            if(val.nodeName === item.nodeName){
              this.itemArr.splice(ind,1)
            }
          })
        }else{
          this.$set(item,'Active',true);
          this.itemArr.push(item)
        }     
      }
    },
    // radio
    async handleClick(e) {
      this.handIndex = e.index;
      this.init(this.featureList)
    },
    // dialog
    async struClick() {
      this.dialogVisible = true;
      this.featureQuery()
    },
    async featureQuery() {
      let res = await getSelect()
      if(!res){
        return 
      }

      this.ruleData = res.data.data;
      let arr = res.data.data;
    },

    changeNext(e) {
      let arr = this.ruleData.filter(item=>item.key == 'user')
      this.ruleNext =arr;
    },
    changeMo(e) {
      console.log(e)
    },

    // bclose
    handleClose() {
      this.dialogVisible = false;
    },
    // router
    previous() {
      this.$router.push({path: '/model/config'})
    },
    goalg() {
       this.$router.push({path: 'algorithm'})
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
      & .classColor {
        color: #0486fe;
      }
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
        height: 30px;
        & p{
          float: left;
          padding: 10px 15px;
        }
        & b {
          font-weight: normal;
          color:#1890FF;
        }
      }
      & .rightList {
        background:#f0f2f5;
        width:197px;
        height:346px;
        margin: 0 5px;
        overflow-y: scroll;
        & .selectList {
          padding:10px 0 0 12px;
          overflow: hidden;
          & p {
            font-size:12px;
            color:#9b9b9b;
          }
          & .selebtn {
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
        }
      }
    }
  }
  & .next{
    width: 1040px;
    text-align: right;
    margin: 20px auto;
  }
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
.textFor p{
  text-align: left;
}
</style>

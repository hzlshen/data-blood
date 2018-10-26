import { fetch } from './fetch';
import api from './url'

//查看用户
export const getJsonAjax = () => fetch({//lookOption是你要调用接口的名字，issuer,userId是传进来的参数
  //api.getData 引用url.js里面的数据
  url: api.getData,
  method: 'get',//请求方法
  params:{
  }
});
export const getSelect = () => fetch({//lookOption是你要调用接口的名字，issuer,userId是传进来的参数
  //api.getData 引用url.js里面的数据
  url: api.selectData,
  method: 'get',//请求方法
  params:{
  }
});

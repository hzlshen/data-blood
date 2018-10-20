import { fetch } from './fetch';
import api from './api'

//查看用户
export const getJsonAjax = () => fetch({//lookOption是你要调用接口的名字，issuer,userId是传进来的参数
  //api.ajaxData 引用url.js里面的数据
  url: api.getData,
  method: 'get',//请求方法
  params:{
  }
});

// export const lookOption = (username,password,captcha) => fetch({//lookOption是你要调用接口的名字，issuer,userId是传进来的参数
//   //api.Hallowmas 引用url.js里面的数据
//   url: api.ajaxData,
//   method: 'get',//请求方法
//   params:{
//      username,password,captcha//参数
//   }
// });
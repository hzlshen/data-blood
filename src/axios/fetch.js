import axios from 'axios'

export function fetch(options){
  return new Promise((resolve,reject)=>{
    const instance = axios.create({
      "headers":{
        'Content-Type': 'application/json',
      },
      timeout:30*1000 // 30秒超时
    });
    instance(options)
      .then(response=>{
        resolve(response); // 成功
      })
      .catch(error=>{
        reject(error);  // 异常
      });
  });
}
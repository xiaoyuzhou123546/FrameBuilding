const { data } = require('../mixin/mymixin')
const config = require('../utils/config')

class API {

  constructor (){
    this.baseUrl = config.baseUrl
    this.header = {
      'content-type':'application/x-www-form-urlencoded',
    }
  }

   _axios = async (para)=>{ return new Promise((resolve, reject)=>{
    wx.request({
      url:this.baseUrl+para.url,
      header:this.header,
      data:para.data,
      method:para.method,
       success:res=>{
        let _data = { msg: '网络连接异常',code: 999,result:{}}
        res.data = {...res.data,..._data}
        const {code,msg} = res.data
        if (res.statusCode == 200) {
          console.log('%c请求结果:', 'color:green;', baseData.url, res.data);
          if (code == 100) {
            return resolve(res.data);
          } else {
            return reject(res.data);
          }
        } else if (res.statusCode == 401) {
          // uploadtoken(baseData, data)
        } else {
          console.log('%c请求失败:', 'color:red;', baseData.url, res);
          wx.showToast({
            title: msg,
            icon: 'none'
          });
          return reject(res.data);
        }
     },
    })
  })}
   
}


module.exports = new(API)
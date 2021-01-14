
import {api}  from '../utils/config'

// 请求的计数器 -- 不加计数器的话会显示三次/隐藏三次 loading, 加了计数器之后,只当所有请求完成之后只需要隐藏一次loading
 
let requestCount = 0;

//请求初始值
let baseData = {
  url:'',//请求URL
  loading:true,//是否展示加载动画
  showError:true,//是否展示错误提示
  loadingtype:'side',//navBar/side
  showText:'加载中...',//提示内容
  header:{
    'content-type':'application/x-www-form-urlencoded',
  },
  data:{}
}

let _reqData = {
    msg: '网络连接异常',
    code: 999,
    result:{}
}


 const formatData = (params)=>{
if(params.url.indexOf('http')==-1) params.url = api.baseUrl +params.url.replace(/\//, '');//合并URL
params.data = {
  ...params.data,
  userID:wx.getStorageSync('userID'),
  v:api.v
}
params.header = {
  ...params.header,
  // 'Authorization': ('Bearer ' + wx.getStorageSync('token')) || ''
}
return params
 }

// 1.axios 是个函数,
const request = (params) => {
const _data =formatData({...baseData,...params})
    // 调用axios发送请求的时候,导航栏显示loading
    if(_data.loading){
      requestCount++;
      if(_data.loadingtype=='side'){
        wx.showLoading({
          title: _data.showText,
          mask:true
        })
      }else{
        wx.showNavigationBarLoading();
      }
    } 
    // 2. 函数内部返回Promise 对象
    return new Promise((resolve, reject) => {
        // 3.wx.request()  小程序发送请求
        wx.request({
            // 解构赋值
            ..._data,
            // 请求成功之后调用的函数
            success: (res) => {
              if (res.statusCode == 200) {
                const data = res.data
                console.log('%c请求结果:', 'color:green;', _data.url, data);
                const {code,msg,result} = data
                if (code == 100) {
                  return resolve(data);
                } else {
                  if (_data.showError && msg.indexOf('暂无数据') == -1) {
                    wx.showToast({
                      title: msg,
                      icon: 'none'
                    });
                  }
                  return reject(data);
                }
              } else if (res.statusCode == 401) {
                // uploadtoken(baseData, data)
              } else {
                console.log('%c请求失败:', 'color:red;', _data.url, res);
                wx.showToast({
                  title: _reqData.msg,
                  icon: 'none'
                });
                return reject(_reqData);
              }
            },
            // 请求失败之后调用的函数
            fail: (err) => {
              console.log('%c请求失败:', 'color:red;', _data.url, err);
              wx.hideLoading();
              wx.showToast({
                title: _reqData.msg,
                icon: 'none'
              });
              return reject(_reqData);
            },
            complete: () => {
                // 每次请求完成,就是所有的请求都完成了  
                requestCount--;
                if (requestCount === 0) {
                    // 隐藏导航栏显示的loading
                    if(_data.loadingtype=='side'){
                      wx.hideLoading()
                    }else{
                      wx.hideNavigationBarLoading();
                    }
                }
                wx.stopPullDownRefresh();
            }
        });
    });
 
}
 


// 二次封装生成axios
const axios = {
  get: params => {
    return request({
      ...params,
      method: 'GET'
    })
  },
  post: params => {
    return request({
      ...params,
      method: 'POST'
    })
  },
  put: params => {
    return request({
      ...params,
      method: 'PUT'
    })
  },
  delete: params => {
    return request({
      ...params,
      method: 'DELETE'
    })
  },
}


 
// 导出 axios 函数
export {axios};
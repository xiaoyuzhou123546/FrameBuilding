//获取应用实例
const app = getApp()
import {
  axios
} from '../../axios/api'
Page({
  mixins: [require('../../mixin/mymixin'), require('../../mixin/navigate')],
  data: {
    page: 'home'
  },
  onLoad: function () {
    wx.showNavigationBarLoading({
      success: (res) => {},
    })
    setTimeout(() => {
      wx.hideNavigationBarLoading({
        success: (res) => {},
      })
    }, 2000)
  },
  onShow() {
    console.log('页面打印')
 
    this.request()
    
  },

  request(i=1000){
    setTimeout(()=>{
      axios.get({
        url: 'http://116.255.236.229:8499/homepage',
        data: {
          page: 1,
          pageSize: 10,
          userID: 3
        }
      }).then(res=>{
        
      })
      i--;
      if(i) this.request(i);
    },20)
  }

})
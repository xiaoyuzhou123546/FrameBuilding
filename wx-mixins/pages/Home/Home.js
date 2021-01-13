//获取应用实例
const app = getApp()

Page({
  mixins: [require('../../mixin/mymixin'),require('../../mixin/navigate')],
  data: {
   page:'home'
  },
  onLoad: function () {
    wx.showNavigationBarLoading({
      success: (res) => {},
    })
    setTimeout(()=>{
      wx.hideNavigationBarLoading({
        success: (res) => {},
      })
    },2000)
  },
  onShow(){
    console.log('页面打印')
  },
})

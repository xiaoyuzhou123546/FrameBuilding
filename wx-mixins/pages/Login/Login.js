// pages/Login/Login.js
var http = getApp().http
var imagePath = getApp().globalData.imagePath
var wXBizDataCrypt = require('../Login/common/WXBizDataCrypt')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isrefresh: false,
    isShowPhone: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.setData({...options})
   this.loginData = {
    telPhone: '',
    loginName:'',
    nickName:'',
    headImg:'',
    puserID:0,
    sex:0
   }
   this.getOpenID()
  },
  getlogin() {
    wx.login({
      success: ({code}) => {
        console.log('code**********' + code)
        this.getOpenID(code)
      }
    })
  },
  _iKnow(e) {
    if (e.detail.errMsg == 'getUserInfo:ok') {
      this.setData({
        detail: e.detail
      })
    }
  },
  // 获取openid
  getOpenID() {
    // 获取openid
    http({
		url:'/useropenid',
		method:'POST',
		hideloading:false,
		data:{js_code:this.data.js_code}
	}).then(res => {
      console.log(res)
      this.setData({
        ...res
      })
      this.wxlogin()
    })

  },





  // 登录接口
  wxlogin() {
    console.log('aaaa==', this.data)
    http({
		url:'/userlogin',
		method:'GET',
		hideloading:false,
		data:{
			loginName:this.data.loginName,
			miniopenID:this.data.openid,
			nickName:this.data.detail.userInfo.nickName,
			headImg:this.data.detail.userInfo.avatarUrl,
			puserID:wx.getStorageSync('puserID')||0,
			sex:this.data.detail.userInfo.gender==1?0:1
		}
	}).then(({result}) => {
      console.log('登录接口====', result)
      if(result.isBoundTel==0){
        wx.showToast({
          title: '请授权获取手机号',
          icon:'none'
        })
        this.setData({
          isShowPhone: true
        })
      }else{
        result._openid = this.data.openid
        result.telPhone = this.data.loginName
        for(let key in result){
          wx.setStorageSync(key, result[key])
        }
        
        wx.showToast({
          title: '登录成功'
        })
        setTimeout(() => {
          if (this.data.isrefresh) {
            const pages = getCurrentPages()
            const pvg = pages[pages.length - 2]
            pvg.resreshData()
          }
          wx.navigateBack({
            delta: 1,
          })
        }, 1500)
      }  
    }).catch(err => {
      // if (err.code == 103) {
      //   wx.showToast({
      //     title: '需要获取您的手机号码',
      //     icon:'none'
      //   })
      //   this.setData({
      //     isShowPhone: true
      //   })
      //   // this.wxRegister()
      // }else{
      //   wx.showToast({
      //     title: err.msg,
      //     icon:'none'
      //   })
      // }
    })
  },
  // 获取用户手机号
  getPhoneNumber(e) {
    console.log("获取用户手机号", e)
    if (e.detail.errMsg == "getPhoneNumber:ok") {
      console.log(e)
      const {
        encryptedData,
        iv
      } = e.detail
      const pc = new wXBizDataCrypt(getApp().globalData.appid, this.data.session_key)
      const data = pc.decryptData(encryptedData, iv)
      if (data) {
        console.log(data.purePhoneNumber)
        this.setData({
          loginName: data.purePhoneNumber
        })
        this.wxlogin()
      } else {
        wx.showToast({
          title: '获取手机号失败',
          icon: 'none'
        })
        return
      }
    }
  },
  // 获取uniID
  uniIDinfo() {
    // wx.getUserInfo({
    //   success:res=>{
    //     console.log(res, 'jieguo')
    //     const pc = new wXBizDataCrypt(getApp().globalData.appid, this.data.session_key)
    //     const data = pc.decryptData(res.encryptedData, res.iv)
    //     console.log('解密后 data: ', data)
    //   }
    // })
    const {
      encryptedData,
      iv
    } = this.data.detail
    const pc = new wXBizDataCrypt(getApp().globalData.appid, this.data.session_key)
    const data = pc.decryptData(encryptedData, iv)
    console.log('unionID111===', data)
    if (data) {
      console.log('unionID2222=====', data)
      this.setData({
        unionID: data.unionId || ''
      })
      this.wxRegister()
    } else {
      wx.showToast({
        title: '获取用户信息失败',
        icon: 'none'
      })
      return
    }
  },
  // 获取手机号后注册接口
  wxRegister() {
    console.log(this.data.detail.userInfo)
    http('/register', {
      headImg: this.data.detail.userInfo.avatarUrl,
      loginName: this.data.telPhone,
      nickName: this.data.detail.userInfo.nickName,
      openID: this.data.openid,
      uionID: this.data.unionID,
      sex: this.data.detail.userInfo.gender == 2 ? 1 : 0
    }, 'POST').then(res => {
      console.log('注册接口=======', res)
      wx.setStorageSync('userID', res.result.userID)
      wx.setStorageSync('openID', this.data.openid || '')
      wx.setStorageSync('loginName', res.result.loginName ? res.result.loginName : this.data.telPhone)
      wx.showToast({
        title: '登录成功'
      })
      if (this.data.isrefresh) {
        const pages = getCurrentPages()
        const pvg = pages[pages.length - 2]
        pvg.resreshData()
      }
      setTimeout(() => {
        wx.navigateBack({
          delta: 1,
        })
      }, 1500)
    }).catch(err => {

    })
  }
})
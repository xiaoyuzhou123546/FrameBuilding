// component/sub-unit-pwd/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    editpwdPath: {
      type: String,
      value: '/pages/UserCenter/SetSysment/SetPassword/SetPassword?setword=2'
    },
    failIcon: {
      type: String,
      value: 'fail_icon.png'
    },
  },
  

  /**
   * 组件的初始数据
   */
  data: {
    focus: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onFocus() {
      this.setData({
        focus: true
      })
    },
    onpwdInput(e) {
      const pwd = e.detail.value
      this.setData({
        inputValue: pwd
      })
      if (pwd.length == 6) {
        console.log('输入完成')
        this.triggerEvent('changepwd', {
          value: pwd
        })
      }
    },
    fogetpwd() {
      console.log('忘记密码')
      wx.navigateTo({
        url: this.data.editpwdPath,
      })
    },
    onpopFile() {
      return
    },
    popUpno() {
      this.triggerEvent('changepwd', {
        value: false
      })
    }
  }
})
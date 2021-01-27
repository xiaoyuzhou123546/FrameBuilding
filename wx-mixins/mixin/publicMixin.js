import {
  isPhone,
  isIDcard
} from '../utils/util'
module.exports = {

  //input填充+验证
  _setInput(e) {
    let data = e.currentTarget.dataset
   
    const _value = e.detail.value
    let _obj = {
      name: 'inputStr', //输入数据key，默认inputStr
      isphone: false, //手机号验证
      isidcard: false, //身份证号验证
    }
    data = {
      ..._obj,
      ...data
    }
    let _str = {
      [`${data.name}`]: _value
    }
    if (data.isphone) {
      _str.isPhone = isPhone(_value)
    }
    if (data.isidcard) {
      _str.isIDcard = isIDcard(_value)
    }
    this.setData({
      ..._str
    })
  },
//事件取消
  _fail(){
return false
  },
//取反
_negate(e){
  const {name} = e.currentTarget.dataset
  this.setData({ [`${name}`]: !this.data.name})
},
//返回上一页
_back(delta=1){
  const pages = getCurrentPages()
  if(pages.length>1){
    wx.navigateBack({
      delta
    })
  }else{
    wx.switchTab({
      url: '/pages/Home/Home',
    })
  }
},
//查看大图
_seeImage(e){
	let data = e.currentTarget.dataset
	let _obj = {
	  name: 'imageArr', //需要操作的数组
		key:'',//图片的key
	  del: false, //是否删除
		index:0,//第几个
	}
	data = {
	  ..._obj,
	  ...data
  }
	let arr = this.data[data.name]
	if(data.key){
		arr = arr.map(item=>{
			return item[data.key]
		})
	}
	if(data.del){
		wx.showActionSheet({
      itemList: ['查看大图','删除图片'],
      success:res=>{
        if(res.tapIndex==0){
          wx.previewImage({
            urls: [...arr],
            current:arr[data.index]
          })
        }else if(res.tapIndex==1){
          this.data[data.name].splice(data.index,1)
          this.setData(this.data)
        }
      }
    })
	}else{
    wx.previewImage({
      urls: [...arr],
      current:arr[data.index]
    })
	}
},
_seeArrImage(e){
	let data = e.currentTarget.dataset
	let _obj = {
	  imgarr: [], //需要操作的数组
		key:'',//图片的key
		index:0,//第几个
	}
	data = {
	  ..._obj,
	  ...data
  }
	if(data.key){
		data.imgarr = data.imgarr.map(item=>{
			return item[data.key]
		})
  }
    wx.previewImage({
      urls: [...data.imgarr],
      current:data.imgarr[data.index]
    })
}
}
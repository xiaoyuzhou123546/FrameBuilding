// components/comment/index.js
import {imagePath}  from '../..//utils/config'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
		count:{
			type:Number,
			value:1
		},
		message:{
			type:String,
			value:''
		},
		focus:{
			type:Boolean,
			value:false
		}
  },

  /**
   * 组件的初始数据
   */
  data: {
		news_writter:imagePath+'home/news_writter.png',
		news_menu:imagePath+'home/news_menu.png',
		news_select_img:imagePath+'home/news_select_img.png',
		community_details_close_icon:imagePath+'home/community_details_close_icon.png',
focus:false,
key_height:0,
imageArr:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {
goFocus(){
	if(!wx.getStorageSync('userID')){
		wx.navigateTo({
			url: '/pages/Login/Login?isrefresh=1',
		})
return
	}
	if(!wx.getStorageSync('isUpdate')==1){
		wx.navigateTo({
			url:'/pages/Login/PerfectInformation/PerfectInformation'
		})
		return
	}
	this.setData({
		focus:true
	})
},
failKeyBord(){
	this.setData({
		focus:false,
		select:false
	})
},
//输入内容，model方法性能问题太差
toMessage(e){
this.setData({message:e.detail.value})
},
fail(){
	return
},
deleteImg(e){
	const {id} = e.currentTarget.dataset
	this.setData({imageArr:[]})
},
seeBegImage(e){
	const {id} = e.currentTarget.dataset
	wx.previewImage({
		urls: this.data.imageArr,
		current:this.data.imageArr[0]
	})
},
// 回复键盘高度变化
	keybord(e){
		const {height} = e.detail
		console.log(height)
		this.setData({
			key_height:height
		})
	},
bottomSelect(){
	if(!wx.getStorageSync('userID')){
		wx.navigateTo({
			url: '/pages/Login/Login?isrefresh=1',
		})
return
	}
	if(!wx.getStorageSync('isUpdate')==1){
							wx.navigateTo({
								url:'/pages/Login/PerfectInformation/PerfectInformation'
							})
							return
						}
	this.setData({select:true})
	this.selectImage()
},
	selectImage(){
		wx.chooseImage({
		  count: this.data.count-this.data.imageArr.length,
		  success:res=>{
				if(this.data.count==1){
					this.setData({imageArr:res.tempFilePaths})
				}else{
					this.setData({imageArr:[...this.data.imageArr,...res.tempFilePaths]})
				}
		  }
		})
	},
	//回复
	commentSub(){
		this.triggerEvent('commentSubmit',{
			imageArr:this.data.imageArr,
			message:this.data.message
		})
		this.setData({
			imageArr:[],
			message:''
		})
		this.failKeyBord()
	}
  }
})

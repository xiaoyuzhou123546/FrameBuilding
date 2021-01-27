import {
  api
} from '../utils/config'

const baseData = {
  url: '',
  ruleInside: ',',
  ruleExtra: '|',
  data: {},
  imageUrl: [],
  isSplit: true
}

const formatData = (params) => {
  if (params.url.indexOf('http') == -1) params.url = api.baseUrl + params.url.replace(/\//, ''); //合并URL
  params.data = {
    ...params.data,
    v: api.v
  }
  return params
}

const upload = async (url, imageUrl, data) => {
  // console.log(url,imageUrl,data)
  return await new Promise((resolve, reject) => {
    if (imageUrl.indexOf('http') > -1 && imageUrl.indexOf('http://tmp/') == -1) {
      resolve({
        result: [{
          thumbImgUrl: imageUrl,
          bigImgUrl: imageUrl,
          sourceImgUrl: imageUrl
        }]
      })
    } else {
      wx.uploadFile({
        url: url, //仅为示例，非真实的接口地址
        filePath: imageUrl,
        name: 'file',
        formData: {
          ...data
        },
        success: res => {
          resolve(JSON.parse(res.data))
        },
        fail: err => {
          console.log(err)
          reject(false)
        }
      })
    }
  })
}
const recursion = async (obj, fun, generateArr = []) => {
  if (obj.imageUrl.length) {
    wx.showLoading({
      title: `正在上传第${generateArr.length+1}张图片`,
      mask: true
    })
    const _res = await upload(obj.url, obj.imageUrl[0], obj.data)
    obj.imageUrl.shift()
    if (_res) {
      const _data = _res.result[0]
      if (obj.isSplit) {
        generateArr = [...generateArr, [_data.thumbImgUrl, _data.bigImgUrl, _data.sourceImgUrl].join(obj.ruleInside)]
      } else {
        generateArr = [...generateArr, _data]
      }
    }
    //递归
    await recursion(obj, fun, generateArr)
  } else {
    wx.hideLoading()
    if (obj.isSplit) {
      return fun(generateArr.join(obj.ruleExtra))
    } else {
      return fun(generateArr)
    }

  }
}
const uploadFile = async (params) => {
  return await new Promise((resolve, reject) => {
    let _data = formatData({
      ...baseData,
      ...params
    })
    recursion(_data, res => {
      resolve(res)
    })
  })
}


export {
  uploadFile
}
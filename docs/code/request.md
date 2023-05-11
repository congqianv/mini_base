---
sidebarDepth: 2
---

# 网络请求(request)

## 网络请求
::: tip 介绍
基于[小程序原生request](https://developers.weixin.qq.com/miniprogram/dev/api/network/request/wx.request.html)封装Promise风格的请求  
避免多级回调(回调地狱)  
对于网络请求错误统一处理分发
:::

## 目录结构
```shell
.
├── api
│   ├── config.js // 相关请求的配置项,请求api等
│   ├── env.js // 环境配置
│   ├── request.js  // 封装主函数
│   ├── statusCode.js // 状态码
└── ...
```

## 相关代码
### 配置文件
```js
// env.js
module.exports = {
  ENV: 'production',
  // ENV: 'test'
}
```
```js
// config.js
const { ENV } = require('./env')
let BASEURL, CBASEURL

switch (ENV) {
  case 'production':
    BASEURL = ''
    CBASEURL = ''
    break
  case 'test':
    BASEURL = ''
    CBASEURL = ''
    break
  default:
    BASEURL = ''
    CBASEURL = ''
    break
}
module.exports = {
  BASEURL,// 项目接口地址
  CBASEURL // 中台接口地址
}

// statusCode.js
// 配置一些常见的请求状态码
module.exports = {
  SUCCESS: 200,
  EXPIRE: 403
}
```

### 主函数
::: tip 注意
64~68行是对token过期的处理,在[封装登录函数](login.html#登录函数封装)的时候,
检查app.globalData中是否存在token,存在则不发起登录请求,token过期清空token,那么下一次请求的时候就会
重新发起登录请求从而会重新获取到新的token
:::
```js {64,65,66,67,68}
// 引入状态码statusCode
const statusCode = require('./statusCode')
// 定义请求路径, BASEURL: 普通请求API; CBASEURL: 中台API,不使用中台可不引入CBASEURL
const { BASEURL, CBASEURL } = require('./config')
// 定义默认参数
const defaultOptions = {
  data: {},
  ignoreToken: false,
  form: false,
  cToken: false
}
/**
 * 发送请求
 * @params
 * method: <String> 请求方式: POST/GET
 * url: <String> 请求路径
 * data: <Object> 请求参数
 * ignoreToken: <Boolean> 是否忽略token验证
 * form: <Boolean> 是否使用formData请求
 * cToken: <Boolean> 是否是中台接口
 */
function request (options) {
  let _options = Object.assign(defaultOptions, options)
  let { method, url, data, ignoreToken, form, cToken } = _options
  const app = getApp()
  // 设置请求头
  let header = {}
  if (form) {
    header = {
      'content-type': 'application/x-www-form-urlencoded'
    }
  } else {
    header = {
      'content-type': 'application/json' //自定义请求头信息
    }
  }
  if (!ignoreToken) {
    // 从全局变量中获取token
    let token = app.globalData.token
    header.Authorization = `Bearer ${token}`
  }
  if (cToken) {
    console.log('%c app', 'color: red;font-weight: bold', app)
    let cToken = app.globalData.cToken
    header.Authorization = `Bearer ${cToken}`
    console.log(header)
  }
  return new Promise((resolve, reject) => {
    wx.request({
      url: (cToken ? CBASEURL : BASEURL) + url,
      data,
      header,
      method,
      success: (res) => {
        let { statusCode: code } = res
        if (code === statusCode.SUCCESS) {
          if (res.data.code !== 0) {
            // 统一处理请求错误
            showToast(res.data.errorMsg)
            reject(res.data)
            return
          }
          resolve(res.data)
        } else if (code === statusCode.EXPIRE) {
          app.globalData.token = ''
          showToast(`登录过期, 请重新刷新页面`)
          reject(res.data)
        } else {
          showToast(`请求错误${url}, CODE: ${code}`)
          reject(res.data)
        }
      },
      fail: (err) => {
        console.log('%c err', 'color: red;font-weight: bold', err)
        showToast(err.errMsg)
        reject(err)
      }
    })
  })
}

// 封装toast函数
function showToast (title, icon='none', duration=2500, mask=false) {
  wx.showToast({
    title: title || '',
    icon,
    duration,
    mask
  });
}

function get (options) {
  return request({
    method: 'GET',
    ...options
  })
}

function post (options) {
  // url, data = {}, ignoreToken, form, cToken
  return request({
    method: 'POST',
    ...options
  })
}

module.exports = {
  request, get, post
}
```

## 使用方法
### 新建文件
新建api文件(此处以订单接口为例), 新建`api/index.js`(接口分发统一处理,防止接口写到同一个文件下过于冗长)  
目录结构如下:
```shell
.
├── api
│   ├── config.js // 相关请求的配置项,请求api等
│   ├── index.js  // 统一处理入口
│   ├── order.js  // 订单接口
│   ├── request.js  // 封装主函数
│   ├── statusCode.js // 状态码
└── ...
```
### 引入`request`
```js
// order.js
const request = require('./request')

module.exports = {
  // data可以传入 url, data, ignoreToken, form, cToken
  apiName (data) {
    let url = 'apiUrl'
    return request.post({ url, data })
  }
}
```
### 统一处理分发接口
```js
const orderApi = require("./order")

module.exports = {
  orderApi
}
```
### 页面引用
```js
const { orderApi } = require('dir/path/api/index')
...
1. `Promise.then()`链式调用
func () {
  orderApi.apiName(params).then(res => {
    // do Something
  }).catch(err => {
    // do Something
  })
}

2. `async/await` 调用
async func () {
  try {
    let res = await orderApi.apiName(params)
    // do Something
  } catch (err) {
    // do Something
  }
}
```

### options取值
| 参数 | 说明 | 数据类型 | 默认值 |
| --- | --- | --- | --- |
| url | 接口名 | `String` | `''` |
| data | 请求体 | `Object` | `{}` |
| ignoreToken | 请求是否携带token | `Boolean` | `false` |
| form | 是否是表单请求 | `Boolean` | `false` |
| cToken | 是否需要携带中台token | `Boolean` | `false` |
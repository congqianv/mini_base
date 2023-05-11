---
sidebarDepth: 2
tags:
  - 登录
  - login
  - 小程序登录
---

# 小程序登录

小程序的请求一般都需要携带`token`,请求携带token可以在[网络请求](request.html#主函数)一文中查看统一处理的方式。  
小程序token的获取需要通过[wx.login()接口](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/login/wx.login.html)
获取登录凭证,也就是`code`,通过这个code传递给后端去换取token。  
通过`wx.login`接口可以获取到用户的唯一标识(unionId)

## 登录函数封装
```js {18,19,20,21,22}
// api/user.js
// 获取code 部分接口需要使用wx.login()返回的code,所以这边将wx.login()封装一下
getCode () {
  return new Promise(resolve => {
    wx.login({
      success: (res) => {
        // doSomething
        resolve(res)
      }
    })
  })
},
// 获取token
getToken () {
  let url = 'wxLogin'
  return new Promise(async (resolve, reject) => {
    const app = getApp()
    // 如果已经登陆过存在token,就不需要再请求接口了
    if (app.globalData.token) {
      resolve('')
      return
    }
    let result = await module.exports.getCode()
    request.post(url, { code: result.code }, true).then(res => {
      console.log('%c loginRes', 'color: red;font-weight: bold', res)
      let loginRes = res
      if (loginRes.code === 0) {
        app.globalData.token = loginRes.result.token
        app.globalData.cToken = loginRes.result.cToken || '' // 中台的token
        resolve(loginRes)
      } else {
        reject(res)
      }
    })
  })
},
```
## app.js 引用
::: warning
这边导出的`getToken`不要写成`userApi.getToken()`  
写`userApi.getToken()`,整个生命周期只会触发一次,如果token过期,即使清空token也不会重新发起请求了
:::
```js
const { userApi } = require('./api/index')
App({
  getToken: userApi.getToken,
  ...
})
```
## 页面引用
在页面发起请求之前需要先去检查token是否存在,调用一下`app.getToken`即可
```js
onLoad: async function (options) {
  ...
  await app.getToken()
  ...
}
```
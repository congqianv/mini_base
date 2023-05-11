---
sidebarDepth: 2
---

# 小程序自动化埋点

## 介绍
对于以往项目中的埋点方案大致有两种:
+ 手动埋点:  
  在需要进行埋点的地方进行手动编写埋点代码,需要重复编写,重复调用
+ 自动埋点方案:  
  常见的有 [腾讯有数](https://mp.zhls.qq.com/youshu-docs/develop/dev_account/dev_process_merchant.html)、[神策](https://manual.sensorsdata.cn/sa/latest/%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86-7543368.html)  

对于我们很多项目而言,只要用记录PV,UV,用户浏览时间等一些基础的埋点需求,没有必要使用到第三方埋点方案。  
本方案使用重写小程序 `Page`的方式,在`Page`的一些相关方法(如`onLoad`,`onShow`,`onHide`)中写入我们需要进行统计的方法,只需要引入一次就可以记录我们需要的数据。

## 主要代码:  
**track.js**
```js
class Track {
  constructor(options) {
    let valid = this.checkOptions(options)
    if (!valid) return
    this.token = options.token
    this.debug = options.debug || false
    let that = this
    wx.onAppShow(function (e) {
      // 获取场景值
      if ((!that.scene || that.scene !== e.scene) && e.scene) {
        that.scene = e.scene
      }
    })
    that.init()
  }

  init() {
    const _Page = Page
    let that = this
    Page = function (obj) {
      let _onLoad = obj.onLoad
      obj.onLoad = function () { // 重写onLoad
        let { path, options } = that.getPathAndOptions('onLoad')
        let data = {
          type: 'visit_page',
          path,
          options
        }
        that.request(data)
        _onLoad.call(this)
      }

      let _onShow = obj.onShow
      obj.onShow = function () { // 重写onShow
        let { path, options } = that.getPathAndOptions('onShow')
        let data = {
          type: 'visit_page',
          path,
          options
        }
        that.startTime = +new Date()
        that.request(data)
        _onShow.call(this)
      }

      let _onHide = obj.onHide
      obj.onHide = function () {
        let { path } = that.getPathAndOptions('onHide')
        that.endTime = +new Date()
        let timeDiff = that.endTime - that.startTime
        let data = {
          type: 'visit_log_time',
          timeDiff,
          path
        }
        if (that.debug) {
          console.log(`${path} 页面停留时间: ${timeDiff}ms`)
        }
        that.request(data)
        _onHide.call(this)
      }
      return _Page(obj)
    }
  }

  checkOptions(options) {
    // 检查用户传入的参数，目前需要传入token
    if (!options || Object.keys(options).length === 0) {
      console.error('options is required')
      return false
    }
    if (!options.token) {
      console.error('options.token is required')
      return false
    }
    return true
  }

  getPathAndOptions (type) {
    let _route = getCurrentPages()
    let path = _route[_route.length - 1].route
    let options = _route[_route.length - 1].options
    if (this.debug) {
      console.log('----------')
      console.log(`页面:${path}, ${type} 触发埋点, 参数: ${JSON.stringify(options)}`)
      console.log('----------')
    }
    return { path, options }
  }

  request (data) {
    let that = this
    Object.assign(data, {token: that.token, scene: that.scene})
    return new Promise(resolve => {
      wx.request({
        url: 'http://localhost:4000/test',
        method: "POST",
        data,
        success(res) {
          if (that.debug) {
            console.log('----------')
            console.log('记录页面请求成功')
            console.log('----------')
          }
          resolve(res)
        },
        fail(err) {
          if (that.debug) {
            console.log('----------')
            console.log('记录页面请求失败', err)
            console.log('----------')
          }
        }
      })
    })
  }
}

module.exports = {
  Track
}
```

## 使用方式
+ 在`app.js`中引入`track.js`
  ```js
  let { Track } = require('./somePath/track')
  ```
+ 执行初始化操作, 如果需要记录用户信息, 就需要传入token信息,此处以需要传入为例, init操作可以放在`wxLogin`拿到token之后进行
  ```js
  new Track({
    token: 'xxx', // 必传, 用户token
    debug: true, // 可选, true 则会打印一些相关日志
  })
  ```
# 获取系统信息

*注意: `statusBarHeight`的单位是`px`*
```js
// 获取设备型号,设备状态栏高度
getSystemInfo () {
  let app = this
  wx.getSystemInfo({
    success: (result) => {
      // 状态栏高度
      app.globalData.statusBarHeight = result.statusBarHeight
      let model = result.model.substring(0, result.model.indexOf('X')) + 'X';
      if (model == 'iPhone X') {
        app.globalData.isIpX = true;
      } else {
        app.globalData.isIpX = false;
      }
    }
  })
}
```
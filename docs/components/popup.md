---
sidebarDepth: 2
---

# 弹出层 | popup

## 说明
`popup`组件是抽离的`vant`的`popup`组件,由于`vant`中有很多不需要使用,放到项目中徒增代码体积,所以这边单独抽离了`popup`,  
相关API可参考[vant-popup](https://vant-contrib.gitee.io/vant-weapp/#/popup)
## 引入方式
将压缩包完全解压到某个路径下,压缩包内的所有文件都需要,后续如果有使用到`vant`相关组件也可以直接放到该路径下
```json
// xxx.json
usingComponents: {
  "popup": "/path/popup/index",
}
```
## 下载代码
<a href="/dist/popup.zip" target="_blank" download>点此下载</a>
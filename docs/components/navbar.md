---
sidebarDepth: 2
---

# 导航栏 | navbar

## 使用场景
::: tip 适用于
- 需要**显示背景图**的场景
- 需要**自定义返回按钮**的场景
- 需要**自定义导航栏返回事件**的场景
- ...
:::
## 示例
[示例代码,点此直接打开](https://developers.weixin.qq.com/s/YhGUfomc7IjX)

## 引入
### 下载代码
可以通过以下两种方式获取代码:
  - 点击上方示例代码,在开发者工具组查看代码,直接复制`components/navbar`到你的项目中
  - <a href="/dist/navbar.zip" target="_blank" download>点此下载</a>
### 项目引入
- 全局自定义导航栏:
```json
// app.json
{
  "window": {
    "navigationStyle": "custom"
  }
}
```
- 页面自定义导航栏
```json
// page.json
{
  "navigationStyle": "custom"
}
```
- 在`app.json`或`page.json`中引入组件
```json
{
  "usingComponents": {
    "navbar": "/components/navbar/navbar"
  }
}
```

### 使用方式
#### 代码示例:
- tab页  
![navbar_1](/navbar_1.png)
```html
<navbar
  title="标题"
  showSubTitle
  subTitle="副标题"
/>
```

- 普通页面  
![navbar_2](/navbar_2.png)
```html
<navbar
  title="示例页"
  background="#000000"
  fontColor="#fff"
  showWhite
  cusEvent
  bind:onClickLeft="onClickLeft"
/>

Page({
  onClickLeft () {
    wx.showToast({
      title: 'clicked left',
      icon: 'none',
      duration: 3000
    })
  }
});
```

## 组件传参
| 参数  | 说明 | 数据类型 | 默认值 |
| --- | --- | --- | --- |
| title | 页面标题 | `String` | `""` |
| fontColor | 标题字体颜色 | `String` | `#000` |
| subTitle | 副标题 | `String` | `""` |
| subFontColor | 副标题字体颜色 | `String` | `#FF3333` |
| cusSubStyle | 自定义副标题样式 | `String` | `""` |
| background | 导航栏背景颜色,可设置为`rgba(0,0,0,0)`实现透明 | `String` | `#fff` |
| showArrow | 是否显示返回箭头,组件初始化会判断是否没有上一级,无上级路由,`showArrow = false` | `Boolean` | `true` |
| hideBackHome | 隐藏左侧返回区域,组件初始化会判断是否是`tabbar`页面,需要修改`data.tabbarList`,tab页面`hideBackHome = true` | `Boolean` | `false` |
| showPlaceholder | 是否展示占位区域, `true`页面直接跟在后面写, `false`后续元素可能会被遮挡,适用于透明导航栏 | `Boolean` | `false` |
| cusEvent | 自定义返回事件 | `Boolean` | `false` |

### 自定义事件
| 事件名 | 说明 |
| --- | --- |
| onClickLeft | 点击左侧返回按钮自定义事件,需要`cusEvent === true` |

### 默认事件
| 事件名 | 说明 |
| --- | --- |
| onClickLeft | 点击返回上一级 |
| onClickHome | 点击返回首页(默认:`/index/index`,按需修改) |
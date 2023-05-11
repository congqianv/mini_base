---
sidebarDepth: 2
---

# 底部导航栏 | tabBar

## 使用场景
::: tip 适用于
- 官方导航栏不满足产品/UI设计的情况
- 需要**自定义事件**的场景
- ...
:::

## 示例
[示例代码,点此直接打开](https://developers.weixin.qq.com/s/ohF2Y9mw7ejf)

## 引入
### 下载代码
可以通过以下两种方式获取代码:
  - 点击上方示例代码,在开发者工具组查看代码,直接复制`components/tab-bar`到你的项目中
  - <a href="/dist/tabbar.zip" target="_blank" download>点此下载</a>

### 项目引入
- 自定义底部导航栏:
::: tip 注意事项
- 这边的`tabBar.list`可以不配置  
- 如果不配置的话,`components/tab-bar/tab-bar.js`中的路由跳转需要从`switchTab`改成`redirectTo`或`reLaunch`  
- 区别在于,配置之后使用`switchTab`在导航切换的时候页面只会在第一次的时候会有加载的闪动,不配置则会每次点击都会闪一下
:::
```json {4}
// app.json
{
  "tabBar": {
    "custom": true,
    "color": "#000000",
    "selectedColor": "#000000",
    "backgroundColor": "#000000",
    "list": [
      {
        "pagePath": "pages/index/index",
        "text": "首页"
      },
      {
        "pagePath": "pages/member/member",
        "text": "会员"
      },
      {
        "pagePath": "pages/cart/cart",
        "text": "会员"
      },
      {
        "pagePath": "pages/mine/mine",
        "text": "我的"
      }
    ]
  },
}
```
- 在`app.json`中引入组件
```json
{
  "usingComponents": {
    "tabBar": "/components/tab-bar/tab-bar"
  }
}
```
- 修改`/components/tab-bar/tab-bar.js`文件中的`data.tabList`,导航的icon存放在`/components/tab-bar/icons`目录下
### 使用方式
#### 代码示例
![tabbar](/tabbar.png)
```wxml
<tabBar pageIndex="2" />
```

## 组件传参
| 参数  | 说明 | 数据类型 | 默认值 |
| --- | --- | --- | --- |
| pageIndex | 页面的索引 | `Number` | `0` |
| background | 导航栏背景色 | `String` | `#fff` |

### 默认事件
| 事件名 | 说明 |
| --- | --- |
| handleChange | 单击ab进行切换页面 |
| doubleClick | 快速双击Tab滚动页面到顶部 |
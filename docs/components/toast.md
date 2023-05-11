---
sidebarDepth: 2
---

# 轻提示 | toast

## 适用场景
::: tip 适用于
+ 自定义toast样式
+ toast内容过长,原生toast展示不全
+ toast内容除了文字还有别的类似图片之类的元素
+ ...
:::

## 表现形式
![toast](/toast.gif)

## 代码示例
[示例代码,点此直接打开](https://developers.weixin.qq.com/s/npsdItmp7qjA)
```html
<button class="btn" bindtap="onTapBtn">Toast</button>
<button class="btn" bindtap="onTapLoadingBtn">Loading</button>

<toast id='my-toast' />
```
```js
const { Toast } = require('../components/toast/toast')
onTapBtn () {
  Toast.showToast({
    title: 'showToast',
    mask: false
  })
},

onTapLoadingBtn () {
  Toast.showLoading({
    title: '3s后关闭',
    mask: true
  })
  setTimeout(() => {
    Toast.hideLoading()
  }, 3000);
}
```
## 引入
### 下载代码
可以通过以下两种方式获取代码:
  - 点击上方示例代码,在开发者工具组查看代码,直接复制`components/toast`到你的项目中
  - <a href="/dist/toast.zip" target="_blank" download>点此下载</a>

## 事件
:::tip 注意:
需要在页面js文件中引入Toast
:::
| 事件名 | 说明 |
| --- | --- |
| showToast | 参数如下 |
| showLoading | 参数如下 |
| hideLoading | 参数如下 |

## 参数
| 参数 | 说明 | 类型 | 默认值 | 是否必传 |
| --- | --- | --- | --- | --- |
| title | toast标题 | `String` | `''` | 否 |
| duration | showToast传入,showLoading不传,展示toast的延时 | `Number` | `3000` | 否 |
| mask | 是否显示遮罩层 | `Boolean` | `false` | 否 |
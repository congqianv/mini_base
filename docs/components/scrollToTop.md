---
sidebarDepth: 2
---

# 滚动到顶部 | scrollToTop

## 适用场景
::: tip 适用于
页面过长,滚动之后上部可操作区域距离屏幕可视区域距离过长,可以直接返回到页面顶部
:::

## 表现形式
![scrollToTop](/scrollToTop.png)

## 代码示例
[示例代码,点此直接打开](https://developers.weixin.qq.com/s/1GsA3lmb7fje)
+ 始终显示
```html
<scrollToTop showScrollToTop />
```
+ 根据滚动距离手动控制显示/隐藏
```html
<scrollToTop showScrollToTop />
```
```js
data: {
  showScrollToTop: false
}

onPageScroll (e) {
  let { scrollTop } = e
  if (scrollTop >= 667) {
    if (this.data.showScrollToTop) return
    this.setData({
      showScrollToTop: true
    })
  } else {
    if (!this.data.showScrollToTop) return
    this.setData({
      showScrollToTop: false
    })
  }
}
```

## 引入
### 下载代码
可以通过以下两种方式获取代码:
  - 点击上方示例代码,在开发者工具组查看代码,直接复制`components/scroll-to-top`到你的项目中
  - <a href="/dist/scrollToTop.zip" target="_blank" download>点此下载</a>

## 组件传参
| 参数 | 说明 | 数据类型 | 默认值 |
| --- | --- | --- | --- |
| showScrollToTop | 是否展示滚动到顶部icon | Boolean | false |

## 默认事件
| 事件名 | 说明 | 返回值 |
| --- | --- | --- | --- |
| scrollToTop | 点击滚动到顶部按钮触发,滚动到顶部 | - |
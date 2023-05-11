---
sidebarDepth: 2
---

# 安全区域 | safeArea

## 适用场景
::: tip 适用于
+ 需要适配iPhoneX及以上设备底部导航条遮挡页面的情况
+ 需要配合css `env(safe-area-inset-bottom)` 使用
:::

## 代码示例
[示例代码,点此直接打开](https://developers.weixin.qq.com/s/WVtzYtmL7ojK)
```css
/* 页面或者全局css */
page {
  padding-bottom: env(safe-area-inset-bottom);
}
```
```html
<safeArea />
```
<img src="/safeArea1.png" style="zoom: 30%;margin-top: 40px" />

```html
<safeArea background="rgba(0,0,0,0.1)" />
```
<img src="/safeArea1.png" style="zoom: 30%;margin-top: 40px" />

## 引入
### 下载代码
可以通过以下两种方式获取代码:
  - 点击上方示例代码,在开发者工具组查看代码,直接复制`components/safe-area`到你的项目中
  - <a href="/dist/safeArea.zip" target="_blank" download>点此下载</a>

## 组件传参
| 参数 | 说明 | 数据类型 | 默认值 |
| --- | --- | --- | --- |
| background | 显示安全区域的颜色 | `String` | `#fff` |

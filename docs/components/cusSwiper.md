---
sidebarDepth: 2
---

# 自定义滚动/轮播 | cusSwiper

## 适用场景
::: tip 适用于
- 轮播图
- 商品详情副图
- 功能展示
- ...
:::

## 表现形式
![swiper](/swiper.png)

## 代码示例
[示例代码,点此直接打开](https://developers.weixin.qq.com/s/Mmk6nkmX78jq)
```html
<cusSwiper
  imgUrls="{{imgUrls}}"
  imgKey="url"
  showDots="{{false}}"
/>
```
```html
<cusSwiper
  imgUrls="{{imgUrls}}"
  imgKey="mainUrl.url"
/>
```

## 引入
### 下载代码
可以通过以下两种方式获取代码:
  - 点击上方示例代码,在开发者工具组查看代码,直接复制`components/cus-swiper`到你的项目中
  - <a href="/dist/cus-swiper.zip" target="_blank" download>点此下载</a>

## 组件传参
| 参数 | 说明 | 数据类型 | 默认值 |
| --- | --- | --- | --- |
| imgUrls | 要显示的图片数组 | Array | `[]` |
| imgKey | 带显示的图片的key,多级对象直接以`xxx.xxx.xxx`的形式传参 | String | `url` |
| showDots | 以`点`的形式展示当前图片是第几个,`false`展示数字形式 | Boolean | `true` |
| swiperHeight | 轮播图片的高度(为兼容多个页面使用该组件,设计高度不一致) | Number | `368` |
| autoplay | 自动轮播 | Boolean | `false` |
| circular | 衔接滑动 | Boolean | `true` |
| interval | 自动切换时间间隔 | Number | `5000` |
| duration | 滑动动画时长 | Number | `500` |

## 自定义事件
| 事件名 | 说明 | 返回值 |
| --- | --- | --- |
| onTapItem | 点击轮播图事件 | 返回传入的图片数组当前对象 |
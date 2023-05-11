---
sidebarDepth: 2
---
# 列表项 | cell

## 适用场景
::: tip 适用于
+ 订单详情页展示订单信息
+ 个人中心页展示选项列表
+ 商品详情页展示商品参数
+ 需要以列表形式展示的页面
+ ...
:::
## 表现形式
![cell](/cell.png)

## 代码示例
[示例代码,点此直接打开](https://developers.weixin.qq.com/s/9lHOx9mh75j7)
```html
<cell
 title="标题"
 titleColor="#414141"
 label="描述"
 labelStyle="font-weight: bold;color: blue"
 rightLabel="右侧文字"
 rightLabelStyle="color: #ff0000"
 showBorder
 hideArrow
/>
```

## 引入
### 下载代码
可以通过以下两种方式获取代码:
  - 点击上方示例代码,在开发者工具组查看代码,直接复制`components/cell`到你的项目中
  - <a href="/dist/cell.zip" target="_blank" download>点此下载</a>

## 组件传参
| 参数 | 说明 | 数据类型 | 默认值 |
| --- | --- | --- | --- |
| title | 左侧标题 | `String` | `""` |
| titleColor | 左侧标题颜色 | `String` | `rgba(51, 51, 51, 0.6)` |
| label | 中间区域的内容 | `String` | `""` |
| labelStyle | 中间区域自定义样式 | `String` | `""` |
| rightLabel | 右侧标题 | `String` | `""` |
| rightLabelStyle | 右侧标题自定义样式 | `String` | `""` |
| showBorder | 是否展示分割线 | `Boolean` | `false` |
| hideArrow | 是否展示列表箭头 | `Boolean` | `false` |
| cusStyle | 列表自定义样式 | `String` | `""` |

## 自定义事件
| 事件名 | 说明 | 返回值 |
| --- | --- | --- |
| onTap | 点击列表项事件 | true |
| onTapMore | 点击右侧标题事件 | true |
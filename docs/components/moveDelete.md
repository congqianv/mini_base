---
sidebarDepth: 2
---

# 滑动删除 | moveDelete

## 适用场景

::: tip 适用于

- 购物车页面
- ...
  :::

## 注意事项

::: warning 请注意

- 本组件依赖 [fiter](code/filter.html) 过滤器显示价格,项目报错请检查是否引入`filter`
- 具体的 UI 展示需要根据实际 UI 设计进行 icon 替换或样式修改
- 本组件不具有通用性,数据格式见示例代码,需要根据实际业务需求修改
  :::

## 表现形式

<img src="/moveDelete.png" style="zoom: 50%;margin-top: 40px" />

## 示例代码
[示例代码,点此直接打开](https://developers.weixin.qq.com/s/f3Lipkmm7bjv)

```js
// index.js
data: {
  productList: [
    {
      id: 1,
      goodsNum: 1, // 商品数量
      name: "【成都仓库】青春毕业季江小白", // 商品名
      price: 1, // 商品价格
      salePrice: 1, // 商品售价
      skuImgUrl: { // 商品图
        url: "https://colgate-yijian.oss-cn-zhangjiakou.aliyuncs.com/a3e0e1122ad24049aa677b48eef050c7.jpg"
      },
      spec: "规格:江小白半箱*12瓶", // 商品规格
      selected: false // 是否勾选
    }
    // ...
  ]
}
handleSelect (e) { // 点击选择框事件
  let { detail: index } = e
  let { selected } = this.data.productList[index]
  this.setData({
    [`productList[${index}].selected`]: !selected
  })
},

handleGoodsNum (e) { // 增减商品数量
  let { type, index } = e.detail
  let { productList } = this.data
  productList = JSON.parse(JSON.stringify(productList))
  let changeNum = type === 'add' ? 1 : -1
  productList[index].goodsNum += changeNum
  this.setData({
    productList
  })
},

handleDelete (e) { // 删除商品
  let { detail: index } = e
  let { productList } = this.data
  productList.splice(index, 1)
  this.setData({
    productList
  })
},

onTapItem (e) { // 点击单个商品操作
  let { detail: item } = e
  wx.showToast({
    title: `你点击了id为${item.id}的列表项`,
    icon: 'none',
    duration: 3000
  })
}
```
```html
<!-- index.wxml -->
<moveDelete
  productList="{{productList}}"
  bind:handleSelect="handleSelect"
  bind:handleGoodsNum="handleGoodsNum"
  bind:handleDelete="handleDelete"
  bind:onTapItem="onTapItem"
/>
```
## 引入
### 下载代码
可以通过以下两种方式获取代码:
  - 点击上方示例代码,在开发者工具组查看代码,直接复制`components/mobe-delete`到你的项目中
  - <a href="/dist/moveDelete.zip" target="_blank" download>点此下载</a>

## 组件传参
| 参数 | 说明 | 数据类型 | 默认值 |
| --- | --- | --- | --- |
| productList | 需要展示的商品列表(可以改造成单个商品,引用页面进行循环遍历,可能自由度更高) | Array | `[]` |
| disabled | 不允许滑动 | Boolean | `false` |

## 自定义事件
| 事件名 | 说明 | 返回值 |
| --- | --- | --- |
| handleSelect | 点击选择按钮 | `index` |
| handleGoodsNum | 增减商品数量 | `index` |
| handleDelete | 点击删除按钮 | `index` |
| onTapItem | 点击整个列表 | `列表项Object` |
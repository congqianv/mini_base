# WXS过滤器filter.wxs

由于小程序的`wxml`**不支持**直接在标签中写函数表达式,
但是经常会需要**实时响应**数据中的一些字段的修改,或者一些简单的对于数据的**过滤**操作,
这时候就可以使用[wxs](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxs/).  
这边整理了一些项目中常用的过滤器
::: tip 注意:
wxs只支持es5的写法  
支持的类库请参考[基础类库](https://developers.weixin.qq.com/miniprogram/dev/reference/wxs/07basiclibrary.html)
:::

## 分割数字整数部分和小数部分
**适用于需要展示价格的整数和小数部分不一样设计的情况,可以分别取出整数部分和小数部分,单独给样式**
```js
function splitNum (val, sort) {
  if (!val) return 0
  val = Number(val).toFixed(2).toString()
  var intNum, decNum
  if (val.indexOf('.') !== -1) {
    intNum = val.split('.')[0]
    decNum = val.split('.')[1]
  } else {
    intNum = val
    decNum = '00'
  }

  if (sort == 1) {
    return intNum
  } else {
    return decNum
  }
}
```
![splitNum](/splitNum.png)

## 价格/数字格式化
**适用于展示价格或者展示数字时,有小数展示小数,没有小数只展示整数部分**
```js
// decimal精确位数
function fmtPrice (price, decimal = 2) {
  price *= 1
  if (price) {
    var numArr = price.toFixed(decimal).split('.')
    return numArr[1] == '00' ? numArr[0] : price.toFixed(decimal)
  } else if (price === 0) {
    return price
  } else {
    return ''
  }
}
```
![fmtPrice](/fmtPrice.png)

## 优惠券到期时间
**适用于基于b2c商场的,且使用到优惠券模块的项目**
```js
//优惠券时间
var couponDate = function (coupon) {
  if (!coupon) return
  if (coupon.expiryType == 'EXPIRY_TYPE_T_DAY') {
    //领取 x 天有效
    return '领取后当天生效，' + coupon.endExt + '天有效';
  } else if (coupon.expiryType == 'EXPIRY_TYPE_FIXED_DATE') {
    //指定日期内有效
    var startTime = coupon.start.split(' ')[0];
    var endTime = coupon.end.split(' ')[0];
    return startTime + '至' + endTime;
  } else if (coupon.expiryType == 'EXPIRY_TYPE_LONG_AVAILABLE') {
    //长期有效
    return '长期有效'
  } else {
    return ''
  }
}
```

## 优惠券价格计算
**这边分为满减券和折扣券两种计算方式**
```js
var couponAmount = function (item) {
  if (!item) return
  if (item.type === 'PRICE_BREAK_DISCOUNT') {
    return fmtPrice(item.discountAmount / 100)
  } else if (item.type === 'PERCENT_DISCOUNT') {
    return (item.discountAmount / 1000).toFixed(1)
  } else {
    return fmtPrice(item.discountAmount / 100)
  }
}
```

## 阿里云OSS缩略图
**适用于使用阿里云oss的项目,其他的oss平台压缩直接修改相关后缀就行**
```js
// oss缩略图
var ossResize = function (url, w, h = 0) {
  var rate = 1
  w = w * rate
  h = h * rate
  if (!url) return ''
  if (!~url.indexOf('aliyuncs')) {
    return url
  }
  if (h > 0) {
    return url + '?x-oss-process=image/resize,m_lfit,w_' + w + ',h_' + h
  } else {
    return url + '?x-oss-process=image/resize,m_lfit,w_' + w
  }
}
```

## 千分位显示
**getRegExp() 是WXS中使用正则的方式**
```js
function fmtKNum(val) {
  // 格式化数字,千位分隔
  if (val) {
    var reg = getRegExp("(d)(?=(d{3})+\b)", "g");
    val = val.toString().replace(reg, "$1,");
  }
  return val;
}
```
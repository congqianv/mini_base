# 检查数据类型

## 基本数据类型
ES5: `Object`、`String`、`Number`、`Boolean`、`Undefined`、`Null`  
ES6 新增: `Symbol`  
NEXT: `BigInt`

## 常见判断方式
+ `typeof`  
对于基本的数据类型可以判断,但是对于引用对象,如`Function`、`RegExp`、`Date`等无法清楚地返回具体对象类型
+ `instanceof`  
判断对象的原型链中是不是能找到类型的`prototype`, 但是不适用于一些基本数据类型  
都有局限性, 如
```js
typeof null // object
typeof []  // object

1 instanceof Number // false
'111' instanceof String // false
```

## 使用`Object.prototype.toString.call(xxx)`
返回值形式如: `[object Array]`、`[object RegExp]`、`[object Date]`等, 可以通过这个返回值进行数据类型的判断  
代码封装如下:
```js
function checkType (val) {
  let baseType = typeof(val)
  if (baseType === 'object') {
    baseType = Object.prototype.toString.call(val).match(/(?<= )\w+/)[0]
  }
  return baseType
}
```
---
sidebarDepth: 2
---

# 骨架屏

## 关于骨架屏
对于前端而言,一个页面展示给用户之前,会向后端进行数据请求,然后渲染到页面上。而受制于网络环境,用户的设备性能等因素,从发起请求到获取数据到数据展示的时间是不可预知的。  
为了避免用户打开页面,盯着白屏等待。一般情况下都会在发起请求之前做一些`loading`的处理。  
**相对而言,骨架屏可以更直观的展示给用户页面布局,且更美观。**
### 菊花图
![loading](/loading.gif)
### 骨架屏
![skeleton](/skeleton.gif)
![skeleton2](/skeleton2.png)

## 接入方式
#### 菊花图
可以直接使用`wx.showLoading()`配合`wx.hideLoading()`成对使用。
#### 骨架屏
:::tip 建议
对于页面中有多个模块通过多个请求,推荐使用第一种方式
对于详情页或者列表页这种通过一两个请求的,推荐使用开发者工具直接生成
:::
+ 手动编写  
优点: 对于页面有不同请求,每个接口响应时间不可预估,可以遵循**先有数据,先展示**原则,控制起来更简单。  
缺点: 编写麻烦,需要每个模块单独拎出来写。
建议: 将已经写好的页面模块单独写到`template`文件中,可以保留原有class,并做适当修改,通过一个js对象进行控制。
例子:
  ```html
  <import src="skeleton/banner.wxml" />
  <template is="banner" wx:if="{{skeleton.hideBanner}}" />
  <block wx:else>
    <cusSwiper imgUrls="{{imgUrls}}" bind:onTapItem="onTapItem" autoplay wx:if="{{imgUrls.length > 0}}" />
  </block>
  ```
+ 开发者工具自动生成  
[骨架屏文档](https://developers.weixin.qq.com/miniprogram/dev/devtools/skeleton.html)  
优点: 可以一键生成需要的页面的骨架屏,省去重复代码编写  
缺点: 分步展示/显示骨架屏操作相对麻烦,需要将页面元素使用定位编写。  
使用方式:
  + 下载最新版开发者工具
  + 点击模拟器视图下的`...`,生成骨架屏

    ![skeleton3](/skeleton3.png)
  + 工具会自动在当前目录下生成`xxx.skeleton.wxml`和`xxx.skeleton.wxss`文件
  ![skeleton4](/skeleton4.png)
  + 页面中引入`template`,并引入样式
    ```html
      <import src="xxx.skeleton.wxml" />

      <template is="skeleton" wx:if="{{showLoading}}" />
    ```
    ```css
      @import 'xxx.skeleton.wxss';
    ```

#### 骨架屏样式
推荐色值: `#f6f6f6` `#e6e6e6` `#EFEFEF`  
闪屏动画:
  ```css
    @keyframes flush {
      0% {
        transform: translate(-100%, -100%) rotate(45deg);
      }
      100% {
        transform: translate(100%, 100%) rotate(45deg);
      }
    }
    .skeleton__shine {
      animation: flush 2s linear infinite;
      position: absolute;
      top: -50%;
      height: 200%;
      width: 100%;
      background: linear-gradient(to right,
      rgba(255, 255, 255, 0) 30%,
      rgba(255, 255, 255, .85) 60%,
      rgba(255, 255, 255, 0) 80%
      );
    }
  ```
---
sidebarDepth: 2
---

# vuepress 介绍
## 官网
[vuepress 官网](https://www.vuepress.cn/guide/)

## 介绍
`vuepress` 是一个极简的 **静态网站** 生成器,只需要简单的配置, 就可以将编写好的`markdown`静态网页  
可以很方便的搭建个人博客或者技术文档  
使用`Markdown`进行编写, 只需要关注文章本身, [Markdown语法](https://www.jianshu.com/p/191d1e21f7ed)  
本文仅介绍如何快速搭建一个`vuepress`博客站/文档站

## 安装vuepress
> 需要Node环境并且 Node.js 版本 >= 8

新建项目,初始化`package.json`
```js
npm init -y
OR
yarn init -y
```
安装`vuepress`
```js
npm i vuepress
OR
yarn add vuepress
```
安装好`vuepress`之后就可以启动项目了.
```js
echo '# Hello Express' > README.md
vuepress dev .
```
控制台输出
```shell
success [00:36:06] Build 7e95da finished in 7349 ms!
> VuePress dev server listening at http://localhost:8081/
```
打开 http://localhost:8081/,可以看到项目已经在运行了
![vuepress](/vuepress.png)

## 目录结构
VuePress 遵循 **约定优于配置** 的原则，推荐的目录结构如下：
```shell
.
├── docs
│   ├── .vuepress (可选的)
│   │   ├── components (可选的)
│   │   ├── theme (可选的)
│   │   │   └── Layout.vue
│   │   ├── public (可选的)
│   │   ├── styles (可选的)
│   │   │   ├── index.styl
│   │   │   └── palette.styl
│   │   ├── templates (可选的, 谨慎配置)
│   │   │   ├── dev.html
│   │   │   └── ssr.html
│   │   ├── config.js (可选的)
│   │   └── enhanceApp.js (可选的)
│   │
│   ├── README.md
│   ├── guide
│   │   └── README.md
│   └── config.md
│
└── package.json
```
后续以该目录形式编写

## 配置项
配置`package.json`,添加启动脚本命令
```json
"scripts": {
  "dosc:dev": "vuepress dev docs --port 9000",
  "dosc:build": "vuepress build dosc --port 9000"
}
```
`vuepress`的配置文件都放在`.vuepress/config.js`中,它应该导出一个 JavaScript 对象：
```js
module.exports = {
  title: '', // 设置网站标题
  description: ''
}
```
具体配置参考[vuepress配置项](https://www.vuepress.cn/config/),这边介绍几个常用的: 
```js
module.exports = {
  title: '', // 网站标题
  dest: '', // build 输出目录,默认:.vuepress/dist
  head: [ // 需要注入到网站 head 中的标签, 形式:[tagName, { attrName: attrValue }, innerHTML?]
    ['link', { rel: 'icon', href: '/logo.png' }]
  ],
  markdown: {
    lineNumbers: true,  // 代码显示行号
  },
  themeConfig: {} // 网站主题
}
```
## 默认主题配置
`vuepress`内置了一个主页样式，是[Front-matter](https://jekyllrb.com/docs/front-matter/)格式的, 首页入口是根目录下的`README.md`文件
```yaml
---
home: true
heroText: 页面主标题
tagline: 页面副标题
actionText: 按钮文本
actionLink: 按钮跳转路径
features:
- title: 简洁至上
  details: 以 Markdown 为中心的项目结构，以最少的配置帮助你专注于写作。
- title: Vue驱动
  details: 享受 Vue + webpack 的开发体验，在 Markdown 中使用 Vue 组件，同时可以使用 Vue 来开发自定义主题。
- title: 高性能
  details: VuePress 为每个页面预渲染生成静态的 HTML，同时在页面被加载的时候，将作为 SPA 运行。
footer: MIT Licensed | Copyright © 2020-present Evan You
---
```
![vuepress2](/vuepress2.png)

## 导航栏配置
### 搜索栏
`vuepress`提供了一个简单的搜索功能,只需要在`config.js`中配置一下,就可以实现  
可以在页面顶部设置`tags`优化搜索
```js
module.exports = {
  themeConfig: {
    search: true
  }
}
```
```yaml
---
tags:
  - 配置
  - 主题
  - 索引
---
```

### 顶部导航栏
![vuepress3](/vuepress3.png)
```js
module.exports = {
  themeConfig: {
   nav: [
      { text: '主页', link: '/' },
      { text: '按钮跳转路径', link: '/按钮跳转路径/' },
      { text: '外部链接', link: 'https://baidu.com' },
      { text: '外部链接2', link: 'https://sogou.com', target: '_parent' },
      {
        text: 'Languages',
        ariaLabel: 'Language Menu',
        items: [
          { text: 'Chinese', link: '/language/chinese/' },
          { text: 'Japanese', link: '/language/japanese/' }
        ]
      }
    ]
  }
}
```

### 侧边栏
如果不配置侧边栏的的话,页面左侧就是一块空白区域, 如:
![vuepress4](/vuepress4.png)  
自动生成目录(仅当前页面生效)
```markdown
---
sidebar: auto
---
```
或者在`config.js`中配置
```js
module.exports = {
  themeConfig: {
    sidebar: 'auto'
  }
}
```
![vuepress5](/vuepress5.png)  
目录默认显示当前页面的标题(h2~h3)组成的链接  
**侧边栏不会显示h1标题，从h2开始显示，最多显示到h3。**  
可以通过`themeConfig.sidebarDepth`或者`页面yaml`进行配置
```markdown
---
sidebar: auto
sidebarDepth: 2
---
```
或者在`config.js`中配置
```js
module.exports = {
  themeConfig: {
    sidebar: 'auto',
    sidebarDepth: 2
  }
}
```
`sidebarDepth`可选值:
| 值 | 说明 |
| --- | --- |
| 0 | 禁用标题链接 |
| 1 | 默认值,只显示h2的标题 |
| 2 | 可设置的最大值，再大无效, 同时提取h2和h3标题 |

### 侧边栏分组
![vuepress6](/vuepress6.png)
```js
sidebar: [
  {
    title: 'Group 1',   // 必要的
    path: '/foo/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: false, // 可选的, 默认值是 true,
    sidebarDepth: 1,    // 可选的, 默认值是 1
    children: [
      '/'
    ]
  },
  {
    title: 'Group 2',
    children: [ /* ... */ ]
  }
]
```
### 项目仅有一个侧边栏
如果需要所有页面仅显示一个侧边栏,可以如下配置
```js
module.exports = {
  themeConfig: {
    sidebar: [
      '/',
      '/home1',
      ['/home2', 'home2自定义标题'],
      '/home3/',
      '中文',
    ]
  }
}
```
:::warning 注意
这种形式下,所配置的侧边栏路径需要真实存在,否则侧边栏会消失,控制台报错
:::
说明:
+ 可以省略`.md`文件后缀
+ 如果路径已`/`结尾,会自动匹配该目录下的`readme.md`文件
+ 可以使用 `['path', '显示的文字']`的形式去自定义导航标题,或者在页面中使用`YAML`进行设置
+ 如果不设置`title`,会取页面中的第一个`header`作为标题显示
```yaml
---
title: 标题
---
```
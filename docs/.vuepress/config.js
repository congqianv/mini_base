import { defaultTheme } from '@vuepress/theme-default'
import { copyCodePlugin } from "vuepress-plugin-copy-code2";

module.exports = {
  title: '小程序组件&代码片段',  // 设置网站标题
  dest: './dist',    // 设置输出目录
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }]
  ],
  markdown: {
    lineNumbers: true,  // 代码显示行号
  },
  // 其它配置
  theme: defaultTheme({
    // navbar: false,
    search: true,
    displayAllHeaders: false,
    // sidebarDepth: 1,
    lastUpdated: '上次更新时间',
    smoothScroll: true,
    sidebar: [
      {
        text: 'vuepress 介绍',
        link: '/introduction/'
      },
      {
        text: '组件',
        collapsable: false,
        children: [
          'components/cell',
          'components/cusSwiper',
          'components/moveDelete',
          'components/navbar',
          'components/popup',
          'components/safeArea',
          'components/scrollToTop',
          'components/step',
          'components/tabbar',
          'components/toast'
        ]
      },
      {
        text: '代码片段',
        collapsable: false,
        children: [
          'code/request',
          'code/login',
          'code/systemInfo',
          'code/filter',
          'code/checkType'
        ]
      },
      {
        text: '其他',
        collapsable: false,
        children: [
          'other/skeleton',
          'other/track'
        ]
      }
    ]
  }),
  plugins: [
    copyCodePlugin()
  ]
}
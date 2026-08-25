---
# 官方文档相关配置：https://vitepress.dev/reference/default-theme-layout
layout: home
home: true

# 官方文档相关配置：https://vitepress.dev/reference/default-theme-home-page
lang: zh-CN
title: 许大仙的博客
titleTemplate: Hi，终于等到你
editLink: true
lastUpdated: true

# 指定要为当前页面注入的额外头标签。将附加在站点级配置注入的头标签之后
head:
  - - meta
    - name: description
      content: 为知笔记、许大仙前端、Java、大数据、云原生
  - - meta
    - name: keywords
      content: 许大仙，许大仙的博客

hero:
  name: "Java"
  text: "系统、深入、实用"
  tagline: ""
  image:  # text 和 tagline 区域旁的图片
    src: /logo.svg
    alt: "许大仙"
  # 按钮相关
  actions:
    - theme: brand
      text: "🏠首页"
      link: "/"      
    - theme: alt
      text: "🎉快速开始"
      link: "/guide"          

# 按钮下方的描述
features:
  - icon: 🧠
    title: "学习路径"
    details: "循序渐进梳理核心概念，在理解原理的基础上建立完整的知识脉络。"
  - icon: ✍️
    title: "实践方法"
    details: "以示例驱动理解，以源码验证认知，在动手实践中掌握常用技术与设计思想。"
  - icon: 🚨
    title: "工程要点"
    details: "关注边界条件、并发安全、数据一致性与性能，让代码经得起真实场景的检验。"
---

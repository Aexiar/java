import { DefaultTheme } from 'vitepress'
import { commonDirectoryName } from '../utils/constant'
export const sidebar: DefaultTheme.Sidebar = {
  '/notes/': [
    {
      text: 'Java 语言基础',
      collapsed: true,
      items: [
        { text: '计算机软件常识科普', link: `/notes/01_java-basic/01_${commonDirectoryName}/` },
      ]
    },
    {
      text: 'Java 语言进阶',
      collapsed: true,
      items: [
        { text: '虚拟地址空间', link: `/notes/02_java-leap/01_${commonDirectoryName}/` },
      ]
    },
    {
      text: 'Java 语言高级',
      collapsed: true,
      items: [

      ]
    },
    {
      text: '数据库核心技术',
      collapsed: true,
      items: [

      ]
    },
    {
      text: '项目构建工具',
      collapsed: true,
      items: [

      ]
    },
    {
      text: 'WEB 技术规范',
      collapsed: true,
      items: [

      ]
    },
    {
      text: '后端工程化',
      collapsed: true,
      items: [

      ]
    },
    {
      text: '前端工程化',
      collapsed: true,
      items: [

      ]
    },
    {
      text: '分布式核心',
      collapsed: true,
      items: [

      ]
    },
    {
      text: '微服务',
      collapsed: true,
      items: [

      ]
    },
    {
      text: '项目实战',
      collapsed: true,
      items: [

      ]
    }
  ],
}

export default sidebar
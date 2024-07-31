import { DefaultTheme } from 'vitepress'
import { commonDirectoryName } from '../utils/constant'
export const sidebar: DefaultTheme.Sidebar = {
  '/notes/': [
    {
      text: 'Java 语言基础',
      collapsed: true,
      items: [
        { text: 'C 语言入门', link: `/notes/01_c-basic/01_${commonDirectoryName}/` },
        { text: '变量和进制', link: `/notes/01_c-basic/02_${commonDirectoryName}/` },
        { text: '数据类型和运算符', link: `/notes/01_c-basic/03_${commonDirectoryName}/` },
        { text: '流程控制', link: `/notes/01_c-basic/04_${commonDirectoryName}/` },
        { text: '数组', link: `/notes/01_c-basic/05_${commonDirectoryName}/` },
        { text: '指针', link: `/notes/01_c-basic/06_${commonDirectoryName}/` },
        { text: '函数', link: `/notes/01_c-basic/07_${commonDirectoryName}/` },
        { text: '预处理器', link: `/notes/01_c-basic/08_${commonDirectoryName}/` },
        { text: '自定义数据类型', link: `/notes/01_c-basic/09_${commonDirectoryName}/` },
        { text: '字符串和时间', link: `/notes/01_c-basic/10_${commonDirectoryName}/` },
        { text: '内存管理', link: `/notes/01_c-basic/11_${commonDirectoryName}/` },
        { text: '文件操作', link: `/notes/01_c-basic/12_${commonDirectoryName}/` },
        { text: '调试工具和调试技巧（gdb和make）', link: `/notes/01_c-basic/13_${commonDirectoryName}/` },
        { text: '常用库函数', link: `/notes/01_c-basic/14_${commonDirectoryName}/` },
      ]
    },
    {
      text: 'Java 语言高级',
      collapsed: true,
      items: [

      ]
    },
    {
      text: '数据库',
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
      text: 'SSM',
      collapsed: true,
      items: [

      ]
    },
    {
      text: '微服务',
      collapsed: true,
      items: [

      ]
    }
  ],
}

export default sidebar
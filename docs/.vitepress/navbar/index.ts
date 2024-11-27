import { DefaultTheme } from 'vitepress'
export const nav: DefaultTheme.NavItem[] = [
  { text: '🏠首页', link: '/' },
  { text: '🧑‍💻计组6件套', link: '/coa6/notes/', target: '_blank' },
  {
    text: '🍉编程语言', items: [
      { text: '⚙️c/c++', link: '/c/notes/', target: '_blank' },
      { text: '🎨前端', link: '/web-design/notes/', target: '_blank' },
      { text: '☕Java', link: '/notes/' },
      { text: '📈大数据', link: '/big-data/notes/', target: '_blank' },
      { text: '🌱云原生', link: '/linux/notes/', target: '_blank' },
      { text: '🐹Go', link: '/go/notes/', target: '_blank' },
      { text: '🐍Python', link: '/python/notes/', target: '_blank' },
    ]
  },
  { text: '🛢️数据库', link: '/db/notes/', target: '_blank' },
  { text: '🤝开源软件', link: '/open-software/notes/', target: '_blank' },
  { text: '🌟关于我', link: '/notes/about/' },
]
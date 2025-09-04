// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'
import ArticleMetadata from "./components/ArticleMetadata.vue"
import mediumZoom from 'medium-zoom'
import {h, nextTick, onMounted, watch} from 'vue'
import giscusTalk from 'vitepress-plugin-comment-with-giscus'
import type {EnhanceAppContext, Theme} from 'vitepress'
import {inBrowser, useData, useRoute} from 'vitepress'
import Confetti from "./components/Confetti.vue"
import TypeIt from "./components/TypeIt.vue"
import SwitchLayout from './components/SwitchLayout.vue'
import HomeUnderline from "./components/HomeUnderline.vue"
import {NProgress} from 'nprogress-v2/dist/index.js'
import {NolebaseInlineLinkPreviewPlugin,} from '@nolebase/vitepress-plugin-inline-link-preview/client'
import '@nolebase/vitepress-plugin-inline-link-preview/client/style.css'
import 'nprogress-v2/dist/index.css'
import "vitepress-markdown-timeline/dist/theme/index.css"
import 'virtual:group-icons.css'
import './style/index.css'
import xgplayer from "./components/Xgplayer.vue"
import 'vitepress-plugin-legend/dist/index.css';
import {initComponent} from "vitepress-plugin-legend/component";

// 彩虹背景动画样式
function updateHomePageStyle(value: boolean) {
  if (value) {
    if (homePageStyle) return

    homePageStyle = document.createElement('style')
    homePageStyle.innerHTML = `
    :root {
      animation: rainbow 12s linear infinite;
    }`
    document.body.appendChild(homePageStyle)
  } else {
    if (!homePageStyle) return

    homePageStyle.remove()
    homePageStyle = undefined
  }
}

let homePageStyle: HTMLStyleElement | undefined
export default {
  extends: DefaultTheme,
  Layout() {
    return h(SwitchLayout)
  },
  enhanceApp({app, router}: EnhanceAppContext) {
    initComponent(app);
    // 彩虹背景动画样式
    if (typeof window !== 'undefined') {
      watch(
        () => router.route.data.relativePath,
        () => updateHomePageStyle(location.pathname === '/'),
        {immediate: true},
      )
    }
    // 开启详细的水合错误信息
    app.config.warnHandler = (msg, instance, trace) => {
      console.warn('[Vue warn]:', msg)
      console.warn('Component trace:', trace)
    }

    app.component('ArticleMetadata', ArticleMetadata)
    app.component('Confetti', Confetti)
    app.component('HomeUnderline', HomeUnderline)
    app.component('TypeIt', TypeIt)
    app.component('xgplayer', xgplayer) //鼠标跟随组件
    app.use(NolebaseInlineLinkPreviewPlugin)

    if (inBrowser) {
      NProgress.configure({showSpinner: false})
      // 手动定义 onBeforeRouteChange
      router.onBeforeRouteChange = () => {
        NProgress.start() // 开始进度条
      }
      // 在页面加载完成时停止进度条
      router.onAfterRouteChange = () => {
        NProgress.done() // 停止进度条
      }
    }
  },
  setup() {
    const {frontmatter} = useData()
    const route = useRoute()
    const initZoom = () => {
      // mediumZoom('[data-zoomable]', { background: 'var(--vp-c-bg)' }); // 默认
      mediumZoom('.main img', {background: 'var(--vp-c-bg)'}) // 不显式添加{data-zoomable}的情况下为所有图像启用此功能
    }
    onMounted(() => {
      initZoom()

      // 添加 .VPNavBarTitle 的点击事件
      const navBarTitle = document.querySelector('.VPNavBarTitle')
      if (navBarTitle) {
        navBarTitle.addEventListener('click', () => {
          // 刷新页面
          location.reload()
        })
      }

      // 禁止 ios 缩放屏幕
      document.addEventListener('gesturestart', function (event) {
        event.preventDefault()
      })

      // 禁止移动端（IOS）双击页面变大
      let touchTime = 0
      document.addEventListener('touchstart', function (event) {
        if (event.touches.length > 1) {
          event.preventDefault()
        }
      })
      document.addEventListener(
        'touchend',
        function (event) {
          //记录当前点击的时间与下一次时间的间隔
          const nowTime = new Date()
          if (nowTime.getTime() - touchTime <= 300) {
            event.preventDefault()
          }
          touchTime = nowTime.getTime()
        },
        false
      )
    })
    watch(
      () => route.path,
      () => nextTick(() => initZoom())
    )
    // giscus配置
    giscusTalk({
        repo: 'Aexiar/java', //仓库
        repoId: 'R_kgDONXPoQw', //仓库ID
        category: 'Announcements', // 讨论分类
        categoryId: 'DIC_kwDONXPoQ84ClC9a', //讨论分类ID
        mapping: 'pathname',
        inputPosition: 'bottom',
        lang: 'zh-CN',
      },
      {
        frontmatter, route
      },
      //默认值为true，表示已启用，此参数可以忽略；
      //如果为false，则表示未启用
      //您可以使用“comment:true”序言在页面上单独启用它
      true
    )
  }
} satisfies Theme

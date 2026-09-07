<template>
  <DefaultTheme.Layout>
    <template #doc-footer-before><BackTop/></template>
    <template #doc-before><ArticleMetadata/></template>
    <template #doc-after><GiscusComment/></template>
    <template #doc-top><NolebaseHighlightTargetedHeading/></template>
    <template #layout-bottom><SidebarTooltip :onlyEllipsis="true"/></template>
    <template #nav-bar-content-after><NolebaseEnhancedReadabilitiesMenu/></template>
    <template #nav-screen-content-after><NolebaseEnhancedReadabilitiesScreenMenu/></template>
    <template #home-hero-before><JavaHome v-if="frontmatter.javaHome"/></template>
    <template v-if="!frontmatter.javaHome" #home-features-after>
      <Confetti/>
      <HomeUnderline/>
      <LogoAnimate/>
    </template>
    <template v-if="!frontmatter.javaHome" #home-hero-info-after>
      <TypeIt
          strings="从语言基础到工程实践，构建清晰完整的 Java 知识体系。"
          :options="{ speed: 200, breakLines: false }"
          class="hero-typeit"
      />
    </template>
  </DefaultTheme.Layout>
</template>

<script lang="ts" setup>
import BackTop from './BackTop.vue'
import JavaHome from './JavaHome.vue'
import ArticleMetadata from './ArticleMetadata.vue'
import GiscusComment from './GiscusComment.vue'
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { nextTick, provide } from 'vue'
import Confetti from './Confetti.vue'
import TypeIt from './TypeIt.vue'
import HomeUnderline from './HomeUnderline.vue'
import LogoAnimate from './LogoAnimate.vue'
import { NolebaseHighlightTargetedHeading } from '@nolebase/vitepress-plugin-highlight-targeted-heading/client'
import {
  NolebaseEnhancedReadabilitiesMenu,
  NolebaseEnhancedReadabilitiesScreenMenu,
} from '@nolebase/vitepress-plugin-enhanced-readabilities/client'
import SidebarTooltip from './SidebarTooltip.vue'

const { isDark, frontmatter } = useData()

const enableTransitions = () =>
  'startViewTransition' in document &&
  window.matchMedia('(prefers-reduced-motion: no-preference)').matches

provide('toggle-appearance', async ({ clientX: x, clientY: y }: MouseEvent) => {
  if (!enableTransitions()) {
    isDark.value = !isDark.value
    return
  }

  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y),
    )}px at ${x}px ${y}px)`,
  ]

  await document.startViewTransition(async () => {
    isDark.value = !isDark.value
    await nextTick()
  }).ready

  document.documentElement.animate(
    { clipPath: isDark.value ? clipPath.reverse() : clipPath },
    {
      duration: 300,
      easing: 'ease-in',
      pseudoElement: `::view-transition-${isDark.value ? 'old' : 'new'}(root)`,
    } as any,
  )
})
</script>

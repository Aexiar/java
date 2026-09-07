<script setup lang="ts">
import { ArrowRight, BookOpen, Boxes, Braces, Coffee, Cpu, Database, House, Workflow } from '@lucide/vue'
import { withBase } from 'vitepress'

const topics = [
  { number: '01', icon: Braces, title: '夯实语言基础', en: 'FOUNDATION', description: '从语法、面向对象到集合与并发，建立清晰可靠的编程根基。', tags: ['Java SE', '集合', '多线程'], color: 'blue' },
  { number: '02', icon: Cpu, title: '深入运行原理', en: 'JVM CORE', description: '理解字节码、内存模型与类加载，让代码知其所以然。', tags: ['JVM', '字节码', '性能调优'], color: 'red' },
  { number: '03', icon: Workflow, title: '连接工程实践', en: 'ENGINEERING', description: '串联数据库、框架与分布式技术，把知识沉淀为工程能力。', tags: ['Spring Boot', '中间件', '微服务'], color: 'teal' },
]

const nodes = [
  { icon: Braces, title: '语言基础', detail: 'Syntax · OOP', position: 'language' },
  { icon: Cpu, title: '运行原理', detail: 'JVM · Bytecode', position: 'runtime' },
  { icon: Database, title: '数据持久化', detail: 'MySQL · Redis', position: 'data' },
  { icon: Boxes, title: '工程体系', detail: 'Spring · Cloud', position: 'engineering' },
]

const flowPaths = [
  'M110 96 H174 Q198 96 198 120 V161 Q198 175 218 175 H250',
  'M110 256 H174 Q198 256 198 232 V203 Q198 189 218 189 H250',
  'M310 175 H345 Q370 175 370 151 V120 Q370 96 394 96 H450',
  'M310 189 H345 Q370 189 370 213 V232 Q370 256 394 256 H450',
]
</script>

<template>
  <div class="java-home">
    <section class="java-hero" aria-labelledby="java-title">
      <div class="java-intro">
        <p class="java-eyebrow"><i /> 在这里，读懂代码与系统</p>
        <h1 id="java-title">走进 Java 的世界<br><span>让知识，融会贯通。</span></h1>
        <p class="java-description">从第一行代码，到每一次架构设计。<br>一起探索 Java 背后的语言原理、核心技术与工程实践。</p>
        <div class="java-actions">
          <a class="java-secondary" :href="withBase('/')"><House :size="17" />首页</a>
          <a class="java-primary" :href="withBase('/guide')">开启学习之旅<ArrowRight :size="17" /></a>
        </div>
        <div class="java-notes"><span>系统梳理</span><span>原理驱动</span><span>实践验证</span></div>
      </div>

      <div class="java-visual" role="img" aria-label="Java 技术体系：以 Java 为核心，连接语言基础、JVM、数据持久化与工程框架。">
        <div class="visual-label"><span><i /> THE JAVA JOURNEY</span><span>从语法到架构</span></div>
        <div class="java-orbit orbit-one" /><div class="java-orbit orbit-two" />
        <svg class="java-connectors" viewBox="0 0 560 350" fill="none" aria-hidden="true">
          <g v-for="(path, index) in flowPaths" :key="path">
            <path :d="path" />
            <path class="java-flow" :d="path" pathLength="100" :style="{ animationDelay: `${index * -0.8}s` }" />
          </g>
        </svg>
        <div v-for="node in nodes" :key="node.position" class="java-node" :class="node.position">
          <component :is="node.icon" :size="24" :stroke-width="1.6" />
          <strong>{{ node.title }}</strong><small>{{ node.detail }}</small>
        </div>
        <div class="java-core"><Coffee :size="43" :stroke-width="1.4" /><strong>JAVA</strong><small>语言 · 运行时 · 生态</small></div>
        <div class="visual-caption"><BookOpen :size="14" /> 从核心原理出发，让每一次编码更从容</div>
      </div>
    </section>

    <div class="java-stack"><span>构建你的技术视野</span><div><b>Java SE</b><i /><b>JVM</b><i /><b>Spring</b><i /><b>MySQL</b><i /><b>Cloud</b></div><span>夯实基础 · 持续进阶</span></div>

    <section class="java-learning" aria-labelledby="learning-title">
      <div class="learning-heading"><div><p>LEARN · UNDERSTAND · BUILD</p><h2 id="learning-title">每一步积累，都让下一次实践更从容</h2></div><span>循序渐进，构建你的 Java 知识体系</span></div>
      <div class="java-topics">
        <article v-for="topic in topics" :key="topic.number" class="java-topic" :class="topic.color">
          <div class="topic-top"><div class="topic-icon"><component :is="topic.icon" :size="23" :stroke-width="1.7" /></div><span>{{ topic.number }} / {{ topic.en }}</span></div>
          <h3>{{ topic.title }}</h3><p>{{ topic.description }}</p><div class="topic-tags"><span v-for="tag in topic.tags" :key="tag">{{ tag }}</span></div>
        </article>
      </div>
    </section>
    <p class="java-closing"><span />保持好奇，让每一行代码都通向新的可能<span /></p>
  </div>
</template>

<style scoped>
.java-home { --java-text: #26394d; --java-muted: #60758b; --java-accent: #2d6f95; --java-red: #d8544f; --java-line: #d7e1e9; --java-surface: rgb(255 255 255 / 68%); max-width: 1200px; margin: 0 auto; padding: clamp(24px, 4vh, 40px) 32px 16px; color: var(--java-text); line-height: 1.5; }
.java-hero { display: grid; grid-template-columns: 1fr 1fr; align-items: center; gap: 48px; padding: 8px 0 clamp(20px, 3vh, 28px); }
.java-eyebrow { display: flex; align-items: center; gap: 10px; color: var(--java-accent); font-size: 12px; letter-spacing: 2px; margin: 0 0 10px; }
.java-eyebrow i, .visual-label i { display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: var(--java-red); box-shadow: 0 0 0 4px rgb(216 84 79 / 10%); }
.java-intro h1 { padding: 0; text-align: left; font-size: clamp(30px, 3vw, 40px); line-height: 1.3; letter-spacing: 0; font-weight: 750; margin: 0; }
.java-intro h1::after { display: none; }
.java-intro h1 span { color: var(--java-accent); background: linear-gradient(110deg, #2d6f95, #3f87aa 63%, #d8544f); background-clip: text; -webkit-text-fill-color: transparent; }
.java-description { margin: 10px 0 14px; font-size: 15px; line-height: 1.6; color: var(--java-muted); }
.java-actions { display: flex; flex-wrap: wrap; gap: 12px; }
.java-actions a { display: inline-flex; align-items: center; justify-content: center; gap: 14px; padding: 10px 18px; border-radius: 8px; font-size: 13px; line-height: 24px; font-weight: 600; transition: transform .2s, box-shadow .2s; }
.java-actions a:hover { transform: translateY(-2px); box-shadow: 0 6px 16px rgb(45 111 149 / 18%); }
.java-actions a:focus-visible { outline: 3px solid var(--java-accent); outline-offset: 4px; }
.java-primary { background: linear-gradient(110deg, #2d6f95, #3f87aa); color: white; }
.java-secondary { background: rgb(45 111 149 / 6%); border: 1px solid #b7ccda; color: var(--java-accent); }
.java-notes { display: flex; gap: 22px; margin-top: 12px; color: var(--java-muted); font-size: 11px; }
.java-notes span::before { content: '•'; color: #91adbd; margin-right: 7px; }
.java-visual { position: relative; width: 100%; aspect-ratio: 560 / 350; background-image: radial-gradient(rgb(61 112 143 / 16%) .8px, transparent .8px); background-size: 18px 18px; }
.visual-label { position: absolute; inset: 0 0 auto; display: flex; justify-content: space-between; color: var(--java-muted); font-size: 9px; letter-spacing: 1.8px; }
.visual-label i { margin-right: 9px; }.visual-label > span:last-child { letter-spacing: 0; }
.java-connectors { position: absolute; inset: 0; width: 100%; height: 100%; stroke: #a4bbc9; stroke-width: 1.2; }
.java-orbit { position: absolute; border: 1px solid rgb(45 111 149 / 10%); border-radius: 50%; top: 52%; left: 50%; transform: translate(-50%, -50%); aspect-ratio: 1; }.orbit-one { width: 44%; }.orbit-two { width: 60%; }
.java-node { position: absolute; width: 23%; height: 25%; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; background: var(--java-surface); border: 1px solid #b8ccd8; border-radius: 8px; color: #477a99; }
.java-node strong { color: var(--java-text); font-size: 12px; }.java-node small { color: var(--java-muted); font-size: 9px; }
.language { left: 2%; top: 15%; }.runtime { left: 2%; bottom: 14%; border-color: #e1b7b3; color: var(--java-red); }.data { right: 2%; top: 15%; border-color: #acd0cd; color: #287f78; }.engineering { right: 2%; bottom: 14%; border-color: #bdc7df; color: #5e6fa2; }
.java-core { position: absolute; top: 52%; left: 50%; transform: translate(-50%, -50%); width: 24%; height: 37%; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; border: 1px solid #9dbdce; border-radius: 20px; background: linear-gradient(140deg, #e8f3f8, #eef1f5); box-shadow: 0 0 0 7px rgb(255 255 255 / 42%), 0 12px 35px rgb(45 111 149 / 12%); color: #2d6f95; }
.java-core strong { font-size: 20px; letter-spacing: 4px; font-weight: 500; }.java-core small { font-size: 9px; letter-spacing: 1px; }
.visual-caption { position: absolute; bottom: 0; width: 100%; display: flex; align-items: center; justify-content: center; gap: 7px; color: var(--java-muted); font-size: 10px; }
.java-stack { display: flex; align-items: center; justify-content: space-between; gap: 20px; padding: 12px 0; border-block: 1px solid var(--java-line); color: var(--java-muted); font-size: 11px; }.java-stack > div { display: flex; align-items: center; gap: 25px; }.java-stack b { font-size: 16px; font-weight: 600; line-height: 24px; letter-spacing: 0; }.java-stack i { width: 3px; height: 3px; background: #adbfcb; border-radius: 50%; }
.java-learning { padding-top: clamp(20px, 3vh, 28px); }.learning-heading { display: flex; justify-content: space-between; align-items: flex-end; gap: 16px; margin-bottom: 18px; }.learning-heading p { font-size: 9px; letter-spacing: 2px; color: var(--java-accent); margin: 0 0 8px; }.learning-heading h2 { padding: 0; border: 0; font-size: 20px; font-weight: 650; line-height: 1.5; letter-spacing: 0; margin: 0; }.learning-heading > span { font-size: 11px; color: var(--java-muted); }
.java-topics { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }.java-topic { --topic-color: #477a99; --topic-border: #bdd0dc; --topic-tint: rgb(71 122 153 / 8%); position: relative; overflow: hidden; border: 1px solid var(--topic-border); border-radius: 8px; padding: 20px; background: var(--java-surface); }.java-topic::before { content: ''; position: absolute; top: 0; left: 18px; right: 18px; height: 2px; background: linear-gradient(90deg, var(--topic-color), transparent); opacity: .6; }.red { --topic-color: #c9514d; --topic-border: #e2bbb8; --topic-tint: rgb(201 81 77 / 8%); }.teal { --topic-color: #287f78; --topic-border: #b5d3d0; --topic-tint: rgb(40 127 120 / 8%); }
.topic-top { display: flex; align-items: center; gap: 12px; color: var(--topic-color); }.topic-top > span { line-height: 24px; font-size: 9px; letter-spacing: 1px; }.topic-icon { padding: 7px; border-radius: 7px; background: var(--topic-tint); }.java-topic h3 { font-size: 17px; font-weight: 650; margin: 8px 0 5px; }.java-topic p { font-size: 12px; line-height: 1.9; color: var(--java-muted); margin: 0; }.topic-tags { margin-top: 10px; display: flex; flex-wrap: wrap; gap: 7px; }.topic-tags span { color: var(--topic-color); background: var(--topic-tint); border-radius: 4px; padding: 2px 8px; font-size: 10px; line-height: 16px; }
.java-closing { display: flex; align-items: center; justify-content: center; gap: 14px; margin: clamp(18px, 2.5vh, 24px) 0 0; font-size: 11px; color: var(--java-muted); }.java-closing span { width: 24px; height: 1px; background: var(--java-line); }
.java-flow { stroke: var(--java-accent); stroke-width: 2; stroke-linecap: round; stroke-dasharray: 5 95; animation: java-flow 4s linear infinite; }
.java-core::before { content: ''; position: absolute; inset: -8px; border: 1px solid rgb(45 111 149 / 30%); border-radius: 26px; animation: java-pulse 4s ease-out infinite; pointer-events: none; }
.java-core > svg { animation: java-float 5s ease-in-out infinite; }.visual-label i { animation: java-beacon 3s ease-in-out infinite; }
@keyframes java-flow { to { stroke-dashoffset: -100; } } @keyframes java-pulse { 0% { transform: scale(1); opacity: .65; } 85%, 100% { transform: scale(1.25); opacity: 0; } } @keyframes java-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } } @keyframes java-beacon { 0%, 100% { opacity: 1; } 50% { opacity: .4; } }
:global(.is-home-page .Layout:has(.java-home)) { background-image: radial-gradient(ellipse at 74% 18%, rgb(224 181 178 / 18%), transparent 43%), linear-gradient(150deg, rgb(218 235 243 / 68%), transparent 58%), linear-gradient(215deg, rgb(235 241 244 / 55%), transparent 58%); background-size: auto; }
:global(.VPHome:has(.java-home)) { margin-bottom: 0; } :global(.Layout:has(.java-home) .VPFooter) { padding: 16px 24px; }
:global(.dark .java-home) { --java-text: #dce7ed; --java-muted: #a7b8c4; --java-line: #354854; --java-surface: rgb(28 38 44 / 82%); }
:global(.dark .is-home-page .Layout:has(.java-home)), :global(.dark.is-home-page .Layout:has(.java-home)) { background-image: radial-gradient(ellipse at 72% 18%, rgb(122 64 62 / 18%), transparent 48%), linear-gradient(145deg, rgb(35 72 89 / 30%), transparent 65%); }
:global(.dark .java-home .java-core) { background: linear-gradient(140deg, #234557, #343b45); color: #9fc9df; border-color: #56798a; box-shadow: 0 0 0 7px rgb(97 145 167 / 8%); }
:global(.dark .java-home .java-topic) { --topic-border: #405864; --topic-color: #a8c6d6; }:global(.dark .java-home .red) { --topic-border: #704c4c; --topic-color: #e6a09c; }:global(.dark .java-home .teal) { --topic-border: #3f625f; --topic-color: #8fc8c3; }
@media (max-width: 960px) { .java-hero { gap: 24px; }.java-stack > span:last-child, .learning-heading > span { display: none; }.java-stack > div { gap: 18px; }.java-core { gap: 5px; }.java-core svg { width: 32px; } }
@media (max-width: 700px) { .java-home { padding: 32px 24px 20px; }.java-hero { grid-template-columns: 1fr; gap: 36px; padding-bottom: 30px; }.java-intro { text-align: center; }.java-eyebrow, .java-actions, .java-notes { justify-content: center; }.java-intro h1 { text-align: center; font-size: clamp(27px, 6vw, 38px); line-height: 1.4; }.java-description { font-size: 13px; line-height: 1.8; }.java-visual { max-width: 520px; margin: auto; }.java-stack { flex-direction: column; gap: 12px; }.java-stack > div { gap: 12px; }.java-stack b { font-size: 12px; }.java-learning { padding-top: 30px; }.learning-heading h2 { font-size: 18px; }.java-topics { grid-template-columns: 1fr; gap: 14px; }.java-topic { padding: 20px; }.java-topic h3 { font-size: 15px; line-height: 22px; }.java-topic p { line-height: 1.6; }.java-closing { font-size: 10px; gap: 8px; }.java-closing span { width: 12px; }.java-node { gap: 4px; }.java-node > svg { width: 19px; height: 19px; }.java-node strong { font-size: 10px; }.java-node small { font-size: 7px; white-space: nowrap; }.java-core { gap: 4px; border-radius: 16px; }.java-core > svg { width: 28px; height: 28px; }.java-core strong { font-size: 16px; letter-spacing: 2px; }.java-core small { font-size: 7px; letter-spacing: 0; } }
@media (min-width: 961px) and (max-height: 900px) { .java-home { padding-top: 16px; padding-bottom: 12px; }.java-hero { padding-bottom: 16px; }.java-visual { max-width: 408px; justify-self: end; }.java-intro h1 { font-size: 32px; }.java-learning { padding-top: 16px; }.learning-heading { margin-bottom: 12px; }.learning-heading h2 { font-size: 18px; }.java-topic { padding: 16px; }.java-closing { margin-top: 18px; }:global(.Layout:has(.java-home) .VPFooter) { padding: 12px 24px; } }
@media (prefers-reduced-motion: reduce) { .java-flow, .java-core::before, .java-core > svg, .visual-label i { animation: none; }.java-flow, .java-core::before { opacity: 0; }.java-actions a { transition: none; }.java-actions a:hover { transform: none; } }
</style>

<template>
  <div class="single-batch">
    <div class="page-header">
      <h1>单道批处理 <span class="mono">SINGLE-STREAM BATCH</span></h1>
      <p class="subtitle">
        内存中只有 <strong>一道作业</strong>。CPU 遇到 I/O 时必须 <strong>等待</strong>，期间 CPU 完全空闲。
        三个作业顺序执行，彼此独立，不重叠。
      </p>
    </div>

    <!-- Legend -->
    <div class="legend">
      <div v-for="item in legendItems" :key="item.label" class="leg">
        <div class="leg-swatch" :style="item.style"></div>
        <span>{{ item.label }}</span>
      </div>
    </div>

    <!-- Controls -->
    <div class="controls">
      <button class="btn primary" :disabled="playing" @click="play">▶ 播放</button>
      <button class="btn" @click="reset">↺ 重置</button>
      <div class="speed-wrap">
        <span>速度</span>
        <input type="range" min="0.5" max="3" step="0.5" v-model.number="speed" />
        <span class="mono">{{ speed }}×</span>
      </div>
      <div class="time-badge mono">
        时间：<span class="accent">{{ displayTime }}</span> / {{ TOTAL }} 单位
      </div>
    </div>

    <!-- Chart -->
    <div class="chart-outer">
      <div class="chart">
        <!-- Time axis -->
        <div class="axis-row">
          <div class="row-label-space"></div>
          <div class="axis-track">
            <div
              v-for="t in axisTicks"
              :key="t"
              class="tick-mark"
              :class="{ major: t % 5 === 0 }"
              :style="{ left: pct(t) }"
            >
              <span class="tick-num">{{ t }}</span>
              <span class="tick-line"></span>
            </div>
          </div>
        </div>

        <!-- Gantt rows -->
        <div v-for="row in rows" :key="row.id" class="gantt-row">
          <div class="row-label">
            <span class="rname">{{ row.name }}</span>
            <span class="rsub">{{ row.sub }}</span>
          </div>
          <div class="track">
            <!-- Grid lines -->
            <div class="grid-overlay">
              <div
                v-for="t in axisTicks"
                :key="t"
                class="grid-line"
                :class="{ major: t % 5 === 0 }"
                :style="{ left: pct(t) }"
              ></div>
            </div>

            <!-- Segments -->
            <div
              v-for="seg in row.segs"
              :key="seg.start + '-' + seg.type"
              class="seg"
              :class="[seg.type, segState(seg)]"
              :style="segStyle(seg)"
              :title="`${seg.label}  [${seg.start}→${seg.end}] 共${seg.end - seg.start}单位`"
            >
              <span v-if="seg.end - seg.start >= 2">{{ seg.shortLabel }}</span>
            </div>

            <!-- Cursor -->
            <div
              v-if="currentTime > 0"
              class="cursor"
              :style="{ left: pct(currentTime) }"
            >
              <div class="cursor-head"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats -->
    <transition-group name="stat" tag="div" class="stats">
      <div v-for="(s, i) in visibleStats" :key="s.label" class="stat-card">
        <div class="stat-label mono">{{ s.label }}</div>
        <div class="stat-val" :class="s.cls">{{ s.val }}</div>
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import { ref, computed, onBeforeUnmount } from 'vue'

// ─── Constants ────────────────────────────────────────────────────────────────
const TOTAL = 28
const MS_PER_UNIT = 600

// ─── Data ────────────────────────────────────────────────────────────────────
const rows = [
  {
    id: 'cpu', name: 'CPU', sub: '处理器',
    segs: [
      { type: 'cpu-j1', start: 0,  end: 4,  label: 'J1-计算', shortLabel: 'J1-计算' },
      { type: 'idle',   start: 4,  end: 9,  label: '空闲 (等 J1 I/O)', shortLabel: '空闲' },
      { type: 'cpu-j1', start: 9,  end: 12, label: 'J1-计算', shortLabel: 'J1-计算' },
      { type: 'idle',   start: 12, end: 16, label: '空闲 (等 J1 I/O)', shortLabel: '空闲' },
      { type: 'cpu-j1', start: 16, end: 18, label: 'J1-收尾', shortLabel: 'J1-收尾' },
      { type: 'cpu-j2', start: 18, end: 21, label: 'J2-计算', shortLabel: 'J2-计算' },
      { type: 'idle',   start: 21, end: 24, label: '空闲 (等 J2 I/O)', shortLabel: '空闲' },
      { type: 'cpu-j2', start: 24, end: 26, label: 'J2-计算', shortLabel: 'J2-计算' },
      { type: 'cpu-j3', start: 26, end: 28, label: 'J3-计算', shortLabel: 'J3-计算' },
    ]
  },
  {
    id: 'io', name: 'I/O', sub: '磁盘/设备',
    segs: [
      { type: 'io-j1', start: 4,  end: 9,  label: 'J1 I/O(5 单位)', shortLabel: 'J1 I/O' },
      { type: 'io-j1', start: 12, end: 16, label: 'J1 I/O(4 单位)', shortLabel: 'J1 I/O' },
      { type: 'io-j2', start: 21, end: 24, label: 'J2 I/O(3 单位)', shortLabel: 'J2 I/O' },
    ]
  },
  {
    id: 'j1', name: '作业 1', sub: '共 18 单位',
    segs: [
      { type: 'cpu-j1', start: 0,  end: 4,  label: '计算 (4)', shortLabel: '计算' },
      { type: 'io-j1',  start: 4,  end: 9,  label: 'I/O(5)',  shortLabel: 'I/O' },
      { type: 'cpu-j1', start: 9,  end: 12, label: '计算 (3)', shortLabel: '计算' },
      { type: 'io-j1',  start: 12, end: 16, label: 'I/O(4)',  shortLabel: 'I/O' },
      { type: 'cpu-j1', start: 16, end: 18, label: '计算 (2)', shortLabel: '计算' },
    ]
  },
  {
    id: 'j2', name: '作业 2', sub: '共 8 单位',
    segs: [
      { type: 'idle',   start: 0,  end: 18, label: '等待调度', shortLabel: '等待' },
      { type: 'cpu-j2', start: 18, end: 21, label: '计算 (3)', shortLabel: '计算' },
      { type: 'io-j2',  start: 21, end: 24, label: 'I/O(3)',  shortLabel: 'I/O' },
      { type: 'cpu-j2', start: 24, end: 26, label: '计算 (2)', shortLabel: '计算' },
    ]
  },
  {
    id: 'j3', name: '作业 3', sub: '共 2 单位',
    segs: [
      { type: 'idle',   start: 0,  end: 26, label: '等待调度', shortLabel: '等待' },
      { type: 'cpu-j3', start: 26, end: 28, label: '计算 (2)', shortLabel: '计算' },
    ]
  },
]

const legendItems = [
  { label: '作业 1 CPU', style: { background: '#7c6af7' } },
  { label: '作业 1 I/O', style: { background: '#4a3fa0', backgroundImage: 'repeating-linear-gradient(45deg,transparent,transparent 3px,rgba(255,255,255,.2) 3px,rgba(255,255,255,.2) 4px)' } },
  { label: '作业 2 CPU', style: { background: '#33c4a0' } },
  { label: '作业 2 I/O', style: { background: '#217a64', backgroundImage: 'repeating-linear-gradient(45deg,transparent,transparent 3px,rgba(255,255,255,.2) 3px,rgba(255,255,255,.2) 4px)' } },
  { label: '作业 3 CPU', style: { background: '#f5854a' } },
  { label: 'CPU 空闲', style: { background: 'transparent', border: '1px dashed #3a4060' } },
]

// ─── State ───────────────────────────────────────────────────────────────────
const currentTime = ref(0)
const playing = ref(false)
const speed = ref(1)
const showStats = ref(false)

let animFrame = null
let startTs = null

// ─── Computed ─────────────────────────────────────────────────────────────────
const axisTicks = computed(() => Array.from({ length: TOTAL + 1 }, (_, i) => i))
const displayTime = computed(() => currentTime.value.toFixed(1))

const statsData = computed(() => {
  const cpuSegs = rows[0].segs
  const active = cpuSegs.filter(s => s.type !== 'idle').reduce((a, s) => a + s.end - s.start, 0)
  const idleUnits = TOTAL - active
  return [
    { label: '完成时间', val: TOTAL + ' 单位', cls: 'bad' },
    { label: 'CPU 利用率', val: Math.round(active / TOTAL * 100) + '%', cls: 'mid' },
    { label: 'CPU 空闲', val: idleUnits + ' 单位', cls: 'bad' },
    { label: '吞吐量', val: '3 / ' + TOTAL, cls: 'mid' },
  ]
})

const visibleStats = computed(() => showStats.value ? statsData.value : [])

// ─── Helpers ──────────────────────────────────────────────────────────────────
function pct(v) { return (v / TOTAL * 100).toFixed(4) + '%' }

function segStyle(seg) {
  const w = ((seg.end - seg.start) / TOTAL * 100).toFixed(4) + '%'
  const l = (seg.start / TOTAL * 100).toFixed(4) + '%'
  const reveal = segReveal(seg)
  return {
    left: l,
    width: w,
    '--reveal-w': reveal,
  }
}

function segReveal(seg) {
  const t = currentTime.value
  if (t <= seg.start) return '0%'
  if (t >= seg.end) return '100%'
  return ((t - seg.start) / (seg.end - seg.start) * 100).toFixed(3) + '%'
}

function segState(seg) {
  const t = currentTime.value
  if (t <= seg.start) return ''
  if (t >= seg.end) return 'done'
  return 'animating'
}

// ─── Animation ────────────────────────────────────────────────────────────────
function setTime(t) {
  currentTime.value = Math.min(t, TOTAL)
}

function play() {
  if (playing.value) return
  playing.value = true
  showStats.value = false
  const msPerUnit = MS_PER_UNIT
  startTs = performance.now() - (currentTime.value / TOTAL) * (TOTAL * msPerUnit / speed.value)

  function frame(now) {
    const t = (now - startTs) * speed.value / msPerUnit
    setTime(t)
    if (t < TOTAL) {
      animFrame = requestAnimationFrame(frame)
    } else {
      setTime(TOTAL)
      playing.value = false
      showStats.value = true
    }
  }
  animFrame = requestAnimationFrame(frame)
}

function reset() {
  if (animFrame) cancelAnimationFrame(animFrame)
  playing.value = false
  showStats.value = false
  currentTime.value = 0
}

onBeforeUnmount(() => { if (animFrame) cancelAnimationFrame(animFrame) })
</script>

<style scoped>
.single-batch {
  background: #0d0f14;
  color: #e2e6f0;
  font-family: 'Noto Sans SC', 'PingFang SC', sans-serif;
  min-height: 100vh;
  padding: 40px 32px;
}

.mono { font-family: 'JetBrains Mono', 'Fira Code', monospace; }

.page-header { margin-bottom: 24px; }

h1 { font-size: 22px; font-weight: 700; margin-bottom: 6px; }
h1 .mono { color: #7c6af7; font-size: 13px; font-weight: 400; margin-left: 12px; opacity: .8; }

.subtitle { font-size: 13px; color: #6b7394; line-height: 1.6; max-width: 560px; }
.subtitle strong { color: #e2e6f0; font-weight: 500; }

/* Legend */
.legend { display: flex; gap: 20px; flex-wrap: wrap; margin-bottom: 28px; }
.leg { display: flex; align-items: center; gap: 8px; font-size: 12px; color: #6b7394; font-family: 'JetBrains Mono', monospace; }
.leg-swatch { width: 28px; height: 12px; border-radius: 3px; }

/* Controls */
.controls { display: flex; gap: 10px; align-items: center; margin-bottom: 28px; flex-wrap: wrap; }
.btn {
  padding: 8px 22px; border-radius: 6px;
  border: 1px solid #2a2f3d; background: #1e2230; color: #e2e6f0;
  font-family: 'JetBrains Mono', monospace; font-size: 12px; cursor: pointer;
  transition: background .15s;
}
.btn:hover { background: #252a38; }
.btn.primary { background: #7c6af7; border-color: #7c6af7; color: #fff; }
.btn.primary:hover { background: #6855e8; }
.btn:disabled { opacity: .4; cursor: not-allowed; }

.speed-wrap { display: flex; align-items: center; gap: 8px; font-size: 12px; color: #6b7394; font-family: 'JetBrains Mono', monospace; }
input[type=range] { width: 80px; accent-color: #7c6af7; }

.time-badge {
  margin-left: auto; font-size: 13px; color: #6b7394;
  background: #1e2230; border: 1px solid #2a2f3d;
  padding: 6px 14px; border-radius: 6px;
}
.accent { color: #7c6af7; font-weight: 600; }

/* Chart */
.chart-outer {
  background: #161920; border: 1px solid #2a2f3d;
  border-radius: 12px; padding: 24px 24px 20px; overflow-x: auto;
}
.chart { min-width: 700px; }

.axis-row { display: flex; align-items: flex-start; margin-bottom: 6px; }
.row-label-space { width: 90px; min-width: 90px; }
.axis-track { flex: 1; position: relative; height: 26px; }

.tick-mark {
  position: absolute; display: flex; flex-direction: column; align-items: center;
  transform: translateX(-50%);
}
.tick-num { font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #3d4460; margin-bottom: 3px; }
.tick-line { width: 1px; height: 8px; background: #2a2f3d; }
.tick-mark.major .tick-num { color: #6b7394; }
.tick-mark.major .tick-line { height: 12px; background: #3a4060; }

.grid-overlay { position: absolute; top: 0; left: 0; right: 0; bottom: 0; pointer-events: none; }
.grid-line { position: absolute; top: 0; bottom: 0; width: 1px; background: #2a2f3d; opacity: .5; }
.grid-line.major { background: #2a3050; opacity: .8; }

.gantt-row { display: flex; align-items: center; margin-bottom: 10px; }
.row-label {
  width: 90px; min-width: 90px; font-size: 12px; color: #6b7394;
  font-family: 'JetBrains Mono', monospace;
  display: flex; flex-direction: column; gap: 2px; padding-right: 14px;
}
.rname { font-weight: 600; font-size: 13px; }
.rsub { font-size: 10px; opacity: .6; }

.track {
  flex: 1; height: 36px; position: relative; border-radius: 6px;
  background: #1e2230; border: 1px solid #2a2f3d; overflow: visible;
}

.seg {
  position: absolute; top: 0; height: 100%; border-radius: 4px;
  display: flex; align-items: center; justify-content: center;
  font-size: 11px; font-weight: 600;
  font-family: 'JetBrains Mono', monospace;
  white-space: nowrap; overflow: hidden;
  clip-path: inset(0 100% 0 0 round 4px);
}
.seg.animating { clip-path: inset(0 calc(100% - var(--reveal-w, 0%)) 0 0 round 4px); }
.seg.done { clip-path: inset(0 0% 0 0 round 4px); }

.seg.cpu-j1 { background: #7c6af7; color: #fff; }
.seg.cpu-j2 { background: #33c4a0; color: #0a2a22; }
.seg.cpu-j3 { background: #f5854a; color: #2a1000; }
.seg.io-j1 {
  background: #4a3fa0; color: #c0b8ff;
  background-image: repeating-linear-gradient(45deg,transparent,transparent 5px,rgba(255,255,255,.06) 5px,rgba(255,255,255,.06) 6px);
}
.seg.io-j2 {
  background: #217a64; color: #7ee8d0;
  background-image: repeating-linear-gradient(45deg,transparent,transparent 5px,rgba(255,255,255,.06) 5px,rgba(255,255,255,.06) 6px);
}
.seg.idle {
  background: transparent; border: 1px dashed #2a2f3d;
  color: #3d4460; font-size: 10px;
}

/* Cursor */
.cursor {
  position: absolute; top: -4px; bottom: -4px; width: 2px;
  background: #7c6af7; border-radius: 1px; pointer-events: none; z-index: 10;
  box-shadow: 0 0 8px #7c6af7;
}
.cursor-head {
  position: absolute; top: -5px; left: 50%; transform: translateX(-50%);
  width: 0; height: 0;
  border-left: 5px solid transparent; border-right: 5px solid transparent;
  border-top: 6px solid #7c6af7;
}

/* Stats */
.stats { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 24px; }
.stat-card {
  flex: 1; min-width: 110px; background: #1e2230;
  border: 1px solid #2a2f3d; border-radius: 8px; padding: 14px 16px;
}
.stat-label { font-size: 11px; color: #6b7394; margin-bottom: 6px; font-family: 'JetBrains Mono', monospace; }
.stat-val { font-size: 24px; font-weight: 700; font-family: 'JetBrains Mono', monospace; }
.stat-val.bad { color: #f5854a; }
.stat-val.mid { color: #f5c84a; }

/* Transitions */
.stat-enter-active { transition: opacity .4s, transform .4s; }
.stat-enter-from { opacity: 0; transform: translateY(8px); }
</style>

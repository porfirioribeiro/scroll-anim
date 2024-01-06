<script setup lang="ts">
import { CSSRangeUnit, defineEnterAnimation } from '$lib';
import { ref, watch } from 'vue';

const target = ref<HTMLElement>();
const keyframes = { width: ['0px', '270px'] };

const implementations = ['native', 'lib'];
const rangeExamples: [rangeStart: CSSRangeUnit, rangeEnd: CSSRangeUnit][] = [
  ['cover 0%', 'cover 100%'], //
  ['cover', 'cover'], //
  ['contain 0%', 'contain 100%'], //
  ['contain', 'contain'], //
  ['entry', 'entry'], //
  ['entry 25%', 'entry 75%'], //
  ['entry 0%', 'entry 100%'], //
  ['exit', 'exit'], //
  ['exit 25%', 'exit 75%'], //
  ['exit 0%', 'exit 100%'], //
  ['contain 25%', 'contain 75%'], //
  ['entry 150%', 'exit -50%'], //
];
watch(target, (subject, _, onCleanup) => {
  if (!subject) return;

  const progressBarsNative = document.querySelectorAll<HTMLElement>('[data-impl="native"] .progress-bar-progress');
  const progressBarsLib = document.querySelectorAll<HTMLElement>('[data-impl="lib"] .progress-bar-progress');

  const animations = rangeExamples.flatMap(([rangeStart, rangeEnd], i) => {
    const pbn = progressBarsNative[i];
    const pbl = progressBarsLib[i];
    return [
      defineEnterAnimation({ subject, target: pbn, keyframes, rangeStart, rangeEnd, noNative: false }),
      defineEnterAnimation({ subject, target: pbl, keyframes, rangeStart, rangeEnd, noNative: true }),
    ];
  });

  onCleanup(() => animations.forEach((a) => a.cancel()));
});
</script>

<template>
  <div class="container">
    <div class="spacer"></div>
    <div ref="target" class="target"></div>
    <div class="spacer"></div>
  </div>
  <div class="overlay">
    <div v-for="impl of implementations" :key="impl" :data-impl="impl" class="column">
      {{ impl }}
      <div v-for="(range, i) of rangeExamples" :key="i" class="progress-bar">
        <span>{{ range[0] }} {{ range[1] }}</span>

        <div class="progress-bar-progress"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  width: 700px;
  position: relative;
  align-items: flex-start;
}

.container.rtl {
  direction: rtl;
  flex-direction: row;
  overflow-x: scroll;
  overflow-y: hidden;
}

.container.ltr {
  flex-direction: row;
  overflow-x: scroll;
  overflow-y: hidden;
}

.overlay {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 700px;
  height: 500px;
  pointer-events: none;
  display: flex;
}

.column {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.spacer {
  display: inline-block;
  flex: none;
  height: 120vh;
}

.target {
  box-sizing: border-box;
  background-color: rgba(0, 0, 255, 0.5);
  display: inline-block;
  flex: none;
  height: 125px;
  width: 90%;
}

.progress-bar,
.progress-bar-progress {
  border: 1px solid green;
  height: 20px;
  width: 270px;
  padding: 0;
  position: relative;
}

.progress-bar > span {
  padding-left: 5px;
  padding-right: 5px;
}

.progress-bar-progress {
  border-color: transparent;
  background-color: rgba(0, 200, 0, 0.3);
  width: 0px;
  top: 0px;
  position: absolute;
}
</style>

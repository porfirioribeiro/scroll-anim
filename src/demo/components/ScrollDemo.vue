<script setup lang="ts">
import { ref } from 'vue';
import { useScrollAnimation, CSSRangeUnit } from '$lib';

const props = defineProps<{
  noNative?: boolean;
  rangeStart?: CSSRangeUnit;
  rangeEnd?: CSSRangeUnit;
}>();
const subject = ref<HTMLElement | null>(null);
const target = ref<HTMLElement | null>(null);

useScrollAnimation({
  subject,
  target,
  keyframes: [
    //
    { width: '0' },
    { width: '100%' },
  ],
  rangeStart: props.rangeStart,
  rangeEnd: props.rangeEnd,
  noNative: props.noNative,
});
</script>
<template scoped>
  <div ref="subject" class="subject">
    <div ref="target" class="target"></div>
    <p>Scroll down to see the effect</p>
    <p>rangeStart: {{ rangeStart ?? 'cover 0%' }} rangeEnd: {{ rangeEnd ?? 'cover 100%' }} noNative {{ noNative }}</p>
  </div>
</template>
<style scoped>
.subject {
  height: 30vh;
  background-color: blue;
  position: relative;
  flex: 1;
}
.target {
  position: absolute;
  inset: 0;
  background-color: red;
}
p {
  z-index: 2;
  position: relative;
}
</style>

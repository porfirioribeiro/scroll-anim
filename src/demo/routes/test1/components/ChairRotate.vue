<script setup lang="ts">
import { createScrollViewTimeline, defineEnterAnimation } from '$lib';
import { ref, watch } from 'vue';

const subjectRef = ref<HTMLElement | null>(null);
const finishedRef = ref<HTMLElement | null>(null);

const length = 57;
const start = 120 - length;
const images = Array.from(
  { length },
  (_, i) => `https://s3-us-west-2.amazonaws.com/s.cdpn.io/68939/360-${String(start + i + 1).padStart(3, '0')}.jpg`,
);

watch([subjectRef, finishedRef], ([subject, finished]) => {
  if (!subject) return;
  const imgs = subject.querySelectorAll('img');

  let currentImg = imgs[0];

  createScrollViewTimeline({
    subject,
    rangeStart: 'contain 0%',
    rangeEnd: 'contain 50%',
    onScroll(value) {
      const img = imgs[Math.floor(value * images.length)];

      if (img) {
        currentImg.style.display = 'none';
        img.style.display = 'block';
        currentImg = img;
      }
    },
  });

  if (!finished) return;

  defineEnterAnimation({
    target: finished,
    subject,
    keyframes: [{ opacity: 0 }, { opacity: 1 }],
    rangeStart: 'contain 50%',
    rangeEnd: 'contain 50%',
  });
});
</script>

<template>
  <div ref="subjectRef" class="chair-rotate">
    <img v-for="(image, i) in images" :key="i" :src="image" />
    <p ref="finishedRef">Finished</p>
  </div>
</template>

<style scoped>
.chair-rotate {
  position: relative;
}
.chair-rotate p {
  position: absolute;
  inset: 30%;
}

.chair-rotate img {
  display: none;
}
.chair-rotate img:first-child {
  display: block;
}
</style>

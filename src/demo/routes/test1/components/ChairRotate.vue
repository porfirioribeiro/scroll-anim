<script setup lang="ts">
import { createScrollViewTimeline } from '$lib';
import { ref, watch } from 'vue';

const subject = ref<HTMLElement | null>(null);

const length = 57;
const start = 120 - length;
const images = Array.from(
  { length },
  (_, i) => `https://s3-us-west-2.amazonaws.com/s.cdpn.io/68939/360-${String(start + i + 1).padStart(3, '0')}.jpg`,
);

watch(subject, (el) => {
  if (!el) return;
  const imgs = el.querySelectorAll('img');

  let currentImg = imgs[0];

  createScrollViewTimeline({
    subject: el,
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
});
</script>

<template>
  <div ref="subject" class="chair-rotate">
    <img v-for="(image, i) in images" :key="i" :src="image" />
  </div>
</template>

<style scoped>
.chair-rotate {
  /* display: none; */
}
.chair-rotate img {
  display: none;
}
.chair-rotate img:first-child {
  display: block;
}
</style>

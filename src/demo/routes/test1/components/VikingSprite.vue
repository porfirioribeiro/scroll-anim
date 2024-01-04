<script setup lang="ts">
import { ref } from 'vue';
import { useScrollAnimation } from '$lib';

const vikingImages = import.meta.glob('../assets/viking-sprite/*.png', { eager: true, import: 'default' });

const target = ref<HTMLElement | null>(null);

useScrollAnimation({
  target,
  keyframes: Object.values(vikingImages).map((image, i) => ({
    marginLeft: `${i * 50}px`,
    backgroundImage: `url(${image})`,
  })),
  rangeStart: 'contain 20%',
  rangeEnd: 'contain 80%',
  noNative: true,
});
</script>
<template>
  <div ref="target"></div>
</template>

<style scoped>
div {
  width: 203px;
  height: 203px;
}
</style>

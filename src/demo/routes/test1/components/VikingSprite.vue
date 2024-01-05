<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { defineEnterAnimation } from '$lib';

const vikingImages = import.meta.glob('../../../assets/viking-sprite/*.png', { eager: true, import: 'default' });

const targetRef = ref<HTMLElement | null>(null);
const finishedRef = ref(false);

watchEffect((onCleanup) => {
  const target = targetRef.value;
  if (!target) return;
  const anim = defineEnterAnimation({
    target,

    keyframes: Object.values(vikingImages).map((image, i) => ({
      marginLeft: `${i * 50}px`,
      backgroundImage: `url(${image})`,
    })),
    rangeStart: 'contain 20%',
    rangeEnd: 'contain 80%',
  });

  console.log('anim', anim);

  anim.finished.then(() => {
    console.log('finished');

    finishedRef.value = true;
    anim.pause();
  });

  onCleanup(anim.cancel);
});
</script>
<template>
  <div ref="targetRef"></div>
  <p v-if="finishedRef">Finished!</p>
</template>

<style scoped>
div {
  width: 203px;
  height: 203px;
}
</style>

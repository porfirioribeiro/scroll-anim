<script setup lang="ts">
import ChairRotate from './components/ChairRotate.vue';
import ScrollDemo from './components/ScrollDemo.vue';
import TextBlock from './components/TextBlock.vue';
import VikingSprite from './components/VikingSprite.vue';
</script>

<template>
  <div style="height: 120vh"></div>
  <!-- <VikingSprite /> -->
  <ChairRotate />
  <TextBlock prefix="Up to" highlight="22 hrs" suffix="video playback" />
  <!-- <TextBlock prefix="Up to" highlight="15 hrs" suffix="wireless web browsing" /> -->
  <div style="height: 110vh"></div>
  <!-- <div style="display: flex">
    <ScrollDemo range-start="cover 0%" range-end="cover 50%" />
    <ScrollDemo range-start="cover 0%" range-end="cover 50%" no-native />
  </div>
  <div style="height: 120vh"></div>
  <div style="display: flex">
    <ScrollDemo />
    <ScrollDemo no-native />
  </div>
  <div style="height: 120vh"></div> -->
</template>

<style scoped></style>

<script setup lang="ts">
import ScrollDemo from './components/ScrollDemo.vue';
</script>

<template>
  <div style="height: 120vh"></div>
  <div style="display: flex">
    <ScrollDemo range-start="cover 0%" range-end="contain 0%" />
    <ScrollDemo range-start="cover 0%" range-end="contain 0%" no-native />
  </div>
  <div style="height: 120vh"></div>
  <div style="display: flex">
    <ScrollDemo />
    <ScrollDemo no-native />
  </div>
  <div style="height: 120vh"></div>
</template>

<style scoped></style>

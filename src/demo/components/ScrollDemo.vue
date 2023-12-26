<script setup lang="ts">
import { ref } from 'vue';
import { useScrollAnimation } from '$lib';

const subject = ref<HTMLElement | null>(null);
const target = ref<HTMLElement | null>(null);

useScrollAnimation({ subject, target });
</script>
<template scoped>
  <div ref="subject" class="subject">
    <div ref="target" class="target"></div>
    <p>Scroll down to see the effect</p>
  </div>
</template>

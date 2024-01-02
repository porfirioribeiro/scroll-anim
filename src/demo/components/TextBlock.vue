<script setup lang="ts">
import { vAppear } from '../utils/appear.ts';

defineProps<{
  prefix?: string;
  highlight?: string;
  suffix?: string;
}>();
</script>

<template>
  <figure v-appear>
    {{ prefix }}
    <strong>{{ highlight }}</strong>
    {{ suffix }}
  </figure>
</template>

<style scoped>
figure {
  pointer-events: none;
  opacity: 0;
  transform: translateY(25px);
  transition:
    transform 500ms cubic-bezier(0, 0, 0.5, 1),
    opacity 500ms cubic-bezier(0, 0, 0.5, 1),
    visibility 500ms cubic-bezier(0, 0, 0.5, 1);

  font-size: 21px;
  line-height: 1.381002381;
  font-weight: 600;
  letter-spacing: 0.011em;

  color: #6e6e73;
}
figure.v-appear {
  pointer-events: auto;
  transform: translateY(0px);
  opacity: 1;
}

figure strong {
  font-size: 64px;
  line-height: 1.0625;
  font-weight: 600;
  letter-spacing: -0.009em;
  display: block;
  margin: 4px 0;

  color: #1d1d1f;
}
</style>

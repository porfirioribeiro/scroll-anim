<script setup lang="ts"></script>
<template>
  <div>Demo list</div>
  <template v-for="r in $router.getRoutes()" :key="r.path">
    <div v-if="r.name">
      <RouterLink :to="r.path">{{ r.name }}</RouterLink>
    </div>
  </template>
</template>

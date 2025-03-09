<script setup lang="ts">
defineProps<{
  title?: string,
}>();
</script>

<template>
  <div>
    <h1 class="text-4xl font-bold text-primary my-4">{{ title }}</h1>
  </div>
</template>

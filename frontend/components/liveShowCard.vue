<script setup lang="ts">

defineProps<{
  title?: string,
  img?: string,
  time_slot?: string,
  description?: string,
}>();
</script>

<template>
  <div class="card bg-white border-4 border-primary px-10 py-12 rounded-3xl text-primary overflow-visible m-auto w-auto">
    <p class="text-xl" id="live_text">En direct</p>
    <img :src="`/img/${img}`" alt="Image de l'émission" class="border-4 border-primary h-auto object-cover rounded-2xl w-full h-40"/>
    <h2 class="text-3xl font-bungee">{{ title }}</h2>
    <span class="font-bold font-inter text-md">{{ time_slot }}</span>
    <p class="font-inter font-bold text-xl">{{ description }}</p>
  </div>
</template>

<style scoped>
#live_text::before {
  content: '';
  display: inline-block;
  width: 10px;
  height: 10px;
  margin-right: 8px;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="red"/></svg>');
  background-size: cover;
  @apply animate-ping;
}
</style>
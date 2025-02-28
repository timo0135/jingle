<script setup lang="ts">
defineProps<{
  title?: string,
  img?: string,
  time_slot?: string,
  description?: string,
}>();

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const defaultImage = '/assets/img/radio.jpg';
</script>

<template>
  <div class="card bg-white border-4 border-primary px-10 py-12 rounded-3xl text-primary m-auto w-20em relative">
    <p v-if="img" class="text-xl" id="live_text">En direct</p>
    <img v-if="img" :src="apiBaseUrl + img" alt="Image de l'émission"
         class="border-4 border-primary object-cover rounded-2xl w-full h-40"/>
    <img v-else :src="defaultImage" alt="Default image"
         class="border-4 border-primary object-cover rounded-2xl w-full h-40"/>
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
  @apply animate-ping;
}
</style>

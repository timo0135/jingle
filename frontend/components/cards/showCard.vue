<script setup lang="ts">
defineProps<{
  title?: string,
  time_slot?: string,
  description?: string,
}>();

const starEmpty = '/assets/svg/star-empty.svg';
const starFull = '/assets/svg/star-full.svg';

const currentImgSrc = ref(starEmpty);

function toggleImage() {
  currentImgSrc.value = currentImgSrc.value === starEmpty ? starFull : starEmpty;
}

</script>

<template>
  <div class="bg-white border-4 border-primary px-10 py-12 rounded-3xl text-primary relative min-w-[28em] max-w-[30em] min-h-40 max-h-44">
    <img :src="currentImgSrc" @click="toggleImage" height="50px" width="50px" class="absolute cursor-pointer top-4 right-4" alt="Icon favorite">
    <h2 class="text-3xl font-bungee">{{ title }}</h2>
    <span class="font-bold font-inter text-md ">{{ time_slot }}</span>
    <p class="font-bold text-xl truncate">{{ description }}</p>
  </div>
</template>

<style scoped>

</style>

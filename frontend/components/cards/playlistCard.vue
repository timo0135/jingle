<script setup lang="ts">
import {ref} from 'vue';

const props = defineProps({
  title: String,
  emissions: Number,
  number: Number,
});

const starEmpty = '/assets/svg/star-empty.svg';
const starFull = '/assets/svg/star-full.svg';

const currentImgSrc = ref(starFull);

function toggleImage() {
  currentImgSrc.value = currentImgSrc.value === starEmpty ? starFull : starEmpty;
}
</script>

<template>
  <div
      class="card bg-white border-4 border-primary px-10 py-12 rounded-3xl text-primary overflow-visible w-4/12 relative">
    <h2 class="text-3xl font-bungee">{{ props.title }}</h2>
    <span class="font-bold font-inter text-md">{{ props.number }} emissions</span>
  </div>
</template>

<style scoped>
/* Add your styles here */
</style>

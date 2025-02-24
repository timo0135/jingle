<script setup lang="ts">
import {ref, watch} from 'vue';
import {useRouter} from 'vue-router';
import {useUserStore} from '~/stores/userStore';
import {useAPI} from "#imports";

const props = defineProps({
  id: String,
  title: String,
  time_slot: String,
  description: String,
  isFavorite: Boolean,
});

const emit = defineEmits(['toggle-favorite']);

const userStore = useUserStore();
const router = useRouter();

const starEmpty = '/assets/svg/star-empty.svg';
const starFull = '/assets/svg/star-full.svg';
const currentImgSrc = ref(props.isFavorite ? starFull : starEmpty);

watch(() => props.isFavorite, (newVal) => {
  currentImgSrc.value = newVal ? starFull : starEmpty;
});

async function toggleImage() {
  if (!userStore.user_id) {
    await router.push('/signin');
    return;
  }

  console.log(props)
  emit('toggle-favorite', props.id);
}

onMounted(() => {
})
</script>

<template>
  <div
      class="card bg-white border-4 border-primary px-10 py-12 rounded-3xl text-primary overflow-visible w-4/12 relative">
    <img :src="currentImgSrc" @click="toggleImage" height="50px" width="50px"
         class="absolute cursor-pointer top-4 right-4" alt="Icon favorite">
    <h2 class="text-3xl font-bungee">{{ title }}</h2>
    <span class="font-bold font-inter text-md">{{ time_slot }}</span>
    <p class="font-bold text-xl">{{ description }}</p>
  </div>
</template>

<style scoped>
/* Add your styles here */
</style>

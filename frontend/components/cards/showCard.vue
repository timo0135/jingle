<script setup lang="ts">
import {ref, watch, computed} from 'vue';
import {useRouter} from 'vue-router';
import {useUserStore} from '~/stores/userStore';
import {useAPI} from "#imports";

const props = defineProps({
  id: String,
  name: String,
  date: String,
  description: String,
  isFavorite: Boolean,
  audioUrl: String,
});

const emit = defineEmits(['showCardClicked']);

const userStore = useUserStore();
const router = useRouter();
const api = useAPI();

const starEmpty = '/assets/svg/star-empty.svg';
const starFull = '/assets/svg/star-full.svg';
const currentImgSrc = ref(props.isFavorite ? starFull : starEmpty);
const isFavorite = ref(props.isFavorite);

watch(() => props.isFavorite, (newVal) => {
  isFavorite.value = newVal;
  currentImgSrc.value = newVal ? starFull : starEmpty;
});

const formattedDate = computed(() => {
  const dateStr = props.date || '';
  const timestamp = Date.parse(dateStr);
  if (isNaN(timestamp)) {
    return 'Invalid Date';
  }
  const date = new Date(timestamp);
  return new Intl.DateTimeFormat('fr-FR', {dateStyle: 'long'}).format(date);
});

async function toggleFavorite() {
  if (!userStore.user_id) {
    await router.push('/signin');
    return;
  }

  if (!userStore.favoritePlaylistId) {
    try {
      const response = await api.get(`users/${userStore.user_id}/playlists`, {
        headers: {Authorization: `Bearer ${userStore.user_token}`},
      });
      const favoritePlaylist = response.data.playlists.find((playlist: any) => playlist.name === 'favoris');
      if (favoritePlaylist) {
        userStore.favoritePlaylistId = favoritePlaylist.id;
      } else {
        const response = await api.post(`/users/${userStore.user_id}/playlists`, {
          name: 'favoris',
          description: 'favorite podcast'
        }, {
          headers: {Authorization: `Bearer ${userStore.user_token}`},
        });
        userStore.favoritePlaylistId = response.data.podcast.id;
      }
    } catch (error) {
      console.error(error);
      return;
    }
  }

  try {
    if (isFavorite.value) {
      await api.delete(`/playlists/${userStore.favoritePlaylistId}/podcast`, {
        data: {podcastId: props.id},
        headers: {Authorization: `Bearer ${userStore.user_token}`},
      });
    } else {
      await api.post(`/playlists/${userStore.favoritePlaylistId}/podcast`, {
        podcastId: props.id,
      }, {
        headers: {Authorization: `Bearer ${userStore.user_token}`},
      });
    }
    isFavorite.value = !isFavorite.value;
    currentImgSrc.value = isFavorite.value ? starFull : starEmpty;
  } catch (error) {
    console.error(error);
  }
}

function handleCardClick() {
  emit('showCardClicked', props.audioUrl);
}
</script>

<template>
  <div
      class="card bg-white border-4 border-primary px-10 py-12 rounded-3xl text-primary overflow-visible w-4/12 relative max-w-[450px] min-w-[300px]">
    <img :src="currentImgSrc" @click="toggleFavorite" height="50px" width="50px"
         class="absolute cursor-pointer top-4 right-4" alt="Icon favorite">
    <div class=" cursor-pointer" @click="handleCardClick">
      <h2 class="text-3xl font-bungee overflow-hidden">{{ name }}</h2>
      <span class="font-bold font-inter text-md">{{ formattedDate }}</span>
      <p class="font-bold text-xl overflow-hidden">{{ description }}</p>
    </div>
  </div>
</template>

<style scoped>
/* Add your styles here */
</style>

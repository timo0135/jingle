<script setup lang="ts">
import ShowCard from "~/components/cards/showCard.vue";
import {onMounted, ref} from "vue";
import {useAPI} from "#imports";
import {useUserStore} from "~/stores/userStore";

const api = useAPI();
const userStore = useUserStore();

const emit = defineEmits(['changeVisibility']);

const props = defineProps<{
  title: string;
}>();

interface Podcast {
  id: string;
  name: string;
  date: string;
  description: string;
  isFavorite: boolean;
  audioUrl: string;
  image: string;
}

let podcasts = ref<Podcast[]>([]);
let favoritePlaylistId = ref<string | null>(null);

async function getPodcasts() {
  try {
    const response = await api.get('/podcasts');
    if (!response.data.podcasts) return;

    podcasts.value = await Promise.all(response.data.podcasts.map(async (podcast: any) => {
      const imageResponse = await api.get(`/podcasts/${podcast.id}`);
      return {
        ...podcast,
        isFavorite: false,
        audioUrl: podcast.file,
        image: imageResponse.data.podcast.image,
      };
    }));

    if (userStore.user_id) {
      await getFavoritePlaylist();
      await getFavoritePodcasts();
    }
  } catch (error: any) {
    const message = error.response?.data?.message || 'Une erreur est survenue';
    userStore.showErrorToast(message);
  }podcasts
}

async function getFavoritePlaylist() {
  try {
    const response = await api.get(`users/${userStore.user_id}/playlists`, {
      headers: {
        Authorization: `Bearer ${userStore.user_token}`,
      },
    });
    if (!response.data.playlists) return;
    const favoritePlaylist = response.data.playlists.find((playlist: any) => playlist.name === 'favoris');
    if (favoritePlaylist) {
      favoritePlaylistId.value = favoritePlaylist.id;
    }
  } catch (error: any) {
    userStore.showErrorToast(error.response.data.message);
  }
}

async function getFavoritePodcasts() {
  if (!favoritePlaylistId.value) return;

  try {
    const response = await api.get(`playlists/${favoritePlaylistId.value}`, {
      headers: {
        Authorization: `Bearer ${userStore.user_token}`,
      },
    });
    if (!response.data.podcast) return;
    const favoritePodcasts = response.data.podcast.content;
    podcasts.value.forEach(podcast => {
      if (favoritePodcasts.some((fav: any) => fav.id === podcast.id)) {
        podcast.isFavorite = true;
      }
    });
  } catch (error: any) {
    userStore.showErrorToast(error.response.data.message);
  }
}

function handleShowCardClicked(audioUrl: string, name: string, description: string, image: string) {
  emit('changeVisibility', false, true, audioUrl, name, description, image);
}

onMounted(async () => {
  const showsContainer: HTMLElement | null = document.getElementById('shows_container');
  const flecheGauche: HTMLElement | null = document.getElementById('flecheGauche');
  const flecheDroit: HTMLElement | null = document.getElementById('flecheDroit');

  if (flecheGauche && showsContainer) {
    flecheGauche.addEventListener('click', () => {
      if (showsContainer) {
        showsContainer.scrollLeft -= 150;
      }
    });
  }

  if (flecheDroit && showsContainer) {
    flecheDroit.addEventListener('click', () => {
      if (showsContainer) {
        showsContainer.scrollLeft += 150;
      }
    });
  }

  await getPodcasts();
});
</script>

<template>
  <div class="font-bold font-inter mx-8 my-8 text-primary">
    <h2 class="my-4 text-3xl underline">{{ props.title }}</h2>
    <div class="flex gap-4 overflow-x-scroll no-scrollbar overflow-auto" id="shows_container">
      <ShowCard v-for="podcast in podcasts" :key="podcast.id" :id="podcast.id" :name="podcast.name"
                :date="podcast.date" :description="podcast.description" :isFavorite="podcast.isFavorite"
                :audioUrl="podcast.audioUrl"
                @showCardClicked="handleShowCardClicked(podcast.audioUrl, podcast.name, podcast.description, podcast.image)"/>
    </div>
    <div class="flex gap-4 my-2" id="show_navigation">
      <img id="flecheGauche" class="cursor-pointer" width="50px" height="50px"
           src="../public/assets/svg/arrow_left.svg" alt="Flèche de gauche">
      <img id="flecheDroit" class="cursor-pointer" width="50px" height="50px"
           src="../public/assets/svg/arrow_right.svg" alt="Flèche de droite">
    </div>
  </div>
</template>

<style scoped>
/* Add your styles here */
</style>

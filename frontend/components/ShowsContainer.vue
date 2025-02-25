<script setup lang="ts">
import ShowCard from "~/components/cards/showCard.vue";
import {onMounted, ref} from "vue";
import {useAPI} from "#imports";
import {useUserStore} from "~/stores/userStore";
import {useRouter} from "vue-router";

const api = useAPI();
const userStore = useUserStore();
const router = useRouter();

const props = defineProps<{
  title: string;
}>();

interface Podcast {
  id: string;
  title: string;
  time_slot: string;
  description: string;
  isFavorite: boolean;
}

let podcasts = ref<Podcast[]>([]);
let favoritePlaylistId = ref<string | null>(null);

async function getPodcasts() {
  try {
    const response = await api.get('/podcasts');
    podcasts.value = response.data.podcasts.map((podcast: any) => ({
      ...podcast,
      isFavorite: false,
    }));

    if (userStore.user_id) {
      await getFavoritePlaylist();
      await getFavoritePodcasts();
    }
  } catch (error) {
    console.error(error);
  }
}

async function getFavoritePlaylist() {
  try {
    const response = await api.get(`users/${userStore.user_id}/playlists`, {
      headers: {
        Authorization: `Bearer ${userStore.user_token}`,
      },
    });
    const favoritePlaylist = response.data.playlists.find((playlist: any) => playlist.name === 'favoris');
    if (favoritePlaylist) {
      favoritePlaylistId.value = favoritePlaylist.id;
    }
  } catch (error) {
    console.error(error);
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
    const favoritePodcasts = response.data.podcast.content;
    podcasts.value.forEach(podcast => {
      if (favoritePodcasts.some((fav: any) => fav.id === podcast.id)) {
        podcast.isFavorite = true;
      }
    });
  } catch (error) {
    console.error(error);
  }
}

function updateFavorite(podcastId: string) {
  const podcast = podcasts.value.find(p => p.id === podcastId);
  if (podcast) {
    podcast.isFavorite = !podcast.isFavorite;
  }
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
      <ShowCard v-for="podcast in podcasts" :key="podcast.id" :id="podcast.id" :title="podcast.name"
                :time_slot="podcast.time_slot" :description="podcast.description" :isFavorite="podcast.isFavorite"
                @update-favorite="updateFavorite"/>
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

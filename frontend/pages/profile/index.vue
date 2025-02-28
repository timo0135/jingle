<script setup lang="ts">
import {ref, onMounted} from 'vue';
import ProfileCard from "~/components/cards/profileCard.vue";
import ShowsContainer from "~/components/ShowsContainer.vue";
import PlaylistCard from "~/components/cards/playlistCard.vue";
import AudioPlayer from "~/components/AudioPlayer.vue";
import {useUserStore} from "~/stores/userStore";
import {definePageMeta, useAPI} from "#imports";

const api = useAPI();
const userStore = useUserStore();

definePageMeta({
  middleware:[
    'auth'
  ]
})

interface Playlist {
  id: string;
  name: string;
  description: string;
  nbPodcasts: number;
}

interface Podcast {
  id: string;
  name: string;
  date: string;
  description: string;
  isFavorite: boolean;
  audioUrl: string;
  image: string;
}

let user = ref({
  pseudo: '',
  email: '',
});

let favoritePodcasts = ref<Podcast[]>([]);
let favoritePlaylist = ref<Playlist | null>(null);
let playlists = ref<Playlist[]>([]);

const directVisible = ref(false);
const podcastVisible = ref(false);
const selectedAudioUrl = ref<string | null>(null);
const selectedName = ref('');
const selectedDescription = ref('');
const selectedImage = ref('');

const changeVisibility = (direct: boolean, podcast: boolean, audioUrl: string | null = null, name: string, description: string, image: string) => {
  directVisible.value = direct;
  podcastVisible.value = podcast;
  selectedAudioUrl.value = audioUrl;
  selectedName.value = name;
  selectedDescription.value = description;
  selectedImage.value = image;
};

async function getPlaylists() {
  try {
    const response = await api.get(`users/${userStore.user_id}/playlists`, {
      headers: {
        Authorization: `Bearer ${userStore.user_token}`,
      },
    });
    playlists.value = await Promise.all(response.data.playlists.map(async (playlist: any) => {
      const podcastCountResponse = await api.get(`playlists/${playlist.id}`, {
        headers: {
          Authorization: `Bearer ${userStore.user_token}`,
        },
      });
      return {
        id: playlist.id,
        name: playlist.name,
        description: playlist.description,
        nbPodcasts: podcastCountResponse.data.podcast.content.length,
      };
    }));
    favoritePlaylist.value = playlists.value.find((playlist: Playlist) => playlist.name === 'favoris') || null;

    if (favoritePlaylist.value) {
      await getFavoritePodcasts(favoritePlaylist.value.id);
    }
  } catch (error: any) {
    userStore.showErrorToast(error.message);
  }
}

async function getFavoritePodcasts(playlistId: string) {
  try {
    const response = await api.get(`playlists/${playlistId}`, {
      headers: {
        Authorization: `Bearer ${userStore.user_token}`,
      },
    }).then((response) => {
      favoritePodcasts.value = response.data.podcast.content.map((podcast: any) => ({
        id: podcast.id,
        name: podcast.name,
        date: podcast.date,
        description: podcast.description,
        isFavorite: true,
        audioUrl: podcast.file,
        image: podcast.image,
      }));
      return favoritePodcasts.value;
    });

    for (const podcast of favoritePodcasts.value) {
      await getPodcast(podcast.id);
    }

  } catch (error: any) {
    userStore.showErrorToast(error.message);
  }
}

async function getPodcast(id: string) {
  try {
    const response = await api.get(`podcasts/${id}`, {
      headers: {
        Authorization: `Bearer ${userStore.user_token}`,
      },
    });

    const podcastData = response.data.podcast;
    const podcastIndex = favoritePodcasts.value.findIndex(podcast => podcast.id === id);

    if (podcastIndex !== -1) {
      favoritePodcasts.value[podcastIndex] = {
        id: podcastData.id,
        name: podcastData.name,
        date: podcastData.date,
        description: podcastData.description,
        isFavorite: true,
        audioUrl: podcastData.file,
        image: podcastData.image,
      };
    }
  } catch (error: any) {
    userStore.showErrorToast(error.message);
  }
}

onMounted(async () => {
  await userStore.getUser();
  user.value.pseudo = userStore.pseudo ?? '';
  user.value.email = userStore.email ?? '';
  await getPlaylists();
});
</script>

<template>
  <div class="relative">
    <NavbarComponent/>

    <div class="w-[95%] flex flex-col m-auto">

      <sectionTitle title="Mon profil :"/>
      <div class="flex justify-between">
        <profileCard :name="user.pseudo" :mail="user.email"/>
        <div id="buttons" class="flex flex-col gap-2 justify-end items-end">
          <router-link to="/profile/broadcast" v-if="userStore.role === 2 || userStore.role === 3">
            <button
                class="rounded-lg font-bungee bg-white border-4 border-primary px-4 py-2 text-primary text-nowrap hover:bg-primary hover:text-white hover:border-white transition-all">
              diffuser
            </button>
          </router-link>
          <router-link to="/calendar">
            <button
                class="rounded-lg font-bungee bg-white border-4 border-primary px-4 py-2 text-primary text-nowrap hover:bg-primary hover:text-white hover:border-white transition-all">
              calendrier
            </button>
          </router-link>
          <router-link to="/profile/admin" v-if="userStore.role === 3">
            <button
                class="rounded-lg font-bungee bg-white border-4 border-primary px-4 py-2 text-primary text-nowrap hover:bg-primary hover:text-white hover:border-white transition-all">
              admin
            </button>
          </router-link>
        </div>
      </div>

      <sectionTitle title="Mes favoris :"/>
      <ShowsContainer :title="''" :podcasts="favoritePodcasts" @changeVisibility="changeVisibility"/>

      <sectionTitle title="Mes playlists :"/>
      <div class="flex flex-col gap-2">
        <div v-for="playlist in playlists" :key="playlist.id">
          <playlistCard :title="playlist.name" :number="playlist.nbPodcasts"/>
        </div>
      </div>
    </div>

    <AudioPlayer v-if="directVisible && !podcastVisible" :direct="true"/>
    <AudioPlayer v-if="podcastVisible && !directVisible" :direct="false" :audioUrl="selectedAudioUrl"
                 :name="selectedName" :description="selectedDescription" :image="selectedImage"/>
    <Footer/>
  </div>
</template>

<style scoped>
/* Add your styles here */
</style>

<script setup lang="ts">
import {ref, onMounted} from 'vue';
import ProfileCard from "~/components/cards/profileCard.vue";
import ShowCard from "~/components/cards/showCard.vue";
import PlaylistCard from "~/components/cards/playlistCard.vue";
import {useUserStore} from "~/stores/userStore";
import {useAPI} from "#imports";

const api = useAPI();
const router = useRouter();
const userStore = useUserStore();

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
}

let user = ref({
  pseudo: '',
  email: '',
});

let favoritePodcasts = ref<Podcast[]>([]);
let favoritePlaylist = ref<Playlist | null>(null);
let playlists = ref<Playlist[]>([]);

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
      <router-link to="/profile/broadcast">
        <button class="rounded-lg font-bungee bg-white border-4 border-primary px-4 py-2 text-primary text-nowrap hover:bg-primary hover:text-white hover:border-white transition-all">
          diffuser
        </button>
      </router-link>

    </div>

      <sectionTitle title="Mes favoris :"/>
      <div class="flex flex-col gap-2">
        <div v-for="podcast in favoritePodcasts" :key="podcast.id">
          <ShowCard :id="podcast.id" :name="podcast.name" :date="podcast.date"
                    :description="podcast.description" :is-favorite="podcast.isFavorite"/>
        </div>
      </div>

      <sectionTitle title="Mes playlists :"/>
      <div class="flex flex-col gap-2">
        <div v-for="playlist in playlists" :key="playlist.id">
          <playlistCard :title="playlist.name" :number="playlist.nbPodcasts"/>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<style scoped>
/* Add your styles here */
</style>

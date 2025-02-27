<script setup lang="ts">
import HeroSection from "~/components/HeroSection.vue";
import ShowsContainer from "~/components/ShowsContainer.vue";
import AudioPlayer from "~/components/AudioPlayer.vue";
import {ref, onMounted} from 'vue';
import {useAPI} from "#imports";
import {useUserStore} from "~/stores/userStore";

const api = useAPI();
const userStore = useUserStore();
const directVisible = ref(false);
const podcastVisible = ref(false);
const selectedAudioUrl = ref<string | null>(null);
const selectedName = ref('');
const selectedDescription = ref('');
const selectedImage = ref('');
const podcasts = ref([]);
const favoritePodcasts = ref<string[]>([]);

const changeVisibility = (direct: boolean, podcast: boolean, audioUrl: string | null = null, name: string, description: string, image: string) => {
  directVisible.value = direct;
  podcastVisible.value = podcast;
  selectedAudioUrl.value = audioUrl;
  selectedName.value = name;
  selectedDescription.value = description;
  selectedImage.value = image;
};

async function getFavoritePodcasts() {
  try {
    const response = await api.get(`users/${userStore.user_id}/playlists`, {
      headers: {
        Authorization: `Bearer ${userStore.user_token}`,
      },
    });
    const favoritePlaylist = response.data.playlists.find((playlist: any) => playlist.name === 'favoris');
    if (favoritePlaylist) {
      const favoriteResponse = await api.get(`playlists/${favoritePlaylist.id}`, {
        headers: {
          Authorization: `Bearer ${userStore.user_token}`,
        },
      });
      favoritePodcasts.value = favoriteResponse.data.podcast.content.map((podcast: any) => podcast.id);
    }
  } catch (error: any) {
    console.error('Error fetching favorite podcasts:', error);
  }
}

async function getPodcasts() {
  try {
    const response = await api.get('/podcasts');
    if (!response.data.podcasts) return;

    podcasts.value = await Promise.all(response.data.podcasts.map(async (podcast: any) => {
      const imageResponse = await api.get(`/podcasts/${podcast.id}`);
      return {
        ...podcast,
        isFavorite: favoritePodcasts.value.includes(podcast.id),
        audioUrl: podcast.file,
        image: imageResponse.data.podcast.image,
      };
    }));
  } catch (error: any) {
    console.error('Error fetching podcasts:', error);
  }
}

onMounted(async () => {
  await getFavoritePodcasts();
  await getPodcasts();
});
</script>

<template>
  <div class="relative overflow-hidden" id="landing">
    <NavbarComponent/>
    <HeroSection @changeVisibility="changeVisibility"/>
    <ShowsContainer :title="'Podcasts au top'" :podcasts="podcasts" @changeVisibility="changeVisibility"/>
    <AudioPlayer v-if="directVisible && !podcastVisible" :direct="true"/>
    <AudioPlayer v-if="podcastVisible && !directVisible" :direct="false" :audioUrl="selectedAudioUrl"
                 :name="selectedName" :description="selectedDescription" :image="selectedImage"/>
    <Footer/>
  </div>
</template>

<style scoped>
/* Add your styles here */
</style>

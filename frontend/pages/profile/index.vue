<script setup lang="ts">
import {ref, onMounted} from 'vue';
import {useRoute} from '#app';
import ProfileCard from "~/components/cards/profileCard.vue";
import ShowCard from "~/components/cards/showCard.vue";
import PlaylistCard from "~/components/cards/playlistCard.vue";
import {useUserStore} from "~/stores/userStore";
import {useAPI} from "#imports";

const api = useAPI();
const route = useRoute();
const userStore = useUserStore();

let user = ref({
  pseudo: '',
  email: '',
});

let favoritePodcasts = ref([]);

// Methods get favorite playlist
async function getFavoritePlaylist() {
  try {
    const response = await api.get(`users/${userStore.user_id}/playlists`, {
      headers: {
        Authorization: `Bearer ${userStore.user_token}`,
      },
    }).then((response) => {
      return response.data.find((playlist: any) => playlist.name === 'favoris'); // récupère la playlist favoris uniquement
    });
  } catch (error: any) {
    userStore.showErrorToast(error.message);
  }
}

async function getFavoritePodcasts() {
}

onMounted(async () => {
  await userStore.getUser();
  user.value.pseudo = userStore.pseudo ?? '';
  user.value.email = userStore.email ?? '';
});

</script>

<template>
  <div class="relative">
    <NavbarComponent/>

    <div class="w-[95%] flex flex-col m-auto">
      <sectionTitle title="Mon profil :"/>
      <profileCard :name="user.pseudo" :mail="user.email"/>

      <sectionTitle title="Mes favoris :"/>
      <showCard title="Manu dans le 54" time_slot="4h-6h"
                description="Manu et son équipe animent une emission nocturne à l’heure où batman oeuvre et à laquelle les gens normaux dorment, ils vont retourné la nuit."/>

      <sectionTitle title="Mes playlists :"/>
      <playlistCard title="Playlist du midi" :number="20"/>

    </div>
    <Footer/>
  </div>
</template>

<style scoped>
/* Add your styles here */
</style>

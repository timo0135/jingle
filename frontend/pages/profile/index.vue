<script setup lang="ts">
import {ref, onMounted} from 'vue';
import {useRoute} from '#app';
import ProfileCard from "~/components/cards/profileCard.vue";
import ShowCard from "~/components/cards/showCard.vue";
import PlaylistCard from "~/components/cards/playlistCard.vue";
import {useUserStore} from "~/stores/userStore";

const route = useRoute();
const userStore = useUserStore();

let user = ref({
  pseudo: '',
  email: '',
});

onMounted(() => {
  user.value.pseudo = userStore.pseudo ?? '';
  user.value.email = userStore.email ?? '';
});

</script>

<template>
  <div class="relative">
    <NavbarComponent/>

    <sectionTitle title="Mon profil :"/>
    <profileCard img="/assets/img/image.png" :name="user.pseudo" :mail="user.email"/>

    <sectionTitle title="Mes favoris :"/>
    <showCard title="Manu dans le 54" time_slot="4h-6h"
              description="Manu et son équipe animent une emission nocturne à l’heure où batman oeuvre et à laquelle les gens normaux dorment, ils vont retourné la nuit."/>

    <sectionTitle title="Mes playlists :"/>
    <playlistCard title="Playlist du midi" :number="20"/>

    <Footer/>
  </div>
</template>

<style scoped>
/* Add your styles here */
</style>

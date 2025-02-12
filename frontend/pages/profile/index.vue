<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from '#app';

const route = useRoute();
const profileId = route.params.id;

const email = ref('');
const username = ref('');
const phone = ref('');

async function fetchProfile() {
  await fetch(`https://fakeapi.net/users/${profileId}`)
      .then(response => response.json())
      .then(data => {
        email.value = data.email;
        username.value = [data.name.firstname, data.name.lastname].join(' ');
        phone.value = data.phone;
      });
}

onMounted(() => {
  fetchProfile();
});
</script>

<template>
  <div class="relative">
    <navbar/>

    <sectionTitle title="Mon profil :"/>
    <profileCard img="./img/profile_picture.jpg" :name="username" :mail="email" :phone="phone"/>

    <sectionTitle title="Mes favoris :"/>
    <showCard title="Manu dans le 54" time_slot="4h-6h" description="Manu et son équipe animent une emission nocturne à l’heure où batman oeuvre et à laquelle les gens normaux dorment, ils vont retourné la nuit." />

    <sectionTitle title="Mes playlists :"/>
    <playlistCard title="Playlist du midi" :number="20"/>

    <Footer/>
  </div>
</template>

<style scoped>
/* Add your styles here */
</style>
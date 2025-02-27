<script setup lang="ts">
import { ref } from 'vue';

const directStore = useDirectStore();

//On veut ouvrir le AudioPlayer
const toggleAudioPlayer = () => {

  //Le player audio est déjà actif, on le ferme.
  if(directStore.isAudioplayerActive) {
    directStore.isAudioplayerActive = false;
  }
  else if(directStore.isSearchbarActive || directStore.isAudioplayerActive){
    directStore.isSearchbarActive = false;
    directStore.isAudioplayerActive = true;
  }
  else{
    directStore.isAudioplayerActive = true;
  }
};


</script>

<template>
  <main>
    <div class="font-bungee flex gap-10 items-center justify-center md:justify-between text-primary m-auto h-[80vh] w-[95%]" id="hero_section">
      <!-- Hero text -->
      <div class="flex flex-col gap-4 justify-center g-4">
        <h1 class="text-6xl md:text-8xl text-center" id="live_text">Jingle <br>en direct</h1>
        <!-- Hero bouton desktop -->
        <button class="border-4 bg-white border-primary font-inter font-extrabold px-16 py-4 rounded-full text-2xl w-fit hover:bg-primary hover:text-white hover:border-white transition hidden m-auto md:block" @click="toggleAudioPlayer">Ecouter</button>
        <!-- Hero bouton mobile -->
        <button class="border-2 bg-white border-primary font-inter font-extrabold px-8 py-2 rounded-full text-lg w-fit hover:bg-primary hover:text-white hover:border-white transition m-auto md:hidden" @click="toggleAudioPlayer">Ecouter le direct</button>
      </div>

      <!-- Hero direct card -->
      <div class="hidden md:block sm:basis-5/12" id="live_show_card">
        <live-show-card title="Manu dans le 54" img="/assets/img/radio.jpg" time_slot="4h30-5h30" description="Manu et son équipe animent une emission nocturne à l’heure où batman oeuvre et à laquelle ..." />
      </div>
    </div>

    <!-- Audio Player -->
    <transition name="fade">
      <div v-if="directStore.isAudioplayerActive" id="audio_player_container">
        <AudioPlayer />
      </div>
    </transition>
  </main>
</template>

<style scoped>
#live_text::after {
  content: '';
  display: inline-block;
  width: 1rem;
  height: 1rem;
  margin-right: 8px;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="red"/></svg>');
  background-size: cover;
  @apply animate-ping;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
<script setup lang="ts">
import HeroSection from "~/components/HeroSection.vue";
import ShowsContainer from "~/components/ShowsContainer.vue";
import AudioPlayer from "~/components/AudioPlayer.vue";
</script>

<template>
  <div class="relative overflow-hidden" id="landing">
    <NavbarComponent/>
    <HeroSection/>
    <ShowsContainer :title="'Podcasts au top'"/>
    <Footer/>
  </div>
</template>

<style scoped>
</style>
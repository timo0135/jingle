<script setup lang="ts">

import HeroSection from "~/components/HeroSection.vue";
import ShowsContainer from "~/components/ShowsContainer.vue";
import AudioPlayer from "~/components/AudioPlayer.vue";

const directVisible = ref(false);
const podcastVisible = ref(false);

const changeVisibility = (direct: boolean, podcast: boolean) => {
  directVisible.value = direct;
  podcastVisible.value = podcast;
};

</script>

<template>
  <div class="relative overflow-hidden" id="landing">
    <NavbarComponent/>
    <HeroSection @changeVisibility="changeVisibility"/>


    <!-- Shows container -->
    <ShowsContainer :title="'Podcasts au top'" @changeVisibility="changeVisibility"/>

    <AudioPlayer v-if="directVisible && !podcastVisible" :direct="true"/>
    <AudioPlayer v-if="podcastVisible && !directVisible" :direct="false"/>

    <Footer/>
  </div>




</template>

<style scoped>
</style>

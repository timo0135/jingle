<script setup lang="ts">

import HeroSection from "~/components/HeroSection.vue";
import ShowsContainer from "~/components/ShowsContainer.vue";
import AudioPlayer from "~/components/AudioPlayer.vue";

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

</script>

<template>
  <div class="relative overflow-hidden" id="landing">
    <NavbarComponent/>
    <HeroSection @changeVisibility="changeVisibility"/>


    <!-- Shows container -->
    <ShowsContainer :title="'Podcasts au top'" @changeVisibility="changeVisibility"/>

    <AudioPlayer v-if="directVisible && !podcastVisible" :direct="true"/>
    <AudioPlayer v-if="podcastVisible && !directVisible" :direct="false" :audioUrl="selectedAudioUrl"
                 :name="selectedName" :description="selectedDescription" :image="selectedImage"/>
    <Footer/>
  </div>


</template>

<style scoped>
</style>

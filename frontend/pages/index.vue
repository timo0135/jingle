<script setup lang="ts">

import HeroSection from "~/components/HeroSection.vue";
import ShowsContainer from "~/components/ShowsContainer.vue";
import AudioPlayer from "~/components/AudioPlayer.vue";
</script>

<template>
  <div class="relative overflow-hidden" id="landing">
    <navbar/>
    <HeroSection/>


        <!-- Shows container -->
        <ShowsContainer/>
        <ShowsContainer/>

        <AudioPlayer/>


    <Footer/>
  </div>




</template>

<style scoped>
</style>
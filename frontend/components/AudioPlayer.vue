<script setup lang="ts">

import { DefineProps } from 'vue';

const props = defineProps<{
  direct: {
    type: Boolean;
    required: true;
  };
}>();

function initVolume(volume : number = 100) {
  const audio_player_time = document.getElementById('audio_player_volume') as HTMLInputElement;
  audio_player_time.setAttribute('min', '0');
  audio_player_time.setAttribute('max', volume.toString());
  audio_player_time.setAttribute('value', (volume / 2).toString());
}

function setVolumeIcon() {
  const audio_player_volume = document.getElementById('audio_player_volume') as HTMLInputElement;
  const volume = audio_player_volume.value;

  const volume_icon = document.querySelector('#audio_player_volume_container img') as HTMLImageElement;
  if (volume === '0') {
    volume_icon.src = '_nuxt/public/svg/volume-xmark-solid.svg';
  }
  else if (parseInt(volume) < 50) {
    volume_icon.src = '_nuxt/public/svg/volume-low-solid.svg';
  }
  else {
    volume_icon.src = '_nuxt/public/svg/volume-high-solid.svg';
  }
}

let previousVolume = 50;

function toggleMuteVolume() {
  const audio_player_volume = document.getElementById('audio_player_volume') as HTMLInputElement;
  //On remet le volume à sa valeur précédente :
  if (audio_player_volume.value === '0') {
    audio_player_volume.value = previousVolume.toString();
  }
  //On mute le volume :
  else {
    previousVolume = parseInt(audio_player_volume.value);
    audio_player_volume.value = '0';
  }
  setVolumeIcon();
}

function initDirect(){
  const play_icon = document.querySelector('#play_icon') as HTMLImageElement;
  play_icon.src = '_nuxt/public/svg/play-solid.svg';
}

function pauseDirect() {
  const play_icon = document.querySelector('#play_icon') as HTMLImageElement;
  console.log("ca clique");
  console.log(play_icon.src);

  // Toggle:
  if (play_icon.src.includes('play-solid.svg')) {
    play_icon.src = 'http://localhost:8084/_nuxt/public/svg/pause-solid.svg';
  }
  else {
    play_icon.src = 'http://localhost:8084/_nuxt/public/svg/play-solid.svg';
  }
}

function likeDirect(){
  const like_icon = document.querySelector('#like_icon') as HTMLImageElement;

  if(like_icon.src.includes('heart-regular.svg')){
    like_icon.src = 'http://localhost:8084/_nuxt/public/svg/heart-solid.svg';
  }
  else{
    like_icon.src = 'http://localhost:8084/_nuxt/public/svg/heart-regular.svg';
  }
}

onMounted(() => {
  initDirect();
  initVolume(100);
  const audio_player_volume = document.getElementById('audio_player_volume') as HTMLInputElement;
  //On initialise le volume au début à la moitié du volume maximal :
  audio_player_volume.addEventListener('input', setVolumeIcon);

});
</script>

<template>
  <div id="audio_player">
    <div class="bg-gray-700 px-[10%] py-4 fixed border-primary border-2 rounded-full w-9/10 bottom-4 left-1/2 -translate-x-1/2 justify-between items-center flex w-[90vw]">

      <!--Audio player direct details-->
      <div class="basis-1/3 flex gap-4 items-center" id="audio_player_direct_details">

        <div class="w-16 h-16" id="audio_player_direct_details_image">
          <img class="object-cover w-full h-full" src="@/public/img/radio.jpg" alt="">
        </div>

        <div class="text-white" id="audio_player_direct_details_text">
          <p>Valeur du store direct emission title</p>
          <p>Valeur du store direct emission</p>
          <p v-if="direct" class="text-primary" id="live_text">En direct</p>
          <p v-else>Rediffusion du podcast</p>
        </div>

        <img @click="likeDirect" class="h-8 w-8 cursor-pointer" id="like_icon" src="@/public/svg/heart-regular.svg" alt="">
      </div>
      <!--------------------------->

      <!--Audio player play button-->

      <div class="basis-1/3 flex flex-col items-center gap-2" v-if="!direct">
        <img @click="pauseDirect" class="h-6 w-6 p-3 bg-primary cursor-pointer rounded-2xl box-content" src="@/public/svg/play-solid.svg" alt="" id="play_icon">
        <div class="flex justify-between gap-4 w-full">
          <p class="text-white">00:00</p> <!--Valeur a définir en store-->
          <input class="accent-primary w-full" type="range" min="0" max="100" value="0" id="audio_player_time">
          <p class="text-white">00:00</p> <!--Valeur a définir en store-->
        </div>
      </div>

      <div v-else>
        <img @click="pauseDirect" class="h-6 w-6 p-3 bg-primary cursor-pointer rounded-2xl box-content" src="@/public/svg/play-solid.svg" alt="" id="play_icon">
      </div>
      <!--------------------------->

      <!--Audio player volume-->
      <div class="basis-1/3 flex justify-center gap-4" id="audio_player_volume_container">
        <input class="accent-primary" type="range" min="0" max="100" value="50" id="audio_player_volume">
        <img @click="toggleMuteVolume" class="cursor-pointer w-6 h-auto" src="@/public/svg/volume-high-solid.svg" alt="">
      </div>
      <!-------------------------->
    </div>
  </div>
</template>

<style scoped>
#live_text::before {
  content: '';
  display: inline-block;
  width: 6px;
  height: 6px;
  margin-right: 8px;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="red"/></svg>');
  background-size: cover;
  @apply animate-ping;
}
</style>
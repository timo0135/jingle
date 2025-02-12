import { AudioPlayer } from '../.nuxt/components';
<script setup lang="ts">

import { DefineProps } from 'vue';

const props = defineProps<{
  direct: {
    type: Boolean;
    required: true;
  };
}>();

    let audioContext : any ;
    let audioBuffer : any  = [];
    let ws : any;

    function startListening() {
      ws = new WebSocket('ws://localhost:8080');

      ws.onopen = () => {
        console.log("WebSocket connection opened for listener.");
        ws.send(JSON.stringify({ type: 'listen' }));
      };

      ws.onmessage = (message: MessageEvent) => {
        const data = JSON.parse(message.data);

        if (data.audio) {
          audioBuffer = audioBuffer.concat(data.audio);
          playAudioBuffer();
        }
      };

      ws.onerror = (error: Event) => {
        console.error("WebSocket error:", error);
      };

      ws.onclose = (event: CloseEvent) => {
        console.log("WebSocket connection closed. Code:", event.code, "Reason:", event.reason);
      };

      audioContext = new AudioContext();
    }

    function stopListening() {
      if (ws) {
        ws.send(JSON.stringify({ type: 'stopListening' }));
        ws.close();
        console.log("Stopped listening and WebSocket connection closed.");
      }
    }

    function playAudioBuffer() : void
      {
      if (audioBuffer.length === 0 || !audioContext) return;

      const buffer = audioContext.createBuffer(1, audioBuffer.length, audioContext.sampleRate);
      buffer.getChannelData(0).set(audioBuffer);

      const source = audioContext.createBufferSource();
      source.buffer = buffer;
      source.connect(audioContext.destination);
      source.start();

      console.log("Playing audio buffer");
      audioBuffer = [];
    }

    onMounted(() => {
      play();
      toggleMuteVolume();
      setVolumeIcon();
    });

    function play() : void
    {
    const button = document.getElementById('play_icon') as HTMLImageElement;
    button.addEventListener('click', () => {
      if (button.src.includes('play-solid.svg')) {
        startListening();
        button.src = 'http://localhost:8084/_nuxt/public/assets/svg/pause-solid.svg';
      }
      else {
        stopListening();
        button.src = 'http://localhost:8084/_nuxt/public/assets/svg/play-solid.svg';
      }
    });
  };

  function toggleMuteVolume() {
    let AudioPlayer = document.getElementById('audio_player') as HTMLDivElement;
    AudioPlayer.addEventListener('input', () => {
      const volume = document.getElementById('audio_player_volume') as HTMLInputElement;
      const volumeValue = parseInt(volume.value) / 100;
      if (audioContext) {
        audioContext.destination.volume = volumeValue;
      }
      setVolumeIcon();
    });
  };

function setVolumeIcon() : void
{
  const audio_player_volume = document.getElementById('audio_player_volume') as HTMLInputElement;
  const volume = audio_player_volume.value;

  const volume_icon = document.querySelector('#audio_player_volume_container img') as HTMLImageElement;
  if (volume === '0') {
    volume_icon.src = '_nuxt/public/svg/volume-xmark-solid.svg';
  }
  else if (parseInt(volume) < 55) {
    volume_icon.src = '_nuxt/public/svg/volume-low-solid.svg';
  }
  else {
    volume_icon.src = '_nuxt/public/svg/volume-high-solid.svg';
  }
}

</script>

<template>
  <div id="audio_player">
    <div class="bg-gray-700 px-[10%] py-4 fixed border-primary border-2 rounded-full w-9/10 bottom-4 left-1/2 -translate-x-1/2 justify-between items-center flex w-[90vw]">

      <!--Audio player direct details-->
      <div class="basis-1/3 flex gap-4 items-center" id="audio_player_direct_details">

        <div class="w-16 h-16" id="audio_player_direct_details_image">
          <img class="object-cover w-full h-full" src="/assets/img/radio.jpg" alt="">
        </div>

        <div class="text-white" id="audio_player_direct_details_text">
          <p>Valeur du store direct emission title</p>
          <p>Valeur du store direct emission</p>
          <p v-if="direct" class="text-primary" id="live_text">En direct</p>
          <p v-else>Rediffusion du podcast</p>
        </div>

        <img @click="likeDirect" class="h-8 w-8 cursor-pointer" id="like_icon" src="/assets/svg/heart-regular.svg" alt="">
      </div>
      <!--------------------------->

      <!--Audio player play button-->

      <div class="basis-1/3 flex flex-col items-center gap-2" v-if="!direct">
        <img @click="pauseDirect" class="h-6 w-6 p-3 bg-primary cursor-pointer rounded-2xl box-content" src="/assets/svg/play-solid.svg" alt="" id="play_icon">
        <div class="flex justify-between gap-4 w-full">
          <p class="text-white">00:00</p> <!--Valeur a définir en store-->
          <input class="accent-primary w-full" type="range" min="0" max="100" value="0" id="audio_player_time">
          <p class="text-white">00:00</p> <!--Valeur a définir en store-->
        </div>
      </div>

      <img class="h-6 w-6 p-3 bg-primary cursor-pointer rounded-2xl box-content" src="/assets/svg/play-solid.svg" alt="" id="play_icon">

      <div class="flex gap-4" id="audio_player_volume_container">
        <input @click="play" class="accent-primary" type="range" min="0" max="100" id="audio_player_volume">
        <img @click="toggleMuteVolume" class="cursor-pointer w-6 h-auto" src="/assets/svg/volume-low-solid.svg" alt="">
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

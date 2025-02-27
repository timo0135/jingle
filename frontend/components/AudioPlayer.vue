<script setup lang="ts">
import { ref, onMounted } from 'vue';
import InputComponent from '@/components/InputComponent.vue';

const props = defineProps<{
  direct: {
    type: Boolean;
    required: true;
  };
}>();

let audioContext: any;
let audioBuffer: any = [];
let ws: any;

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

function playAudioBuffer(): void {
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

function play(): void {
  const button = document.getElementById('play_icon') as HTMLImageElement;
  if (button) {
    button.addEventListener('click', () => {
      if (button.src.includes('play-solid.svg')) {
        startListening();
        button.src = 'http://localhost:8084/_nuxt/public/assets/svg/pause-solid.svg';
      } else {
        stopListening();
        button.src = 'http://localhost:8084/_nuxt/public/assets/svg/play-solid.svg';
      }
    });
  }
}

function toggleMuteVolume() {
  const audioPlayer = document.getElementById('audio_player') as HTMLDivElement;
  if (audioPlayer) {
    audioPlayer.addEventListener('input', () => {
      const volume = document.getElementById('audio_player_volume') as HTMLInputElement;
      if (volume) {
        const volumeValue = parseInt(volume.value) / 100;
        if (audioContext) {
          audioContext.destination.volume = volumeValue;
        }
        setVolumeIcon();
      }
    });
  }
}

onMounted(() => {
  play();
  toggleMuteVolume();
  setVolumeIcon();
  like();
});

function setVolumeIcon(): void {
  const audioPlayerVolume = document.getElementById('audio_player_volume') as HTMLInputElement;
  if (audioPlayerVolume) {
    const volume = audioPlayerVolume.value;

    const volumeIcon = document.querySelector('#audio_player_volume_container img') as HTMLImageElement;
    if (volumeIcon) {
      if (volume === '0') {
        volumeIcon.src = '_nuxt/public/svg/volume-xmark-solid.svg';
      } else if (parseInt(volume) < 55) {
        volumeIcon.src = '_nuxt/public/svg/volume-low-solid.svg';
      } else {
        volumeIcon.src = '_nuxt/public/svg/volume-high-solid.svg';
      }
    }
  }
}

function like(): void {
  const likeIcon = document.getElementById('like_icon') as HTMLImageElement;

  likeIcon.addEventListener('click', () => {
    if (likeIcon.src.includes('heart-regular.svg')) {
      likeIcon.src = 'http://localhost:8084/_nuxt/public/assets/svg/heart-solid.svg';
    } else {
      likeIcon.src = 'http://localhost:8084/_nuxt/public/assets/svg/heart-regular.svg';
    }
  });
}
</script>

<template>
      <div class="bg-gray-700 px-[10%] py-4 fixed border-primary border-2 rounded-full w-9/10 bottom-4 left-1/2 -translate-x-1/2 justify-between items-center hidden sm:flex sm:w-[80vw]" id="audio_player_desktop">
        <!--Audio player direct details-->
        <div class="basis-1/3 flex gap-4 items-center" id="audio_player_direct_details">
          <div class="w-16 h-16" id="audio_player_direct_details_image">
            <img class="object-cover w-full h-full" src="/assets/img/radio.jpg" alt="">
          </div>
          <div class="text-white text-xs hidden md:block" id="audio_player_direct_details_text">
            <p>Valeur du store direct emission title</p>
            <p>Valeur du store direct emission</p>
          </div>
          <img @click="like" class="h-6 w-6 cursor-pointer" id="like_icon" src="/assets/svg/heart-regular.svg" alt="">
        </div>
        <!--Audio player play button-->
        <div class="basis-1/3 flex flex-col items-center gap-2" v-if="!direct">
          <img @click="play" class="h-4 w-4 p-3 bg-primary cursor-pointer rounded-2xl box-content" src="/assets/svg/play-solid.svg" alt="" id="play_icon">
          <div class="flex justify-between gap-4 w-full">
            <p class="text-white">00:00</p>
            <input class="accent-primary min-w-16 w-full" type="range" min="0" max="100" value="0" id="audio_player_time">
            <p class="text-white">00:00</p>
          </div>
        </div>
        <div class="flex gap-4" id="audio_player_volume_container">
          <input @click="play" class="accent-primary" type="range" min="0" max="100" id="audio_player_volume">
          <img @click="toggleMuteVolume" class="cursor-pointer w-6 h-auto" src="/assets/svg/volume-low-solid.svg" alt="">
        </div>
      </div>

      <div class="fixed left-4 bottom-4 flex items-center gap-4 bg-gray-600 p-2 rounded-full sm:hidden" id="audio_player_mobile">
        <!--Play button-->
        <div>
          <img @click="play" class="h-4 w-4 p-3 bg-primary cursor-pointer box-content rounded-full" src="/assets/svg/play-solid.svg" alt="" id="play_icon">
        </div>
        <!--Audio player time-->
        <div class="flex items-center gap-2">
          <p class="text-white">00:00</p>
          <input class="accent-primary min-w-16 w-full" type="range" min="0" max="100" value="0" id="audio_player_time">
          <p class="text-white">00:00</p>
        </div>
        <!--Volume control-->
        <div class="flex items-center" id="audio_player_volume_container">
          <input type="range" min="0" max="200" id="audio_player_volume">
          <img class="cursor-pointer w-6 h-auto" src="/assets/svg/volume-high-solid.svg" alt="">
        </div>
      </div>
</template>

<style scoped>
#audio_player_volume_container {
  position: relative;
}

#audio_player_volume {
  accent-color: #FB0101;
  position: absolute;
  bottom: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 0;
  opacity: 0;
  transition: height 0.3s ease, opacity 0.3s ease;
  writing-mode: vertical-lr;
}

#audio_player_volume_container:hover #audio_player_volume {
  background-color: gray;
  padding: 0 20px;
  height: 80px; /* Adjust the height as needed */
  opacity: 1;
  accent-color: #FB0101;
}
</style>
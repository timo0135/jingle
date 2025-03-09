<script setup lang="ts">
import { watch } from 'vue';

const props = defineProps({
  direct: {
    type: Boolean,
    required: true
  },
  name: {
    type: String,
    required: false,
    default: ''
  },
  description: {
    type: String,
    required: false,
    default: ''
  },
  image: {
    type: String,
    required: false,
  },
  audioUrl: {
    type: String,
    required: false,
  }
});

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

let audioContext: any;
let audioBuffer: any = [];
let ws: any;
let audio: HTMLAudioElement | null = null; // Audio element for podcast audio

function startListeningDirect() {
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

function stopListeningDirect() {
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

onMounted(() => {
  play();
  toggleMuteVolume();
  setVolumeIcon();
});

function play(): void {
  const button = document.getElementById('play_icon') as HTMLImageElement;
  button.addEventListener('click', () => {
    if (!audio && props.audioUrl) {
      audio = new Audio(apiBaseUrl + props.audioUrl);
    }
    if (button.src.includes('play-solid.svg')) {
      if (props.direct) {
        startListeningDirect();
      } else {
        if (audio) {
          audio.play();
        }
      }
      button.src = '/assets/svg/pause-solid.svg';
    } else {
      if (props.direct) {
        stopListeningDirect();
      } else {
        if (audio) {
          audio.pause();
        }
      }
      button.src = '/assets/svg/play-solid.svg';
    }
  });
}

watch(() => props.audioUrl, (newAudioUrl) => {
  if (audio) {
    audio.src = apiBaseUrl + newAudioUrl;
    audio.currentTime = 0;
    const button = document.getElementById('play_icon') as HTMLImageElement;
    if (button.src.includes('pause-solid.svg')) {
      audio.play();
    } else {
      audio.pause();
    }
  }
});

function toggleMuteVolume() {
  let AudioPlayer = document.getElementById('audio_player') as HTMLDivElement;
  AudioPlayer.addEventListener('input', () => {
    const volume = document.getElementById('audio_player_volume') as HTMLInputElement;
    const volumeValue = parseInt(volume.value) / 100;
    if (audioContext) {
      audioContext.destination.volume = volumeValue;
    } else if (audio) {
      audio.volume = volumeValue;
    }
    setVolumeIcon();
  });
}

function setVolumeIcon(): void {
  const audio_player_volume = document.getElementById('audio_player_volume') as HTMLInputElement;
  const volume = audio_player_volume.value;

  const volume_icon = document.querySelector('#audio_player_volume_container img') as HTMLImageElement;
  if (volume === '0') {
    volume_icon.src = 'assets/svg/volume-xmark-solid.svg';
  } else if (parseInt(volume) < 55) {
    volume_icon.src = 'assets/svg/volume-low-solid.svg';
  } else {
    volume_icon.src = 'assets/svg/volume-high-solid.svg';
  }
}

function likeDirect() {
  const likeIcon = document.getElementById('like_icon') as HTMLImageElement;
  if (likeIcon.src.includes('heart-regular.svg')) {
    likeIcon.src = 'assets/svg/heart-solid.svg';
  } else {
    likeIcon.src = 'assets/svg/heart-regular.svg';
  }
}
</script>

<template>
  <div id="audio_player">
    <div
      class="bg-gray-700 px-4 py-2 md:px-[10%] md:py-4 fixed border-primary border-2 rounded-full w-[90vw] bottom-4 left-1/2 -translate-x-1/2 justify-between items-center flex">

      <!--Audio player direct details-->
      <div class="flex gap-2 md:gap-4 items-center" id="audio_player_direct_details">

        <div class="hidden md:block w-12 h-12 md:w-16 md:h-16" id="audio_player_direct_details_image">
          <img class="object-cover w-full h-full" :src="apiBaseUrl + image" alt="">
        </div>

        <div class="text-white text-sm md:text-base" id="audio_player_direct_details_text">
          <p class="truncate">{{ name }}</p>
          <p class="truncate">{{ description }}</p>
        </div>

        <!--        <img @click="likeDirect" class="h-8 w-8 cursor-pointer" id="like_icon" src="/assets/svg/heart-regular.svg"-->
        <!--             alt="">-->
      </div>

      <img class="h-4 w-4 p-2 md:h-6 md:w-6 md:p-3 bg-primary cursor-pointer rounded-2xl box-content"
        src="/assets/svg/play-solid.svg" alt="" id="play_icon">

      <div class="flex gap-2 md:gap-4" id="audio_player_volume_container">
        <input @click="play" class="accent-primary" type="range" min="0" max="100" id="audio_player_volume">
        <img @click="toggleMuteVolume" class="cursor-pointer w-4 h-auto md:w-6" src="/assets/svg/volume-low-solid.svg"
          alt="">
      </div>
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

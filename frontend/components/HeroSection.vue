<script setup lang="ts">
import { useAPI } from "#imports";
import { ref, onMounted } from 'vue';

const emit = defineEmits(['changeVisibility']);
const api = useAPI();

const nameDirect = ref('');
const descriptionDirect = ref('Pas de direct disponible pour le moment.');
const imageDirect = ref('');
const hasDirect = ref(false);
const date = ref('');

async function getDirect() {
  try {
    const response = await api.get('/direct');
    if (!response.data.directs) return;

    const url = response.data.directs[0]?.links[0]?.href;

    if (!url) return;

    const direct = await api.get(url);

    if (!direct.data.direct) return;
    nameDirect.value = direct.data.direct.name;
    descriptionDirect.value = direct.data.direct.description;
    imageDirect.value = direct.data.direct.image;
    hasDirect.value = true;
    date.value = formatDate(direct.data.direct.date, direct.data.direct.duration);

    return direct;
  } catch (error: any) {
    console.error('Error fetching direct:', error);
  }
}

function formatDate(date: string, duration: number) {
  const dateObj = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'Europe/Lisbon',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  };

  const startTime = dateObj.toLocaleString('en-GB', options);
  const endTimeObj = new Date(dateObj.getTime() + duration * 60000);
  const endTime = endTimeObj.toLocaleString('en-GB', options);

  return `${startTime} - ${endTime}`;
}

async function handleDirectClick() {
  if (!nameDirect.value || !descriptionDirect.value || !imageDirect.value) {
    const response = await getDirect();
    if (!response) {
      useUserStore().showErrorToast('Pas de direct disponible pour le moment.');
      return;
    }
  }
  emit('changeVisibility', true, false, null, nameDirect.value, descriptionDirect.value, imageDirect.value);
}

onMounted(async () => {
  await getDirect();
});
</script>

<template>
  <main>
    <div class="font-bungee flex flex-col md:flex-row gap-10 items-center justify-between text-primary m-auto w-[95%]"
      id="hero_section">
      <div class="basis-full md:basis-9/12 flex flex-col gap-4 text-center md:text-left">
        <h1 class="text-6xl md:text-9xl" id="live_text">Jingle <br>en direct</h1>
        <button
          class="border-4 bg-white border-primary font-inter font-extrabold px-8 md:px-16 py-2 md:py-4 rounded-full text-xl md:text-2xl w-fit hover:bg-primary hover:text-white hover:border-white transition"
          @click="handleDirectClick">Ecouter
        </button>
      </div>
      <div class="basis-3/12" id="live_show_card">
        <live-show-card :title="nameDirect" :img="imageDirect" :time_slot="date" :description="descriptionDirect" />
      </div>
    </div>
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
  @apply animate-ping;
}
</style>

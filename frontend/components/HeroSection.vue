<script setup lang="ts">
import {useAPI} from "#imports";

const emit = defineEmits(['changeVisibility']);
const api = useAPI();

const nameDirect = ref('');
const descriptionDirect = ref('');
const imageDirect = ref('');

async function getDirect() {
  console.log("Fetching direct...");
  try {
    const response = await api.get('/direct');
    if (!response.data.directs) return;

    const url = response.data.directs[0]?.links[0]?.href;

    if (!url) {
      useUserStore().showErrorToast('Pas de direct disponible pour le moment.');
    }

    const direct = await api.get(url);

    if (!direct.data.direct) return;
    nameDirect.value = direct.data.direct.name;
    descriptionDirect.value = direct.data.direct.description;
    imageDirect.value = direct.data.direct.image;

    return direct;
  } catch (error: any) {
    console.error('Error fetching direct:', error);
  }
}

async function handleDirectClick() {
  if (!nameDirect.value || !descriptionDirect.value || !imageDirect.value) {
    const response = await getDirect();
    if (!response) return;
  }
  emit('changeVisibility', true, false, null, nameDirect.value, descriptionDirect.value, imageDirect.value);
}

onMounted(async () => {
});


</script>

<template>
  <main>
    <div class="font-bungee flex gap-10 items-center justify-between text-primary m-auto w-[95%]" id="hero_section">
      <div class="basis-9/12 flex flex-col g-4">
        <h1 class="text-9xl" id="live_text">Jingle <br>en direct</h1>
        <button
            class="border-4 bg-white border-primary font-inter font-extrabold px-16 py-4 rounded-full text-2xl w-fit hover:bg-primary hover:text-white hover:border-white transition"
            @click="handleDirectClick">Ecouter
        </button>
      </div>
      <div class="basis-3/12" id="live_show_card">
        <live-show-card title="Manu dans le 54" img="/assets/img/radio.jpg" time_slot="4h30-5h30"
                        description="Manu et son équipe animent une emission nocturne à l’heure où batman oeuvre et à laquelle ..."/>
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
  background-size: cover;
  @apply animate-ping;
}
</style>

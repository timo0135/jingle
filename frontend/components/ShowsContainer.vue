<script setup lang="ts">
import ShowCard from "~/components/cards/showCard.vue";
import { onMounted } from '#imports';
import { useAPI } from '#imports';

const props = defineProps<{
  title: string;
}>();

const podcasts = ref([]);

async function fecthPodacsts() {
  try {
    const response  = await useAPI().get('/podcasts');
    podcasts.value = response.data.podcasts;
    
  }
  catch (error) {
    console.error(error);
  }
}

// const showsContainer = ref<HTMLElement | null>(null);
// const flecheGauche = ref<HTMLElement | null>(null);
// const flecheDroit = ref<HTMLElement | null>(null);

onMounted(() => {


  const showsContainer : HTMLElement | null = document.getElementById('shows_container');
  const flecheGauche : HTMLElement | null = document.getElementById('flecheGauche');
  const flecheDroit : HTMLElement | null = document.getElementById('flecheDroit');

  fecthPodacsts();

  if (flecheGauche && showsContainer) {
    flecheGauche.addEventListener('click', () => {
      if (showsContainer) {
        showsContainer.scrollLeft -= 150;
      }
    });
  }

  if (flecheDroit && showsContainer) {
    flecheDroit.addEventListener('click', () => {
      if (showsContainer) {
        showsContainer.scrollLeft += 150;
      }
    });
  }

});

</script>

<template>
  <div class="font-bold font-inter mx-8 my-8 text-primary">
    <h2 class="my-4 text-3xl underline">{{ props.title }}</h2>
    <div class="flex gap-4 overflow-x-scroll no-scrollbar overflow-auto" id="shows_container">

      <ShowCard v-for="podcast in podcasts" :key="podcast.id" :title="podcast.name" :time_slot="new Date(podcast.date).toLocaleString()" :description="podcast.description" />
      </div>
      <div class="flex gap-4 my-2" id="show_navigation">
        <img id="flecheGauche" class="cursor-pointer" width="50px" height="50px"
          src="../public/assets/svg/arrow_left.svg" alt="Flèche de gauche">
        <img id="flecheDroit" class="cursor-pointer" width="50px" height="50px"
          src="../public/assets/svg/arrow_right.svg" alt="Flèche de droite">
      </div>
    </div>

</template>

  <style scoped>

  </style>

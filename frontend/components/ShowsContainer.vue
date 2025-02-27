<script setup lang="ts">
import ShowCard from "~/components/cards/showCard.vue";

const props = defineProps<{
  title: string;
  podcasts: Array<{
    id: string;
    name: string;
    date: string;
    description: string;
    isFavorite: boolean;
    audioUrl: string;
    image: string;
  }>;
}>();

const emit = defineEmits(['changeVisibility']);

function handleShowCardClicked(audioUrl: string, name: string, description: string, image: string) {
  emit('changeVisibility', false, true, audioUrl, name, description, image);
}
</script>

<template>
  <div class="font-bold font-inter mx-8 my-8 text-primary">
    <h2 class="my-4 text-3xl underline">{{ props.title }}</h2>
    <div class="flex gap-4 overflow-x-scroll no-scrollbar overflow-auto" id="shows_container">
      <ShowCard v-for="podcast in props.podcasts" :key="podcast.id" :id="podcast.id" :name="podcast.name"
                :date="podcast.date" :description="podcast.description" :isFavorite="podcast.isFavorite"
                :audioUrl="podcast.audioUrl"
                @showCardClicked="handleShowCardClicked(podcast.audioUrl, podcast.name, podcast.description, podcast.image)"/>
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
/* Add your styles here */
</style>

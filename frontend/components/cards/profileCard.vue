<script setup lang="ts">
import { defineProps } from 'vue';

defineProps<{
  img?: string,
  name?: string,
  mail?: string,
  phone?: string,
}>();

</script>

<template>
  <div id="profile_card" class="border-primary border-4 flex gap-10 px-12 py-4 w-fit">

    <div class="profile_picture">
      <img :src="img" alt="Image de l'émission" class="border-4 border-primary h-auto object-cover rounded-2xl w-40 h-40"/>
    </div>

    <div class="details flex flex-col justify-between text-primary">
      <div>
        <h2 class="font-bungee text-3xl">Nom : {{ name }}</h2>
        <p class="font-bold font-inter">Mail : {{ mail }}</p>
        <p class="font-bold font-inter">Numéro de téléphone : {{ phone }}</p>
      </div>

      <a href="" class="bg-primary font-bold font-inter text-center text-white px-20 py-3 rounded-2xl w-fit">Modifier</a>
    </div>
  </div>
</template>

<style scoped>

</style>

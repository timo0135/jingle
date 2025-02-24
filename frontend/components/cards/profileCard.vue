<script setup lang="ts">
import {defineProps} from 'vue';

const props = defineProps({
  name: String,
  mail: String,
});

</script>

<template>
  <div id="profile_card" class="border-primary border-4 rounded-2xl flex gap-10 px-12 py-4 w-fit bg-white">

    <img src="/assets/img/default.jpg" alt="Image de l'émission"
         class="border-4 border-primary object-cover rounded-2xl w-40 h-40"/>

    <div class="details flex flex-col justify-between text-primary">
      <div class="flex flex-col gap-2 justify-center items-center h-full">
        <h2 class="font-bungee text-3xl">Nom : {{ name }}</h2>
        <p class="font-bold font-inter">Mail : {{ mail }}</p>
      </div>

      <a href=""
         class="bg-primary font-bold font-inter text-center text-white px-20 py-3 rounded-2xl w-fit">Modifier</a>
    </div>
  </div>
</template>

<style scoped>

</style>

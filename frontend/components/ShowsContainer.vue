<script setup lang="ts">
  import ShowCard from "~/components/cards/showCard.vue";
</script>

<template>
  <div class="font-bold font-inter mx-8 my-8 text-primary w-[110vw]" id="shows_container">
    <h2 class="my-4 text-3xl underline">Podcasts au top :</h2>
    <div class="flex gap-4">
      <ShowCard title="Manu dans le 54" time_slot="20h-21h30" description="Manu et son équipe animent une emission nocturne à l’heure où batman oeuvre et à laquelle les gens normaux dorment, ils vont retourné la nuit."/>
      <ShowCard title="Manu dans le 54" time_slot="20h-21h30" description="Manu et son équipe animent une emission nocturne à l’heure où batman oeuvre et à laquelle les gens normaux dorment, ils vont retourné la nuit."/>
      <ShowCard title="Manu dans le 54" time_slot="20h-21h30" description="Manu et son équipe animent une emission nocturne à l’heure où batman oeuvre et à laquelle les gens normaux dorment, ils vont retourné la nuit."/>
    </div>
    <div class="flex gap-4 my-2" id="show_navigation">
      <img class="cursor-pointer" width="50px" height="50px" src="../public/assets/svg/arrow_left.svg" alt="Flèche de gauche">
      <img class="cursor-pointer" width="50px" height="50px" src="../public/assets/svg/arrow_right.svg" alt="Flèche de droite">
    </div>
  </div>
</template>

<style scoped>

</style>

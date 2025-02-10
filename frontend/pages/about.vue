<script setup lang="ts">

</script>

<template>
  <div id="about_project">
    <navbar/>
    <main>
      <div class="font-bungee flex gap-10 items-center justify-between text-primary m-auto w-[95%]" id="main">
        <div class="basis-9/12 flex flex-col g-4">
          <h1 class="text-9xl">A propos de <br>notre projet</h1>
          <p class="text-2xl">Jingle en direct est une plateforme de diffusion de radio en ligne. Nous vous proposons de retrouver vos émissions préférées en direct ou en podcast. Vous pouvez également retrouver les meilleurs moments de vos émissions préférées en podcast.</p>
        </div>
        <div class="basis-3/12" id="live_show_card">
          <img src="../assets/img/radio.jpg" alt="Radio" class="rounded-3xl w-full"/>
        </div>
      </div>
    </main>
    <Footer/>
  </div>
</template>

<style scoped>

</style>
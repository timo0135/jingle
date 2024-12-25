<script setup lang="ts">

</script>

<template>
  <!--Signup form-->
  <div class="border-4 border-primary flex flex-col  justify-center m-auto rounded-2xl py-20 w-6/12" id="form">

    <h1 class="font-bungee text-primary text-center py-4 text-5xl">Créez votre compte :</h1>

    <form class="font-inter flex flex-col items-center gap-6" action="">
      <div class="flex flex-col w-1/2">
        <label class="text-primary text-2xl" for="pseudo">Pseudo :</label>
        <input class="border-2 border-primary focus:outline-none px-2 py-2 rounded-lg" type="text" name="pseudo" placeholder="Pseudo">
      </div>
      <div class="flex flex-col w-1/2">
        <label class="text-primary text-2xl" for="email">Email :</label>
        <input class="border-2 border-primary focus:outline-none px-2 py-2 rounded-lg" type="email" name="email" placeholder="Email">
      </div>
      <div class="flex flex-col w-1/2">
        <label class="text-primary text-2xl" for="password">Mot de passe :</label>
        <input class="border-2 border-primary focus:outline-none px-2 py-2 rounded-lg" type="password" name="password" placeholder="Mot de passe">
      </div>
      <div class="bg-primary cursor-pointer font-bold text-white rounded-xl py-3 px-12">
        <input class="cursor-pointer" type="submit" value="S'inscrire">
      </div>
    </form>
  </div>

</template>

<style scoped>

</style>
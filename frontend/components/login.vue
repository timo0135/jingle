<script setup lang="ts">
import { useAuth } from "@/stores/auth";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useAuth();

const signIn = () => {
  store.authenticate();
  router.push("/");
  console.log("Fonction SignIn envoyée");
};
</script>

<template>
  <!--Login form-->
  <div class="border-4 border-primary flex flex-col justify-center m-auto rounded-2xl py-20 w-6/12" id="form">

    <h1 class="font-bungee text-primary text-center py-4 text-5xl">Connectez-vous à Jingle :</h1>

    <form @submit.prevent="signIn" class="font-inter flex flex-col items-center gap-6">
      <div class="flex flex-col w-1/2">
        <label class="text-primary text-2xl" for="pseudo">Pseudo / Email :</label>
        <input class="border-2 border-primary focus:outline-none px-2 py-2 rounded-lg" type="text" name="pseudo" placeholder="Pseudo">
      </div>
      <div class="flex flex-col w-1/2">
        <label class="text-primary text-2xl" for="password">Mot de passe :</label>
        <input class="border-2 border-primary focus:outline-none px-2 py-2 rounded-lg" type="password" name="password" placeholder="Mot de passe">
      </div>
      <div class="bg-primary cursor-pointer font-bold text-white rounded-xl py-3 px-12">
        <input class="cursor-pointer" type="submit" value="Se connecter">
      </div>
    </form>
  </div>
</template>

<style scoped>

</style>
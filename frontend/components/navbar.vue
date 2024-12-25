<script setup lang="ts">
import { useAuth } from "@/stores/auth";

const store = useAuth();
</script>

<template>
  <!-- Navbar -->
  <div class="border-t-4 border-primary flex justify-between navbar px-6 my-4 py-3 m-auto w-[95%]">

    <!--Logo container-->
    <div class="" id="logo_container">
      <nuxt-link to="/">
        <img src="../assets/img/logo.png" alt="Logo de Jingle" class="logo">
      </nuxt-link>
    </div>

    <!--Searchbar and nav icons container-->
    <div class="basis-1/4 gap-2 flex justify-end items-center">

      <!--Searchbar-->
      <div class="basis-3/4 border-primary bg-secondary gap-2 border-4 flex h-full px-2 rounded-2xl w-2/3">
        <img height="25px" width="25px" class="" src="../assets/svg/search.svg" alt="">
        <input class="bg-secondary font-inter w-full h-full rounded-2xl focus:outline-none" id="searchbar" type="text">
      </div>

      <!--Nav icons-->
      <div class="basis-1/4 flex gap-3 justify-end">

        <!--Si l'utilisateur n'est pas connecté-->
        <div class="basis-1/4 flex gap-3 justify-end" v-if="store.user === null">
          <nuxt-link to="/signin">
            <p>Se connecter</p>
          </nuxt-link>
        </div>

        <!--Si l'utilisateur est connecté-->
        <div v-else class="basis-1/2 flex gap-3 justify-end">
          <nuxt-link>
            <img src="../assets/svg/logout.svg" alt="Icone de déconnexion">
          </nuxt-link>

          <nuxt-link to="/profile">
            <img src="../assets/svg/profile.svg" alt="Icone de profile">
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
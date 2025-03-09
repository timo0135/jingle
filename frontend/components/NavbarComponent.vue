<script setup lang="ts">
import InputComponent from '@/components/InputComponent.vue';

const userStore = useUserStore();
const router = useRouter();

const handleLogout = async () => {
  userStore.reset();
  await router.push('/');
};

const searchString = ref('');

const searchPodcast = async () => {
  await router.push(`/search?search=${searchString.value}`);
};

</script>

<template>

  <!-- Navbar -->
  <div class="border-t-4 border-primary flex justify-between navbar px-6 my-4 py-3 m-auto w-[95%]">

    <!--Logo container-->
    <div class="" id="logo_container">
      <nuxt-link to="/">
        <img src="/assets/img/Logo.png" alt="Logo de Jingle" class="logo">
      </nuxt-link>
    </div>

    <!--Searchbar and nav icons container-->
    <div class="basis-1/4 gap-2 flex justify-end items-center">

      <!--Searchbar-->
      <InputComponent imgSrc="/assets/svg/search.svg" type="text" v-model="searchString" @keyup.enter="searchPodcast" />

      <!--Nav icons-->
      <div class="basis-1/4 flex gap-3 justify-end">

        <!--Si l'utilisateur n'est pas connecté-->
        <div class="basis-1/4 flex gap-3 justify-end" v-if="userStore.user_id === null">
          <nuxt-link
              class="font-bungee bg-white border-4 border-primary px-4 py-2 text-primary text-nowrap hover:bg-primary hover:text-white hover:border-white transition rounded-2xl"
              to="/signin">
            <p>Se connecter</p>
          </nuxt-link>
        </div>

        <!--Si l'utilisateur est connecté-->
        <div v-else class="basis-1/2 flex gap-3 justify-end cursor-pointer">
          <nuxt-link @click="handleLogout">
            <img src="/assets/svg/logout.svg" alt="Icone de déconnexion" class = "w-4 h-4">
          </nuxt-link>

          <nuxt-link to="/profile">
            <img src="/assets/svg/profile.svg" alt="Icone de profile" class = "w-4 h-4">
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>

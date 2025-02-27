<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userStore'; // Ensure correct store path
import InputComponent from '@/components/InputComponent.vue';

const userStore = useUserStore();
const directStore = useDirectStore();
const router = useRouter();

const handleLogout = async () => {
  userStore.$reset();
  await router.push('/');
};

//On veut ouvrir la Searchbar
const toggleSearchbar = () => {

  if(directStore.isSearchbarActive) {
    directStore.isSearchbarActive = false;
  }
  else if(directStore.isSearchbarActive || directStore.isAudioplayerActive){
    directStore.isSearchbarActive = true;
    directStore.isAudioplayerActive = false;
  }
  else{
    directStore.isSearchbarActive = true;
  }
};
</script>

<template>
  <!-- Navbar -->
  <div class="border-t-4 border-primary flex justify-between gap-8 navbar my-4 py-3 m-auto w-[95%]">
    <!-- Logo container -->
    <div class="basis-2/4" id="logo_container">
      <nuxt-link to="/">
        <img src="/assets/img/Logo.png" alt="Logo de Jingle">
      </nuxt-link>
    </div>

    <!-- Searchbar and nav icons container -->
    <div class="basis-2/4 gap-2 flex justify-end items-center">
      <!-- Desktop searchbar -->
      <InputComponent class="hidden md:flex" id="searchbar_desktop" imgSrc="/assets/svg/search.svg" type="text" />

      <!-- Mobile searchbar button -->
      <div
          class="fixed bottom-4 right-4 bg-primary w-12 h-12 rounded-full flex justify-center items-center cursor-pointer md:hidden"
          id="searchbar_mobile"
          @click="toggleSearchbar"
      >
        <img class="w-6 h-auto" src="/assets/svg/search_white.svg" alt="Search Icon">
      </div>

      <!-- Mobile searchbar input with transition -->
      <transition name="fade">
        <div v-if="directStore.isSearchbarActive" class="fixed left-4 bottom-4 w-auto">
          <InputComponent
              class="h-1/4 md:hidden"
              id="searchbar_mobile_input"
              imgSrc="/assets/svg/search.svg"
              type="text"
          />
        </div>
      </transition>

      <!-- Navigation icons -->
      <div class="basis-1/4 flex gap-3 justify-end">
        <!-- If user is not logged in -->
        <div v-if="!userStore.user_id" class="basis-1/4 flex gap-3 justify-end">
          <nuxt-link
              class="font-bungee bg-white border-4 border-primary px-4 py-2 text-primary text-nowrap hover:bg-primary hover:text-white hover:border-white transition rounded-2xl"
              to="/signin"
          >
            <p>Se connecter</p>
          </nuxt-link>
        </div>

        <!-- If user is logged in -->
        <div v-else class="basis-1/2 flex gap-3 justify-end cursor-pointer">
          <nuxt-link @click="handleLogout">
            <img src="/assets/svg/logout.svg" alt="Logout Icon">
          </nuxt-link>

          <nuxt-link to="/profile">
            <img src="/assets/svg/profile.svg" alt="Profile Icon">
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>

<script setup>
import ToastComponent from '@/components/ToastComponent.vue';
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore();
</script>

<template>
  <div id="app">
    <nuxt-page/>
    <ToastComponent :message="userStore.toastMessage" :isVisible="userStore.isVisible"/>
  </div>
</template>

<style>

*{
  margin: 0;
  padding: 0;
}

html{
  background-color: var(--secondary-color);
}

</style>

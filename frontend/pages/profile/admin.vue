<script>
import { defineComponent, onMounted, ref } from 'vue';
import { useAPI } from '~/imports';
import { useUserStore } from '~/stores/userStore';
import NavbarComponent from '~/components/NavbarComponent.vue';
import Footer from '~/components/FooterComponent.vue';

</script>

<template>
    <NavbarComponent  />

    <Footer />

</template>
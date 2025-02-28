<script>
import { defineComponent, onMounted, ref } from 'vue';
import { useUserStore } from '~/stores/userStore';
import NavbarComponent from '~/components/NavbarComponent.vue';
import Footer from '~/components/Footer.vue';
import AdminComponent from '~/components/AdminComponent.vue';


</script>

<template>
    <NavbarComponent  />

    <AdminComponent />

    <Footer />

</template>
<script setup lang="ts">

import {definePageMeta} from "#imports";

definePageMeta({
  middleware:[
    'auth',
    'is-admin'
  ]
})


</script>

<template>
    <NavbarComponent  />

    <AdminComponent />

    <Footer />

</template>

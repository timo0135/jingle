<script lang="ts"> 
import NavbarComponent from '~/components/NavbarComponent.vue';
import Footer from '~/components/Footer.vue';
import FormGlobalComponent from '~/components/FormGlobalComponent.vue';

</script>

<template>
    <NavbarComponent/>
    <FormGlobalComponent
        title="Direct"
        :fields="[
            { type: 'text', label: 'Nom de l émission', name: 'name', required: true },
            { type: 'text', label: 'Description', name: 'Description', required: true },
            { type: 'file', label: 'Image de couverture', name: 'image', required: true },
            { type: 'date', label: 'Date', name: 'date', required: true },
            { type: 'number', label: 'Durée', name: 'Durée', required: true },
        ]"
        buttonText="Créer un direct"
        textLink="retour au profil"
        paragraph="profile"
        linkTo="/profile"
    />


    <Footer/>
</template>
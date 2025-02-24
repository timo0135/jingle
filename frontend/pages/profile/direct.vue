<script lang="ts"> 

</script>

<template>
    <NavbarComponent/>
    <FormGlobalComponent
        title="Direct"
        :fields="[
            { type: 'text', label: 'Nom de l émission', name: 'name', required: true },
            { type: 'text', label: 'Description', name: 'description', required: true },
            { type: 'file', label: 'Image de couverture', name: 'fileImage', required: true },
            { type: 'date', label: 'Date', name: 'date', required: true },
            { type: 'number', label: 'Durée', name: 'duration', required: true },
        ]"
        buttonText="Créer un direct"
        textLink="retour au profil"
        paragraph="profile"
        linkTo="/profile"
    />


    <Footer/>
</template>
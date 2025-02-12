<script setup lang="ts">

</script>

<template>
  <div class="min-h-screen flex flex-col justify-between">
    <NavbarComponent/>
    <FormComponent
        title="Inscrivez-vous à Jingle :"
        emailPlaceholder="Entrez votre email"
        emailLabel="Email :"
        passwordPlaceholder="Entrez votre mot de passe"
        passwordLabel="Mot de passe :"
        pseudoPlaceholder="Entrez votre pseudo"
        pseudoLabel="Pseudo :"
        buttonText="S'inscrire"
        textLink="Déjà un compte ? Connectez-vous"
        paragraph="Connectez-vous à Jingle :"
        linkTo="signin"
        :isSignup="true"
    />
    <Footer/>
  </div>
</template>

<style scoped>

</style>

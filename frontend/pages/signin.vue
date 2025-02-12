<script setup lang="ts">

</script>

<template>
  <NavbarComponent/>
  <FormComponent
      title="Connectez-vous à Jingle :"
      emailPlaceholder="Entrez votre pseudo ou votre email"
      emailLabel="Pseudo / Email :"
      passwordPlaceholder="Entrez votre mot de passe"
      passwordLabel="Mot de passe :"
      buttonText="Se connecter"
      textLink="Pas encore de compte ? Inscrivez-vous"
      paragraph="Connectez-vous à Jingle :"
      linkTo="signup"
      :isSignup="false"
  />
  <Footer/>
</template>

<style scoped>

</style>

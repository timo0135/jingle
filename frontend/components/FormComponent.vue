<script setup lang="ts">
import {defineProps} from 'vue';
import { useUserStore } from '~/stores/userStore';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  emailPlaceholder: {
    type: String,
    required: true,
    default: 'Email'
  },
  emailLabel: {
    type: String,
    required: true
  },
  passwordPlaceholder: {
    type: String,
    required: true,
    default: 'Mot de passe'
  },
  passwordLabel: {
    type: String,
    required: true
  },
  pseudoPlaceholder: {
    type: String,
    required: false,
    default: 'Pseudo'
  },
  pseudoLabel: {
    type: String,
    required: false
  },
  buttonText: {
    type: String,
    required: true
  },
  textLink: {
    type: String,
    required: true
  },
  paragraph: {
    type: String,
    required: true
  },
  linkTo: {
    type: String,
    required: true
  },
  isSignup: {
    type: Boolean,
    required: true
  }
});

const user = ref({
  email: '',
  password: '',
  pseudo: ''
});
const handleSubmit = async () => {
  try {
    const userStore = useUserStore();
    if (props.isSignup) {
      // Signup
      await userStore.register(user.value.pseudo, user.value.email, user.value.password);
    } else {
      // Signin
      await userStore.signin(user.value.email, user.value.password);
    }
  } catch (error) {
    console.error(error);
  }
};

</script>

<template>
  <div class="flex flex-col items-center justify-start mx-auto border-4 border-primary p-4 rounded-2xl md:max-w-screen-lg" id="form">
    <h1 class="font-bungee text-primary text-center py-6 text-3xl md:text-6xl">{{ title }}</h1>
    <form @submit.prevent="handleSubmit" class="font-inter flex flex-col gap-4 items-center w-full">
      <div v-if="isSignup" class="input-container w-full md:w-1/2">
        <label class="text-primary text-lg md:text-2xl" for="pseudo">{{ pseudoLabel }}</label>
        <InputComponent v-model="user.pseudo" :placeholder="pseudoPlaceholder" type="text"/>
      </div>
      <div class="input-container w-full md:w-1/2">
        <label class="text-primary text-lg md:text-2xl" for="email">{{ emailLabel }}</label>
        <InputComponent v-model="user.email" :placeholder="emailPlaceholder" type="text"/>
      </div>
      <div class="input-container w-full md:w-1/2">
        <label class="text-primary text-lg md:text-2xl" for="password">{{ passwordLabel }}</label>
        <InputComponent v-model="user.password" :placeholder="passwordPlaceholder" type="password"/>
      </div>
      <div class="bg-primary cursor-pointer font-bold text-white rounded-xl py-4 px-12 w-full md:w-auto">
        <input class="cursor-pointer w-full md:w-auto" type="submit" :value="buttonText">
      </div>
    </form>
    <div class="text-primary self-end text-base md:text-xl mt-4">
      <nuxt-link :to="linkTo">{{ textLink }}</nuxt-link>
    </div>
  </div>
</template>

<style scoped>
/* Add your styles here */
.input-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  height: 110px;
  width: 300px;
}
</style>

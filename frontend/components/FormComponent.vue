<script setup lang="ts">
import {defineProps} from 'vue';

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
  <div class="flex flex-col items-center" id="form">
    <h1 class="font-bungee text-primary text-center py-4 text-5xl">{{ title }}</h1>
    <form @submit.prevent="handleSubmit" class="font-inter flex flex-col items-center gap-6 w-full">
      <div v-if="isSignup" class="input-container">
        <label class="text-primary text-2xl" for="pseudo">{{ pseudoLabel }}</label>
        <InputComponent v-model="user.pseudo" :placeholder="pseudoPlaceholder" type="text"/>
      </div>
      <div class="input-container">
        <label class="text-primary text-2xl" for="email">{{ emailLabel }}</label>
        <InputComponent v-model="user.email" :placeholder="emailPlaceholder" type="text"/>
      </div>
      <div class="input-container">
        <label class="text-primary text-2xl" for="password">{{ passwordLabel }}</label>
        <InputComponent v-model="user.password" :placeholder="passwordPlaceholder" type="password"/>
      </div>
      <div class="bg-primary cursor-pointer font-bold text-white rounded-xl py-3 px-12">
        <input class="cursor-pointer" type="submit" :value="buttonText">
      </div>
    </form>
    <div class="text-primary self-end">
      <nuxt-link :to="linkTo">{{ textLink }}</nuxt-link>
    </div>
  </div>
</template>

<style scoped>
/* Add your styles here */
.input-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
}

.input-style {
  border: 2px solid #000;
  padding: 10px;
  border-radius: 8px;
  width: 100%;
  max-width: 300px;
  box-sizing: border-box;
}
</style>

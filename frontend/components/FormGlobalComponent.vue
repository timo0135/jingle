<script setup lang="ts">
import { defineProps } from 'vue';

interface FormField {
  type: string;
  label: string;
  placeholder?: string;
  name: string;
  required?: boolean;
  min?: number;
  max?: number;
}

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  fields: {
    type: Array as PropType<FormField[]>,
    required: true
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
  }
});

const formData = ref({});

const handleSubmit = async () => {
  try {
    console.log('Form data:', formData.value);
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <div class="flex flex-col items-center justify-start mx-auto md:max-w-screen-lg border-4 border-primary p-4 rounded-2xl" id="form">
    <h1 class="font-bungee text-primary text-center py-10 text-6xl">{{ title }}</h1>
    <form @submit.prevent="handleSubmit" class="font-inter flex flex-col gap-6 items-center">
      <div v-for="field in fields" :key="field.name" class="input-container">
        <label class="text-primary text-2xl" :for="field.name">{{ field.label }}</label>
        <template v-if="field.type === 'text' || field.type === 'password' || field.type === 'email' || field.type === 'number'">
          <InputComponent
            v-model="formData[field.name]"
            :type="field.type"
            :placeholder="field.placeholder"
            :required="field.required"
            :min="field.min"
            :max="field.max"
          />
        </template>
        <template v-else-if="field.type === 'date'">
          <input
            :id="field.name"
            v-model="formData[field.name]"
            type="date"
            class="w-full p-2 border rounded"
            :required="field.required"
          />
        </template>
        <template v-else-if="field.type === 'file'">
          <input
            :id="field.name"
            type="file"
            @change="e => formData[field.name] = e.target.files[0]"
            class="w-full p-2"
            :required="field.required"
          />
        </template>
      </div>
      <div class="bg-primary cursor-pointer font-bold text-white rounded-xl py-5 px-16">
        <input class="cursor-pointer" type="submit" :value="buttonText">
      </div>
    </form>
    <div class="text-primary self-end text-xl mt-4">
      <nuxt-link :to="linkTo">{{ textLink }}</nuxt-link>
    </div>
  </div>
</template>

<style scoped>
.input-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  height: auto;
  min-height: 110px;
  width: 300px;
}
</style>

<script setup lang="ts">
import { defineProps } from 'vue';
import {useAPI, useRouter, useUserStore} from '#imports';

const router = useRouter();

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



interface FormData {
  name: string;
  description: string;
  fileImage: File | null;
  hostId: string | null;
  date: string;
  duration: number;
  [key: string]: any; // Add index signature
}

const formData = ref<FormData>({
  name: '',
  description: '',
  fileImage: null,
  hostId: useUserStore().user_id,
  date: '',
  duration: 0,
});

const handleSubmit = async () => {
  try {
    console.log('formData.value : ', formData.value);
    formData.value.hostId = useUserStore().user_id;

    const formDataToSend = new FormData();
    for (const key in formData.value) {
      formDataToSend.append(key, formData.value[key]);
    }

    const response = await useAPI().post(`/directs`, formDataToSend, {
      headers: {
        'Authorization': `Bearer ${useUserStore().user_token}`,
        'Content-Type': 'multipart/form-data'
      }
    });

    console.log('Direct created : ', response);
    router.push({ name: 'profile-broadcast' });

  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <div class="flex flex-col items-center justify-start mx-auto md:max-w-screen-lg border-4 border-primary p-4 rounded-2xl transition-all max-h-[90vh] overflow-y-auto no-scrollbar" id="form">

    <h1 class="font-bungee text-primary text-center py-4 text-6xl">{{ title }}</h1>
    <form @submit.prevent="handleSubmit" class="font-inter flex flex-col gap-1 items-center">
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
          {{ formData[field.name] }}
          <input
            :id="field.name"
            type="file"
            @change="e => formData[field.name] = e.target?.files[0]"
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

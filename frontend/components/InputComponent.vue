<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    required: false,
  },
  imgSrc: {
    type: String,
    required: false,
  },
  placeholder: {
    type: String,
    required: false,
    default: '',
  },
  type: {
    type: String,
    required: false,
    default: 'text',
  },
  action: {
    type: String,
    required: false,
  }
});

const emit = defineEmits(['update:modelValue']);

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};
</script>

<template>
  <div class="flex items-center gap-2 border-4 h-full border-primary rounded-2xl p-2">
    <img v-if="imgSrc" :src="imgSrc" alt="Icon" class="cursor-pointer h-6 w-6">
    <input :placeholder="placeholder" class="bg-secondary font-inter focus:outline-none w-full h-full placeholder:text-gray-400 text-gray-700"
           :type="type" :value="modelValue" @input="updateValue">
  </div>
</template>


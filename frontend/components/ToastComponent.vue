<script setup>
import { ref, defineProps, watch } from 'vue';

const props = defineProps({
  message: {
    type: String,
    required: true,
  },
  isVisible: {
    type: Boolean,
    required: true,
  }
});

const isVisible = ref(false);

watch(() => props.isVisible, (newVal) => {
  isVisible.value = newVal;
});
</script>

<template>
  <transition name="toast">
    <div v-if="isVisible"
         class="fixed flex justify-center items-center gap-3 bg-red-400 top-32 right-4 px-4 py-4 w-2/10 rounded-2xl z-50"
         id="toast">
      <div class="flex items-center justify-center" id="toast_icon">
        <svg class="w-6 h-6 text-red-500 bg-red-500 rounded-full" fill="none" stroke="white"
             viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </div>

      <div class="text-center overflow-hidden text-ellipsis whitespace-nowrap text-wrap" id="toast_message">
        <p class="text-black font-monospace break-words whitespace-normal overflow-hidden">{{ message }}</p>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.toast-enter-active, .toast-leave-active {
  transition: transform 0.5s, opacity 0.5s;
}

.toast-enter-from {
  transform: translateY(100%);
  opacity: 0;
}

.toast-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>

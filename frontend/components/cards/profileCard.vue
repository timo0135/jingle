<script setup lang="ts">
import {ref, watch} from 'vue';
import {defineProps} from 'vue';
import {useAPI, useUserStore} from '#imports';

const api = useAPI();
const props = defineProps({
  name: {
    type: String,
    default: ''
  },
  mail: {
    type: String,
    default: ''
  }
});

const isEditing = ref(false);
const editedName = ref(props.name);
const editedMail = ref(props.mail);

watch(() => props.name, (newName) => {
  editedName.value = newName;
}, {immediate: true});

watch(() => props.mail, (newMail) => {
  editedMail.value = newMail;
}, {immediate: true});

const handleEdit = () => {
  isEditing.value = true;
};

const handleSave = async () => {
  try {
    const response = await api.patch(`/users/${useUserStore().user_id}`, {
      pseudo: editedName.value,
      email: editedMail.value,
    }, {
      headers: {
        'Authorization': `Bearer ${useUserStore().user_token}`,
      }
    });

    isEditing.value = false;
  } catch (error: any) {
    useUserStore().showErrorToast(error.response.data.message);
    console.error(error);
  }
};
</script>

<template>
  <div id="profile_card" class="border-primary border-4 rounded-2xl flex gap-10 px-12 py-4 w-fit bg-white">
    <img src="/assets/img/default.jpg" alt="Image de l'émission"
         class="border-4 border-primary object-cover rounded-2xl w-40 h-40"/>

    <div class="details flex flex-col justify-between text-primary">
      <div class="flex flex-col gap-2 justify-center h-full">
        <h2 class="font-bungee text-3xl">
          Nom :
          <span v-if="!isEditing">{{ name }}</span>
          <input v-else v-model="editedName" class="border-4 border-primary rounded-2xl p-2 w-full">
        </h2>
        <p class="font-bold font-inter">
          Mail :
          <span v-if="!isEditing">{{ mail }}</span>
          <input v-else v-model="editedMail" class="border-4 border-primary rounded-2xl p-2 w-full">
        </p>
        <button v-if="!isEditing" @click="handleEdit"
                class="bg-primary font-bold font-inter text-center text-white px-20 py-3 rounded-2xl w-fit">Modifier
        </button>
        <button v-else @click="handleSave"
                class="bg-primary font-bold font-inter text-center text-white px-20 py-3 rounded-2xl w-fit">Enregistrer
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Ajoutez des styles si nécessaire */
</style>

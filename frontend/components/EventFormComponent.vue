<script lang="ts">
import {ref, defineComponent, watch, onMounted} from 'vue';
import {useAPI} from '#imports';
import {useUserStore} from '@/stores/userStore';


export default defineComponent({
  props: {
    isVisible: {
      type: Boolean,
      required: true
    },
    date: {
      type: String,
      required: true
    }
  },
  setup(props, {emit}) {
    const api = useAPI();
    const userStore = useUserStore();

    const eventName = ref('');
    const eventDate = ref(props.date);
    const eventDescription = ref('');
    const eventImage = ref<File | null>(null);
    const eventHostId = ref('');
    const eventDuree = ref('');
    const users = ref([]);

    const formData = ref({
      name: '',
      description: '',
      fileImage: null as File | null,
      hostId: '',
      date: '',
      duration: 0
    });

    watch(() => props.date, (newDate) => {
      eventDate.value = newDate;
      formData.value.date = newDate;
    });

    const closeForm = () => {
      emit('close-form');
    };

    const handleFileUpload = (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        eventImage.value = target.files[0];
        formData.value.fileImage = target.files[0];
      }
    };

    const submitForm = async () => {
      try {
        formData.value.hostId = eventHostId.value;
        formData.value.name = eventName.value;
        formData.value.description = eventDescription.value;
        formData.value.duration = parseInt(eventDuree.value);


        const formDataToSend = new FormData();

        formDataToSend.append('name', formData.value.name);
        formDataToSend.append('description', formData.value.description);
        formDataToSend.append('fileImage', formData.value.fileImage as File);
        formDataToSend.append('hostId', formData.value.hostId!);
        formDataToSend.append('date', formData.value.date);
        formDataToSend.append('duration', formData.value.duration.toString());


        const response = await api.post('/directs', formDataToSend, {
          headers: {
            'Authorization': `Bearer ${userStore.user_token}`,
            'Content-Type': 'multipart/form-data'
          }
        });

        closeForm();
      } catch (error: any) {
        const errorMessage = error.response.data.message || 'An error occurred';
        userStore.showErrorToast(errorMessage);
      }
    };

    const getUsers = () => {
      api.get('/users', {
        headers: {
          'Authorization': `Bearer ${userStore.user_token}`
        }
      }).then(response => {
        users.value = response.data.users;
      }).catch(error => {
        console.error(error);
      });
    };



    onMounted(() => {
        
      getUsers();
    });

    return {
      eventName,
      eventDate,
      eventDescription,
      eventImage,
      eventHostId,
      eventDuree,
      users,
      formData,
      closeForm,
      handleFileUpload,
      submitForm
    };
  }
});
</script>

<template>
  <div v-if="isVisible" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-secondary p-5 rounded-md w-94 z-[999]">
      <span class="float-right text-2xl cursor-pointer" @click="closeForm">&times;</span>
      <h2 class="text-xl mb-4">Create Event</h2>
      <form @submit.prevent="submitForm">
        <label for="eventName" class="block mb-2">Nom:</label>
        <input type="text" id="eventName" v-model="eventName" required class="w-full mb-4 p-2 border rounded">

        <label for="eventDescription" class="block mb-2">Description:</label>
        <input type="text" id="eventDescription" v-model="eventDescription" required
               class="w-full mb-4 p-2 border rounded">

        <label for="eventImage" class="block mb-2">Image:</label>
        <input type="file" id="eventImage" @change="handleFileUpload" required class="w-full mb-4 p-2 border rounded">

        <label for="eventHostId" class="block mb-2">Createur:</label>
        <select id="eventHostId" v-model="eventHostId" required class="w-full mb-4 p-2 border rounded">
          <option v-for="user in users" :key="user.id" :value="user.id">{{ user.pseudo }}</option>
        </select>

        <label for="eventDate" class="block mb-2">Date:</label>
        <input type="text" id="eventDate" v-model="eventDate" readonly class="w-full mb-4 p-2 border rounded">

        <label for="eventDuree" class="block mb-2">Duree:</label>
        <input type="number" id="eventDuree" v-model="eventDuree" required class="w-full mb-4 p-2 border rounded">

        <button type="submit" class="w-full bg-primary text-white p-2 rounded">Create Event</button>
      </form>
    </div>
  </div>
</template>

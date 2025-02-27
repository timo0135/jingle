<script lang="ts">
import { ref, defineComponent } from 'vue';
import { useAPI } from '#imports';
import { useUserStore } from '@/stores/userStore';

const api = useAPI();
const userStore = useUserStore();

interface FormData {
  name: string;
  description: string;
  fileImage: File | null;
  hostId: string | null;
  date: string;
  duration: number;
  [key: string]: any; // Add index signature
}

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
    data() {
        return {
            eventName: '',
            eventDate: this.date,
            eventDescription: '',
            eventImage: null as File | null,
            eventHostId: '',
            eventDuree: '',
            users: [],
            formData: ref<FormData>({
                name: '',
                description: '',
                fileImage: null,
                hostId: userStore.user_id,
                date: '',
                duration: 0
            })
        }
    },
    watch: {
        date(newDate) {
            this.eventDate = newDate;
            this.formData.date = newDate;
        }
    },
    methods: {
        closeForm() {
            this.$emit('close-form');
        },
        handleFileUpload(event: Event) {
            const target = event.target as HTMLInputElement;
            if (target.files && target.files[0]) {
                this.eventImage = target.files[0];
                this.formData.fileImage = target.files[0];
            }
        },
        async submitForm() {
            try {
                this.formData.hostId = userStore.user_id;
                this.formData.name = this.eventName;
                this.formData.description = this.eventDescription;
                this.formData.duration = parseInt(this.eventDuree);

                const formDataToSend = new FormData();
                for (const key in this.formData) {
                    formDataToSend.append(key, this.formData[key]);
                }

                const response = await api.post('/directs', formDataToSend, {
                    headers: {
                        'Authorization': `Bearer ${userStore.user_token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                });
                alert(`Event Created: ${this.eventName} on ${this.eventDate}`);
                this.closeForm();
            } catch (error) {
                console.error('error:',  error);
                alert('An error occurred while creating the event');
            }
        },

        getUsers() {
            api.get('/users',{headers: {
                        'Authorization': `Bearer ${userStore.user_token}`,
                    }}).then(response => {
                this.users = response.data.users;
            }).catch(error => {
                console.error(error);
            });
        }
    },
    mounted() {
        this.getUsers();
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
                <input type="text" id="eventDescription" v-model="eventDescription" required class="w-full mb-4 p-2 border rounded">
                
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
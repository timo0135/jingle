<script>
import { useAPI } from '#imports';

const api = useAPI();
export default {
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
            eventImage: null,
            eventHostId: '',
            eventDuree: '',
            users: [] // Add users array
        }
    },
    watch: {
        date(newDate) {
            this.eventDate = newDate;
        }
    },
    methods: {
        closeForm() {
            this.$emit('close-form');
        },
        handleFileUpload(event) {
            this.eventImage = event.target.files[0];
        },
        createDirect(){
            

        },
        submitForm() {

            alert(`Event Created: ${this.eventName} on ${this.eventDate}`);
            this.closeForm();
        },
        getUsers() {
            api.get('/users').then(response => {
                this.users = response.data.users; 
            }).catch(error => {
                console.error(error);
            });
        }
    },
    mounted() {
        this.getUsers();
    }
}
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
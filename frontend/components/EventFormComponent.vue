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
            eventDuree: ''
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
        submitForm() {
            // Handle form submission
            alert(`Event Created: ${this.eventTitle} on ${this.eventDate}`);
            this.closeForm();
        },
        getUsers() {
            const response = api.get('/users');
            console.log(response.data);
    },

    mounted() {
        getUsers();    
        },
    }
}
</script>

<template>
    <div v-if="isVisible" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white p-5 rounded-md w-72 z-[999]">
            <span class="float-right text-2xl cursor-pointer" @click="closeForm">&times;</span>
            <h2 class="text-xl mb-4">Create Direct</h2>
            <form @submit.prevent="submitForm">
                <label for="eventName" class="block mb-2">Nom:</label>
                <input type="text" id="eventName" v-model="eventName" required class="w-full mb-4 p-2 border rounded">
                <label for="eventDescription" class="block mb-2">Description:</label>
                <input type="text" id="eventDescription" v-model="eventDescription" required class="w-full mb-4 p-2 border rounded">
                <label for="eventImage" class="block mb-2">Image:</label>
                <input type="file" id="eventImage" @change="handleFileUpload" required class="w-full mb-4 p-2 border rounded">
                <label for="eventHostId" class="block mb-2"> Createur:</label>
                <input type="text" id="eventHostId" v-model="eventHostId" required class="w-full mb-4 p-2 border rounded">
                <label for="eventDate" class="block mb-2">Date:</label>
                <input type="text" id="eventDate" v-model="eventDate" readonly class="w-full mb-4 p-2 border rounded">
                <label for="eventDuree" class="block mb-2">duree:</label>
                <input type="number" id="eventDuree" v-model="eventDuree" readonly class="w-full mb-4 p-2 border rounded">
                
                <button type="submit" class="w-full bg-primary text-white p-2 rounded">Create Event</button>
            </form>
        </div>
    </div>
</template>

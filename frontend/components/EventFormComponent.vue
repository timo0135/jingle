<script>
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
            eventTitle: '',
            eventDate: this.date
        }
    },
    methods: {
        closeForm() {
            this.$emit('close-form');
        },
        submitForm() {
            // Handle form submission
            alert(`Event Created: ${this.eventTitle} on ${this.eventDate}`);
            this.closeForm();
        }
    }
}
</script>

<template>
    <div v-if="isVisible" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white p-5 rounded-md w-72 z-[999]">
            <span class="float-right text-2xl cursor-pointer" @click="closeForm">&times;</span>
            <h2 class="text-xl mb-4">Create Event</h2>
            <form @submit.prevent="submitForm">
                <label for="eventTitle" class="block mb-2">Event Title:</label>
                <input type="text" id="eventTitle" v-model="eventTitle" required class="w-full mb-4 p-2 border rounded">
                
                <label for="eventDate" class="block mb-2">Event Date:</label>
                <input type="text" id="eventDate" v-model="eventDate" readonly class="w-full mb-4 p-2 border rounded">
                
                <button type="submit" class="w-full bg-primary text-white p-2 rounded">Create Event</button>
            </form>
        </div>
    </div>
</template>

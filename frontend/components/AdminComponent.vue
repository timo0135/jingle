<script setup>
import { useAPI } from '#imports';
import { useUserStore } from '@/stores/userStore';

const api = useAPI();
const userStore = useUserStore();

const users = ref([]);

function getUsers() {
    api.get('/users', {
        headers: {
            'Authorization': `Bearer ${userStore.user_token}`
        }
    }).then(response => {
        users.value = response.data.users;
    });
}

function upgradeRole(id) {
    api.patch(`/users/${id}/upgrade`,{}, {
        headers: {
            'Authorization': `Bearer ${userStore.user_token}`
        }
    }).then(() => {
        getUsers();
    });
}

function downGrade(id) {
    api.patch(`/users/${id}/disupgrade`,{}, {
        headers: {
            'Authorization': `Bearer ${userStore.user_token}`
        }
    }).then(() => {
        getUsers();
    });
}

onMounted(() => {
    getUsers();
});
</script>

<template>
    <div class="p-4">
        <h1 class="text-2xl font-bold mb-4 text-primary">Users</h1>
        <ul class="space-y-2">
            <li v-for="user in users" :id="user.id" :key="user.id"
                class="flex items-center justify-between p-2 bg-secondary-100 rounded-lg border border-primary">
                <div class="flex space-x-2 items-center">
                    <span class="text-primary text-xl font-bold">{{ user.pseudo }}</span>
                    <span v-if="user.role === 2" class="text-primary "> diffuseur </span>
                    <span v-else-if="user.role === 3" class="text-primary "> admin </span>
                    <span v-else class="text-primary "> utilisateur </span>
                </div>
                <div class="flex space-x-2" v-if="user.role !== 3">
                    <button  v-if="user.role === 2" @click="downGrade(user.id)"
                        class="px-4 py-2 bg-primary-500 text-primary rounded hover:bg-primary hover:text-white border border-primary">interdire
                        la diffusion</button>
                        <button v-else @click="upgradeRole(user.id)"
                        class="px-4 py-2 bg-primary-500 text-primary rounded hover:bg-primary hover:text-white border border-primary">Autoriser
                        la diffusion</button>
                </div>
            </li>
        </ul>
    </div>
</template>

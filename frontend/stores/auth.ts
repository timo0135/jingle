import { defineStore } from "pinia";
import { ref } from "vue";

interface User {
    authenticated: boolean;
    username: string,
    email: string,
}

export const useAuth = defineStore("auth", () => {
    const user = ref<User | null>(null);
    const authenticate = () => {
        user.value = {
            authenticated: true,
            username: "John Doe",
            email: "johndoe@superdev.fr",
        };
    };

    return { user, authenticate };
});
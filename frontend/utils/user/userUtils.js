import { useAPI } from "~/utils/api.js";

export async function register(user) {
    try {
        const api = useAPI();
        const response = await api.post('/register', user);
        return await response.data;
    } catch (error) {
        console.error(error);
    }
}

export async function signin(credentials) {
    try {
        const api = useAPI();
        const response = await api.post('/signin', credentials);
        return await response.data;
    } catch (error) {
        console.error(error);
    }
}
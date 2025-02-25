import axios from 'axios';

export function useAPI() {
    const apiBase = import.meta.env.VITE_API_BASE_URL;

    const api = axios.create({
        baseURL: apiBase,
        headers: {
            'Content-Type': 'application/json',
        }
    });

    api.interceptors.response.use(
        response => response,
        async error => {
            const userStore = useUserStore();
            if (error.response.status === 401 || error.response.status === 500) {
                try {
                    await userStore.refreshToken();
                    error.config.headers['Authorization'] = `Bearer ${userStore.user_token}`;
                    return api.request(error.config);
                } catch (refreshError) {
                    userStore.reset();
                    return Promise.reject(refreshError);
                }
            }
            return Promise.reject(error);
        }
    );

    return api;
}

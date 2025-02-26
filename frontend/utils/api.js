import axios from 'axios';
import {useUserStore} from '~/stores/userStore';

export function useAPI() {
    const apiBase = import.meta.env.VITE_API_BASE_URL;

    const api = axios.create({
        baseURL: apiBase,
        headers: {
            'Content-Type': 'application/json',
        }
    });

    api.interceptors.response.use(
        (response) => response,
        async (error) => {
            const userStore = useUserStore();
            const originalRequest = error.config;

            if (!error.response) {
                return Promise.reject(error);
            }

            const status = error.response.status;

            if ((status === 401 || status === 500) &&
                !originalRequest.url.includes('/refresh')) {
                const newAccessToken = await userStore.refreshToken();

                if (newAccessToken) {
                    await userStore.refreshToken();
                    error.config.headers['Authorization'] = `Bearer ${userStore.user_token}`;
                    return api.request(error.config);
                }
            }

            return Promise.reject(error);
        });

    return api;
}

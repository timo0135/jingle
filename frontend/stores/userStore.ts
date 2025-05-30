import {defineStore} from 'pinia';
import {useAPI} from "~/utils/api";

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      user_token: null,
      user_id: null,
      pseudo: null,
      email: null,
      refresh_token: null,
      isVisible: ref(false),
      toastMessage: ref(''),
      favoritePlaylistId: null,
      role: null,
    };
  },
  actions: {
    reset() {
      this.user_token = null;
      this.user_id = null;
      this.pseudo = null;
      this.email = null;
      this.refresh_token = null;
      this.favoritePlaylistId = null;
      this.role = null;
    },
    showErrorToast(message: string) {
      this.toastMessage = message;
      this.isVisible = true;
      setTimeout(() => {
        this.isVisible = false;
      }, 3000);
    },
    async signin(email: string, password: string) {
      try {
        const api = useAPI();
        const router = useRouter();
        const response = await api.post('/signin', {}, {
          headers: {'Authorization': `Basic ${btoa(`${email}:${password}`)}`}
        }).then(res => {
          this.user_id = res.data.user.id;
          this.user_token = res.data.user.token;
          this.refresh_token = res.data.user.refreshToken;
          this.role = res.data.user.role;
          return res;
        });
        if (response) {
          await router.push('/');
        }

        return response.data;
      } catch (error: any) {
        const message = error.response?.data?.message || 'Une erreur est survenue';
        this.showErrorToast(message);
      }
    },
    async register(pseudo: string, email: string, password: string) {
      try {
        const api = useAPI();
        const router = useRouter();
        const response = await api.post('/register', {
          pseudo: pseudo,
        }, {
          headers: {'Authorization': `Basic ${btoa(`${email}:${password}`)}`}
        }).then(res => {
          this.user_id = res.data.user.id;
          this.user_token = res.data.user.token;
          return res;
        });
        if (response) {
          await this.signin(email, password);
          await router.push('/');
        }

      } catch (error: any) {
        const message = error.response?.data?.message || 'Une erreur est survenue';
        this.showErrorToast(message);
      }
    },
    async refreshToken() {
      try {
        const api = useAPI();
        const response = await api.post('/refresh', {}, {
          headers: {'Authorization': `Bearer ${this.refresh_token}`}
        });

        if (response.status === 200) {
          this.user_token = response.data.user.token;
        } else {
          throw new Error('Failed to refresh token');
        }
      } catch (error) {
        this.reset();
        this.showErrorToast('Session expired, please sign in again');
        await useRouter().push('/signin');
      }
    },
    async getUser() {
      try {
        const api = useAPI();
        await api.get(`/users/${this.user_id}`, {
          headers: {'Authorization': `Bearer ${this.user_token}`}
        }).then(res => {
          this.pseudo = res.data.user.pseudo;
          this.email = res.data.user.email;
          return res;
        });
      } catch (error: any) {
        const message = error.response?.data?.message || 'Une erreur est survenue';
        this.showErrorToast(message);
      }
    }
  },
  persist: true,
});

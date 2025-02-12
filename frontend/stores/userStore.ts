import {defineStore} from 'pinia';
import {useAPI} from "~/utils/api";

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      user_token: null,
      user_id: null,
      pseudo: null,
      email: null,
      isVisible: ref(false),
      toastMessage: ref(''),
    };
  },
  actions: {
    reset() {
      this.user_token = null;
      this.user_id = null;
      this.pseudo = null;
      this.email = null;
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
        const userStore = useUserStore();
        const router = useRouter();
        const response = await api.post('/signin', {}, {
          headers: {'Authorization': `Basic ${btoa(`${email}:${password}`)}`}
        }).then(res => {
          userStore.user_id = res.data.user.id;
          userStore.user_token = res.data.user.token;
          return res;
        });
        if (response) {
          await router.push('/');
        }

        return response.data;
      } catch (error: any) {
        this.showErrorToast(error.response.data.message);
      }
    },
    async register(pseudo: string, email: string, password: string) {
      try {
        const api = useAPI();
        const userStore = useUserStore();
        const router = useRouter();
        const response = await api.post('/register', {
          pseudo: pseudo,
        }, {
          headers: {'Authorization': `Basic ${btoa(`${email}:${password}`)}`}
        }).then(res => {
          userStore.user_id = res.data.user.id;
          userStore.user_token = res.data.user.token;
          return res;
        });
        if (response) {
          await this.signin(email, password);
          await router.push('/');
        }

      } catch (error: any) {
        this.showErrorToast(error.response.data.message);
      }
    }
  },
  persist: true,
});

import { useUserStore } from "#imports";

const user = useUserStore();

export default defineNuxtRouteMiddleware((to, from) =>{
    if(user.user_id === null){
        return navigateTo('/signin');
    }

})

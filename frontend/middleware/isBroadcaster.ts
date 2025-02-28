import { useUserStore } from "#imports";

const user = useUserStore();

export default defineNuxtRouteMiddleware((to, from) =>{
    if(user.role === 1 || user.role === null){
        return abortNavigation();
    }

})

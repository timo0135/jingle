import { useUserStore } from "#imports";

const user = useUserStore();

export default defineNuxtRouteMiddleware((to, from) =>{
    if(user.role !== 3){
        return abortNavigation();
    }

})

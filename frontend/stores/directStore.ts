export const useDirectStore = defineStore('direct', {
    state: () => {
        return {
            clickedDate: null,
            selectedDate: null,
        };
    }
});
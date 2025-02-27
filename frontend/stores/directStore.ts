export const useDirectStore = defineStore('direct', {
    state: () => {
        return {
            //Agenda
            clickedDate: null,
            selectedDate: null,

            //Direct
            isSearchbarActive : false,
            isAudioplayerActive: false,


        };
    }

});
export const useDirectStore = defineStore('direct', {
    state: () => {
        return {
            //Agenda
            clickedDate: null,
            selectedDate: null,

            //Direct
            isAudioplayerActive: false,


        };
    }

});
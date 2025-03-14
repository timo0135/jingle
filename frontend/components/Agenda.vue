<script>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import frLocale from '@fullcalendar/core/locales/fr'
import EventForm from './EventFormComponent.vue'
import {useAPI} from '#imports'
import {useUserStore} from '@/stores/userStore'

export default {
  components: {
    FullCalendar,
    EventForm
  },
  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
        initialView: 'timeGridDay',
        locale: frLocale,
        timeZone: 'Europe/Paris',
        themeSystem: 'bootstrap',
        selectable: true,
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'timeGridWeek,timeGridDay'
        },
        dateClick: this.handleDateClick,
        events: []
      },
      showEventForm: false,
      selectedDate: ''
    }
  },
  methods: {
    openEventForm(date) {
      this.selectedDate = date;
      this.showEventForm = true;
    },

    handleDateClick(info) {
      if (useUserStore().role !== 1) {
        this.openEventForm(info.dateStr);
      }
    },
    addEvent(eventData) {
      this.calendarOptions.events.push(eventData);
    },

    getEvent() {
      this.calendarOptions.events = [];
      const api = useAPI();
      api.get('/directs')
          .then(response => {
            const directs = response.data.directs;
            directs.forEach(direct => {
              const self = direct.links[0].href;
              api.get(self)
                  .then(response => {
                    const event = response.data.direct;
                    const startDate = new Date(event.date);
                    const endDate = new Date(startDate.getTime() + event.duration * 60 * 1000).toISOString();
                    this.calendarOptions.events.push({
                      title: event.name,
                      start: event.date,
                      end: endDate,
                      allDay: false

                    })
                  });
            })
          })
          .catch(error => {
            console.log(error);
          })
    }


  },
  mounted() {
    this.getEvent();
  },
  watch: {
    showEventForm(newVal) {
      if (!newVal) {
        this.selectedDate = '';
        this.getEvent();
      }
    }
  }
}
</script>

<template>
  <div class="flex flex-col items-center">
    <EventForm :isVisible="showEventForm" @close-form="showEventForm = false" :date="selectedDate"
               @create-event="addEvent" class="z-50"/>

    <FullCalendar :options="calendarOptions" class="md:h-auto md:w-[80%] md:p-10 z-10 w-96 h-screen p-1"/>
  </div>
</template>

<style>

@media screen and (max-width: 768px) {
  #fc-dom-1 {
    font-size: 1rem;
  }

  button {
    font-size: 1rem;
  }
  
  .fc-header-toolbar{
    --tw-space-x-reverse: 0;
    margin-right: calc(0.5rem /* 8px */ * var(--tw-space-x-reverse));
    margin-left: calc(0.5rem /* 8px */ * calc(1 - var(--tw-space-x-reverse)));
  }
}
</style>
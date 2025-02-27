<script>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import frLocale from '@fullcalendar/core/locales/fr'
import EventForm from './EventFormComponent.vue'
import { useAPI } from '#imports'

export default {
  components: {
    FullCalendar,
    EventForm
  },
  data() {
    return {
      calendarOptions: {
        plugins: [ dayGridPlugin, interactionPlugin, timeGridPlugin ],
        initialView: 'timeGridWeek',
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
      this.openEventForm(info.dateStr);
    },
    addEvent(eventData) {
      this.calendarOptions.events.push(eventData);
    },

    getEvent(){
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
}
}
</script>

<template>
  <div class="flex flex-col items-center">
    <EventForm :isVisible="showEventForm" @close-form="showEventForm = false" :date="selectedDate" @create-event="addEvent" class="z-50"/>
  
   <FullCalendar :options="calendarOptions" class="w-[80%] p-10 z-10"/>
  </div>
</template>
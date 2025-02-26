<script>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import frLocale from '@fullcalendar/core/locales/fr'
import EventForm from './EventFormComponent.vue'

export default {
  components: {
    FullCalendar,
    EventForm
  },
  data() {
    return {
      calendarOptions: {
        plugins: [ dayGridPlugin, interactionPlugin, timeGridPlugin ],
        initialView: 'dayGridMonth',
        locale: frLocale,
        timeZone: 'Europe/Paris',
        themeSystem: 'bootstrap',
        selectable: true,
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        dateClick: this.handleDateClick
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
      console.log('date click! ' + info.dateStr);
      console.log(info);
    }
  }
}
</script>

<template>
  <div class="flex flex-col items-center">
    <EventForm :isVisible="showEventForm" @close-form="showEventForm = false" :date="selectedDate" class="z-50"/>
  
   <FullCalendar :options="calendarOptions" class="w-[80%] p-10 z-10"/>
  </div>
</template>
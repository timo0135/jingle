<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';
import { onMounted } from '#imports';
import { getDirects } from '~/utils/direct/directUtils';
import { useDirectStore } from "~/stores/directStore";

const days = ref(["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"]);
const hours = ref(["00h00", "02h00", "04h00", "06h00", "08h00", "10h00", "12h00", "14h00", "16h00", "18h00", "20h00", "22h00"]);

const showModal = ref(false);
const directStore = useDirectStore();

function onDirectClick() {
  const td = document.querySelectorAll('td');

  td.forEach((td) => {
    td.addEventListener('click', (e) => {

      // Show the modal
      showModal.value = true;

      // Get the clicked cell's text (hour)
      const hour = e.target.textContent.trim();

      // Find the column index (corresponding to the day)
      const cell = e.target.closest("td");
      const row = cell?.parentNode;
      const columnIndex = Array.from(row?.children || []).indexOf(cell);

      if (columnIndex > 0) { // Ensure it's a valid day column (not the hour column)
        const today = new Date();
        const currentDay = today.getDay(); // 0 (Sunday) to 6 (Saturday)

        // Calculate the start of the week (assuming Monday as day 1)
        const startOfWeek = new Date(today);
        const daysFromMonday = (currentDay === 0 ? 6 : currentDay - 1); // Adjust for Sunday
        startOfWeek.setDate(today.getDate() - daysFromMonday);

        // Get the selected date by adding days
        const selectedDate = new Date(startOfWeek);
        selectedDate.setDate(startOfWeek.getDate() + (columnIndex - 1)); // Keep this part as you had it

        // Format to yyyy-mm-dd
        const formattedDate = selectedDate.toISOString().split('T')[0];

        // Save in store
        directStore.clickedDate = formattedDate;
      }
    });
  });
}

function addDirect() {
  console.log('Adding direct...');
}





// Watch for modal opening and update the input field
watch(showModal, async (newVal) => {
  if (newVal) {
    await nextTick(); // Wait for the modal to be rendered
    const inputDate = document.querySelector('#eventDate');

    if (inputDate && directStore.clickedDate) {
      console.log(directStore.clickedDate);
      inputDate.value = directStore.clickedDate;
    }

    //Aucune date dans le store :
    else{
      const currentDate = new Date();
      const isoDate = currentDate.toISOString();
      const dateInput = document.querySelector('#eventDate');
      dateInput.value = isoDate.split('T')[0];
    }
  }
});

//Watch a change on the store value :
watch(() => directStore.clickedDate, (newVal) => {
  const inputDate = document.querySelector('#eventDate');

  if (inputDate && newVal) {
    inputDate.value = newVal;
  }
});

onMounted(() => {
  onDirectClick();
});

</script>


<template>
  <div class="agenda">
    <table>
      <thead>
      <tr>
        <th></th>
        <th v-for="(day, index) in days" :key="index">{{ day }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(hour, hourIndex) in hours" :key="hourIndex">
        <td class="hour-column">{{ hour }}</td>
        <td class="hover:bg-primary transition-all" v-for="(day, dayIndex) in days" :key="dayIndex" @click="showModal = true">
          <span id="hour-details">{{ day }} {{ hour }}</span>
        </td>
      </tr>
      </tbody>
    </table>
  </div>

  <div v-if="showModal" class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-secondary" id="popup_modal">
    <div class="absolute cursor-pointer top-6 right-6 bg-primary rounded-full p-2 flex justify-center items-center h-8 w-8" id="close_button" @click="showModal = false">
      <img src="../public/assets/svg/xmark-solid.svg" alt="">
    </div>

        title="Créer un nouvel événement"
        :fields="[
        { type: 'text', label: 'Nom du direct :', name: 'eventName', placeholder: 'Ex: Emission des Fleurs', required: true },
        { type: 'text', label: 'Description :', name: 'location', placeholder: 'Ex: Cette émission est dédiée à...', required: true },
        { type: 'text', label: 'Createur assigné :', name: 'creator', placeholder: 'Ex: Jean-Christophe', required: true },
        { type: 'date', label: 'Date :', name: 'eventDate', required: true },
        { type: 'number', label: 'Durée (en heures)', name: 'duration', placeholder: 'Ex: 2', required: true, min: 1 },
        { type: 'file', label: 'Image du direct :', name: 'eventImage', required: false }
      ]"
        buttonText="Ajouter le direct"
        textLink="Voir toutes les émissions à venir"
        paragraph="Vous pouvez ajouter un direct en remplissant le formulaire ci-dessous."
        linkTo="/calendar"
        :isSignup="false"
        :onInputClick="addDirect"
    />
  </div>
</template>

<style scoped>
.agenda {
  height: 100vh;
  margin: 0 2em;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Arial, sans-serif;
}
table {
  height: 80vh;
  width: 100%;
  border-collapse: collapse;
}
th, td {
  width: 5%;
}
th:not(:first-child), td:not(:first-child) {
  border: 2px solid red;
  text-align: center;
  width: 12.5%;
}
th:first-child {
  border: none;
}
td:first-child {
  border-top: 2px solid red;
  background-color: #FFEBB5;
}
th:not(:first-child) {
  color: red;
}
td {
  cursor: pointer;
  height: 40px;
  position: relative;
}
.hour-column {
  background-color: #FFF8DC;
  font-weight: bold;
  color: red;
  text-align: center;
}
#hour-details {
  opacity: 0.4;
}
</style>
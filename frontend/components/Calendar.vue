<script setup lang="ts">
import { ref } from 'vue';

const days = ref(["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"]);
const hours = ref(["00h00", "02h00", "04h00", "06h00", "08h00", "10h00", "12h00", "14h00", "16h00", "18h00", "20h00", "22h00"]);
</script>

<template>
  <div class="agenda">
    <table>
      <thead>
      <tr>
        <th></th> <!-- Colonne vide pour l'alignement des heures -->
        <th v-for="(day, index) in days" :key="index">{{ day }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(hour, hourIndex) in hours" :key="hourIndex">
        <!-- Première colonne : affiche les heures -->
        <td class="hour-column">{{ hour }}</td>
        <!-- Colonnes pour les jours -->
        <td v-for="(day, dayIndex) in days" :key="dayIndex">
         <span id="hour-details">{{ day }} {{ hour }}</span>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.agenda {
  margin: auto;
  font-family: Arial, sans-serif;
}
table {
  width: 100%;
  border-collapse: collapse;
}

/*Gérer la largeur de la colonnes des heures*/
th, td{
  width: 5%;
}

/*Gérer la largeur des colonnes des jours*/
th:not(:first-child), td:not(:first-child) {
  border: 2px solid red;
  text-align: center;
  width: 12.5%;
}

th:first-child {
  border: none;

}

td:first-child{
  border-top: 2px solid red;
  background-color: #FFEBB5;
}

th:not(:first-child) {
  color: red;
}

td {
  height: 40px;
  position: relative;
}
.hour-column {
  background-color: #FFF8DC;
  font-weight: bold;
  color: red;
  text-align: center;
}
#hour-details{
  opacity: 0.4;
}

</style>

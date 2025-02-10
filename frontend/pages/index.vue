<script setup lang="ts">
  function nextShows() {
    const showsContainer = document.getElementById('shows_container');
    showsContainer.classList.add('-translate-x-1/3');
    console.log("test")
  }
</script>

<template>
  <div class=" relative" id="landing">
    <navbar/>

    <!-- Main -->
    <main>
      <div class="font-bungee flex gap-10 items-center justify-between text-primary m-auto w-[95%]" id="main">
        <div class="basis-9/12 flex flex-col g-4">
          <h1 class="text-9xl">Jingle <br>en direct</h1>
          <a class="border-4 bg-white border-primary font-extrabold font-inter px-16 py-4 my-8 rounded-3xl text-2xl w-fit hover:bg-primary hover:text-white hover:border-white transition" href="">Ecouter</a>
        </div>
        <div class="basis-3/12" id="live_show_card">
          <live-show-card title="Manu dans le 54" img="radio.jpg" time_slot="4h30-5h30" description="Manu et son équipe animent une emission nocturne à l’heure où batman oeuvre et à laquelle ..." />
        </div>
      </div>


      <div class="py-20">
        <!-- Shows container -->
        <div class="font-bold font-inter shows_container m-auto text-primary ml-[2.5%] overflow-hidden">
          <h2 class="my-4 text-4xl underline">Dernières diffusions :</h2>
          <div class="flex gap-4 flex-nowrap w-[110vw]" id="shows_container">
            <ShowCard title="Manu dans le 54" time_slot="20h-21h30" description="Manu et son équipe animent une emission nocturne à l’heure où batman oeuvre et à laquelle les gens normaux dorment, ils vont retourné la nuit."/>
            <ShowCard title="Manu dans le 54" time_slot="20h-21h30" description="Manu et son équipe animent une emission nocturne à l’heure où batman oeuvre et à laquelle les gens normaux dorment, ils vont retourné la nuit."/>
            <ShowCard title="Manu dans le 54" time_slot="20h-21h30" description="Manu et son équipe animent une emission nocturne à l’heure où batman oeuvre et à laquelle les gens normaux dorment, ils vont retourné la nuit."/>
          </div>
          <div class="flex gap-4 my-2" id="show_navigation">
            <img class="cursor-pointer" width="50px" height="50px" src="../assets/svg/arrow_left.svg" alt="Flèche de gauche">
            <img @click="nextShows()" class="cursor-pointer" width="50px" height="50px" src="../assets/svg/arrow_right.svg" alt="Flèche de droite">
          </div>
        </div>

        <!-- Shows container -->
        <div class="font-bold font-inter shows_container m-auto text-primary ml-[2.5%] overflow-hidden">
          <h2 class="my-4 text-4xl underline">Podcasts au top :</h2>
          <div class="flex gap-4 flex-nowrap w-[110vw]" id="shows_container">
            <ShowCard title="Manu dans le 54" time_slot="20h-21h30" description="Manu et son équipe animent une emission nocturne à l’heure où batman oeuvre et à laquelle les gens normaux dorment, ils vont retourné la nuit."/>
            <ShowCard title="Manu dans le 54" time_slot="20h-21h30" description="Manu et son équipe animent une emission nocturne à l’heure où batman oeuvre et à laquelle les gens normaux dorment, ils vont retourné la nuit."/>
            <ShowCard title="Manu dans le 54" time_slot="20h-21h30" description="Manu et son équipe animent une emission nocturne à l’heure où batman oeuvre et à laquelle les gens normaux dorment, ils vont retourné la nuit."/>
          </div>
          <div class="flex gap-4 my-2" id="show_navigation">
            <img width="50px" height="50px" src="../assets/svg/arrow_left.svg" alt="Flèche de gauche">
            <img width="50px" height="50px" src="../assets/svg/arrow_right.svg" alt="Flèche de droite">
          </div>
        </div>
      </div>
    </main>

    <Footer/>
  </div>



</template>

<style scoped>
</style>
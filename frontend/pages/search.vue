<script setup lang="ts">
import NavbarComponent from '~/components/NavbarComponent.vue';
import Footer from '~/components/Footer.vue';
import ShowCard from '~/components/cards/showCard.vue';
import { useAPI } from '#imports';
import { onMounted, ref } from '#imports';

const podcasts = ref([]);

const api = useAPI();

const search = async () => {
    try {
        const searchQuery = new URLSearchParams(window.location.search).get('search');

        const response = await api.get('/podcasts');

        podcasts.value = response.data.podcasts;

        if (searchQuery) {
            podcasts.value = podcasts.value.filter((podcast: any) => {
                return podcast.name.toLowerCase().includes(searchQuery.toLowerCase());
            });
            if(podcasts.value.length === 0) {
                document.getElementById('search')!.innerHTML = '<h1 class="text-3xl text-center text-primary">No podcasts found</h1>';
            }
        }
    } catch (error) {
        console.error('Error fetching podcasts:', error);
    }
};

onMounted(() => {
    search();
});
</script>

<template>
    <NavbarComponent/>
    <div class="flex flex-col justify-center space-y-10 p-10 " id="search">
        <ShowCard v-for="podcast in podcasts" :key="podcast.id" :title="podcast.name" :description="podcast.description" :time_slot="podcast.date" />
    </div>
    <Footer/>
</template>
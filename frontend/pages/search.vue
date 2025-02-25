<script setup lang="ts">
import NavbarComponent from '~/components/NavbarComponent.vue';
import Footer from '~/components/Footer.vue';
import ShowCard from '~/components/cards/showCard.vue';
import { useAPI } from '#imports';
import { onMounted, ref, watch } from '#imports';
import { useRoute } from 'vue-router';

const podcasts = ref([]);
const api = useAPI();
const route = useRoute();
const searchQuery = ref<string | null>(null);

const search = async (query: string | null) => {
    try {
        const response = await api.get('/podcasts');
        podcasts.value = response.data.podcasts;

        if (query) {
            podcasts.value = podcasts.value.filter((podcast: any) => {
                return podcast.name.toLowerCase().includes(query.toLowerCase());
            });
            if (podcasts.value.length === 0) {
                document.getElementById('search')!.innerHTML = '<h1 class="text-3xl text-center text-primary">No podcasts found</h1>';
            }
        }
    } catch (error) {
        console.error('Error fetching podcasts:', error);
    }
};

onMounted(() => {
    searchQuery.value = new URLSearchParams(window.location.search).get('search');
    search(searchQuery.value);
});

watch(() => route.query.search, (newSearchQuery) => {
    searchQuery.value = newSearchQuery as string | null;
    search(searchQuery.value);
});
</script>

<template>
    <NavbarComponent/>
    <div :key="searchQuery" class="flex flex-col justify-center space-y-10 p-10 min-h-[50em]" id="search">
        <ShowCard v-for="podcast in podcasts" :key="podcast.id" :id="podcast.id" :name="podcast.name" :description="podcast.description" :date="podcast.date" />
    </div>
    <Footer/>
</template>
import { useAPI } from "~/utils/api.js";

export async function getPodcasts() {
  try {
    const api = useAPI();
    const response = await api.get('/podcasts');
    return await response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getPodcastById(id) {
  try {
    const api = useAPI();
    const response = await api.get(`/podcasts/${id}`);
    return await response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function createPodcast(podcast) {
  try {
    const api = useAPI();
    const response = await api.post('/podcasts', podcast);
    return await response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function updatePodcast(podcast) {
  try {
    const api = useAPI();
    const response = await api.put(`/podcasts/${podcast.id}`, podcast);
    return await response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function deletePodcast(id) {
  try {
    const api = useAPI();
    const response = await api.delete(`/podcasts/${id}`);
    return await response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function createAvis(podcastId, avis) {
  try {
    const api = useAPI();
    const response = await api.post(`/podcasts/${podcastId}/avis`, avis);
    return await response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getAvisByPodcast(podcastId) {
  try {
    const api = useAPI();
    const response = await api.get(`/podcasts/${podcastId}/avis`);
    return await response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getAvisById(id) {
  try {
    const api = useAPI();
    const response = await api.get(`/avis/${id}`);
    return await response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteAvis(id) {
  try {
    const api = useAPI();
    const response = await api.delete(`/avis/${id}`);
    return await response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function updateAvis(avis) {
  try {
    const api = useAPI();
    const response = await api.put(`/avis/${avis.id}`, avis);
    return await response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function subscribeToBroadcaster(userId) {
  try {
    const api = useAPI();
    const response = await api.put(`/users/${userId}/subscribers`);
    return await response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function unsubscribeToBroadcaster(userId) {
  try {
    const api = useAPI();
    const response = await api.delete(`/users/${userId}/subscribers`);
    return await response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function upgradeUserToBroadcaster(userId) {
  try {
    const api = useAPI();
    const response = await api.patch(`/users/${userId}/upgrade`);
    return await response.data;
  } catch (error) {
    console.error(error);
  }
}
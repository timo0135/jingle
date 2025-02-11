import { useAPI } from "~/utils/api.js";

export async function getPlaylists() {
    try {
        const api = useAPI();
        const response = await api.get('/playlists');
        return await response.data;
    } catch (error) {
        console.error(error);
    }
}

export async function getPlaylistById(id) {
    try {
        const api = useAPI();
        const response = await api.get(`/playlists/${id}`);
        return await response.data;
    } catch (error) {
        console.error(error);
    }
}

export async function createPlaylist(userId, playlist) {
    try {
        const api = useAPI();
        const response = await api.post(`/users/${userId}/playlists`, playlist);
        return await response.data;
    } catch (error) {
        console.error(error);
    }
}

export async function deletePlaylist(id) {
    try {
        const api = useAPI();
        const response = await api.delete(`/playlists/${id}`);
        return await response.data;
    } catch (error) {
        console.error(error);
    }
}

export async function addPodcastToPlaylist(playlistId, podcast) {
    try {
        const api = useAPI();
        const response = await api.post(`/playlists/${playlistId}/podcast`, podcast);
        return await response.data;
    } catch (error) {
        console.error(error);
    }
}

export async function updatePlaylist(playlist) {
    try {
        const api = useAPI();
        const response = await api.put(`/playlists/${playlist.id}`, playlist);
        return await response.data;
    } catch (error) {
        console.error(error);
    }
}

export async function removePodcastFromPlaylist(playlistId, podcastId) {
    try {
        const api = useAPI();
        const response = await api.delete(`/playlists/${playlistId}/podcast`, { data: { podcastId } });
        return await response.data;
    } catch (error) {
        console.error(error);
    }
}
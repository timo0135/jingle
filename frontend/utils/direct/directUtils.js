import { useAPI } from "~/utils/api.js";

export async function getDirects() {
    try {
        const api = useAPI();
        const response = await api.get('/directs');
        return await response.data;
    } catch (error) {
        console.error(error);
    }
}

export async function getDirectById(id) {
    try {
        const api = useAPI();
        const response = await api.get(`/directs/${id}`);
        return await response.data;
    } catch (error) {
        console.error(error);
    }
}

export async function createDirect(direct) {
    try {
        const api = useAPI();
        const response = await api.post('/directs', direct);
        return await response.data;
    } catch (error) {
        console.error(error);
    }
}

export async function getDirectsByUser(userId) {
    try {
        const api = useAPI();
        const response = await api.get(`/users/${userId}/directs`);
        return await response.data;
    } catch (error) {
        console.error(error);
    }
}

export async function deleteDirect(id) {
    try {
        const api = useAPI();
        const response = await api.delete(`/directs/${id}`);
        return await response.data;
    } catch (error) {
        console.error(error);
    }
}

export async function updateDirect(direct) {
    try {
        const api = useAPI();
        const response = await api.put(`/directs/${direct.id}`, direct);
        return await response.data;
    } catch (error) {
        console.error(error);
    }
}

export async function inviteGuest(directId, guest) {
    try {
        const api = useAPI();
        const response = await api.put(`/directs/${directId}/guests`, guest);
        return await response.data;
    } catch (error) {
        console.error(error);
    }
}

export async function cancelGuest(directId, guestId) {
    try {
        const api = useAPI();
        const response = await api.delete(`/directs/${directId}/guests`, { data: { guestId } });
        return await response.data;
    } catch (error) {
        console.error(error);
    }
}
import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000';

export const createSubtrip = (tripId: number, dateStr: string) => {
    return axios.post(`${BASE_URL}/api/trips/subtrip/create/`, { tripId, dateStr }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access')}`
        }
    });
};

export const getSubtripDetails = (tripId: number, dateStr: string) => {
    return axios.get(`${BASE_URL}/api/trips/subtrip/detail/${tripId}?date=${dateStr}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access')}`
        }
    });
};

export const deleteSubtrip = (subtripId: number) => {
    return axios.delete(`${BASE_URL}/api/trips/subtrip/delete/${subtripId}/`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access')}`
        }
    });
};

export const deletePlace = (placeId: number) => {
    return axios.delete(`${BASE_URL}/api/trips/subtrip/remove_place/${placeId}/`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access')}`
        }
    });
};

export const deleteNote = (noteId: number) => {
    return axios.delete(`${BASE_URL}/api/trips/subtrip/delete_note/`, {
        data: { noteId },
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access')}`
        }
    });
};
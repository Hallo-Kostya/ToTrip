import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000';

export const createSubtrip = (trip_id: number, date: string, places_ids: []) => {
    return axios.post(`${BASE_URL}/api/trips/subtrip/create/`, { trip_id, date, places_ids }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access')}`
        }
    });
};

export const getSubtripDetails = (trip_id: number, date: string) => {
    return axios.get(`${BASE_URL}/api/trips/subtrip/detail/ /`, { 
      params: { trip_id, date },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access')}`
      }
    });
  };

export const deleteSubtrip = (subtrip_id: number) => {
    return axios.delete(`${BASE_URL}/api/trips/subtrip/delete/${subtrip_id}/`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access')}`
        }
    });
};

export const deletePlace = (place_id: number) => {
    return axios.delete(`${BASE_URL}/api/trips/subtrip/remove_place/${place_id}/`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access')}`
        }
    });
};

export const deleteNote = (note_id: number) => {
    return axios.delete(`${BASE_URL}/api/trips/subtrip/delete_note/`, {
        data: { note_id },
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access')}`
        }
    });
};
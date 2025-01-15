import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000';

export const createSubtrip = (
    trip_id: number,
    date: string,
    places_ids: number[]
  ) => {
    return axios.post(
      `${BASE_URL}/api/trips/subtrip/create/`,
      { trip_id, date, places_ids },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access')}`,
        },
      }
    );
  };

  export const getSubtripDetails = (trip_id: number, date: string) => {
    return axios.get(`${BASE_URL}/api/trips/subtrip/detail/${trip_id}/${date}/`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access')}`,
      },
    });
  };
  
  export const deleteSubtrip = (trip_id: number, date: string) => {
    return axios.delete(
      `${BASE_URL}/api/trips/subtrip/delete/${trip_id}/${date}/`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access')}`,
        },
      }
    );
  };

export const deletePlace = (subtripplace_id: number) => {
    return axios.delete(`${BASE_URL}/api/trips/subtrip/remove_place/${subtripplace_id}/`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access')}`
        }
    });
};

export const deleteNote = (note_id: number) => {
    return axios.delete(`${BASE_URL}/api/trips/subtrip/delete_note/<int:note_id>/`, {
        data: { note_id },
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access')}`
        }
    });
};

export const addPlaceToSubtrip = async (trip_id, date, place_id) => {
  return axios.patch(`${BASE_URL}/api/trips/subtrip/add_place/${trip_id}/${date}/`,
    { trip_id, date, place_id },
    {
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access')}` 
      },
  });
};

export const addNoteToSubtrip = (trip_id: number, date: string, title: string, content: string ) => {
  return axios.post(`${BASE_URL}/api/trips/subtrip/add_note/`, 
    { trip_id, date, title, content }, 
    {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('access')}`,
    },
  });
};
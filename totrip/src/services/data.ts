const API_BASE_URL = "http://127.0.0.1:8000/api";
const BASE_URL = "http://127.0.0.1:8000";

export interface iPlaceImage {
  image: string;
}

interface iPlace {
  id: number;
  name: string;
  address: string;
  category: number;
  description: string;
  avg_rating: number;
  coordinates: string;
  working_hours: string;
  placeimage_set: iPlaceImage[]; // Массив изображений
  search_image: string;
}

export interface iSearchPlaceCard {
  id: number;
  name: string;
  location: string;
  photo: string;
}

export interface iObjectCard {
  placeimage_set: iPlaceImage[];
  name: string;
  address: string;
  rating: number;
  description: string;
  longitude: number;
  latitude: number;
}

interface SearchApiResponse {
  places: iPlace[];
}

export const fetchSearchPlaceCards = async (query: string): Promise<iSearchPlaceCard[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/search/?query=${query}`);
    if (!response.ok) {
      console.error(`Ошибка HTTP: ${response.status}`);
      return [];
    }

    const data: SearchApiResponse = await response.json();

    if (data && Array.isArray(data.places)) {
      return data.places.map((place) => ({
        id: place.id,
        name: place.name,
        location: place.address,
        photo: place.search_image ? `${BASE_URL}${place.search_image}` : '/img/common/noimage.jpg',
      }));
    } else {
      console.log("Нет результатов для запроса");
      return [];
    }
  } catch (error) {
    console.error("Ошибка при запросе данных: ", error);
    return [];
  }
};

export const fetchObjectCard = async (id: number): Promise<iObjectCard | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/places/${id}`);
    if (!response.ok) {
      console.error(`Ошибка HTTP: ${response.status}`);
      return null;
    }

    const data: iObjectCard = await response.json();
    return data;
  } catch (error) {
    console.error("Ошибка при запросе данных: ", error);
    return null;
  }
};

import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api";
const BASE_URL = "http://127.0.0.1:8000";

interface iPlaceImage {
  image: string;
  resized_image: string;
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
} 
export interface iSearchPlaceCard {
  id: number
  name: string;
  location: string;
  photo: string;
}

interface ApiResponse {
  places: iPlace[];
  // cities: Cities[];
  // countries: Countries[];
  // regions: Regions[];
  // districts: Districts[];
}

export const fetchSearchPlaceCards = async (query: string): Promise<iSearchPlaceCard[]> => {
  try {
    const response = await axios.get<ApiResponse>(`${API_BASE_URL}/search/?query=${query}&width=80&heigth=80`);

    if (response.data && Array.isArray(response.data.places)) {
      return response.data.places.map((place) => ({
        id: place.id,
        name: place.name,
        location: place.address,
        photo: `${BASE_URL}${place.placeimage_set?.[0]?.resized_image}` || '/img/common/noimage.jpg',
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

export const fetchPlaces = async (query: string): Promise<iPlace[]> => {
  try {
    const response = await axios.get<ApiResponse>(`${API_BASE_URL}/search/?query=${query}`);

    if (response.data && Array.isArray(response.data.places)) {
      return response.data.places.map((place) => ({
        id: place.id,
        name: place.name,
        address: place.address,
        category: place.category,
        description: place.description,
        avg_rating: place.avg_rating,
        coordinates: place.coordinates,
        working_hours: place.working_hours,
        placeimage_set: place.placeimage_set
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


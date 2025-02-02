const API_BASE_URL = "http://127.0.0.1:8000/api";
export const BASE_URL = "http://127.0.0.1:8000";

export interface iPlaceImage {
  image: string;
}

export interface category {
  id: number;
  name: string;
  icon: string;
}

interface iPlace {
  id: number;
  name: string;
  address: string;
  categories: category[];
  description: string;
  avg_rating: number;
  reviews_count: number;
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

export interface iFullSearchPlaceCard {
  id: number;
  name: string;
  location: string;
  photo: string;
  categories: category[];
  description: string;
  reviews_count: number;
  avg_rating: number;
}

export interface iObjectCard {
  placeimage_set: iPlaceImage[];
  name: string;
  address: string;
  rating: number;
  description: string;
}

interface SearchApiResponse {
  places: iPlace[];
}

export const fetchSearchPlaceCards = async (query: string): Promise<iSearchPlaceCard[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/search/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        query, 
        full_search: "false",
      }),
    });

    if (!response.ok) {
      console.error(`Ошибка HTTP: ${response.status} - ${response.statusText}`);
      return [];
    }

    const data: SearchApiResponse = await response.json();

    if (data?.places?.length) {
      return data.places.map((place) => ({
        id: place.id,
        name: place.name,
        location: place.address ?? "Адрес не указан",
        photo: place.search_image ? `${BASE_URL}${place.search_image}` : '/img/common/noimage.jpg',
      }));
    } else {
      console.log("Результаты поиска отсутствуют.");
      return [];
    }
  } catch (error) {
    console.error("Ошибка при выполнении запроса: ", error);
    return [];
  }
};

export const fetchFullSearchPlaceCards = async (query: string, category: string, sortBy: string, sortThenBy: string, isAsc : string): Promise<iFullSearchPlaceCard[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/search/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        query: query, 
        full_search: "True",
        query_cat: category,
        order_by: sortBy,
        then_by: sortThenBy,
        is_asc: String(isAsc === 'asc')
      }),
    });

    if (!response.ok) {
      // console.error(`Ошибка HTTP: ${response.status} - ${response.statusText}`);
      return [];
    }

    const data: SearchApiResponse = await response.json();

    if (data?.places?.length) {
      return data.places.map((place) => ({
        id: place.id,
        name: place.name ?? "Имя не указано",
        location: place.address ?? "Адрес не указан",
        photo: place.search_image ? `${BASE_URL}${place.search_image}` : '/img/common/noimage.jpg',
        categories: place.categories,
        description: place.description ?? "Нет описания",
        reviews_count: place.reviews_count,
        avg_rating: place.avg_rating
      }));
    } else {
      console.log("Результаты поиска отсутствуют.");
      return [];
    }
  } catch (error) {
    console.error("Ошибка при выполнении запроса: ", error);
    return [];
  }
};

export const fetchObjectCard = async (id: number): Promise<iObjectCard | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/places/${id}`);
    if (!response.ok) {
      // console.error(`Ошибка HTTP: ${response.status}`);
      return null;
    }

    const data: iObjectCard = await response.json();
    return data;
  } catch (error) {
    console.error("Ошибка при запросе данных: ", error);
    return null;
  }
};

export interface iRecommendationPlace {
  id: number;
  name: string;
  city_name: string;
  region_name: string;
  district_name: string;
  address: string;
  search_image: string;
  categories: category[];
  avg_rating: number;
  reviews_count: number;
}

export const fetchRecommendationPlaces = async (): Promise<iRecommendationPlace[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/places/recommendation/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      // console.error(`Ошибка HTTP: ${response.status} - ${response.statusText}`);
      return [];
    }

    const data: iRecommendationPlace[] = await response.json();
    return data;
  } catch (error) {
    console.error("Ошибка при выполнении запроса: ", error);
    return [];
  }
};



'use client';
import SuggestionsSection from '@/components/ui/main-page/suggestions';
import RecommendationsSection from '@/components/ui/main-page/Recomendations/recomendations';
import { SearchContainer } from '@/components/ui/main-page/Search/searchContainer';
import { fetchRecommendationPlaces } from '@/services/data';
import { useEffect, useState } from 'react';
import { BASE_URL } from '@/services/data';

interface Place {
  id: number;
  title: string;
  reviewsCount: string;
  placeImg: string;
  rating: number;
}

const RecommendationsContainer = () => {
  const [placeData, setPlaceData] = useState<Place[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchRecommendationPlaces();
      const transformedData = data.map(place => ({
        id: place.id,
        title: place.name,
        reviewsCount: place.reviews_count.toString(),
        placeImg: place.search_image ? `${BASE_URL}${place.search_image}` : '/img/common/noimage.jpg',
        rating: place.avg_rating
      }));
      setPlaceData(transformedData);
    };

    fetchData();
  }, []);

  return placeData;
};

export default function Home() {
  const placeData = RecommendationsContainer();
  
  return (  
    <main>
        <section className='w-full'>
          <div className='py-[304px] mt-[-100px] max-h-[860px] bg-[url("/img/index/main-photo.jpg")] bg-no-repeat bg-center bg-cover'>
              <h1 className='w-[744px] mx-auto text-[56px] font-bold mb-[64px] text-white text-center'>Начните путешествовать вместе с ToTrip!</h1>
            <SearchContainer />
          </div>
        </section>
        <SuggestionsSection />
        <div className='mb-[100px]'><RecommendationsSection places={placeData}/></div>
    </main>
  );
}

import React from 'react';
import PlaceCard from '@/components/ui/main-page/Recomendations/placeCard';
import { Place } from '@/components/ui/main-page/Recomendations/placeCard';

interface RecommendationsSectionProps {
  places: Place[]
}

export default function RecommendationsSection({ places }: RecommendationsSectionProps) {
  return (
    <section className='max-w-[1920px] mx-auto px-[112px]'>
      <h2 className='mb-[40px] text-[56px] font-bold'>Вам может понравиться</h2>
      <div className="max-w-full mx-auto">
        <ul className="grid list-none grid-cols-4 gap-8">
          {places.map((place, index) => (
          <PlaceCard
            key={index}
            id={place.id}
            title={place.title}
            reviewsCount={place.reviewsCount}
            placeImg={place.placeImg}
            rating={place.rating}
          />
          ))}
        </ul>
      </div>
    </section>
  );
}
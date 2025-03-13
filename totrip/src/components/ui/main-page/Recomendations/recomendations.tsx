import React from 'react';
import PlaceCard from '@/components/ui/main-page/Recomendations/placeCard';
import { Place } from '@/components/ui/main-page/Recomendations/placeCard';

interface RecommendationsSectionProps {
  places: Place[]
}

export default function RecommendationsSection({ places }: RecommendationsSectionProps) {
  return (
    <section className="max-w-[1996px] mx-auto px-[112px]">
      <h2 className="mb-[40px] text-[56px] font-bold w-[1920px] ml-[30px] z-0">Вам может понравиться</h2>
      <div className="relative overflow-x-auto">
        <ul className="grid list-none grid-cols-12 gap-[16px] min-w-max">
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

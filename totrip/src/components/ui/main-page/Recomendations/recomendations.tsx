import React from 'react';
import PlaceCard from '@/components/ui/main-page/Recomendations/placeCard';
import { Place } from '@/components/ui/main-page/Recomendations/placeCard';
import Image from 'next/image';

interface RecommendationsSectionProps {
  places: Place[]
}

export default function RecommendationsSection({ places }: RecommendationsSectionProps) {
  return (
    <section className="max-w-[1996px] mx-auto px-[112px]">
      <h2 className="mb-[40px] text-[56px] font-bold w-[1920px] ml-[30px] z-0">Вам может понравиться</h2>
      <div className="relative flex">

        <button className="shrink-0 mr-[-30px] z-10">
          <Image
            className="rotate-180"
            src="/img/common/arrow-right.svg"
            width={60}
            height={60}
            alt="стрелочка"
          />
        </button>

        <ul className="grid list-none grid-cols-4 gap-8 flex-grow">
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

        <button className="shrink-0 ml-[-34px] z-10">
          <Image
            className=""
            src="/img/common/arrow-right.svg"
            width={60}
            height={60}
            alt="стрелочка"
          />
        </button>
      </div>
    </section>
  );
}

import React from 'react';
import PlaceCard from '@/components/ui/main-page/Recomendations/placeCard';

export default function RecommendationsSection() {
  return (
    <section className='max-w-[1920px] mx-auto px-[112px] mt-[70px] mb-[100px]'>
      <h2 className='mb-[40px] text-[56px] font-bold'>Вам может понравиться</h2>
      <div className="max-w-full mx-auto">
        <ul className="grid list-none grid-cols-4 gap-8">
          <PlaceCard title="Lotte Hotel" reviewsCount="1.2K" ratingImg="img/common/rating-star.svg" />
          <PlaceCard title="Lotte Hotel" reviewsCount="1.2K" ratingImg="img/common/rating-star.svg" />
          <PlaceCard title="Lotte Hotel" reviewsCount="1.2K" ratingImg="img/common/rating-star.svg" />
          <PlaceCard title="Lotte Hotel" reviewsCount="1.2K" ratingImg="img/common/rating-star.svg" />
        </ul>
      </div>
    </section>
  );
}
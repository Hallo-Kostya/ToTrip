import React from 'react';
import PlaceCard from '@/components/ui/main-page/placeCard';
import styles from '@/components/css/recomendations.module.css'

export default function RecommendationsSection() {
  return (
    <section className={styles['recommendations']}>
      <h2>Вам может понравиться</h2>
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
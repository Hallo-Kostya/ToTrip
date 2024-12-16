'use client';

import React from 'react';
import TripCard from '@/components/ui/trips/tripCard';
import { useTrip } from '@/app/tripContext';
import TripHeadlines from '@/components/ui/trip/tripHeadlines';

const TripPage: React.FC = () => {
  const { tripName, tripPlace, tripStart, tripEnd } = useTrip();

  return (
    <div className="my-[100px] max-w-full">
      <div className="flex flex-col items-start max-w-[1696px] mx-auto">
        <TripCard
          tripName={tripName}
          tripStart={tripStart}
          tripEnd={tripEnd}
          tripPlace={tripPlace}
          users={1}
          tripImage={'./img/trips-page/exp_photo.png'}
        />
        <p className="mt-[40px] opacity-60 text-[20px]">Описание поездки</p>
      </div>
      <div className="flex flex-col items-start max-w-[1696px] mx-auto mt-[40px]">
        <TripHeadlines tripStart={tripStart} tripEnd={tripEnd} />
      </div>
    </div>
  );
};

export default TripPage;
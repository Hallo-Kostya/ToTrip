'use client'

import React /*, { useState }*/ from 'react';
// import TripCard from '@/components/ui/trips/tripCard';
// import Image from 'next/image';
// import { TripData } from '@/components/ui/types';
// import { useTrip, TripProvider } from '@/app/tripContext';
import TripHeadlines from '@/components/ui/trip/tripHeadlines';


interface TripPageProps {
    tripData?: () => void;
}

const TripPage: React.FC<TripPageProps> = ({ /* tripData */ }) => {
    // const { setTripContext } = useTrip();

    
    return (
        <div className="my-[100px] max-w-full">
            <div className="flex flex-col items-start max-w-[1696px] mx-auto">
                {/* <TripCard
                    key={index}
                    tripName={trip.tripName}
                    tripStart={trip.tripStart}
                    tripEnd={trip.tripEnd}
                    tripPlace={trip.tripPlace}
                    users={3}
                    tripImage={'./img/trips-page/exp_photo.png'}
                /> */}
                <p className="">Описание поездки</p>
            </div>
            <div className="flex flex-col items-start max-w-[1696px] mx-auto">
                <TripHeadlines />
            </div>
            
        </div>
    );
};

export default TripPage;
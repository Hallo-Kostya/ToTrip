'use client'

import React from 'react';
import TripCard from '@/components/ui/trips/tripCard';
import { useTrip } from '@/app/tripContext';
import TripHeadlines from '@/components/ui/trip/tripHeadlines';

const TripPage: React.FC = () => {
    const { trip, setTripContext } = useTrip();
 
    const {
        tripImage = './img/trips-page/exp_photo.png',
        tripName = 'Без названия',
        tripPlace = 'Неизвестное место',
        tripStart = new Date(),
        tripEnd = new Date(),
        users = 0,
        id = '',
    } = setTripContext(trip);

    const formattedTripStart = (tripStart instanceof Date ? tripStart.toLocaleDateString() : tripStart);
    const formattedTripEnd = (tripEnd instanceof Date ? tripEnd.toLocaleDateString() : tripEnd);

    return (
        <div className="my-[100px] max-w-full">
            <div className="flex flex-col max-w-[1696px] mx-auto">
                <TripCard
                    tripImage={tripImage}
                    tripName={tripName}
                    tripPlace={tripPlace}
                    tripStart={formattedTripStart}
                    tripEnd={formattedTripEnd}
                    users={users}
                />
                <p className="mt-[40px] opacity-60 text-[20px] mb-[80px]">Описание поездки</p>
                <TripHeadlines tripStart={tripStart} tripEnd={tripEnd} tripId={id} />
            </div>
        </div>
    );
};

export default TripPage;
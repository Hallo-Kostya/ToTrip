'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import TripCard from '@/components/ui/trips/tripCard';
import { useUser } from '@/app/userContext';
import TripHeadlines from '@/components/ui/trip/tripHeadlines';

const BASE_URL = 'http://127.0.0.1:8000';

const TripPage = () => {
    const { tripId } = useParams();
    const [trip, setTrip] = useState(null);

    useEffect(() => {
        if (true) {
            fetch(`${BASE_URL}/api/trips/detail/${tripId}/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access')}`
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Ошибка сети');
                }
                return response.json();
            })
            .then(data => {
                const tripData = data.trip; // предположим, что на сервере пересылка данных в свойстве trip
                setTrip({
                    id: tripData.id,
                    tripImage: tripData.temp_image || '',
                    title: tripData.title,
                    description: tripData.description,
                    startDate: new Date(tripData.start_Date),
                    endDate: new Date(tripData.end_Date),
                    trippers: tripData.trippers.length,
                    cities: tripData.cities.join(', ')
                });
            })
            .catch(error => {
                console.error(`Ошибка сети или ответа сервера: ${error.message}`);
            });
        }
    }, [tripId]);

    if (!trip) {
        return <div>Загрузка данных...</div>;
    }

    return (
        <div className="my-[100px] max-w-full">
            <div className="flex flex-col max-w-[1696px] mx-auto">
                <TripCard
                    tripImage={trip.tripImage}
                    title={trip.title}
                    description={trip.description}
                    cities={trip.cities}
                    start_Date={trip.startDate}
                    end_Date={trip.endDate}
                    trippers={trip.trippers}
                />
                <p className="mt-[40px] opacity-60 text-[20px] mb-[80px]">Описание поездки</p>
                <TripHeadlines tripStart={trip.startDate} tripEnd={trip.endDate} tripId={trip.id} />
            </div>
        </div>
    );
};

export default TripPage;
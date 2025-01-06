'use client'

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import TripCard from '@/components/ui/trips/tripCard';
import { TripData } from '@/components/ui/types';
import TripHeadlines from '@/components/ui/trip/tripHeadlines';
import { useUser } from '@/app/userContext';

const BASE_URL = 'http://127.0.0.1:8000';

const TripPage = () => {
    const { id } = useParams();
    const [trip, setTrip] = useState<TripData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { user_id } = useUser();

    useEffect(() => {
        const fetchTrip = async () => {
            try {
                if (user_id && id) {
                    const response = await fetch(`${BASE_URL}/api/trips/detail/${id}/`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('access')}`
                        }
                    });

                    if (response.ok) {
                        const data = await response.json();
                        const formattedTrip: TripData = {
                            id: data.trip.id,
                            tripImage: data.trip.tripImage || '',
                            title: data.trip.title,
                            description: data.trip.description,
                            tripPlace: data.trip.cities.map((city: any) => city.name).join(', ') || '',
                            startDate: new Date(data.trip.start_Date),
                            endDate: new Date(data.trip.end_Date),
                            trippers: data.trip.trippers.length,
                            cities: data.trip.cities.map((city: any) => city.name) || []
                        };
                        setTrip(formattedTrip);
                        setLoading(false);
                    } else {
                        setError(`Ошибка ответа сервера: ${response.status}`);
                        setLoading(false);
                    }
                }
            } catch (error) {
                setError(`Ошибка сети: ${error}`);
                setLoading(false);
            }
        };

        fetchTrip();
    }, [id, user_id]);

    // if (loading) {
    //     return <div>Загрузка...</div>;
    // }

    // if (error) {
    //     return <div>{error}</div>;
    // }


    return (
        <div className="my-[100px] max-w-full">
            <div className="flex flex-col max-w-[1696px] mx-auto">
                {trip && (
                    <>
                        <TripCard {...trip} />
                        <p className="mt-[40px] opacity-60 text-[20px] mb-[80px]">Описание поездки</p>
                        <TripHeadlines tripStart={trip.startDate} tripEnd={trip.endDate} tripId={trip.id} />
                    </>
                )}
            </div>
        </div>
    );
};

export default TripPage;
'use client'

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import TripCard from '@/components/ui/trips/tripCard';
import { TripData } from '@/components/ui/types';
import TripHeadlines from '@/components/ui/trip/tripHeadlines';
import { useUser } from '@/app/userContext';

const BASE_URL = 'http://127.0.0.1:8000';

const TripPage = () => {
    const { id } = useParams();  // Используем useParams для получения динамических параметров
    const [trip, setTrip] = useState<TripData | null>(null);
    const { user_id } = useUser();

    useEffect(() => {
        const fetchTrip = async () => {
            try {
                if (user_id && id) {
                    const response = await fetch(`${BASE_URL}/api/trips/list/${user_id}/${id}/`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('access')}`
                        }
                    });

                    if (response.ok) {
                        const data = await response.json();
                        const formattedTrip: TripData = {
                            id: data.id,
                            tripImage: data.tripImage || '',
                            title: data.title,
                            description: data.description,
                            tripPlace: data.cities.map((city: any) => city.name).join(', ') || '',
                            startDate: new Date(data.start_Date),
                            endDate: new Date(data.end_Date),
                            trippers: data.trippers.length,
                            cities: data.cities.map((city: any) => city.name) || []
                        };
                        setTrip(formattedTrip);
                    } else {
                        console.error('Ошибка ответа сервера', response.status);
                    }
                }
            } catch (error) {
                console.error('Ошибка сети:', error);
            }
        };

        fetchTrip();
    }, [id, user_id]);

    if (!trip) return <div>Загрузка...</div>;

    return (
        <div className="my-[100px] max-w-full">
            <div className="flex flex-col max-w-[1696px] mx-auto">
                <TripCard {...trip} />
                <p className="mt-[40px] opacity-60 text-[20px] mb-[80px]">Описание поездки</p>
                <TripHeadlines tripStart={trip.startDate} tripEnd={trip.endDate} tripId={trip.id} />
            </div>
        </div>
    );
};

export default TripPage;
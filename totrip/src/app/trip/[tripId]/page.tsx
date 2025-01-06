'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import TripCard from '@/components/ui/trips/tripCard';
// import { useUser } from '@/app/userContext';
import TripHeadlines from '@/components/ui/trip/tripHeadlines';

const BASE_URL = 'http://127.0.0.1:8000';

const TripPage = () => {
    const { id } = useParams();
    const [trip, setTrip] = useState({
        id: 0,
        tripImage: '',
        title: '',
        description: '',
        startDate: new Date(),
        endDate: new Date(),
        trippers: 0,
        cities: ''
    });
    
    // const { user_id } = useUser();s

    useEffect(() => {
        if (id) {
            axios.get(`${BASE_URL}/api/trips/detail/${id}/`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access')}`
                }
            })
            .then(response => {
                const data = response.data.trip.id;
                setTrip({
                    id: Number(data.id),
                    tripImage: data.temp_image || '',
                    title: data.title,
                    description: data.description,
                    startDate: new Date(data.start_Date),
                    endDate: new Date(data.end_Date),
                    trippers: data.trippers.length,
                    cities: data.cities.join(', ')
                });
            })
            .catch(error => {
                console.error(`Ошибка сети или ответа сервера: ${error.message}`);
            });
        }
    }, [id]);

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
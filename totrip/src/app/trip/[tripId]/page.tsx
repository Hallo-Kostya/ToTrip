'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import TripCard from '@/components/ui/trips/tripCard';
import TripHeadlines from '@/components/ui/trip/tripHeadlines';
import { useUser } from '@/app/userContext';

const BASE_URL = 'http://127.0.0.1:8000';

const TripPage = () => {
    const { photo } = useUser();
    const { tripId } = useParams();
    const router = useRouter();
    const [trip, setTrip] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (tripId) {
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
                const tripData = data.trip;
                setTrip({
                    id: tripData.id,
                    tripImage: tripData.temp_image,
                    title: tripData.title,
                    description: tripData.description,
                    startDate: new Date(tripData.start_Date),
                    endDate: new Date(tripData.end_Date),
                    trippers: tripData.trippers.length,
                    cities: tripData.cities.map(city => city.name).join(', '),
                    tripPlace: tripData.tripPlace,
                });
            })
            .catch(error => {
                console.error(`Ошибка сети или ответа сервера: ${error.message}`);
            });
        }
    }, [tripId]);

    const handleDelete = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/trips/delete/${tripId}/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access')}`
                }
            });

            if (response.status === 200) {
                console.log('Поездка успешно удалена');
                setShowModal(false);
                router.push('/trips');
            } else {
                console.error('Ошибка при удалении поездки: статус', response.status);
            }
        } catch (error) {
            console.error('Ошибка при удалении поездки', error);
        }
    };

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
                    tripPlace={trip.tripPlace}
                />
                <div>
                    <p className="mt-[40px] opacity-60 text-[20px]">{trip.description}</p>
                    <button className=" mb-[80px]" onClick={() => setShowModal(true)}>Удалить поездку</button>
                    {showModal && (
                        <div className="modal">
                            <div className="modal-content">
                                <p>Вы уверены, что хотите удалить поездку?</p>
                                <button onClick={handleDelete}>Удалить</button>
                                <button onClick={() => setShowModal(false)}>Отменить</button>
                            </div>
                        </div>
                    )}
                </div>
                <TripHeadlines tripStart={trip.startDate} tripEnd={trip.endDate} tripId={trip.id} />
            </div>
        </div>
    );
};

export default TripPage;
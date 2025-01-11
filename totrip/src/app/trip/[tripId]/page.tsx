'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import TripCard from '@/components/ui/trips/tripCard';
import TripHeadlines from '@/components/ui/trip/tripHeadlines';

const BASE_URL = 'http://127.0.0.1:8000';

const TripPage = () => {
    const { tripId } = useParams();
    const router = useRouter();
    const [trip, setTrip] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [activeTab, setActiveTab] = useState('route');

    useEffect(() => {
        if (tripId) {
          fetch(`${BASE_URL}/api/trips/detail/${tripId}/`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('access')}`,
            },
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error('Ошибка сети');
              }
              return response.json();
            })
            .then((data) => {
              const tripData = data.trip;
              if (tripData) {
                setTrip({
                  id: tripData.id,
                  tripImage: tripData.temp_image,
                  title: tripData.title,
                  description: tripData.description,
                  startDate: new Date(tripData.start_Date),
                  endDate: new Date(tripData.end_Date),
                  trippers: tripData.trippers.length,
                  cities: tripData.cities,
                });
              } else {
                console.error('Ответ от сервера пуст');
              }
            })
            .catch((error) =>
              console.error(`Ошибка сети или ответа сервера: ${error.message}`),
            );
        }
      }, [tripId]);

    const handleTabChange = (tabName) => {
        setActiveTab(tabName);
        router.push(`/trip/${tripId}?tab=${tabName}`);
    };

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
        return <div>Загрузка...</div>;
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
                <div className="flex mt-[40px] mb-[80px] justify-between">
                    <p className="opacity-60 text-[20px]">{trip.description}</p>
                    <button className="text-red-500 border-b-[1.5px] border-red-500" onClick={() => setShowModal(true)}>Удалить поездку</button>
                    {showModal && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white p-4 rounded shadow-lg max-w-sm w-full">
                            <p className="mb-4">Вы уверены, что хотите удалить поездку?</p>
                            <div className="flex justify-end gap-2">
                                <button
                                className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition"
                                onClick={handleDelete}
                                >
                                Удалить
                                </button>
                                <button
                                className="bg-gray-300 py-1 px-3 rounded hover:bg-gray-400 transition"
                                onClick={() => setShowModal(false)}
                                >
                                Отменить
                                </button>
                            </div>
                            </div>
                        </div>
                        )}
                    </div>
                    <div className="flex justify-start">
                        <button
                            className={`text-[24px] font-[500] pb-3 px-3 ${activeTab === 'route' ? 'border-b-4 border-black' : ''}`}
                            onClick={() => handleTabChange('route')}
                        >
                            Маршрут
                        </button>
                        <button
                            className={`text-[24px] font-[500] pb-3 px-3 ${activeTab === 'notes' ? 'border-b-4 border-black' : ''}`}
                            onClick={() => handleTabChange('notes')}
                        >
                            Закладки
                        </button>
                        <button
                            className={`text-[24px] font-[500] pb-3 px-3 ${activeTab === 'foryou' ? 'border-b-4 border-black' : ''}`}
                            onClick={() => handleTabChange('foryou')}
                        >
                            Для вас
                        </button>
                    </div>
                    
                {activeTab === 'route' && (
                    <TripHeadlines tripStart={trip.startDate} tripEnd={trip.endDate} tripId={trip.id} />
                )}
                {/* Здесь можно добавить дополнительные условия для рендера контента для заметок и "для вас" */}
            </div>
        </div>
    );
};

export default TripPage;
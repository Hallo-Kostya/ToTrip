'use client'

import React, { useState, useEffect } from 'react';
import TripCard from '@/components/ui/trips/tripCard';
import Image from 'next/image';
import TripForm from '@/components/ui/trips/newTripForm';
import { TripData } from '@/components/ui/types';
import Link from 'next/link';
import { useUser } from '../userContext';

const BASE_URL = 'http://127.0.0.1:8000';

const TripsPage = () => {
    const { user_id } = useUser();
    const [futureTrips, setFutureTrips] = useState<TripData[]>([]);
    const [isPopupOpen, setPopupOpen] = useState(false);

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/trips/list/${user_id}/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('access')}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setFutureTrips(data.trips);
                }
            } catch (error) {
                console.error('Ошибка сети:', error);
            }
        };
    
        fetchTrips();
    }, [user_id]);

    const handleOpenPopup = () => {
        setPopupOpen(true);
    };

    const handleClosePopup = () => {
        setPopupOpen(false);
    };

    const handleSubmit = (trip: TripData) => {
        setFutureTrips([...futureTrips, trip]);
        handleClosePopup();
    };

    return (
        <TripsContent
            futureTrips={futureTrips}
            isPopupOpen={isPopupOpen}
            handleOpenPopup={handleOpenPopup}
            handleClosePopup={handleClosePopup}
            handleSubmit={handleSubmit}
        />
    );
};

const TripsContent = ({ futureTrips, isPopupOpen, handleOpenPopup, handleClosePopup, handleSubmit }) => {
    const [isPastOpen, setPastOpen] = useState(true);
    const [isFutureOpen, setFutureOpen] = useState(true);
    const [isCurrentOpen, setCurrentOpen] = useState(true);

    const { user_id } = useUser();

    const handleTogglePast = () => setPastOpen(!isPastOpen);
    const handleToggleFuture = () => setFutureOpen(!isFutureOpen);
    const handleToggleCurrent = () => setCurrentOpen(!isCurrentOpen);

    const renderTripsContainer = (title, isOpen, toggleFunc, children) => (
        <div className="mt-[109px] flex flex-col mx-auto max-w-[1696px]">
            <div className="flex justify-between items-center">
                <h2 className="text-[48px] font-bold">{title}</h2>
                <button onClick={toggleFunc} className={`transform transition-transform duration-300 ${isOpen ? '' : 'rotate-180'}`}>
                    <Image src="/img/common/unwrap__button.svg" alt="toggle content" width={60} height={60} />
                </button>
            </div>
            <div className={`trips-container ${isOpen ? '' : 'hidden'}`}>
                {children}
            </div>
        </div>
    );

    return (
        <div className='my-trips max-w-full mb-[100px]'>
            <div className="my-trips__header flex justify-between items-center max-w-[1696px] mx-auto mt-[101px]">
                <h1 className="text-[56px] font-bold">Мои поездки</h1>
                <button type="button" className="rounded-[24px] bg-btn p-[20px]" onClick={handleOpenPopup}>
                    <span className="text-[24px] font-bold">Запланировать новую поездку</span>
                </button>
            </div>
            {renderTripsContainer("Прошедшие", isPastOpen, handleTogglePast, (
                /* Здесь отображать прошедшие поездки, если есть */
                <div></div>
            ))}
            {renderTripsContainer("Предстоящие", isFutureOpen, handleToggleFuture, (
                futureTrips.map((trip) => (
                    <div className="flex flex-col max-w-[1696px] mx-auto" key={trip.id}>
                        <Link href={`/trip/${trip.id}`}>
                            <TripCard key={trip.id} {...trip} />
                        </Link>
                    </div>
                ))
            ))}
            {renderTripsContainer("Текущие", isCurrentOpen, handleToggleCurrent, (
                /* Здесь отображать текущие поездки, если есть */
                <div></div>
            ))}

            <TripForm
                isOpen={isPopupOpen}
                onClose={handleClosePopup}
                onSubmit={handleSubmit}
                initialData={{
                    tripImage: '',
                    title: '',
                    description: '',
                    startDate: new Date(),
                    endDate: new Date(),
                    trippers: {user_id},
                    cities: [],
                    tripPlace: '',
                }}
                days={0}
            />
        </div>
    );
};

export default TripsPage;


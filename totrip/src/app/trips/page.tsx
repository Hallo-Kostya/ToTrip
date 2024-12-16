'use client';

import React, { useState } from 'react';
import TripCard from '@/components/ui/trips/tripCard';
import Image from 'next/image';
import TripForm from '@/components/ui/trips/newTripForm';
import { TripData } from '@/components/ui/types';
import { useTrip, TripProvider } from '@/app/tripContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';

const TripsPage = () => {
    const [futureTrips, setFutureTrips] = useState<TripData[]>([]);
    const [isPopupOpen, setPopupOpen] = useState(false);
  
    const handleOpenPopup = () => {
      setPopupOpen(true);
    };
  
    const handleClosePopup = () => {
      setPopupOpen(false);
    };
  
    const handleSubmit = (data: TripData) => {
      const newTrip = {...data, id: uuidv4()};
      setFutureTrips([...futureTrips, newTrip]);
      handleClosePopup();
    };

    return (
        <TripProvider>
          <TripsContent
            futureTrips={futureTrips}
            isPopupOpen={isPopupOpen}
            handleOpenPopup={handleOpenPopup}
            handleClosePopup={handleClosePopup}
            handleSubmit={handleSubmit}
          />
        </TripProvider>
      );
};

const TripsContent = ({ futureTrips, isPopupOpen, handleOpenPopup, handleClosePopup, handleSubmit }) => {
    const { setTripContext } = useTrip();
    const router = useRouter();

    const handleTripClick = (tripId: string) => {
        const trip = futureTrips.find(trip => trip.id === tripId);
        if (trip) {
        setTripContext(trip);
        router.push(`/trip/${tripId}`);
        }
    };

    return (
        <div className='my-trips max-w-full mb-[100px]'>
            <div className="my-trips__header flex justify-between items-center max-w-[1696px] mx-auto mt-[101px]">
                <h1 className="text-[56px] font-bold">Мои поездки</h1>
                <button type="button" className="rounded-[24px] bg-btn p-[20px]" onClick={handleOpenPopup}>
                    <span className="text-[24px] font-bold">Запланировать новую поездку</span>
                </button>
            </div>
            <div className="mt-[109px] flex flex-col mx-auto max-w-[1696px]">
                <div className="flex justify-between items-center">
                    <h2 className="text-[48px] font-bold">Прошедшие</h2>
                    <button>
                        <Image src="img/common/unwrap__button.svg" alt="toggle content" width={60} height={60} />
                    </button>
                </div>
                <div className="trips-container past">
                    {/* Здесь отображать прошедшие поездки, если есть */}
                </div>
            </div>
            <div className="mt-[109px] flex flex-col mx-auto max-w-[1696px]">
                <div className="flex justify-between items-center">
                    <h2 className="text-[48px] font-bold">Предстоящие</h2>
                    <button>
                        <Image src="/img/common/unwrap__button.svg" alt="toggle content" width={60} height={60} />
                    </button>
                </div>
                <div className="trips-container future">
                    {futureTrips.map((trip, index) => (
                    <div key={trip.id} onClick={() => handleTripClick(trip.id)}>
                        <Link href={`/trip/${trip.id}`}>
                        <TripCard
                            tripName={trip.tripName}
                            tripStart={trip.tripStart}
                            tripEnd={trip.tripEnd}
                            tripPlace={trip.tripPlace}
                            users={1}
                            tripImage={'./img/trips-page/exp_photo.png'}
                        />
                        </Link>
                    </div>
                    ))}
                </div>
            </div>
            <div className="mt-[109px] flex flex-col mx-auto max-w-[1696px]">
                <div className="flex justify-between items-center">
                    <h2 className="text-[48px] font-bold">Текущие</h2>
                    <button>
                        <Image src="img/common/unwrap__button.svg" alt="toggle content" width={60} height={60} />
                    </button>
                </div>
                <div className="trips-container current">
                    {/* Здесь отображать прошедшие поездки, если есть */}
                </div>
            </div>

            <TripForm
                isOpen={isPopupOpen}
                onClose={handleClosePopup}
                onSubmit={handleSubmit}
                initialData={{
                tripName: '',
                tripPlace: '',
                tripStart: new Date(),
                tripEnd: new Date(),
                }}
                days={0}
            />
        </div>
    );
};

export default TripsPage;
'use client'

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { TripData } from '@/components/ui/types';

interface TripFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: TripData) => void;
    initialData?: TripData;
    days: number;
}

const TripForm: React.FC<TripFormProps> = ({
    isOpen,
    onClose,
    onSubmit,
    initialData,
    days
}) => {
    const [tripName, setTripName] = useState(initialData?.tripName || '');
    const [tripPlace, setTripPlace] = useState(initialData?.tripPlace || '');
    const [tripStart, setTripStart] = useState(initialData?.tripStart || '');
    const [tripEnd, setTripEnd] = useState(initialData?.tripEnd || '');

    useEffect(() => {
        if (isOpen) {
            const handleKeyDown = (e: KeyboardEvent) => {
                if (e.key === "Escape") {
                    onClose();
                }
            };
            window.addEventListener('keydown', handleKeyDown);
            return () => window.removeEventListener('keydown', handleKeyDown);
        }
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const tripData = {
            tripName,
            tripPlace,
            tripStart,
            tripEnd,
        };

        onSubmit(tripData);
        onClose();
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-75">
            <div className="max-w-[800px] bg-white p-[48px] rounded-[50px] max-w-md w-full">
                <form onSubmit={handleSubmit}>
                    <h2 className="text-[36px] font-bold">Название поездки</h2>
                    <input
                        type="text"
                        value={tripName}
                        onChange={(e) => setTripName(e.target.value)}
                        name="tripname"
                        placeholder="К примеру, командировка в Москве"
                        required
                        className="w-full mt-[20px] p-[13px] border border-gray-300 rounded-[16px]"
                    />
                    <h2 className="mt-[20px] text-[36px] font-bold">Направление</h2>
                    <input
                        type="text"
                        value={tripPlace}
                        onChange={(e) => setTripPlace(e.target.value)}
                        name="tripplace"
                        placeholder="Куда вы хотите отправиться?"
                        required
                        className="w-full mt-[20px] p-[13px] border border-gray-300 rounded-[16px]"
                    />
                    <div className="mt-[20px] flex justify-between">
                        <h2 className="text-[36px] font-bold">Длительность поездки</h2>
                        <div className="flex items-center space-x-2">
                            <button type="button">
                                <Image src="/img/circle-minus.svg" width={30} height={30} alt="Уменьшить" />
                            </button>
                            <p className="text-[30px] font-bold">{days} дней</p>
                            <button type="button">
                                <Image src="/img/circle-plus.svg" width={30} height={30} alt="Увеличить" />
                            </button>
                        </div>
                    </div>
                    <div className="flex gap-[30px] mt-[20px]">
                        <input
                            type="text"
                            value={tripStart}
                            onChange={(e) => setTripStart(e.target.value)}
                            name="tripstart"
                            placeholder="Начало"
                            required
                            className="w-full mb-4 p-[13px] border border-gray-300 rounded-[15px]"
                        />
                        <input
                            type="text"
                            value={tripEnd}
                            onChange={(e) => setTripEnd(e.target.value)}
                            name="tripend"
                            placeholder="Конец"
                            required
                            className="w-full mb-4 p-[13px] border border-gray-300 rounded-[15px]"
                        />
                    </div>
                    <div className="flex justify-between gap-4 mt-[30px]">
                        <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded-[11px]">Отменить</button>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-[11px]">Создать поездку</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TripForm;
'use client'

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { TripData } from '@/components/ui/types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

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
    days: initialDays
}) => {
    const [tripName, setTripName] = useState(initialData?.tripName || '');
    const [tripPlace, setTripPlace] = useState(initialData?.tripPlace || '');
    const [tripStart, setTripStart] = useState<Date | null>(initialData?.tripStart ? new Date(initialData.tripStart) : null);
    const [tripEnd, setTripEnd] = useState<Date | null>(initialData?.tripEnd ? new Date(initialData.tripEnd) : null);
    const [days, setDays] = useState(initialDays);

    useEffect(() => {
        if (isOpen) {
            const handleKeyDown = (e: KeyboardEvent) => {
                if (e.key === "Escape") {
                    handleClose();
                }
            };
            window.addEventListener('keydown', handleKeyDown);
            return () => window.removeEventListener('keydown', handleKeyDown);
        }
    }, [isOpen]);

    const handleClose = () => {
        setTripName('');
        setTripPlace('');
        setTripStart(null);
        setTripEnd(null);
        setDays(initialDays);
        onClose();
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (tripStart && tripEnd && tripEnd < tripStart) {
            alert('Дата окончания поездки не может быть раньше даты начала.');
            return;
        }

        const tripData = {
            tripName,
            tripPlace,
            tripStart: tripStart ? format(tripStart, 'dd MMM', { locale: ru }) : '',
            tripEnd: tripEnd ? format(tripEnd, 'dd MMM', { locale: ru }) : '',
        };

        onSubmit(tripData);
        handleClose();
    };
    
    const updateTripEnd = (startDate: Date | null, daysCount: number) => {
        if (startDate) {
            const newEndDate = new Date(startDate);
            newEndDate.setDate(newEndDate.getDate() + daysCount);
            setTripEnd(newEndDate);
        }
    };

    const handleDaysChange = (newDays: number) => {
        if (newDays < 0) newDays = 0;
        setDays(newDays);
        updateTripEnd(tripStart, newDays);
    };

    const daysText = (days: number) => {
        const modulo10 = days % 10;
        const modulo100 = days % 100;
        if (modulo10 === 1 && modulo100 !== 11) return `${days} день`;
        if ([2, 3, 4].includes(modulo10) && ![12, 13, 14].includes(modulo100)) return `${days} дня`;
        return `${days} дней`;
    };

    useEffect(() => {
        if (tripStart && tripEnd) {
            const timeDiff = tripEnd.getTime() - tripStart.getTime();
            const dayDifference = Math.ceil(timeDiff / (1000 * 3600 * 24));
            setDays(dayDifference);
        }
    }, [tripEnd, tripStart]);

    return !isOpen ? null : (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-75">
            <div className="max-w-[800px] bg-white p-[48px] rounded-[50px] w-full">
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
                        <div className="flex items-center">
                            <button type="button" onClick={() => handleDaysChange(days - 1)}>
                                <Image src="/img/circle-minus.svg" width={30} height={30} alt="Уменьшить" />
                            </button>
                            <p className="text-[30px] font-bold ml-2 mr-2">{daysText(days)}</p>
                            <button type="button" onClick={() => handleDaysChange(days + 1)}>
                                <Image src="/img/circle-plus.svg" width={30} height={30} alt="Увеличить" />
                            </button>
                        </div>
                    </div>
                    <div className="flex gap-[30px] mt-[20px]">
                        <DatePicker
                            selected={tripStart}
                            onChange={(date: Date) => {
                                setTripStart(date);
                                updateTripEnd(date, days);
                            }}
                            dateFormat="dd MMM"
                            locale={ru}
                            placeholderText="Начало"
                            className="w-full  p-[13px] border border-gray-300 rounded-[15px]"
                        />
                        <p className="my-auto text-[25px]">-</p>
                        <DatePicker
                            selected={tripEnd}
                            onChange={(date: Date) => setTripEnd(date)}
                            dateFormat="dd MMM"
                            locale={ru}
                            placeholderText="Конец"
                            className="w-full  p-[13px] border border-gray-300 rounded-[15px]"
                        />
                    </div>
                    <div className="flex justify-between gap-4 mt-[30px]">
                        <button type="button" onClick={handleClose} className="bg-gray-500 text-white px-4 py-2 rounded-[11px]">Отменить</button>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-[11px]">Создать поездку</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TripForm;
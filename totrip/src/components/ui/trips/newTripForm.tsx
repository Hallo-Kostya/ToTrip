'use client'

import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { TripData } from '@/components/ui/types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { useUser } from '@/app/userContext';

const BASE_URL = 'http://127.0.0.1:8000';

interface TripFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: TripData) => void;
    initialData?: Partial<TripData>;
    days: number;
}

const popularCities = [
    "Москва", "Санкт-Петербург", "Новосибирск", // и т.д.
];

const TripForm: React.FC<TripFormProps> = ({
    isOpen, onClose, onSubmit, initialData = {}, days: initialDays
}) => {
    const [tripImage, setTripImage] = useState(initialData.tripImage || '');
    const [title, setTitle] = useState(initialData.title || '');
    const [tripPlace, setTripPlace] = useState(initialData.tripPlace || '');
    const [description, setDescription] = useState(initialData.description || '');
    const [cities, setCities] = useState<string[]>(initialData.cities || []);
    const [startDate, setStartDate] = useState<Date | null>(initialData.startDate ? new Date(initialData.startDate) : null);
    const [endDate, setEndDate] = useState<Date | null>(initialData.endDate ? new Date(initialData.endDate) : null);
    const [trippers, setTrippers] = useState(initialData.trippers || 0);
    const [days, setDays] = useState(initialDays);
    const [errors, setErrors] = useState<{ title?: string }>({});

    const { user_id } = useUser();

    const handleClose = useCallback(() => {
        setTripImage('');
        setTitle('');
        setTripPlace('');
        setDescription('');
        // setCities([]);
        setStartDate(null);
        setEndDate(null);
        setTrippers(0);
        setDays(initialDays);
        onClose();
    }, [initialDays, onClose]);

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
    }, [handleClose, isOpen]);

    const validateFields = () => {
        const newErrors: any = {};
        if (!title.trim()) {
            newErrors.title = "Название поездки обязательно";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!validateFields()) return;
        if (startDate && endDate && endDate < startDate) {
            alert('Дата окончания поездки не может быть раньше даты начала.');
            return;
        }

        const tripData = {
            tripImage,
            title,
            description,
            start_Date: format(startDate || new Date(), 'yyyy-MM-dd', { locale: ru }),
            end_Date: format(endDate || new Date(), 'yyyy-MM-dd', { locale: ru }),
            trippers: [user_id],
            // cities,
            tripPlace,
        };
        try {
            const accessToken = localStorage.getItem('access');
            const response = await fetch(`${BASE_URL}/api/trips/create/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify(tripData)
            });

            if (response.ok) {
                const data = await response.json();
                onSubmit(data.trip);
                handleClose();
            } else {
                console.error('Ошибка создания поездки');
            }
        } catch (error) {
            console.error('Ошибка сети:', error);
        }
    };

    const updateTripEnd = (startDate: Date | null, daysCount: number) => {
        if (startDate) {
            const newEndDate = new Date(startDate);
            newEndDate.setDate(newEndDate.getDate() + daysCount);
            setEndDate(newEndDate);
        }
    };

    const handleDaysChange = (newDays: number) => {
        if (newDays < 0) newDays = 0;
        setDays(newDays);
        updateTripEnd(startDate, newDays);
    };

    const daysText = (days: number) => {
        const modulo10 = days % 10;
        const modulo100 = days % 100;
        if (modulo10 === 1 && modulo100 !== 11) return `${days} день`;
        if ([2, 3, 4].includes(modulo10) && ![12, 13, 14].includes(modulo100)) return `${days} дня`;
        return `${days} дней`;
    };

    useEffect(() => {
        if (startDate && endDate) {
            const timeDiff = endDate.getTime() - startDate.getTime();
            const dayDifference = Math.ceil(timeDiff / (1000 * 3600 * 24));
            setDays(dayDifference);
        }
    }, [endDate, startDate]);

    return !isOpen ? null : (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-75">
            <div className="max-w-[800px] bg-white p-[48px] rounded-[50px] w-full">
                <form onSubmit={handleSubmit}>
                    <h2 className="text-[36px] font-bold">Название поездки</h2>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        name="title"
                        placeholder="К примеру, командировка в Москве"
                        required
                        className={`w-full mt-[20px] p-[13px] border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-[16px]`}
                    />
                    {errors.title && <p className="text-red-500">{errors.title}</p>}
                  
                    <h2 className="mt-[20px] text-[36px] font-bold">Описание поездки</h2>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        name="description"
                        placeholder="Краткое описание поездки"
                        className="w-full mt-[20px] p-[13px] border border-gray-300 rounded-[16px]"
                    />
                    <h2 className="mt-[20px] text-[36px] font-bold">Направление</h2>
                    <select
                        multiple
                        value={cities}
                        onChange={(e) => setCities(Array.from(e.target.selectedOptions, option => option.value))}
                        name="cities"
                        required
                        className="w-full mt-[20px] p-[13px] border border-gray-300 rounded-[16px]"
                    >
                        <option value="" disabled>Куда вы хотите отправиться?</option>
                        {popularCities.map((city) => (
                            <option key={city} value={city}>{city}</option>
                        ))}
                    </select>
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
                            selected={startDate}
                            onChange={(date: Date) => {
                                setStartDate(date);
                                updateTripEnd(date, days);
                            }}
                            dateFormat="dd MMM"
                            locale={ru}
                            placeholderText="Начало"
                            className="w-full  p-[13px] border border-gray-300 rounded-[15px]"
                        />
                        <p className="my-auto text-[25px]">-</p>
                        <DatePicker
                            selected={endDate}
                            onChange={(date: Date) => setEndDate(date)}
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
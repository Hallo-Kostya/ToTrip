'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface TripContextProps {
    trip: TripContextState;
    setTripContext: (data: Partial<TripContextState>) => void;
}

interface TripContextState {
    tripImage: string;
    tripName: string;
    tripPlace: string;
    tripStart: Date;
    tripEnd: Date;
    users: number;
    id: string;
}

const TripContext = createContext<TripContextProps | undefined>(undefined);

const TripProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [trip, setTrip] = useState<TripContextState>({
        tripImage: '',
        tripName: '',
        tripPlace: '',
        tripStart: new Date(),
        tripEnd: new Date(),
        users: 1,
        id: '',
    });

    const setTripContext = (data: Partial<TripContextState>) => {
        setTrip(prevState => ({
            ...prevState,
            ...data,
        }));
    };

    return (
        <TripContext.Provider value={{ trip, setTripContext }}>
            {children}
        </TripContext.Provider>
    );
};

const useTrip = () => {
    const context = useContext(TripContext);

    if (!context) {
        // возвращаем безопасные значения по умолчанию
        return {
            trip: {
                tripImage: './img/trips-page/exp_photo.png',
                tripName: 'Поездка в Москву',
                tripPlace: 'Москва',
                tripStart: new Date('2024-12-22'),
                tripEnd: new Date('2024-12-29'),
                users: 1,
                id: '',
            },
            setTripContext: () => {}
        };
    }

    return context;
};

export { TripProvider, useTrip };
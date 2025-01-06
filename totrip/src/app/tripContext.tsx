'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface TripContextProps {
    trip: TripContextState;
    setTripContext: (data: Partial<TripContextState>) => void;
}

interface TripContextState {
    tripImage: string;
    title: string;
    tripPlace: string;
    startDate : Date;
    endDate: Date;
    trippers: number;
    id: number;
}

const TripContext = createContext<TripContextProps | undefined>(undefined);

const TripProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [trip, setTrip] = useState<TripContextState>({
        tripImage: '',
        title: '',
        tripPlace: '',
        startDate: new Date(),
        endDate: new Date(),
        trippers: 0,
        id: 0,
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
                tripImage: '',
                title: '',
                tripPlace: '',
                startDate: new Date(),
                endDate: new Date(),
                trippers: 0,
                id: 0,
            },
            setTripContext: () => {}
        };
    }

    return context;
};

export { TripProvider, useTrip };
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface TripContextProps {
    trip: TripContextState;
    setTripContext: (data: TripContextState) => void;
}

interface TripContextState {
    tripImage: string;
    title: string;
    startDate: Date;
    endDate: Date;
    trippers: number;
    id: number;
    cities: [];
    description: string;
}

const defaultTripState: TripContextState = {
    tripImage: '',
    title: '',
    startDate: new Date(),
    endDate: new Date(),
    trippers: 0,
    id: 0,
    cities: [],
    description: ''
};

const TripContext = createContext<TripContextProps | undefined>(undefined);

const TripProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [trip, setTrip] = useState<TripContextState>(defaultTripState);

    const setTripContext = (data: TripContextState) => {
        setTrip(data);
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
        throw new Error("useTrip должен использоваться внутри TripProvider");
    }
    return context;
};

export { TripProvider, useTrip, defaultTripState };
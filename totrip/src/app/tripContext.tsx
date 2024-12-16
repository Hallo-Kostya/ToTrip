'use client';

import React, { createContext, useContext, useState } from 'react';

interface TripContextProps {
    tripName: string;
    tripPlace: string;
    tripStart: Date;
    tripEnd: Date;
    setTripContext: (data: Partial<TripContextState>) => void;
}

interface TripContextState {
    tripName: string;
    tripPlace: string;
    tripStart: Date;
    tripEnd: Date;
}

const TripContext = createContext<TripContextProps | undefined>(undefined);

const TripProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, setState] = useState<TripContextState>({
        tripName: '',
        tripPlace: '',
        tripStart: new Date,
        tripEnd: new Date,
    });

    const setTripContext = (data: Partial<TripContextState>) => {
        setState(prevState => ({
            ...prevState,
            ...data
        }));
    };

    return (
        <TripContext.Provider value={{ ...state, setTripContext }}>
            {children}
        </TripContext.Provider>
    );
};

const useTrip = () => {
    const context = useContext(TripContext);
    if (!context) {
        throw new Error("useTrip must be used within a TripProvider");
    }
    return context;
};

export { TripProvider, useTrip };
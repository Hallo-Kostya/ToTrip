'use client'

import React, { createContext, useContext, useState } from 'react';

// Интерфейс для пользователя
interface TripContextProps {
    tripName: string;
    tripPlace: string;
    tripStart: string;
    tripEnd: string;
    setTripContext: (data: Partial<TripContextState>) => void;
}

interface TripContextState {
    tripName: string;
    tripPlace: string;
    tripStart: string;
    tripEnd: string;
}

const TripContext = createContext<TripContextProps | undefined>(undefined);

const TripProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<TripContextState>({
    // Через эти переменные данные передаются по всем элементам, для которых они были импортированы
    tripName: '',
    tripPlace: '',
    tripStart: '',
    tripEnd: '',
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

// Хук для использования контекста
const useTrip = () => {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error("useTrip must be used within a TripProvider");
  }
  return context;
};

export { TripProvider, useTrip };
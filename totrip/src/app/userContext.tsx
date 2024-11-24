'use client'

import React, { createContext, useContext, useState } from 'react';

// Интерфейс для пользователя
interface UserContextProps {
  nickname: string;
  userName: string;
  userImg: string;
  location: string;
  motto: string;
  profileDesc: string;
  setUserContext: (data: Partial<UserContextState>) => void;
}

interface UserContextState {
  nickname: string;
  userName: string;
  userImg: string;
  location: string;
  motto: string;
  profileDesc: string;
}

// Создаем контекст
const UserContext = createContext<UserContextProps | undefined>(undefined);

// Провайдер, который будем использовать в приложении
const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<UserContextState>({
    nickname: '',
    userName: 'Сафия Х',
    userImg: '/img/no-user-icon.png',
    location: '',
    motto: '',
    profileDesc: ''
  });

  const setUserContext = (data: Partial<UserContextState>) => {
    setState(prevState => ({
      ...prevState,
      ...data
    }));
  };

  return (
    <UserContext.Provider value={{ ...state, setUserContext }}>
      {children}
    </UserContext.Provider>
  );
};

// Хук для использования контекста
const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export { UserProvider, useUser };
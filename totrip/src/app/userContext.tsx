'use client'

import React, { createContext, useContext, useState } from 'react';

// Интерфейс для пользователя
interface UserContextProps {
  nickname: string;
  userName: string;
  userSurname: string;
  userImg: string;
  location: string;
  motto: string;
  profileDesc: string;
  setUserContext: (data: Partial<UserContextState>) => void;
}

interface UserContextState {
  nickname: string;
  userName: string;
  userSurname: string;
  userImg: string;
  location: string;
  motto: string;
  profileDesc: string;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<UserContextState>({
    // Через эти переменные данные передаются по всем элементам, для которых они были импортированы
    nickname: 'индивидуальный_идентификатор',
    userName: '',
    userSurname: '',
    userImg: '/img/no-user-icon.png',
    location: 'Ваше местоположение!',
    motto: 'Ваш девиз!',
    profileDesc: 'Описание профиля!'
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
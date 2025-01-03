'use client';

import React, { createContext, useContext, useState } from 'react';

interface UserContextProps {
  username: string;
  first_name: string;
  last_name: string;
  userImg: string;
  location: string;
  motto: string;
  profileDesc: string;
  setUserContext: (data: Partial<UserContextState>) => void;
}

interface UserContextState {
  username: string;
  first_name: string;
  last_name: string;
  userImg: string;
  location: string;
  motto: string;
  profileDesc: string;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<UserContextState>({
    username: '',
    first_name: '',
    last_name: '',
    userImg: '/img/no-user-icon.png',
    location: 'Ваше местоположение',
    motto: 'Ваш девиз!',
    profileDesc: 'Описание профиля'
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

const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export { UserProvider, useUser };
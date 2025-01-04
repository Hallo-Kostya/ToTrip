'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserContextState {
  username: string;
  first_name: string;
  last_name: string;
  userImg: string;
  city: string;
  country: string;
  motto: string;
  bio: string;
  phone_number: string;
  registrationDate: string;
  setUserContext: (data: Partial<UserContextState>) => void;
}

const UserContext = createContext<UserContextState | undefined>(undefined);

const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<UserContextState>({
    username: '',
    first_name: '',
    last_name: '',
    userImg: '',
    city: '',
    country: '',
    motto: '',
    bio: '',
    phone_number: '',
    registrationDate: ''
  });

  const setUserContext = (data: Partial<UserContextState>) => {
    setState(prevState => ({
      ...prevState,
      ...data
    }));
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      const accessToken = localStorage.getItem('access');
      if (accessToken) {
        try {
          const response = await fetch('http://127.0.0.1:8000/api/users/profile/', {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          });

          if (response.ok) {
            const userData = await response.json();
            setUserContext({
              username: userData.username,
              first_name: userData.first_name,
              last_name: userData.last_name,
              userImg: userData.photo || '',
              city: userData.city || '',
              country: userData.country || '',
              motto: userData.motto || '',
              bio: userData.bio || '',
              phone_number: userData.phone_number || '',
              registrationDate: userData.registration_date || ''
            });
          } else {
            console.error('Ошибка получения профиля:', response.statusText);
          }
        } catch (error) {
          console.error('Ошибка сети:', error);
        }
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <UserContext.Provider value={{ ...state, setUserContext }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser должен использоваться внутри UserProvider");
  }
  return context;
};

export { UserProvider, useUser };
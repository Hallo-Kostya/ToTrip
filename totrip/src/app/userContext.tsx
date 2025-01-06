'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserContextState {
  user_id: number;
  username: string;
  first_name: string;
  last_name: string;
  photo: string;
  city: string;
  country: string;
  slogan: string;
  bio: string;
  phone_number: string;
  created_at: string;
  setUserContext: (data: Partial<UserContextState>) => void;
}

const BASE_URL = 'http://127.0.0.1:8000';

const UserContext = createContext<UserContextState | undefined>(undefined);

const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<UserContextState>({
    user_id: 0,
    username: '',
    first_name: '',
    last_name: '',
    photo: '',
    city: '',
    country: '',
    slogan: '',
    bio: '',
    phone_number: '',
    created_at: ''
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
          const response = await fetch(`${BASE_URL}/api/users/profile/`, {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          });

          if (response.ok) {
            const userData = await response.json();
            const photoUrl = userData.photo ? `${userData.photo}` : '';
            setUserContext({
              user_id: userData.id,
              username: userData.username,
              first_name: userData.first_name,
              last_name: userData.last_name,
              photo: photoUrl || '',
              city: userData.city || '',
              country: userData.country || '',
              slogan: userData.slogan || '',
              bio: userData.bio || '',
              phone_number: userData.phone_number || '',
              created_at: userData.created_at || ''
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
    console.error("useUser должен использоваться внутри UserProvider");
    throw new Error("useUser должен использоваться внутри UserProvider");
  }
  return context;
};

export { UserProvider, useUser };
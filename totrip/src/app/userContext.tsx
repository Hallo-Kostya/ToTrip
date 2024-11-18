"use client"

import React, { createContext, useContext, useState } from 'react';

interface UserContextType {
  userImg: string;
  userName: string;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userData] = useState<UserContextType>({
    userImg: "/img/user-photo.png", // здесь вы можете обновлять данные пользователя
    userName: "Имя пользователя"
  });

  return (
    <UserContext.Provider value={userData}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
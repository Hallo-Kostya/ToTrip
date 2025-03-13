'use client';

import React, { useState } from 'react';
import { useUser } from '@/app/userContext';

interface RegistrationPopupProps {
  onClose: () => void;
}

const RegistrationPopup: React.FC<RegistrationPopupProps> = ({ onClose }) => {
  const { setUserContext } = useUser();
  const [isVisible, setIsVisible] = useState(true);
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    first_name: '',
    last_name: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (isLoginMode) {
      if (!formData.email.trim()) newErrors.email = 'Email обязателен';
      if (!formData.password.trim()) newErrors.password = 'Пароль обязателен';
    } else {
      if (!formData.username.trim()) newErrors.username = 'Имя пользователя обязательно';
      if (!formData.email.trim()) newErrors.email = 'Email обязателен';
      if (!formData.first_name.trim()) newErrors.first_name = 'Имя обязательно';
      if (!formData.last_name.trim()) newErrors.last_name = 'Фамилия обязательна';
      if (formData.password.length < 8) newErrors.password = 'Пароль должен быть не менее 8 символов';
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Пароли не совпадают';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (validateForm()) {
      try {
        const endpoint = isLoginMode ? 'login' : 'register';
        const response = await fetch(`https://totrip.onrender.com/api/users/${endpoint}/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          setErrors(errorData);
          return;
        }

        const data = await response.json();
        localStorage.setItem('refresh', data.refresh);
        localStorage.setItem('access', data.access);

        if (isLoginMode) {
          setUserContext({
            first_name: data.first_name,
            last_name: data.last_name,
          });
          window.location.reload();  // автоматическое обновление страницы после входа
        } else {
          setIsLoginMode(true);  // переходим на экран авторизации после регистрации, пока не работает как надо
        }

        setIsVisible(false);
        onClose();
      } catch (error) {
        console.error('Ошибка сети:', error);
      }
    }
  };

  if (!isVisible) return null;

  return (
    <div className='popup-backdrop flex items-center justify-center fixed inset-0 bg-black bg-opacity-50' onClick={() => { setIsVisible(false); onClose(); }}>
      <div className='reg_log_popup_container flex flex-col w-[454px] p-[24px] rounded-[24px] bg-white' onClick={(e) => e.stopPropagation()}>
        <div className='reg_log_popup_headers max-w-[406px]'>
          <h1 className='text-[32px] font-bold'>{isLoginMode ? 'Вход' : 'Регистрация'}</h1>
          <p className='text-[16px] font-medium mt-[4px]'>
            {isLoginMode ? 'Войдите, чтобы продолжить' : 'Создайте аккаунт, чтобы войти в личный кабинет'}
          </p>
        </div>
        <div className='reg_log_popup_inputs w-[406px]'>
          <form onSubmit={handleSubmit} className='flex flex-col'>
            {!isLoginMode && (
              <>
                <input
                  type="text"
                  name="username"
                  className="border rounded-[16px] mt-[24px] px-[12px] py-[16px]"
                  placeholder="Введите логин"
                  required
                  onChange={handleInputChange}
                  value={formData.username}
                />
                {errors.username && <p className="text-red-500">{errors.username}</p>}
              </>
            )}
            <input
              type="email"
              name="email"
              className="border rounded-[16px] mt-[24px] px-[12px] py-[16px]"
              placeholder="Введите email"
              required
              onChange={handleInputChange}
              value={formData.email}
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
            {!isLoginMode && (
              <>
                <input
                  type="text"
                  name="first_name"
                  className="border rounded-[16px] mt-[24px] px-[12px] py-[16px]"
                  placeholder="Введите имя"
                  required
                  onChange={handleInputChange}
                  value={formData.first_name}
                />
                {errors.first_name && <p className="text-red-500">{errors.first_name}</p>}
              </>
            )}
            {!isLoginMode && (
              <>
                <input
                  type="text"
                  name="last_name"
                  className="border rounded-[16px] mt-[24px] px-[12px] py-[16px]"
                  placeholder="Введите фамилию"
                  required
                  onChange={handleInputChange}
                  value={formData.last_name}
                />
                {errors.last_name && <p className="text-red-500">{errors.last_name}</p>}
              </>
            )}
            <input
              type="password"
              name="password"
              className="border rounded-[16px] mt-[20px] px-[12px] py-[16px]"
              placeholder="Ваш пароль"
              required
              onChange={handleInputChange}
              value={formData.password}
            />
            {errors.password && <p className="text-red-500">{errors.password}</p>}
            {!isLoginMode && (
              <>
                <input
                  type="password"
                  name="confirmPassword"
                  className="border rounded-[16px] mt-[20px] px-[12px] py-[16px]"
                  placeholder="Повторите свой пароль"
                  required
                  onChange={handleInputChange}
                  value={formData.confirmPassword}
                />
                {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword}</p>}
              </>
            )}

            <div className='flex justify-center'>
              <button type="submit" className='reg_btn flex flex-col items-center px-[24px] py-[12px] bg-blue-500 rounded-[15.869px] mt-[18px] max-w-[271px]'>
                <span className='text-[22.67px] text-white font-bold'>{isLoginMode ? 'Войти' : 'Зарегистрироваться'}</span>
              </button>
            </div>
          </form>
        </div>
        <div className='flex justify-center text-[16px] mt-[18px]'>
          {isLoginMode ? 'Нет учетной записи?' : 'У вас уже есть аккаунт?'}
          <button
            className='flex flex-col items-center text-blue-600 ml-1'
            onClick={() => setIsLoginMode(!isLoginMode)}
          >
            {isLoginMode ? 'Зарегистрироваться' : 'Войти'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPopup;
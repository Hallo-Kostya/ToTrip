'use client';

import React, { useState, useEffect } from 'react';
// import { useUser } from '@/app/userContext';

interface RegistrationPopupProps {
  onClose: () => void;
}

const RegistrationPopup: React.FC<RegistrationPopupProps> = ({ onClose }) => {
//   const { setUserContext } = useUser();
  const [isVisible, setIsVisible] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    first_name: '',
    last_name: '',
    email: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const handleKeydown = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        setIsVisible(false);
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [onClose]);

  if (!isVisible) return null;

  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.username.trim()) newErrors.username = 'Имя пользователя обязательно';
    if (!formData.first_name.trim()) newErrors.first_name = 'Имя обязательно';
    if (!formData.last_name.trim()) newErrors.last_name = 'Фамилия обязательна';
    if (!formData.email.trim()) newErrors.email = 'Электронная почта обязательна';
    if (formData.password.length < 8) newErrors.password = 'Пароль должен быть не менее 8 символов';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Пароли не совпадают';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/users/register/', {
          method: 'POST',

          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          setErrors(errorData);
          return;
        }

        const data = await response.json();
        localStorage.setItem('refreshToken', data.refresh);

        // setUserContext({
        //   username: formData.username,
        //   first_name: formData.first_name,
        //   last_name: formData.last_name,
        //   userImg: '/img/no-user-icon.png',
        // });

        setIsVisible(false);
        onClose();
      } catch (error) {
        console.error('Ошибка сети:', error);
      }
    }
  };

  return (
    <div className='popup-backdrop flex items-center justify-center fixed inset-0 bg-black bg-opacity-50' onClick={() => { setIsVisible(false); onClose(); }}>
      <div className='reg_log_popup_container flex flex-col w-[454px] p-[24px] rounded-[24px] bg-white' onClick={(e) => e.stopPropagation()}>
        <div className='reg_log_popup_headers max-w-[406px]'>
          <h1 className='text-[32px] font-bold'>Регистрация</h1>
          <p className='text-[16px] font-medium mt-[4px]'>Создайте аккаунт, чтобы войти в личный кабинет</p>
        </div>
        <div className='reg_log_popup_inputs w-[406px]'>
          <form onSubmit={handleSubmit} className='flex flex-col'>
            {['username', 'first_name', 'last_name', 'email'].map((field) => (
              <React.Fragment key={field}>
                <input
                  type={field === 'email' ? 'email' : 'text'}
                  name={field}
                  className="border rounded-[16px] mt-[24px] px-[12px] py-[16px]"
                  placeholder={`Введите ${field === 'username' ? 'логин' : field === 'first_name' ? 'имя' : field === 'last_name' ? 'фамилию' : 'email'}`}
                  required
                  onChange={handleInputChange}
                  value={formData[field]}
                />
                {errors[field] && <p className="text-red-500">{errors[field]}</p>}
              </React.Fragment>
            ))}
            {['password', 'confirmPassword'].map((field) => (
              <React.Fragment key={field}>
                <input
                  type="password"
                  name={field}
                  className="border rounded-[16px] mt-[20px] px-[12px] py-[16px]"
                  placeholder={field === 'password' ? 'Ваш пароль' : 'Повторите свой пароль'}
                  required
                  onChange={handleInputChange}
                  value={formData[field]}
                />
                {errors[field] && <p className="text-red-500">{errors[field]}</p>}
              </React.Fragment>
            ))}
            <div className='flex justify-center'>
              <button type="submit" className='reg_btn flex flex-col items-center px-[24px] py-[12px] bg-blue-500 rounded-[15.869px] mt-[18px] max-w-[271px]'>
                <span className='text-[22.67px] text-white font-bold'>Зарегистрироваться</span>
              </button>
            </div>
          </form>
        </div>
        <div className='flex justify-center text-[16px] mt-[18px]'>
          У вас уже есть аккаунт?
          <button
            className='flex flex-col items-center text-blue-600 ml-1'
            onClick={() => setIsVisible(false)}
          >
            Войти
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPopup;
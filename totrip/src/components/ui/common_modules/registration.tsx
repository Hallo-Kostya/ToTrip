'use client';

import React, { useState, useEffect } from 'react';
import { useUser } from '@/app/userContext';

const RegistrationPopup = ({ onClose }: { onClose: () => void }) => {
    const { setUserContext } = useUser();
    const [isRegistration, setIsRegistration] = useState(true);
    const [isVisible, setIsVisible] = useState(true);
    const [formData, setFormData] = useState({ userName: '', login: '', password: '', confirmPassword: '' });
    const [errors, setErrors] = useState<{ login?: string, password?: string, confirmPassword?: string }>({});

    useEffect(() => {
        const handleKeydown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        const newErrors: { login?: string, password?: string, confirmPassword?: string } = {};

        if (isRegistration && formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Пароли не совпадают';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm()) {
            setUserContext({ userName: formData.userName, userImg: '/img/no-user-icon.png' });
            setIsVisible(false);
            onClose();
        }
    };

    return (
        <div className='popup-backdrop flex items-center justify-center fixed inset-0 bg-black bg-opacity-50' onClick={() => { setIsVisible(false); onClose(); }}>
            <div className='reg_log_popup_container flex flex-col w-[454px] p-[24px] rounded-[24px] bg-white' onClick={(e) => e.stopPropagation()}>
                <div className='reg_log_popup_headers max-w-[406px]'>
                    <h1 className='text-[32px] font-bold'>
                        {isRegistration ? 'Регистрация' : 'Вход'}
                    </h1>
                    <p className='text-[16px] font-medium mt-[4px]'>
                        {isRegistration ? 'Создайте аккаунт, чтобы войти в личный кабинет' : 'Введите данные, чтобы войти в личный кабинет'}
                    </p>
                </div>
                <div className='reg_log_popup_inputs w-[406px]'>
                    <form onSubmit={handleSubmit} className='flex flex-col'>
                        {isRegistration && (
                            <input
                                type="text"
                                name="userName"
                                className="border rounded-[16px] mt-[24px] px-[12px] py-[16px]"
                                placeholder="Введите своё имя и фамилию"
                                required
                                onChange={handleInputChange}
                                value={formData.userName}
                            />
                        )}
                        <input
                            type="text"
                            name="login"
                            className="border rounded-[16px] mt-[24px] px-[12px] py-[16px]"
                            placeholder="Ваш логин"
                            required
                            onChange={handleInputChange}
                            value={formData.login}
                        />
                        {errors.login && <p className="text-red-500">{errors.login}</p>}
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
                        {isRegistration && (
                            <input
                                type="password"
                                name="confirmPassword"
                                className="border rounded-[16px] mt-[20px] px-[12px] py-[16px]"
                                placeholder="Повторите свой пароль"
                                required
                                onChange={handleInputChange}
                                value={formData.confirmPassword}
                            />
                        )}
                        {isRegistration && errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword}</p>}
                        <div className='flex justify-center'>
                            <button type="submit" className='reg_btn flex flex-col items-center px-[24px] py-[12px] bg-blue-500 rounded-[15.869px] mt-[18px] max-w-[271px]'>
                                <span className='text-[22.67px] text-white font-bold'>
                                    {isRegistration ? 'Зарегистрироваться' : 'Войти'}
                                </span>
                            </button>
                        </div>
                    </form>
                </div>
                <div className='flex justify-center text-[16px] mt-[18px]'>
                    {isRegistration ? 'У вас уже есть аккаунт?' : 'У вас еще нет аккаунта?'}
                    <button
                        className='flex flex-col items-center text-blue-600 ml-1'
                        onClick={() => setIsRegistration(!isRegistration)}
                    >
                        {isRegistration ? 'Войти' : 'Зарегистрироваться'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RegistrationPopup;
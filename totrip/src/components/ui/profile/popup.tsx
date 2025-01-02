'use client'

import React, { useEffect, useState } from 'react';
import AvatarUploader from './avatarUploader';
import Image from 'next/image';
import { UserData } from '@/components/ui/types';

interface UserProfile {
    avatar: string;
    name: string;
    surname: string;
    username: string;
    location: string;
    about: string;
    motto: string;
}

interface PopupControlsProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: UserData) => void;
    onAvatarChange: (newImg: string) => void;
    initialData?: UserData;
}

const popularCities = [
    "Москва", "Санкт-Петербург", "Новосибирск", "Екатеринбург",
    "Казань", "Нижний Новгород", "Челябинск", "Самара", "Омск",
    "Ростов-на-Дону", "Уфа", "Красноярск", "Воронеж", "Краснодар",

];

const Popup: React.FC<PopupControlsProps> = ({
    isOpen,
    onClose,
    onSubmit,
    onAvatarChange,
    initialData
}) => {
    const [profileData, setProfileData] = useState<UserProfile>({
        avatar: initialData?.avatar || '',
        name: initialData?.name || '',
        surname: initialData?.surname || '',
        username: initialData?.username || '',
        location: initialData?.location || '',
        about: initialData?.about || '',
        motto: initialData?.motto || ''
    });

    const [errors, setErrors] = useState<Partial<UserProfile>>({});
    const [tempAvatar, setTempAvatar] = useState<string>('');

    useEffect(() => {
        if (isOpen && initialData) {
            setProfileData(initialData);
            setTempAvatar(initialData.avatar || '');
        }
    }, [isOpen, initialData]);

    const validateFields = () => {
        const newErrors: Partial<UserProfile> = {};
        if (!profileData.name.trim()) {
            newErrors.name = "Имя обязательно";
        }
        if (!/^[A-Za-zА-Яа-яёЁ\s]*$/.test(profileData.name)) {
            newErrors.name = "Разрешены только буквы и пробелы";
        }
        if (!profileData.surname.trim()) {
            newErrors.surname = "Фамилия обязательна";
        }
        if (!/^[A-Za-zА-Яа-яёЁ\s]*$/.test(profileData.surname)) {
            newErrors.surname = "Разрешены только буквы и пробелы";
        }
        if (!/^(?!.*[:&!?]).*$/.test(profileData.username)) {
            newErrors.username = "Недопустимые символы: : & ! ?";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setProfileData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (validateFields()) {
            onAvatarChange(tempAvatar);
            onSubmit({
                ...profileData, avatar: tempAvatar, newImg: ''
            });
            onClose();
        }
    };

    const handleLocationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setProfileData(prevState => ({
            ...prevState,
            location: event.target.value
        }));
    };

    const handleAvatarChange = (newAvatar: string) => {
        setTempAvatar(newAvatar);
    };

    return (
        <section className={`popup ${isOpen ? '' : 'hidden'} w-full fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50`}>
            <form className="w-[522px] bg-white rounded-[16px] p-6 space-y-4 shadow-lg items-start mx-auto" onSubmit={handleSubmit}>
                <div>
                    <div className="flex">
                        <AvatarUploader currentAvatar={tempAvatar} onAvatarChange={handleAvatarChange} />
                        <div className="w-[246px] ml-4">
                            <div className="mb-[12px]">
                                <h5 className="text-[24px] font-bold mb-[4px]">Имя</h5>
                                <input
                                    type="text"
                                    name="name"
                                    value={profileData.name}
                                    placeholder="Введите имя"
                                    className="p-[12px] rounded-[12px] border border-[#8F8F8F] settings-input w-full"
                                    onChange={handleChange}
                                    required
                                    pattern="[A-Za-zА-Яа-яёЁ\s]*"
                                    title="Разрешены буквы и пробелы"
                                />
                                {errors.name && <p className="text-red-500">{errors.name}</p>}
                            </div>
                            <div className="mb-[12px]">
                                <h5 className="text-[24px] font-bold mb-[4px]">Фамилия</h5>
                                <input
                                    type="text"
                                    name="surname"
                                    value={profileData.surname}
                                    placeholder="Введите фамилию"
                                    className="p-[12px] rounded-[12px] border border-[#8F8F8F] settings-input w-full"
                                    onChange={handleChange}
                                    required
                                    pattern="[A-Za-zА-Яа-яёЁ\s]*"
                                    title="Разрешены буквы и пробелы"
                                />
                                {errors.surname && <p className="text-red-500">{errors.surname}</p>}
                            </div>
                        </div>
                    </div>
                    <div className="mb-[12px]">
                        <h5 className="text-[24px] font-bold mb-[4px]">Имя пользователя</h5>
                        <input
                            type="text"
                            name="username"
                            value={profileData.username}
                            placeholder="Введите имя пользователя"
                            className="p-[12px] rounded-[12px] border border-[#8F8F8F] settings-input w-full"
                            onChange={handleChange}
                            required
                            pattern="^(?!.*[:&!?]).*$"
                            title="Недопустимые символы: : & ! ?"
                        />
                        {errors.username && <p className="text-red-500">{errors.username}</p>}
                    </div>
                    <div className="mb-[12px]">
                        <h5 className="text-[24px] font-bold mb-[4px]">Город проживания</h5>
                        <div className="relative">
                            <Image src="/img/profile/Map Point.svg" alt="" className="absolute left-3 top-1/2 transform -translate-y-1/2" width={20} height={20} />
                            <select
                                name="location"
                                value={profileData.location}
                                onChange={handleLocationChange}
                                className="p-[12px] pl-[36px] rounded-[12px] border border-[#8F8F8F] settings-input w-full"
                                required
                            >
                                <option value="" disabled>Выберите город</option>
                                {popularCities.map(city => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
                            </select>
                            {errors.location && <p className="text-red-500">{errors.location}</p>}
                        </div>
                    </div>
                    <div className="mb-[8px]">
                        <h5 className="text-[24px] font-bold mb-[4px]">О себе</h5>
                        <textarea
                            name="about"
                            value={profileData.about}
                            placeholder="Расскажите о себе"
                            className="p-[12px] border rounded-[12px] border-[#8F8F8F] w-full"
                            onChange={handleChange}
                            maxLength={500}
                            required
                        />
                        {errors.about && <p className="text-red-500">{errors.about}</p>}
                    </div>
                    <div className="mb-[32px]">
                        <h5 className="text-[24px] font-bold mb-[4px]">Девиз</h5>
                        <textarea
                            name="motto"
                            value={profileData.motto}
                            placeholder="Введите ваш девиз"
                            className="p-[12px] border rounded-[12px] border-[#8F8F8F] w-full"
                            onChange={handleChange}
                            maxLength={200}
                            required
                        />
                        {errors.motto && <p className="text-red-500">{errors.motto}</p>}
                    </div>
                </div>
                <div className="flex justify-between w-full">
                    <button type="button" className="bg-gray-500 text-white rounded-lg py-2 px-4" onClick={onClose}>Отменить</button>
                    <button type="submit" className="bg-black text-white rounded-lg py-2 px-4">Подтвердить</button>
                </div>
            </form>
        </section>
    );
};

export default Popup;
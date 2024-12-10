"use client"

import { useState } from 'react';

interface UserProfile {
    name: string;
    username: string;
    location: string;
    about: string;
    motto: string;
}

interface PopupControlsProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: UserProfile) => void; // Предполагается, что onSubmit принимает данные профиля
}

const Popup: React.FC<PopupControlsProps> = ({ isOpen, onClose, onSubmit }) => {
    // Здесь мы принимает данные профиля, пока у нас их нет, поэтому в консоли эти значения пустые
    const [profileData, setProfileData] = useState<UserProfile>({
        name: '',
        username: '',
        location: '',
        about: '',
        motto: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfileData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(profileData);
        onClose();
    };

    return (
        <section className={`popup ${isOpen ? '' : 'hidden'} fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50`}>
            <form className="bg-white rounded-lg p-6 space-y-4 shadow-lg" onSubmit={handleSubmit}>
                {['Имя', 'Имя пользователя', 'Место проживания', 'О себе', 'Девиз'].map((label, index) => (
                    <div key={index}>
                        <h5>{label}</h5>
                        <input 
                            type="text" 
                            name={label.toLowerCase().replace(' ', '')} // Это сделает имя поля удобным
                            placeholder={`Введите ${label.toLowerCase()}`} 
                            className="settings-input mb-2" 
                            onChange={handleChange} 
                        />
                    </div>
                ))}
                <div className="flex justify-between">
                    <button type="button" className="bg-gray-500 text-white rounded-lg py-2 px-4" onClick={onClose}>Отменить</button>
                    <button type="submit" className="bg-blue-500 text-white rounded-lg py-2 px-4">Подтвердить</button>
                </div>
            </form>
        </section>
    );
}

export default Popup;
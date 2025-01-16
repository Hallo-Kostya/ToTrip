import React, { useState } from 'react';
import Popup from '@/components/ui/profile/popup';
import Image from 'next/image';
import { useUser } from '@/app/userContext';

const Profile: React.FC = () => {
  const { username, first_name, last_name, photo, city, country, slogan, bio, phone_number, setUserContext } = useUser();
  const [isPopupOpen, setPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  const handleSubmit = (formData: { [s: string]: unknown; } | ArrayLike<unknown>) => {
    const accessToken = localStorage.getItem('access');
    if (accessToken) {
      const formDataObject = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'photo' && value instanceof File) {
          formDataObject.append(key, value);
        } else if (key !== 'photo') {
          formDataObject.append(key, value.toString());
        }
      });

      fetch('http://127.0.0.1:8000/api/users/profile/edit/', {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formDataObject,
      })
        .then((response) => response.ok ? response.json() : Promise.reject(response))
        .then((updatedData) => {
          setUserContext({
            username: updatedData.username,
            first_name: updatedData.first_name,
            last_name: updatedData.last_name,
            photo: updatedData.photo || '/img/default_avatar.png',
            city: updatedData.city || '',
            country: updatedData.country || '',
            slogan: updatedData.slogan || '',
            bio: updatedData.bio || '',
            phone_number: updatedData.phone_number || '',
            created_at: updatedData.created_at || '',
          });
          setPopupOpen(false);
          window.location.reload();
        })
        .catch((error) => {
          alert('Не удалось обновить профиль. Попробуйте снова.');
        });
    }
  };

  return (
    <section className="size-full max-w-[1120px] bg-white rounded-[38.4px] p-[36px] shadow-md mb-4 -mt-[100px]">
      <div className="flex justify-between items-start gap-5">
        <div className="flex gap-6">
        <Image
          className="w-[160px] h-[160px] object-cover rounded-full"
          src={photo || '/img/default_avatar.png'}
          width={160}
          height={160}
          alt="Фото профиля"
        />
          <div className="flex flex-col mt-2">
            <h6 className="text-gray-600 font-bold text-[20px]">@{username}</h6>
            <h4 className="font-bold text-[32px]">{first_name} {last_name}</h4>
            <h6 className="mt-13 text-gray-600 font-bold text-[20px]">{bio}</h6>
          </div>
        </div>
        <a href="#" onClick={handleOpenPopup}>
          <Image src="/img/profile/Settings.svg" alt="Настройки профиля" width={32} height={32} className="hover:cursor-pointer" />
        </a>
      </div>
      <Popup
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        onSubmit={handleSubmit}
        onAvatarChange={() => null}
        initialData={{
          photo: photo || '/img/default_avatar.png',
          first_name: first_name,
          last_name: last_name,
          username: username,
          city: city,
          country: country,
          bio: bio,
          slogan: slogan,
          phone_number: phone_number
        }}
      />
    </section>
  );
};

export default Profile;
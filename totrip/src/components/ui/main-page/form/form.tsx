'use client';

import React, { useState } from 'react';

interface FormData {
  name: string;
  address: string;
  photos: File[];
  description: string;
  services: string;
}

const Form: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    address: '',
    photos: [],
    description: '',
    services: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;
    if (name === 'photos' && files) {
      setFormData({
        ...formData,
        photos: Array.from(files)
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="flex flex-col justify-center">
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto p-9 bg-white shadow-md rounded-lg my-auto scale-110"
      >
        <div className="mb-6">
          <label htmlFor="name" className="block text-base font-medium text-gray-700">Название</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-base"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="address" className="block text-base font-medium text-gray-700">Адрес</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-base"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="photos" className="block text-base font-medium text-gray-700">Фотографии</label>
          <input
            type="file"
            id="photos"
            name="photos"
            accept="image/*"
            multiple
            onChange={handleChange}
            className="mt-2 block w-full text-base text-gray-500 file:mr-4 file:py-2 file:px-5 file:rounded-md file:border file:border-gray-300 file:text-base file:font-medium file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="description" className="block text-base font-medium text-gray-700">Описание</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-base"
          ></textarea>
        </div>

        <div className="mb-6">
          <label htmlFor="services" className="block text-base font-medium text-gray-700">Услуги</label>
          <input
            type="text"
            id="services"
            name="services"
            value={formData.services}
            onChange={handleChange}
            className="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-base"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-5 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-base"
        >
          Отправить
        </button>
      </form>
    </div>
  );
};

export default Form;

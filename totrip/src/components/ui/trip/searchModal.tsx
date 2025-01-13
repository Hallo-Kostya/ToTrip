'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import Modal from '@/components/ui/trip/modal';
import Image from 'next/image';

const BASE_URL = 'http://127.0.0.1:8000';

const SearchPlacesModal = ({ selectedTag, onSelect }) => {
  const [query, setQuery] = useState('');
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query || selectedTag) {
      fetchPlaces();
    }
  }, [query, selectedTag]);

  const fetchPlaces = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/api/search/`,
        {
          query: query || selectedTag || '',
          query_cat: selectedTag || '',
        }
      );
      setPlaces(response.data.places);
    } catch (error) {
      console.error('Ошибка при поиске мест:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Поиск..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-4 py-2 border rounded"
      />
      <div className="mt-4">
        {loading ? (
          <p>Загрузка...</p>
        ) : (
          places.map((place) => (
            <div
              key={place.id}
              className="flex flex-row gap-[24px] items-center hover:bg-gray-100 active:bg-black rounded-lg w-[816px]"
              onClick={() => onSelect(place.id)}
            >
                <Image src={place.photo} alt={place.name} className="rounded-lg" height={80} width={80}/>
                <div className="flex flex-col gap-[8px]">
                    <h2 className='text-[16px] text-black font-medium'>{place.name}</h2>
                    {/* <p className='text-[14px] text-[#5B5B5B] font-light'>{place.location}</p> */}
                    <p className='text-[14px] text-[#5B5B5B] font-light'>{place.description}</p>
                </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchPlacesModal;
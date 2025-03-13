'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';

const BASE_URL = 'http://127.0.0.1:8000';

const SearchPlacesModal = ({ selectedTag, onSelect }) => {
  const [query, setQuery] = useState('');
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query || !selectedTag || selectedTag) {
      fetchPlaces();
    }
  }, [query, selectedTag]);

  const fetchPlaces = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/api/search/`, {
        query: query||'',
        query_cat: selectedTag || '',
      });
  
      const placesWithDefaults = response.data.places.map((place) => ({
        id: place.id,
        photo: `${BASE_URL}/${place.search_image}`,
        name: place.name,
        description: place.description,
      }));
      
      setPlaces(placesWithDefaults);
    } catch (error) {
      console.error('Ошибка при поиске мест:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatter = (desc) => {
    if (desc.length > 100) {
      return desc.slice(0, 100) + '...';
    } else return desc
  }
  

  return (
    <div className=''>
      <input
        type="text"
        placeholder="Поиск..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-4 py-2 border rounded mb-4"
      />
      <div className= 'pt-4 border-t-[1px] border-gray-500'>
        {loading ? (
          <p></p>
        ) : (
          places.map((place) => (
            <div
              key={place.id}
              className="flex flex-row gap-[24px] items-center hover:bg-gray-100 active:bg-black rounded-lg w-[464px] mb-1 hover:cursor-pointer"
              onClick={() => onSelect(place.id)}
            >
              <Image 
                src={place?.photo}
                alt={place?.name} 
                className="rounded-lg" 
                height={80} 
                width={80}
              />
              <div className="flex flex-col gap-[8px]">
                <h2 className='text-[16px] text-black font-medium'>{place?.name}</h2>
                <p className='max-w-[400px] text-[14px] text-[#5B5B5B] font-light'>{formatter(place?.description) || 'Описание отсутствует'}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchPlacesModal;
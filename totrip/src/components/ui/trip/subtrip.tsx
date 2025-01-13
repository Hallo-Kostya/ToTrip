'use client';

import React, { useState } from 'react';
import RoutePointCard from '@/components/ui/trip/routePointCard';
import NoteCard from '@/components/ui/trip/noteCard';
import { deleteSubtrip, deletePlace, deleteNote, addNoteToSubtrip, addPlaceToSubtrip } from '@/services/subtripService';
import DeleteConfirmationModal from '@/components/ui/trip/deleteModal';
import Image from 'next/image';

const Subtrip = ({ tripId, subtrip, onDeleteSubtrip, onUpdateSubtrip }) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
  
    const handleDeleteSubtrip = async () => {
      try {
        await deleteSubtrip(tripId, subtrip.date);
        setShowDeleteModal(false);
        onDeleteSubtrip(subtrip.id);
      } catch (error) {
        console.error('Ошибка при удалении subtrip', error);
      }
    };
  
    const handleDeletePlace = async (place_id) => {
      try {
        await deletePlace(place_id);
        onUpdateSubtrip();
      } catch (error) {
        console.error('Ошибка при удалении места', error);
      }
    };
  
    const handleDeleteNote = async (note_id) => {
      try {
        await deleteNote(note_id);
        onUpdateSubtrip();
      } catch (error) {
        console.error('Ошибка при удалении заметки', error);
      }
    };

    const [isExpanded, setIsExpanded] = useState(false);

    const tags = [
      { id: 1, label: 'Развлечения', icon: '/img/trip-page/masks.svg' },
      { id: 2, label: 'Отели', icon: '/img/trip-page/bed.svg' },
      { id: 3, label: 'Ночная жизнь', icon: '/img/trip-page/wineglass.svg' },
      { id: 4, label: 'Кемпинг', icon: '/img/trip-page/fire.svg' },
      { id: 5, label: 'Музеи', icon: '/img/trip-page/landmark.svg' },
      { id: 6, label: 'Достопримечательности', icon: '/img/trip-page/castle.svg' },
      { id: 7, label: 'Еда', icon: '/img/trip-page/soup.svg' },
      { id: 8, label: 'Заметки', icon: '/img/trip-page/notes.svg' },
      { id: 9, label: 'Поиск', icon: '/img/trip-page/search.svg' },
      { id: 10, label: 'Свернуть', icon: '/img/trip-page/x.svg' },
    ];

    const handleTagClick = async (tag) => {
      if (tag.id === 10) {
        setIsExpanded(false);
      } else if (tag.id === 8) {
        await addNoteToSubtrip(tripId, subtrip.date)
      } else {
        try {
          await addPlaceToSubtrip(tripId, subtrip.date);
          onUpdateSubtrip();
        } catch (error) {
          console.error('Ошибка добавления места', error.message);
        }
      }
    };
  
    return (
      <div key={subtrip.id}>
        <div className="flex items-center justify-between">
        <h3 className="text-[24px] font-bold">
          {new Date(subtrip.date).toLocaleDateString('ru-RU', { day: '2-digit', month: 'long' })}
        </h3>
          <button onClick={() => setShowDeleteModal(true)}>Удалить сабтрип</button>
        </div>
        <div className="mt-4">
          {(subtrip.places || []).map((point, index) => (
            <RoutePointCard
              key={point.id}
              {...point}
              onDelete={() => handleDeletePlace(point.id)}
            />
          ))}
          {(subtrip.notes || []).map((note, index) => (
            <NoteCard
              key={note.id}
              {...note}
              onDelete={() => handleDeleteNote(note.id)}
            />
          ))}
        </div>
        {showDeleteModal && (
          <DeleteConfirmationModal
            onCancel={() => setShowDeleteModal(false)}
            onConfirm={handleDeleteSubtrip}
            itemName={`подпоездку с текущей датой: ${subtrip.date}`}
          />
        )}
        <div className="tags-container">
          {(isExpanded ? tags : tags.slice(-1)).map((tag) => (
            <button
              key={tag.id}
              onClick={() => handleTagClick(tag)}
              className="tag"
            >
              <Image src={tag.icon} alt={tag.label} width={32} height={32} />
            </button>
          ))}
          {isExpanded || (
            <button className="expand-btn" onClick={() => setIsExpanded(true)}>
              <Image src='/img/trip-page/plus.svg' alt='развернуть список тегов' width={32} height={32} />
            </button>
          )}
        </div>
      </div>
    );
  };

export default Subtrip;
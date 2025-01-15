'use client';

import React, { useState } from 'react';
import RoutePointCard from '@/components/ui/trip/routePointCard';
import NoteCard from '@/components/ui/trip/noteCard';
import { deleteSubtrip, deletePlace, deleteNote, addNoteToSubtrip,
  addPlaceToSubtrip,getSubtripDetails } from '@/services/subtripService';
import DeleteConfirmationModal from '@/components/ui/trip/deleteModal';
import Image from 'next/image';
import Modal from './modal';
import SearchPlacesModal from './searchModal';

const BASE_URL = 'http://127.0.0.1:8000';


const Subtrip = ({ tripId, subtrip, onDeleteSubtrip }) => {
  const [places, setPlaces] = useState(subtrip.subtrip_places);
  const [notes, setNotes] = useState(subtrip.subtrip_notes);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [noteModalVisible, setNoteModalVisible] = useState(false);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [selectedTag, setSelectedTag] = useState(null);
  const [currentTag, setCurrentTag] = useState(null);

  const handleDeleteSubtrip = async () => {
    try {
      await deleteSubtrip(tripId, subtrip.date);
      setShowDeleteModal(false);
      onDeleteSubtrip(subtrip.id);
      } catch (error) {
        console.error('Ошибка при удалении subtrip', error);
    }
  };

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

  const updateSubtripDetails = async () => {
    try {
      const { data } = await getSubtripDetails(tripId, subtrip.date);
      setPlaces(data.subtrip.subtrip_places);
      setNotes(data.subtrip.subtrip_notes);
    } catch (error) {
      console.error('Ошибка при обновлении данных подпоездки:', error);
    }
  };

  const handleTagClick = (tag) => {
    if (tag.id === 10) {
      setIsExpanded(false);
    } else if (tag.id >= 1 && tag.id <= 7) {
      setSelectedTag(tag.label);
      setCurrentTag(tag);
      setSearchModalVisible(true);
    } else if (tag.id === 9) {
      setSelectedTag(null);
      setSearchModalVisible(true);
    } else if (tag.id === 8) {
      setSelectedTag(tag.label);
      setCurrentTag(tag);
      setNoteModalVisible(true);
    }
  };

  const handleNoteSubmit = async () => {
    if (noteTitle && noteContent) {
      try {
        await addNoteToSubtrip(tripId, subtrip.date, noteTitle, noteContent);
        setNoteModalVisible(false);
        setNoteTitle('');
        setNoteContent('');
        await updateSubtripDetails();
      } catch (error) {
        console.error('Ошибка при добавлении заметки:', error);
      }
    } else {
      alert('Все поля обязательны');
    }
  };

  const handleAddPlace = async (placeId) => {
    try {
      await addPlaceToSubtrip(tripId, subtrip.date, placeId);
  
      await updateSubtripDetails();
      setSearchModalVisible(false);
    } catch (error) {
      console.error('Ошибка при добавлении места:', error);
    }
  };

  const handleDeletePlace = async (placeId) => {
    try {
      await deletePlace(placeId);
      await updateSubtripDetails();
    } catch (error) {
      console.error('Ошибка при удалении места:', error);
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      await deleteNote(noteId);
      await updateSubtripDetails();
    } catch (error) {
      console.error('Ошибка при удалении заметки:', error);
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
      <div className="mt-20 mb-15">
      {
        Array.isArray(places) && places.length > 0
          ? places.concat(notes).map((item, index, array) => {
              const isFirst = index === 0;
              const isLast = index === array.length - 1;
              const isSecondToLast = array.length >= 3 && index === array.length - 2;

              const isRoutePoint = places.includes(item);

              let styles = 'flex border-l-[2px] relative left-[20px] ';

              if (!isLast) {
                styles += 'pt-[120px] ';
              }

              if (isSecondToLast) {
                styles += 'pb-[120px] ';
              }

              if (isLast) {
                styles += 'border-l-0 ';
              }

              if (array.length === 2) {
                if (isFirst) {
                  styles = 'flex border-l-[2px] relative left-[20px] pb-[120px] ';
                }
              } else if (isFirst) {
                styles = 'flex border-l-[2px] relative left-[20px] ';
              }

              if (isRoutePoint) {
                return (
                  <RoutePointCard
                    key={item.id}
                    tagImg={item.category_icon}
                    placeImg={`${BASE_URL}/${item?.place?.placeimage_set?.[0]?.image}`}
                    placeName={item?.place?.name}
                    description={item?.place?.description}
                    onDelete={() => handleDeletePlace(item.id)}
                    dynamicStyles={styles}
                  />
                );
              } else {
                // NoteCard рендерится здесь
                return (
                  <NoteCard
                    key={item.id}
                    tagImg={`${BASE_URL}/${item.icon}`}
                    title={item.title}
                    content={item.content}
                    onDelete={() => handleDeleteNote(item.id)}
                    dynamicStyles={styles}
                  />
                );
              }
            })
          : (
            <p className="text-gray-500">Элементы отсутствуют.</p>
          )
      }
      </div>
      {showDeleteModal && (
        <DeleteConfirmationModal
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={handleDeleteSubtrip}
          itemName={`подпоездку с текущей датой: ${subtrip.date}`}
        />
      )}
      <div className="mt-14">
        {isExpanded
          ? tags.map((tag) => (
            <button key={tag.id} onClick={() => handleTagClick(tag)} className="tag border-[1.5px] rounded-full border-black p-[10px] mr-[12px]">
              <Image src={tag.icon} alt={tag.label} width={32} height={32} />
            </button>
          ))
        : (
            <button className="expand-btn border-[1.5px] rounded-full border-black p-[10px]" onClick={() => setIsExpanded(true)}>
              <Image src="/img/trip-page/plus.svg" alt="развернуть список тегов" width={32} height={32} />
            </button>
          )}
      </div>
      {/* Модальное окно поиска */}
      {searchModalVisible && (
        <Modal title="Поиск" onClose={() => setSearchModalVisible(false)}>
          <SearchPlacesModal selectedTag={selectedTag} onSelect={(placeId) => handleAddPlace(placeId)} />
        </Modal>
      )}
      {/* Модальное окно добавления заметки */}
      {noteModalVisible && (
        <Modal title="Добавить заметку" onClose={() => setNoteModalVisible(false)}>
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Заголовок"
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
              className="p-2 mb-4 border rounded"
            />
            <textarea
              placeholder="Текст заметки"
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              rows={4}
              className="p-2 mb-4 border rounded"
            />
            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => setNoteModalVisible(false)}
              >
                Отмена
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={handleNoteSubmit}
              >
                Добавить
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Subtrip;
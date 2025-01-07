'use client';

import React, { useState } from 'react';
import RoutePointCard from '@/components/ui/trip/routePointCard';
import NoteCard from '@/components/ui/trip/noteCard';
import { deleteSubtrip, deletePlace, deleteNote } from '@/services/subtripService';
import DeleteConfirmationModal from '@/components/ui/trip/deleteModal';

const Subtrip = ({ subtrip, onDeleteSubtrip, onUpdateSubtrip }) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleDeleteSubtrip = async () => {
        try {
            await deleteSubtrip(subtrip.id);
            setShowDeleteModal(false);
            onDeleteSubtrip(subtrip.id);
        } catch (error) {
            console.error('Ошибка при удалении subtrip', error);
        }
    };

    const handleDeletePlace = async (placeId) => {
        try {
            await deletePlace(placeId);
            onUpdateSubtrip();
        } catch (error) {
            console.error('Ошибка при удалении места', error);
        }
    };

    const handleDeleteNote = async (noteId) => {
        try {
            await deleteNote(noteId);
            onUpdateSubtrip();
        } catch (error) {
            console.error('Ошибка при удалении заметки', error);
        }
    };

    return (
        <div key={subtrip.id}>
            {/* Subtrip Header */}
            <div className="flex items-center justify-between">
                <h3 className="text-[24px] font-bold">{subtrip.date}</h3>
                <button onClick={() => setShowDeleteModal(true)}>Удалить сабтрип</button>
            </div>
            <div className="mt-4">
                {subtrip.places.map((point, index) => (
                    <RoutePointCard 
                        key={point.id} 
                        {...point} 
                        onDelete={() => handleDeletePlace(point.id)}
                    />
                ))}
                {subtrip.notes.map((note, index) => (
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
                    itemName={`Subtrip: ${subtrip.date}`}
                />
            )}
        </div>
    );
};

export default Subtrip;
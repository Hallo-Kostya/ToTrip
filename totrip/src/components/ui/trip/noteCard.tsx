import React from 'react';

interface NoteCardProps {
    title: string;
    content: string;
    onDelete: () => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ title, content, onDelete }) => {

    return (
        <div className="flex justify-between items-center bg-white p-4 mb-2 shadow rounded">
            <h3>{title}</h3>
            <p>{content}</p>
            <button 
                className="text-red-500"
                onClick={onDelete}
            >
                Удалить
            </button>
        </div>
    );
};

export default NoteCard;
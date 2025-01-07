import React from 'react';

interface NoteCardProps {
    id: number;
    content: string;
    onDelete: () => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ content, onDelete }) => {
    return (
        <div className="flex justify-between items-center bg-white p-4 mb-2 shadow rounded">
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
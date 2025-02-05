import React from 'react';

interface DeleteConfirmationModalProps {
    onCancel: () => void;
    onConfirm: () => void;
    itemName: string;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ onCancel, onConfirm, itemName }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded shadow-lg max-w-sm w-full">
                <p className="mb-4">Вы уверены, что хотите удалить {itemName}?</p>
                <div className="flex justify-end gap-2">
                    <button
                        className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition"
                        onClick={onConfirm}
                    >
                        Удалить
                    </button>
                    <button
                        className="bg-gray-300 py-1 px-3 rounded hover:bg-gray-400 transition"
                        onClick={onCancel}
                    >
                        Отменить
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;
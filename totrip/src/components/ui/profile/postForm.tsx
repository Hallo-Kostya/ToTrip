import React, { useState } from 'react';

interface PostFormProps {
    onClose: () => void;
    onSubmit: (data: {
        title: string;
        rating: number;
        comment: string;
        image?: File;
        images?: File[];
    }) => void;
    formType: 'comment' | 'photo' | 'overview';
}

const PostForm: React.FC<PostFormProps> = ({ onClose, onSubmit, formType }) => {
    const [title, setTitle] = useState('');
    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [images, setImages] = useState<File[]>([]);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
  
      const commonData = {
          title,
          rating,
          comment,
      };
      
      if (formType === 'photo') {
          onSubmit({
              ...commonData,
              image
          });
      } else if (formType === 'overview') {
          const imageUrls = images.map((image) => URL.createObjectURL(image));
          onSubmit({
              ...commonData,
              images: imageUrls
          });
      } else {
          onSubmit(commonData);
      }
  
      onClose();
  };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-[500px]">
                <h2 className="text-2xl font-bold mb-4">
                    {formType === 'comment' ? 'Создать отзыв' : formType === 'photo' ? 'Выложить фото' : 'Создать обзор'}
                </h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="text"
                        className="border p-2 rounded"
                        placeholder="Название поездки"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <select
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                        className="border p-2 rounded"
                    >
                        {[1, 2, 3, 4, 5].map((r) => (
                            <option key={r} value={r}>{r} звезд{r === 1 ? 'а' : 'ы'}</option>
                        ))}
                    </select>
                    {formType === 'photo' && (
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files?.[0] || null)}
                            required
                        />
                    )}
                    {formType === 'overview' && (
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(e) => setImages(Array.from(e.target.files || []))}
                        />
                    )}
                    <textarea
                        placeholder="Ваш комментарий"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                        className="border p-2 rounded min-h-[100px]"
                    />
                    <div className="flex justify-end gap-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 border rounded">Отменить</button>
                        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Отправить</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PostForm;
'use client'
import styles from '@/components/css/styles.module.css';
import Image from 'next/image';
import Link from 'next/link';
import Stars from '@/components/ui/Common/Stars';
const overlayStyle = { background: 'rgba(0,0,0,0.5)' };
import dynamic from 'next/dynamic';
import Map from '@/components/ui/maps/map';
import RecommendationsSection from '@/components/ui/main-page/Recomendations/recomendations';
const Popup = dynamic(() => import('reactjs-popup'), { ssr: false });
import { useParams } from 'next/navigation';
import { fetchObjectCard, iObjectCard } from '@/services/data';
import { useEffect, useState } from 'react';
import Comment from '@/components/ui/main-page/comments/comment';

const placeData = [
    {
        id: 1758,
        title: "Lotte Hotel",
        reviewsCount: "1.2K",
        placeImg: "/img/index/like-it__place-photo.jpg",
        rating: 2,
    },
    {
        id: 1758,
        title: "Lotte Hotel",
        reviewsCount: "1.2K",
        placeImg: "/img/index/like-it__place-photo.jpg",
        rating: 3,
    },
    {
        id: 1758,
        title: "Lotte Hotel",
        reviewsCount: "1.2K",
        placeImg: "/img/index/like-it__place-photo.jpg",
        rating: 4,
    },
    {
        id: 1758,
        title: "Lotte Hotel",
        reviewsCount: "1.2K",
        placeImg: "/img/index/like-it__place-photo.jpg",
        rating: 5,
    },

];


export default function Page() {
    const { id } = useParams();
    const [object, setObject] = useState<null | iObjectCard>(null);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentImage, setCurrentImage] = useState('/img/common/noimage.jpg');

    const nextImageHandler = () => {
        if (!object || !object.placeimage_set.length) return;
        const nextIndex = (currentIndex + 1) % object.placeimage_set.length;
        setCurrentIndex(nextIndex);
        setCurrentImage(`${object.placeimage_set[nextIndex].image}`);
    };

    const prevImageHandler = () => {
        if (!object || !object.placeimage_set.length) return;
        const prevIndex =
            (currentIndex - 1 + object.placeimage_set.length) % object.placeimage_set.length;
        setCurrentIndex(prevIndex);
        setCurrentImage(`${object.placeimage_set[prevIndex].image}`);
    };

    const handleImageClick = (index: number, imageUrl: string) => {
        setCurrentIndex(index);
        setCurrentImage(imageUrl);
    };

    useEffect(() => {
        if (id) {
            fetchObjectCard(Number(id))
                .then((data) => {
                    setObject(data);
                    setLoading(false);
                    if (data) {
                        setCurrentImage(`${data.placeimage_set[0].image}`)
                    }
                })
                .catch((error) => {
                    console.error("Ошибка загрузки объекта: ", error);
                    setLoading(false);
                });
        }
    }, [id]);

    const commentData = {
        imageUrl: "/img/town-page/places-photo__card.jpg", // Путь к изображению пользователя
        Username: "Иван Иванов", // Имя пользователя
        date: "06.01.2025", // Дата комментария
        rating: 4.5, // Оценка (например, от 0 до 5)
        objectName: "Отличное место", // Название объекта
        objectDescription: "Очень красивое место с отличным видом на горы. Рекомендую к посещению!Очень красивое место с отличным видом на горы. Рекомендую к посещениюОчень красивое место с отличным видом на горы. Рекомендую к посещениюОчень красивое место с отличным видом на горы. Рекомендую к посещениюОчень красивое место с отличным видом на горы. Рекомендую к посещению", // Описание объекта
        images: [
            { image: "/img/common/noimage.jpg" }, // Список фотографий объекта
            { image: "/img/common/noimage.jpg" },
            { image: "/img/common/noimage.jpg" },
            { image: "/img/common/noimage.jpg" }, // Список фотографий объекта
            { image: "/img/common/noimage.jpg" },
            { image: "/img/common/noimage.jpg" },
            { image: "/img/common/noimage.jpg" }, // Список фотографий объекта
            { image: "/img/common/noimage.jpg" },
            { image: "/img/common/noimage.jpg" },
            { image: "/img/common/noimage.jpg" }, // Список фотографий объекта
            { image: "/img/common/noimage.jpg" },
            { image: "/img/common/noimage.jpg" },
            { image: "/img/common/noimage.jpg" }, // Список фотографий объекта
            { image: "/img/common/noimage.jpg" },
            { image: "/img/common/noimage.jpg" },
        ],
    };


    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <div className="flex flex-col items-center bg-white p-10 rounded-lg shadow-lg">
                    <svg
                        className="animate-spin h-10 w-10 text-blue-500 mb-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                    </svg>
                    <h1 className="text-lg font-bold text-gray-800">Загрузка...</h1>
                </div>
            </div>
        );
    }

    if (!object) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <div className="flex flex-col items-center bg-white p-10 rounded-lg shadow-lg">
                    <svg
                        className="h-10 w-10 text-gray-500 mb-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"
                        ></path>
                    </svg>
                    <h1 className="text-lg font-bold text-gray-700">Объект не найден</h1>
                    <p className="text-sm text-gray-500 mt-2">Пожалуйста, перезагрузите страницу или попробуйте позже.</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.mainContent}>
            <div>
                <div className='max-w-[1696px] flex items-center mt-[112px]'>
                    <h1 className="text-[56px] font-bold">{object.name}</h1>
                    {/* <p className='ml-[24px] mt-[29px] font-bold font-[20px] color-[#323232]'>№1 / 532 в категории Отели, Москва</p> */}
                    <div className='ml-auto bg-white rounded-[36px]'>
                        <Image src="/img/common/heart.svg" alt="Избранное" width={72} height={72} className='p-[15px]' />
                    </div>
                </div>
                <div className='max-w-[1600px] flex items-center mt-[27px]'>
                    <Image src="/img/common/map-point.svg" width={36} height={36} alt="" className={styles.mapPoint} />
                    <p className='text-[24px] font-bold ml-[12px]'>{object.address}</p>
                    <ul className='flex ml-[48px] gap-[6px]'>
                        <Stars rating={4} width={35} height={35} />
                    </ul>
                    <p className='text-[20px] font-bold ml-[32px]'>0 отзывов</p>
                </div>
                <div className='max-w-[1696px] mt-42px'>
                    <div className='relative mt-[42px] mb-[62px] w-[1693px] h-[524px] rounded-[36px]'>

                        <Image src={currentImage} alt="фото места" fill quality={100} className='rounded-[36px] object-cover' />
                        <Popup trigger={
                            <button className="absolute text-white text-[20px] font-bold p-2 bg-black rounded-[10px] right-[27px] bottom-[27px]" aria-describedby="popup-description">Посмотреть все фото</button>

                        } modal overlayStyle={overlayStyle}>
                            <div className='flex bg-white w-[1696px] gap-[60px] p-[40px] flex-col rounded-[36px] mt-[30 px]'>
                                <div className='flex flex-col'>
                                    <div className='flex flex-row'>
                                        <h1 className='text-[56px] font-bold mr-[24px]'>{object.name}</h1>
                                        <h6 className='text[20px] font-bold text-[#323232] mt-[40px]'>№1 / 532 в категории Отели, Москва </h6>
                                        <Image src="/img/common/heart.svg" alt="Избранное" width={72} height={72} className='p-[15px] ml-[auto]' />
                                    </div>
                                    <div className='flex flex-row'>
                                        <Image src="/img/common/map-point.svg" width={36} height={36} alt="" className={styles.mapPoint} />
                                        <p className='text-[24px] font-bold ml-[12px]'>{object.address}</p>
                                        <ul className='flex ml-[48px] gap-[6px]'>
                                            <Stars rating={4.5} width={35} height={35} />
                                        </ul>
                                        <p className='text-[20px] font-bold ml-[32px]'>0 отзывов</p>
                                    </div>
                                </div>
                                <div className='gap-[40px] flex flex-row'>
                                    <div className='w-[456px] h-[545px] overflow-x-hidden overflow-y-scroll scrollbar-hide'>
                                        <h5 className='text-[24px] font-bold mb-[20px]'>Фотографии</h5>
                                        <div className='flex flex-wrap gap-[16px]'>
                                            {object.placeimage_set.map((image, index) => (
                                                <div
                                                    key={index}
                                                    className='relative w-[220px] h-[170px] cursor-pointer'
                                                    onClick={() => handleImageClick(index, `${image.image}`)}
                                                >
                                                    <Image
                                                        src={`${image.image}`}
                                                        alt="фото места"
                                                        fill
                                                        quality={100}
                                                        className='rounded-[20px] object-cover'
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="relative w-[1120px] h-[545px] rounded-[32px]">
                                        <Image
                                            src={currentImage}
                                            alt="фото места"
                                            fill
                                            quality={100}
                                            className='rounded-[32px] object-cover'
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent via-[40%] to-transparent rounded-[32px]"></div>
                                        <Link onClick={(e) => {
                                            e.preventDefault();
                                            nextImageHandler();
                                        }}
                                            href='#' className='absolute right-[16px] top-[231px]'>
                                            <Image src='/img/common/arrow-right.svg' width={60} height={60} alt='стрелочка' />
                                        </Link>
                                        <Link onClick={(e) => {
                                            e.preventDefault();
                                            prevImageHandler();
                                        }}
                                            href='#' className='absolute left-[16px] top-[231px] rotate-180'>
                                            <Image src='/img/common/arrow-right.svg' width={60} height={60} alt='стрелочка' />
                                        </Link>
                                        <div className='flex flex-row w-[1040px] justify-between absolute left-[40px] bottom-[18px] text-white text-[22px] font-bold items-center'>
                                            <p>{object.name}</p>
                                            <p>{`${currentIndex + 1}/${object.placeimage_set.length}`}</p>
                                            <div className='flex flex-row text-[18px] font-bold'>
                                                <p className='mr-[15px]'>Источник:</p>
                                                <Image src='/img/user-photo.png' alt='Фото пользователя' width={32} height={32} className='rounded-[32] mr-[10px]'></Image>
                                                <p className='font-normal'>Мария А.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Popup>
                        <Link onClick={(e) => {
                            e.preventDefault();
                            nextImageHandler();
                        }}
                            href='#' className='absolute right-[16px] top-[231px]'><Image src='/img/common/arrow-right.svg' width={60} height={60} alt='стрелочка' /></Link>
                        <Link onClick={(e) => {
                            e.preventDefault();
                            prevImageHandler();
                        }} href='#' className='absolute left-[16px] top-[231px] rotate-180'><Image src='/img/common/arrow-right.svg' width={60} height={60} alt='стрелочка' /></Link>
                    </div>
                </div>
                <div className='flex flex-row gap-[32px]'>
                    <div className='max-w-[1120px] flex p-[40px] flex-col bg-white rounded-[24px]'>
                        <h2 className='text-[48px] font-bold mb-[20px]'>О нас</h2>
                        <ul className='mb-[64px] flex flex-col gap-[20px] w-[1040px]'>
                            <ul className={`${styles.stars} ${styles.fiveStar}`}>
                                <Stars rating={4.5} width={35} height={35} />
                                <p className='text-[20px] font-bold'>Расположение</p>
                            </ul>
                            <ul className={`${styles.stars} ${styles.fiveStar}`}>
                                <Stars rating={4.5} width={35} height={35} />
                                <p className={styles.attributeName}>Чистота</p>
                            </ul>
                            <ul className={`${styles.stars} ${styles.fiveStar}`}>
                                <Stars rating={4.5} width={35} height={35} />
                                <p className={styles.attributeName}>Обслуживание</p>
                            </ul>
                            <ul className={`${styles.stars} ${styles.fiveStar}`}>
                                <Stars rating={4.5} width={35} height={35} />
                                <p className={styles.attributeName}>Цена/качество</p>
                            </ul>
                        </ul>
                        <div>
                            <p className='text-[25px] font-medium'>{object.description}</p>
                        </div>
                    </div>
                    <Map width={541} height={928} borderRadius={24} address={object.address} />
                </div>
            </div>
            <div className='mt-[63px] mb-[63px]'><RecommendationsSection places={placeData} /></div>
            <div className='flex w-[1697px] p-[40px] flex-col gap-[21px] rounded-[24px] bg-white shadow-sm'>
                <div className='flex flex-row justify-between content-center align-center'>
                    <h2 className='text-bold'>Отзывы</h2>
                    <button className='self-center flex align-center bg-black shadow rounded-[16px] text-white h-[63px] px-[32px] py-[18px]'>Написать отзыв</button>
                </div>
                <Comment
                    imageUrl={commentData.imageUrl}
                    Username={commentData.Username}
                    date={commentData.date}
                    rating={commentData.rating}
                    objectName={commentData.objectName}
                    objectDescription={commentData.objectDescription}
                    photos={commentData.images}
                />
            </div>
        </div>
    )
}

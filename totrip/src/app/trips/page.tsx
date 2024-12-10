import React from 'react';
import TripCard from '@/components/ui/trips/tripCard';
import Image from 'next/image';

const TripsPage = () => {
    return (
        <div className='my-trips max-w-full mb-[100px]'>
            <div className="my-trips__header flex justify-between items-center max-w-[1696px] mx-auto mt-[101px]">
                <h1 className="text-[56px] font-bold">Мои поездки</h1>
                <button type="button" className="rounded-[24px] bg-btn p-[20px]">
                    <span className="text-[24px] font-bold">Запланировать новую поездку</span>
                </button>
            </div>

            <div className="mt-[109px] flex flex-col mx-auto max-w-[1696px]">
                <div className="flex justify-between items-center">
                    <h2 className="text-[48px] font-bold">Прошедшие</h2>
                    <button className="">
                        <Image src="img/common/unwrap__button.svg" alt="toggle content" className="" width={60} height={60} />
                    </button>
                </div>
                <div className="trips-container past">
                    <TripCard tripTitle={'Поездка к родным'} tripDate={'16 окт. - 28 окт.'} tripPlace={'Нижний Новгород'} users={3} tripImage={'./img/trips-page/exp_photo.png'} />
                </div>
            </div>

            <div className="mt-[67px] flex flex-col mx-auto max-w-[1696px]">
                <div className="flex justify-between items-center">
                    <h2 className="text-[48px] font-bold">Предстоящие</h2>
                    <button className="">
                        <Image src="img/common/unwrap__button.svg" alt="toggle content" className="" width={60} height={60} />
                    </button>
                </div>
                <div className="trips-container future">
                    <TripCard tripTitle={'Поездка'} tripDate={'12 дек. - 22 дек.'} tripPlace={'Орск'} users={5} tripImage={'./img/trips-page/exp_photo.png'} />
                </div>
            </div>

            <div className="mt-[67px] flex flex-col mx-auto max-w-[1696px]">
                <div className="flex justify-between items-center">
                    <h2 className="text-[48px] font-bold">Текущие</h2>
                    <button className="">
                        <Image src="img/common/unwrap__button.svg" alt="toggle content" className="" width={60} height={60} />
                    </button>
                </div>
                <div className="trips-container current">
                    <TripCard tripTitle={'Путешествие'} tripDate={'31 дек. - 11 янв.'} tripPlace={'Тольятти'} users={1} tripImage={'./img/trips-page/exp_photo.png'} />
                </div>
            </div>
        </div>
    );
};

export default TripsPage;

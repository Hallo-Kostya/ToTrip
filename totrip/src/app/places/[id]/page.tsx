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


export default function Page() {
    return (
        <div className={styles.mainContent}>
            <div className={styles.contentWrapper}>
                <div className='max-w-[1696px] flex items-center mt-[112px]'>
                    <h1 className="text-[56px] font-bold">Mercure Москва Павелецкая</h1>
                    <p className='ml-[24px] mt-[29px] font-bold font-[20px] color-[#323232]'>№1 / 532 в категории Отели, Москва</p>
                    <div className='ml-auto bg-white rounded-[36px]'>
                        <Image src="/img/common/heart.svg" alt="Избранное" width={72} height={72} className='p-[15px]' />
                    </div>
                </div>
                <div className='max-w-[760px] flex items-center mt-[27px]'>
                    <Image src="/img/common/map-point.svg" width={36} height={36} alt="" className={styles.mapPoint} />
                    <p className='text-[24px] font-bold ml-[12px]'>Ул. Бахрушина, 11, Москва</p>
                    <ul className='flex ml-[48px] gap-[6px]'>
                        <Stars rating={4.5} width={35} height={35} />
                    </ul>
                    <p className='text-[20px] font-bold ml-[32px]'>0 отзывов</p>
                </div>
                <div className='max-w-[1696px] mt-42px'>
                    <div className='relative mt-[42px] mb-[62px] w-[1693px] h-[524px] rounded-[36px]'>

                        <Image src="/img/place-overview/place-photo.jpg" alt="фото места" fill quality={100} className='rounded-[36px] object-cover' />
                        <Popup trigger={
                            <button className="absolute text-white text-[20px] font-bold p-2 bg-black rounded-[10px] right-[27px] bottom-[27px]" aria-describedby="popup-description">Посмотреть все фото</button>

                        } modal overlayStyle={overlayStyle}>
                            <div className='flex bg-white w-[1696px] gap-[60px] p-[40px] flex-col rounded-[36px] mt-[30 px]'>
                                <div className='flex flex-col'>
                                    <div className='flex flex-row'>
                                        <h1 className='text-[56px] font-bold mr-[24px]'>Mercure Москва Павелецкая</h1>
                                        <h6 className='text[20px] font-bold text-[#323232] mt-[40px]'>№1 / 532 в категории Отели, Москва </h6>
                                        <Image src="/img/common/heart.svg" alt="Избранное" width={72} height={72} className='p-[15px] ml-[auto]' />
                                    </div>
                                    <div className='flex flex-row'>
                                        <Image src="/img/common/map-point.svg" width={36} height={36} alt="" className={styles.mapPoint} />
                                        <p className='text-[24px] font-bold ml-[12px]'>Ул. Бахрушина, 11, Москва</p>
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
                                            <div className='relative w-[220px] h-[170px] '>
                                                <Image src="/img/place-overview/place-photo.jpg" alt="фото места" fill quality={100} className='rounded-[20px] object-cover' />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="relative w-[1120px] h-[545px] rounded-[32px]">
                                        <Image src="/img/place-overview/place-photo.jpg" alt="фото места" fill quality={100} className='rounded-[32px] object-cover' />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent via-[40%] to-transparent rounded-[32px]"></div>
                                        <Link href='#' className='absolute right-[16px] top-[231px]'><Image src='/img/common/arrow-right.svg' width={60} height={60} alt='стрелочка' /></Link>
                                        <Link href='#' className='absolute left-[16px] top-[231px] rotate-180'><Image src='/img/common/arrow-right.svg' width={60} height={60} alt='стрелочка' /></Link>
                                        <div className='flex flex-row w-[1040px] justify-between absolute left-[40px] bottom-[18px] text-white text-[22px] font-bold items-center'>
                                            <p>Название локации</p>
                                            <p>1 / 1</p>
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
                        <Link href='#' className='absolute right-[16px] top-[231px]'><Image src='/img/common/arrow-right.svg' width={60} height={60} alt='стрелочка' /></Link>
                        <Link href='#' className='absolute left-[16px] top-[231px] rotate-180'><Image src='/img/common/arrow-right.svg' width={60} height={60} alt='стрелочка' /></Link>
                    </div>
                </div>
                <div className='flex flex-row gap-[32px]'>
                    <div className='max-w-[1120px] flex p-[40px] flex-col bg-white rounded-[24px] mb-[200px]'>
                        <h2 className='text-[48px] font-bold mb-[20px]'>О нас</h2>
                        <ul className='mb-[64px] flex flex-col gap-[20px]'>
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
                            <p className='text-[25px] font-medium'>Hipster ipsum tattooed brunch Im baby. Tbh juice green wolf iPhone tumblr dollar pok heirloom flannel. Keytar gentrify street on hella bespoke viral franzen. Keffiyeh next belly seitan jean vexillologist thundercats migas swag kogi. Raw small rights keffiyeh next diy vexillologist roof crucifix. 3-moon letterpress pop-up meggings mixtape tumblr tonx man. Tacos kinfolk tumeric asymmetrical v on charcoal vinegar. Letterpress ascot try-hard keytar sartorial.<br /><br />Hipster ipsum tattooed brunch Im baby. Tbh juice green wolf iPhone tumblr dollar pok heirloom flannel. Keytar gentrify street on hella bespoke viral franzen. Keffiyeh next belly seitan jean vexillologist thundercats migas swag kogi. Raw small rights keffiyeh next diy vexillologist roof crucifix. 3-moon letterpress pop-up meggings mixtape tumblr tonx man. Tacos kinfolk tumeric asymmetrical v on charcoal vinegar. Letterpress ascot try-hard keytar sartorial.</p>
                        </div>
                    </div>
                    <Map width={541} height={928} borderRadius={24}/>
                </div>
            </div>
            <RecommendationsSection/>
        </div>
    )
}
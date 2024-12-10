
import { SearchContainer } from '@/components/ui/main-page/Search/searchContainer';
import Image from 'next/image';
import { SearchElement } from '@/components/ui/main-page/Search/searchElement';
import { SearchElementProps } from '@/components/ui/main-page/Search/searchElement';

const searchElements: SearchElementProps[] = [
    {
      imgUrl: '/img/town-page/places-photo__card.jpg',
      name: 'Место 1',
      rating: 4.5,
      reviewCnt: 120,
      description: 'Это описание первого места. Здесь можно увидеть много интересных достопримечательностей и провести время с комфортом.',
      tags: [
        { iconUrl: '/img/town-page/art__icon.svg', label: 'Искусство' },
        { iconUrl: '/img/town-page/nature__icon.svg', label: 'Природа' },
      ],
    },
    {
      imgUrl: '/img/town-page/places-photo__card.jpg',
      name: 'Место 2',
      rating: 4.0,
      reviewCnt: 80,
      description: 'Второе место известно своими историческими памятниками и культурным наследием. Отличное место для любителей истории.',
      tags: [
        { iconUrl: '/img/town-page/history__icon.svg', label: 'История' },
        { iconUrl: '/img/town-page/culture__icon.svg', label: 'Культура' },
      ],
    },
  ];
  
export default function Page() {
    return (  
        <section className='bg-[#E4E4E4] pb-[100px]'>
            <div className="relative w-full h-[589] mt-[-100px] mb-[53px]">
                <Image src="/img/index/main-photo.jpg" alt="фото места" fill quality={100} className='object-cover'/>
                <div className='py-[300px]'>
                    <SearchContainer/>
                </div>
            </div>
            <div className='flex flex-row gap-[32px] justify-center'>
                <ul className='flex flex-col w-[400px] gap-[12px] font-[600] text-[18px] text-center'>
                    <li className='w-[400]'>
                    <p className='py-[16px] bg-white rounded-[16px]'>Все категории</p>
                    </li>
                    {searchElements.map((element) =>
                    element.tags.map((tag, tagIndex) => (
                    <li key={tagIndex} className="flex flex-row gap-[12px] p-[12px] bg-white rounded-[16px] w-[400] justify-center items-center">
                        <Image src={tag.iconUrl} width={32} height={32} alt="категория" />
                        <p>{tag.label}</p>
                    </li>
                    ))
                )}
                </ul>
                <div className='flex flex-col gap-[60px] w-[1264px] '>
                    <h2 className='font-bold text-[48px]'>Результаты поиска</h2>
                    {searchElements.map((element, index) => (
                                <SearchElement
                                key={index}
                                imgUrl={element.imgUrl}
                                name={element.name}
                                rating={element.rating}
                                reviewCnt={element.reviewCnt}
                                description={element.description}
                                tags={element.tags}/>
                            ))}
                </div>
            </div>
        </section>
    );
  }

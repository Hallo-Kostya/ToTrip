'use client'
import { SearchContainer } from '@/components/ui/main-page/Search/searchContainer';
import Image from 'next/image';
import { SearchElement } from '@/components/ui/main-page/Search/searchElement';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { BASE_URL, category, fetchFullSearchPlaceCards, iFullSearchPlaceCard } from '@/services/data';

export default function Page() {
  const [searchResults, setSearchResults] = useState<iFullSearchPlaceCard[]>([]);
  const [loading, setLoading] = useState(false);
  const params = useSearchParams();
  const router = useRouter();

  const [query, setQuery] = useState('екат');
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [sortThenBy, setSortThenBy] = useState('reviewCnt');
  const [isAsc, setIsAsc] = useState('asc');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const results = await fetchFullSearchPlaceCards(query, category, sortBy, sortThenBy, isAsc);
      setSearchResults(results);
      setLoading(false);
    };

    fetchData();
  }, [query, category, sortBy, sortThenBy, isAsc]);

  const clickHandler = (tagName: string) => {
    const param = new URLSearchParams(params.toString());
    if (tagName) {
      param.set('category', tagName);
    } else {
      param.delete('category');
    }
    router.push(`?${param.toString()}`, { scroll: false });
  };

  return (
    <section className='bg-[#E4E4E4] pb-[100px]'>
      <div className="relative w-full h-[589px] mt-[-100px] mb-[53px]">
        <Image src="/img/index/main-photo.jpg" alt="фото места" fill quality={100} className='object-cover' />
        <div className='py-[300px]'>
          <SearchContainer />
        </div>
      </div>
      <div className='flex flex-row gap-[32px] justify-center'>
        <ul className='flex flex-col w-[400px] gap-[12px] font-[600] text-[18px] text-center'>
          <ul className='flex flex-row gap-[23px] mb-[64px]'>
            <li className='flex flex-row gap-[12px] p-[16px] bg-white rounded-[16px] items-center'>
              <Image src='/img/common/arrow-down-wide-narrow-1.svg' height={32} width={32} alt='иконка фильтра' />
              <p>Рейтинг</p>
            </li>
            <li className='flex flex-row gap-[12px] p-[16px] bg-white rounded-[16px] items-center'>
              <Image src='/img/common/arrow-down-wide-narrow-1.svg' height={32} width={32} alt='иконка фильтра' />
              <p>Кол-во отзывов</p>
            </li>
          </ul>
          <li className='w-[400px]'>
            <p className='py-[16px] bg-white rounded-[16px]'>Все категории</p>
          </li>
          {searchResults.map((element) =>
            element.categories?.map((category : category, index : number) => (
              <li onClick={() => clickHandler(category.name)} key={index} className="items-center cursor-pointer flex flex-row gap-[12px] p-[12px] bg-white rounded-[16px] w-[400] justify-center items-center">
                <Image src={`${BASE_URL}${category.icon}`} width={32} height={32} alt="категория" />
                <p>{category.name}</p>
              </li>
            ))
          )}
        </ul>
        <div className='flex flex-col gap-[60px] w-[1264px]'>
          <h2 className='font-bold text-[48px]'>Результаты поиска</h2>
          {loading ? (
            <p>Загрузка...</p>
          ) : (
            searchResults.map((element, index) => (
              <SearchElement
                key={index}
                id={element.id}
                imgUrl={element.photo}
                name={element.name}
                rating={element.avg_rating}
                reviewCnt={element.reviews_count}
                description={element.description}
                tags={element.categories} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}

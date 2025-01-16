'use client'
import { SearchContainer } from '@/components/ui/main-page/Search/searchContainer';
import Image from 'next/image';
import { SearchElement } from '@/components/ui/main-page/Search/searchElement';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { BASE_URL, fetchFullSearchPlaceCards, iFullSearchPlaceCard } from '@/services/data';

export default function Page() {
  const [searchResults, setSearchResults] = useState<iFullSearchPlaceCard[]>([]);
  const [loading, setLoading] = useState(false);
  const params = useSearchParams();
  const router = useRouter();

  const [query, setQuery] = useState(params.get('query') || ''); 
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [isAsc, setIsAsc] = useState('asc');
  const [activeSort, setActiveSort] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const results = await fetchFullSearchPlaceCards(query, category, sortBy, '', isAsc);
      setSearchResults(results);
      setLoading(false);
    };

    fetchData();
  }, [query, category, sortBy, isAsc]);

  useEffect(() => {
    setQuery(params.get('query') || '');
    setCategory(params.get('category') || '');
  }, [params]);

  const clickHandler = (tagName: string) => {
    const param = new URLSearchParams(params.toString());
    if (tagName) {
      param.set('category', tagName);
      setCategory(tagName);
      setActiveCategory(tagName);
    } else {
      param.delete('category');
      setCategory('');
      setActiveCategory('');
    }
    router.push(`?${param.toString()}`, { scroll: false });
  };

  const uniqueCategories = Array.from(
    new Set(searchResults.flatMap((element) => element.categories.map((category) => category.id)))
  ).map((id) => {
    const category = searchResults
      .flatMap((element) => element.categories)
      .find((cat) => cat.id === id);
    return category;
  });

  const handleSortClick = (sortType: string) => {
    setActiveSort(sortType);
    if (sortType === 'rating') {
      if (sortBy !== 'rating') {
        setSortBy('rating');
        setIsAsc('asc');
      } else if (sortBy === 'rating' && isAsc === 'asc') {
        setIsAsc('desc');
      } else {
        setSortBy('');
        setIsAsc('asc');
      }
    } else if (sortType === 'reviews_count') {
      if (sortBy !== 'reviews_count') {
        setSortBy('reviews_count');
        setIsAsc('asc');
      } else if (sortBy === 'reviews_count' && isAsc === 'asc') {
        setIsAsc('desc');
      } else {
        setSortBy('');
        setIsAsc('asc');
      }
    }
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
            <li
              className={`sort-item py-[10.33px] px-[17.21px] flex items-center space-x-2 rounded-xl shadow-md cursor-pointer ${
                activeSort === 'rating' ? 'bg-blue-500 text-white' : 'bg-white text-black'
                
              }`}
              onClick={() => handleSortClick('rating')}
            >
              <Image src='/img/common/arrow-down-wide-narrow-1.svg' height={32} width={32} alt='иконка фильтра' />
              <p>Рейтинг</p>
            </li>
            <li
              className={`py-[10.33px] px-[17.21px] flex items-center space-x-2 rounded-xl shadow-md cursor-pointer ${
                activeSort === 'reviews_count' ? 'bg-blue-500 text-white' : 'bg-white text-black'
              }`}
              onClick={() => handleSortClick('reviews_count')}
            >
              <Image src='/img/common/arrow-down-wide-narrow-1.svg' height={32} width={32} alt='иконка фильтра' />
              <p>Кол-во отзывов</p>
            </li>
          </ul>
          <li className='w-[400px] cursor-pointer' onClick={() => clickHandler('')}>
            <p className='py-[16px] bg-white rounded-[16px]'>Все категории</p>
          </li>
          {uniqueCategories.map((category) => (
            category && (
              <li
                onClick={() => clickHandler(category.name)}
                key={category.id}
                className={`items-center cursor-pointer flex flex-row gap-[12px] p-[12px] rounded-[16px] w-[400] justify-center items-center ${
                  activeCategory === category.name ? 'bg-blue-500 text-white' : 'bg-white text-black'
                }`}
              >
                <Image src={`${BASE_URL}${category.icon}`} width={32} height={32} alt="категория" />
                <p>{category.name}</p>
              </li>
            )
          ))}
        </ul>
        <div className='flex flex-col gap-[60px] max-w-[1264px] w-full'>
          <h2 className='font-bold text-[48px]'>Результаты поиска</h2>
          {loading ? (
            <p className="text-center text-lg font-semibold text-gray-600">Загрузка...</p>
          ) : searchResults.length === 0 ? (
            <div className="flex justify-center items-center h-[200px] bg-white rounded-[20px] shadow-md w-full max-w-[1264px]">
              <div className="bg-white rounded-lg">
                <p className="text-center text-xl font-bold text-red-500">Ничего не найдено</p>
              </div>
            </div>
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
                tags={element.categories}
                width={1264} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}

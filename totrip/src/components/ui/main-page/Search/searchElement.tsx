import Image from "next/image"
import Stars from "../../Common/Stars"

export interface SearchElementProps {
    imgUrl: string; // URL изображения
    name: string; // Название места
    rating: number; // Рейтинг в виде числа
    reviewCnt: number; // Количество отзывов
    description: string; // Описание места
    tags: Array<{ iconUrl: string; label: string }>; // Массив тегов с иконкой и текстом
  }

export const SearchElement = ({imgUrl, name, rating, reviewCnt, description, tags}: SearchElementProps) => {
    return (
        <div className='gap-[32px] max-w-[1264px] flex bg-white rounded-[20px]'>
            <Image
            src={imgUrl}
            width={400}
            height={400}
            alt="картинка результата поиска"
            className="rounded-[20px]"
            style={{ objectFit: "cover" }}
            />
            <div className='flex flex-col'>
                <div className='flex mb-[32px] mt-[24px]'>
                    <p className='text-[24px] font-bold mr-[20px]'>{name}</p>
                    <Stars rating={rating}/>
                    <p className='text-[18px] font-[500] text-[#525151] ml-[10px]'>{reviewCnt}</p>
                </div>
                <p className='text-[20px] font-[600] mb-[60px] text-wrap'>{description}</p>
                <ul className="flex flex-row gap-[15px]">
                    {tags.map((tag,index) => (
                        <li key={index} className='flex flex-row gap-[12px] py-[12px] px-[20px] bg-[#4154FF] max-w-fit rounded-[16px]'>
                        <Image src={tag.iconUrl} alt='Иконка тега' width={32} height={32} className='fill-current text-white' style={{ filter: 'invert(100%)' }}/>
                        <p className='text-[20px] font-normal text-white'>{tag.label}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
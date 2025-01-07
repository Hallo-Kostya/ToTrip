import Image from "next/image"
import Link from "next/link";
import Stars from "../../Common/Stars"

export interface SearchElementProps {
    id: number;
    imgUrl: string; // URL изображения
    name: string; // Название места
    rating: number; // Рейтинг в виде числа
    reviewCnt: number; // Количество отзывов
    description: string; // Описание места
    tags: Array<{ iconUrl: string; label: string }>; // Массив тегов с иконкой и текстом
}

export const SearchElement = ({ id, imgUrl, name, rating, reviewCnt, description, tags }: SearchElementProps) => {
    return (
        <Link href={`/places/${id}`}>
            <div className='gap-[32px] max-w-[1264px] flex bg-white rounded-[20px] h-[320]'>
                <Image
                    src={imgUrl}
                    width={400}
                    height={400}
                    alt="картинка результата поиска"
                    className="rounded-[20px]"
                    style={{ objectFit: "cover" }}
                />
                <div className='flex flex-col'>
                    <div className='flex mb-[32px] mt-[24px] items-center'>
                        <p className='text-[24px] font-bold mr-[20px]'>{name}</p>
                        <Stars rating={rating} />
                        <p className='text-[18px] font-[500] text-[#525151] ml-[10px]'>{reviewCnt}</p>
                    </div>
                    <p className='text-[20px] font-[600] text-wrap'>{(description.length > 270) ? description.slice(0,270) + "..." : description}</p>
                    <ul className="flex flex-row gap-[15px] mb-[24px] mt-auto">
                        {tags.map((tag, index) => (
                            <li key={index} className='flex flex-row gap-[12px] py-[12px] px-[20px] bg-[#4154FF] max-w-fit rounded-[16px]'>
                                <Image src={tag.iconUrl} alt='Иконка тега' width={32} height={32} className='fill-current text-white' style={{ filter: 'invert(100%)' }} />
                                <p className='text-[20px] font-normal text-white'>{tag.label}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Link>
    )
}
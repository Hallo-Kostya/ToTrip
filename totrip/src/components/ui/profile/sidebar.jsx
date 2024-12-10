export default function Sidebar () {
    // Заглушки для динамических данных
    const subscribers = new Array(6).fill({ imgSrc: 'img/user-photo.png' });
    const aboutMeInfo = {
        location: "Не указано",
        since: "-",
        description: ""
    };
    const shareActions = [
        { imgSrc: 'img/profile/Star.svg', text: 'Создать отзыв', link: '#' },
        { imgSrc: 'img/profile/Eye.svg', text: 'Создать обзор', link: '#' },
        { imgSrc: 'img/profile/Camera.svg', text: 'Выложить фото', link: '#' }
    ];

    return (
        <div className="flex flex-col gap-4 mb-24 w-[256px]">
            <div className="bg-white rounded-2xl shadow-md p-[32px]">
                <h5 className="text-black font-bold text-2xl mb-4">Подписчики</h5>
                <ul className="flex flex-wrap gap-[16px] list-none">
                    {subscribers.map((subscriber, index) => (
                        <li key={index} className="flex items-center">
                            <img src={subscriber.imgSrc} className="w-[48px] h-[48px] rounded-full" alt="subscriber" />
                        </li>
                    ))}
                </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-8">
                <h5 className="text-black font-bold text-2xl mb-4">Обо мне</h5>
                <div className="flex items-center gap-2 mb-2">
                    <img src="img/profile/Map Point.svg" className="w-5 h-5" alt="location" />
                    <p className='text-sm'>{aboutMeInfo.location}</p>
                </div>
                <div className="flex items-center gap-2 mb-2">
                    <img src="img/profile/Calendar.svg" className="w-5 h-5" alt="since" />
                    <p className='text-sm'>{aboutMeInfo.since}</p>
                </div>
                <p className='text-sm'>{aboutMeInfo.description}</p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-8">
                <h5 className="text-black font-bold text-2xl mb-4">Поделитесь с людьми!</h5>
                {shareActions.map((action, index) => (
                    <div key={index} className="flex items-center gap-2 mb-2">
                        <img src={action.imgSrc} className="w-5 h-5" alt={action.text} />
                        <p className='text-sm'>
                            <a href={action.link}>{action.text}</a>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};
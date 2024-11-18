import styles from '@/components/css/styles.module.css';
import Image from 'next/image';

export async function getStaticProps({
    params,
}: {
    params: { id: string };
}) {
    const { id } = params;

    const response = await fetch(`http://127.0.0.1:8000/api/places/${id}`);
    if (!response.ok) {
        return {
            notFound: true,
        };
    }

    const placeData = await response.json();

    return {
        props: { placeData },
    };
}

export default function page () {
    return (
		<div className={styles.mainContent}>
            <div className={styles.contentWrapper}>
                <div className='max-w-[1696px] flex items-center mt-[112px]'>
                    <h1 className="text-[56px] font-bold">Mercure Москва Павелецкая</h1>
                    <p className='ml-[24px] mt-[29px] font-bold font-[20px] color-[#323232]'>№1 / 532 в категории Отели, Москва</p>
                    <div className='ml-auto bg-white rounded-[36px]'>
                        <Image src="/img/common/heart.svg" alt="Избранное" width={72} height={72} className='p-[15px]'/>
                    </div>
                </div>
                <div className='max-w-[760px] flex items-center mt-[27px]'>
                    <Image src="/img/common/map-point.svg" width={36} height={36} alt="" className={styles.mapPoint} />
                    <p className='text-[24px] font-bold ml-[12px]'>Ул. Бахрушина, 11, Москва</p>
                    <ul className='flex ml-[48px] gap-[6px]'>
                        <li className=''><Image src="/img/common/rating-star.svg" width={35} height={35} alt="Звезда рейтинга" /></li>
                        <li className=''><Image src="/img/common/rating-star.svg" width={35} height={35} alt="Звезда рейтинга" /></li>
                        <li className=''><Image src="/img/common/rating-star.svg" width={35} height={35} alt="Звезда рейтинга" /></li>
                        <li className=''><Image src="/img/common/rating-star.svg" width={35} height={35} alt="Звезда рейтинга" /></li>
                        <li className=''><Image src="/img/common/rating-star.svg" width={35} height={35} alt="Звезда рейтинга" /></li>
                    </ul>
                    <p className='text-[20px] font-bold ml-[32px]'>0 отзывов</p>
                </div>
                <div className='max-w-[1696px] mt-42px'>
                    <div className='mt-[42px] mb-[62px]'>
                        <Image src="/img/place-overview/place-photo.jpg" alt="фото места" width={1693} height={524} className='rounded-[36px]'/>    
                    </div>
                </div>
                <div className='max-w-[1120px] flex p-[40px] flex-col gap-[64px] bg-white rounded-[24px] mb-[200px]'>
                        <h2>О нас</h2>
                        <div className=''>
                        <ul className={styles.ratingAttributes}>
                            <li className={styles.attribute}>
                            <ul className={`${styles.stars} ${styles.fiveStar}`}>
                                <li className={styles.star}><img src="/img/common/rating-star.svg" alt="" /></li>
                                <li className={styles.star}><img src="/img/common/rating-star.svg" alt="" /></li>
                                <li className={styles.star}><img src="/img/common/rating-star.svg" alt="" /></li>
                                <li className={styles.star}><img src="/img/common/rating-star.svg" alt="" /></li>
                                <li className={styles.star}><img src="/img/common/rating-star.svg" alt="" /></li>
                                <p className={styles.attributeName}>Расположение</p>
                            </ul>
                            <ul className={`${styles.stars} ${styles.fiveStar}`}>
                                <li className={styles.star}><img src="/img/common/rating-star.svg" alt="" /></li>
                                <li className={styles.star}><img src="/img/common/rating-star.svg" alt="" /></li>
                                <li className={styles.star}><img src="/img/common/rating-star.svg" alt="" /></li>
                                <li className={styles.star}><img src="/img/common/rating-star.svg" alt="" /></li>
                                <li className={styles.star}><img src="/img/common/rating-star.svg" alt="" /></li>
                                <p className={styles.attributeName}>Чистота</p>
                            </ul>
                            <ul className={`${styles.stars} ${styles.fiveStar}`}>
                                <li className={styles.star}><img src="/img/common/rating-star.svg" alt="" /></li>
                                <li className={styles.star}><img src="/img/common/rating-star.svg" alt="" /></li>
                                <li className={styles.star}><img src="/img/common/rating-star.svg" alt="" /></li>
                                <li className={styles.star}><img src="/img/common/rating-star.svg" alt="" /></li>
                                <li className={styles.star}><img src="/img/common/rating-star.svg" alt="" /></li>
                                <p className={styles.attributeName}>Обслуживание</p>
                            </ul>
                            <ul className={`${styles.stars} ${styles.fiveStar}`}>
                                <li className={styles.star}><img src="/img/common/rating-star.svg" alt="" /></li>
                                <li className={styles.star}><img src="/img/common/rating-star.svg" alt="" /></li>
                                <li className={styles.star}><img src="/img/common/rating-star.svg" alt="" /></li>
                                <li className={styles.star}><img src="/img/common/rating-star.svg" alt="" /></li>
                                <li className={styles.star}><img src="/img/common/rating-star.svg" alt="" /></li>
                                <p className={styles.attributeName}>Цена/качество</p>
                            </ul>
                            </li>
                            {/* Другие элементы списка */}
                        </ul>
                        </div>
                        <div>
                        <p className='text-[25px] font-medium'>Hipster ipsum tattooed brunch Im baby...</p>
                        </div>
                </div>
                {/* <div className={styles.commentsWrapper}>
                    <div className={styles.commentsWrapperInner}>
                        <div className={styles.commentsHeader}>
                        <h2 className={styles.commentsTitle}>Отзывы</h2>
                        <button className={styles.writeComment}>
                            <span className={styles.comBtnText}>Написать отзыв</span>
                        </button>
                        </div>
                        <ul className={styles.comments}>
                        <li className={styles.comment}>
                            <div className={styles.commentHeader}>
                            <a href="#" className={styles.commentorProfile}>
                                <img src="/img/common/user__icon.png" alt="" className={styles.commentorIcon} />
                                <p className={styles.commentorName}>Мария А.</p>
                            </a>
                            <p className={styles.commentDate}>написала отзыв 11 сентября 2024 года</p>
                            </div>
                            <ul className={styles.estimation}>
                            <li className={styles.star}><img src="/img/common/rating-star.svg" alt="" /></li>
                            </ul>
                            <h5 className={styles.mainPhrase}>Шикарный отель</h5>
                            <p className={styles.moreDescription}>Hipster ipsum tattooed brunch Im baby...</p>
                        </li>
                        </ul>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

{/* <script>
		var likeButton = document.querySelector('.like');
		likeButton.addEventListener('click', () => {
			var heart = likeButton.querySelector('img');
			heart.classList.toggle('clicked');
		});
	</script> */}

{/* <script>
		const reviewButton = document.querySelector('.write-comment');
		const newCommentTemplate = document.querySelector('#new-comment__template').content.querySelector('.comment');
		const commentsList = document.querySelector('.comments');

		reviewButton.addEventListener('click', function () {
			const newComment = newCommentTemplate.cloneNode(true);

			commentsList.appendChild(newComment);
		});
	</script> */}

{/* <template id="new-comment__template">
			<li class="comment">
				<div class="comment-header">
					<a href="#" class="commentor-profile">
						<img src="img/common/user__icon.png" alt="" class="commentor-icon">
						<p class="commentor-name">Мария А.</p>
					</a>
					<p class="comment-date">написала отзыв 11 сентября 2024 года</p>
				</div>
				<ul class="estimation">
					<li class="star"><img src="img/common/rating-star.svg" alt=""></li>
					<li class="star"><img src="img/common/rating-star.svg" alt=""></li>
					<li class="star"><img src="img/common/rating-star.svg" alt=""></li>
					<li class="star"><img src="img/common/rating-star.svg" alt=""></li>
					<li class="star"><img src="img/common/rating-star.svg" alt=""></li>
				</ul>
				<h5 class="main-phrase">Шикарный отель</h5>
				<p class="more-description">Hipster ipsum tattooed brunch I'm baby. Tbh juice green wolf iPhone tumblr dollar pok heirloom flannel. Keytar gentrify street on hella bespoke viral franzen. Keffiyeh next belly seitan jean vexillologist thundercats migas swag kogi. Raw small rights keffiyeh next diy vexillologist roof crucifix. 3-moon letterpress pop-up meggings mixtape tumblr tonx man. Tacos kinfolk tumeric asymmetrical v on charcoal vinegar. Letterpress ascot try-hard keytar sartorial.</p>
				<p class="stay-date"><span class="bold">Дата пребывания:</span> 5 сентября - 10 сентября 2024 года</p>
			</li>
		</template> */}

        // .comment:not(:last-child) {
        //     margin-bottom: 30px;
        // }
        
        // .commentorIcon {
        //     border-radius: 50%;
        //     width: 48px;
        // }
        
        // .commentHeader {
        //     display: flex;
        //     align-items: center;
        // }
        
        // .commentorProfile {
        //     display: flex;
        //     align-items: center;
        // }
        
        // .commentorName {
        //     font-size: 20px;
        //     font-weight: 700;
        //     margin-left: 12px;
        // }
        
        // .commentDate {
        //     font-size: 18px;
        //     font-weight: 500;
        //     margin-left: 32px;
        // }
        
        // .estimation {
        //     display: flex;
        //     gap: 6px;
        //     margin-top: 8px;
        // }
        
        // .mainPhrase {
        //     font-size: 20px;
        //     font-weight: 700;
        //     margin-top: 22px;
        // }
        
        // .moreDescription {
        //     font-size: 20px;
        //     font-weight: 500;
        //     margin-top: 16px;
        // }
        
        // .stayDate {
        //     font-size: 18px;
        //     font-weight: 500;
        //     margin-top: 20px;
        // }
        
        // span.bold {
        //     font-size: 20px;
        //     font-weight: 700;
        // }
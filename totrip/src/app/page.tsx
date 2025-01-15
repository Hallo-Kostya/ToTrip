import SuggestionsSection from '@/components/ui/main-page/suggestions';
import RecommendationsSection from '@/components/ui/main-page/Recomendations/recomendations';
import { SearchContainer } from '@/components/ui/main-page/Search/searchContainer';

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

export default function Home() {
  return (  
    <main>
        <section className='w-full'>
          <div className='py-[304px] mt-[-100px] max-h-[860px] bg-[url("/img/index/main-photo.jpg")] bg-no-repeat bg-center bg-cover'>
              <h1 className='w-[744px] mx-auto text-[56px] font-bold mb-[64px] text-white text-center'>Начните путешествовать вместе с ToTrip!</h1>
            <SearchContainer />
          </div>
        </section>
        <SuggestionsSection />
        <div className='mb-[100px]'><RecommendationsSection places={placeData}/></div>
    </main>
  );
}

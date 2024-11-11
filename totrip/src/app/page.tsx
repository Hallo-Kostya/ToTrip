import Image from 'next/image';
import styles from '@/components/css/home.module.css';
import SuggestionsSection from '@/components/ui/main-page/suggestions';
import RecommendationsSection from '@/components/ui/main-page/recomendations';

export default function Home() {
  return (
    <main>
      <div className={styles["main-content"]}>
        <section className={styles["lead"]}>
          <div className={styles["lead-wrapper"]}>
            <div className={styles["lead-content"]}>
              <h1>Начните путешествовать вместе с ToTrip!</h1>
            </div>
            <div className={styles["search"]}>
              <form action="/search" method="GET" className={styles["lead-search-form"]}>
                <input type="text" id="search" name="query" placeholder="Куда вы хотите отправиться?" />
                <div id="places-dropdown" className={styles["dropdown-content"]}></div>
                <button className={styles["search-button__lead"]}>
                  <Image src="/img/common/search.svg" alt="Поиск" width={24} height={24} />
                </button>
              </form>
            </div>
          </div>
        </section>

        <SuggestionsSection />

        <RecommendationsSection />
        
      </div>
    </main>
  );
}

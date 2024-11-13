
"use client"
import styles from '@/components/css/home.module.css';
import SuggestionsSection from '@/components/ui/main-page/suggestions';
import RecommendationsSection from '@/components/ui/main-page/recomendations';
import { SearchInput } from '@/components/ui/main-page/searchInput';

export default function Home() {
  return (  
    <main>
      <div className={styles["main-content"]}>
        <section className={styles["lead"]}>
          <div className={styles["lead-wrapper"]}>
            <div className={styles["lead-content"]}>
              <h1>Начните путешествовать вместе с ToTrip!</h1>
            </div>
            <SearchInput defaultValue={""} />
          </div>
        </section>
        <SuggestionsSection />
        <RecommendationsSection />
      </div>
    </main>
  );
}

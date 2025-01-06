import React from 'react';
import styles from '@/components/css/suggestion.module.css';
import Link from 'next/link';

export default function SuggestionsSection() {
  return (
    <section className={styles.suggestions}>
      <div className={styles["sugg-wrapper"]}>
        <h2>Подборки</h2>
        <div className={styles["suggestions-preview"]}>
          <ul className={styles["grid-container"]}>
            <Link
              href="https://hayat.rest/blog/top30-populyarnyh-blud-vostochnoj-kuhni"
              className={`${styles["suggestion-elem"]} ${styles["bg-1"]} ${styles["big"]} relative`}
            >
              <span className='absolute text-[44px] font-bold text-white bottom-[20px] left-[32px]'>
                Самые вкусные блюда Востока
              </span>
            </Link>

            <Link
              href="https://experience.tripster.ru/articles/samye-krasivye-mesta-rossii/"
              className={`${styles["suggestion-elem"]} ${styles["bg-2"]} relative`}
            >
              <span className='absolute text-[44px] font-bold text-white bottom-[20px] left-[32px]'>
                Красивейшие места России
              </span>
            </Link>

            <Link
              href="https://dzen.ru/a/Z3JGI7lrEhpKMNQd"
              className={`${styles["suggestion-elem"]} ${styles["bg-3"]} relative`}
            >
              <span className='absolute text-[44px] font-bold text-white bottom-[20px] left-[32px]'>
              10 зимних чудес света
              </span>
            </Link>
          </ul>
        </div>
      </div>
    </section>
  );
}
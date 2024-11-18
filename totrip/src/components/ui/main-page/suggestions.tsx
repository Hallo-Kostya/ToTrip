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
            <li className={`${styles["suggestion-elem"]} ${styles["bg-1"]} ${styles["big"]}`}>
              <Link href="https://hayat.rest/blog/top30-populyarnyh-blud-vostochnoj-kuhni">
                <span className={styles["card-title"]}>Самые вкусные блюда Востока</span>
              </Link>
            </li>
            <li className={`${styles["suggestion-elem"]} ${styles["bg-2"]}`}>
              <Link href="https://experience.tripster.ru/articles/samye-krasivye-mesta-rossii/">
                <span className={styles["card-title"]}>Красивейшие места России</span>
              </Link>
            </li>
            <li className={`${styles["suggestion-elem"]} ${styles["bg-3"]}`}>
              <Link href="https://experience.tripster.ru/articles/samye-krasivye-mesta-rossii/">
                <span className={styles["card-title"]}>Красивейшие места России</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
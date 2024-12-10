import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '@/components/css/footer.module.css';

const Footer = () => {
    return (
      <footer className={styles.footer} >
        <div className={styles.footerContainer}>
          <div>
            <Link href="#">
              <p>&copy; ToTrip, 2024</p>
            </Link>
          </div>
          <ul className={styles.footerMenu}>
            <li>
              <Link href="#">О нас</Link>
            </li>
            <li>
              <Link href="#">Обратная связь</Link>
            </li>
          </ul>
          <Link href="index.html">
            <Image
              src="/img/common/footer-logo.svg"
              alt="Логотип ToTrip"
              width={100}
              height={50}
            />
          </Link>
        </div>
      </footer>
    );
  };
  
  export default Footer;
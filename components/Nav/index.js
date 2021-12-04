import Link from 'next/link';
import Logo from './Logo';
import styles from './index.module.scss';
import ThemeChanger from '../ThemeChanger';

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <Link href='/' as={`/`} passHref>
        <Logo />
      </Link>
      <div className={styles.links}>
        <ThemeChanger />
        <span className={styles.jump}>
          <a href='#recent'>projects</a>
          <a href='#blog'>thoughts</a>
        </span>
      </div>
    </nav>
  );
}

import Link from 'next/link';
import Logo from './Logo';
import styles from './index.module.scss';
import ThemeChanger from '../ThemeChanger';
import ThoughtsIcon from '../Icons/ThoughtsIcon';
import WorkIcon from '../Icons/WorkIcon';
import VibeIcon from '../Icons/VibeIcon';

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <Link href='/' as={`/`} passHref>
        <Logo />
      </Link>
      <div className={styles.links}>
        <ThemeChanger />
        {/* <a href='/'>Work</a>
        <a href='/'>Thoughts</a>
        <a href='/'>Vibe</a> */}

        <span className={styles.jump}>
          <a href='#blog'>
            <ThoughtsIcon /> thoughts
          </a>
          <a href='#recent'>
            <WorkIcon /> projects
          </a>
          <a href='#current'>
            <VibeIcon /> vibe
          </a>
        </span>
      </div>
    </nav>
  );
}

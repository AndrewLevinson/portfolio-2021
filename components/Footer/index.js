import styles from './index.module.scss';
import Link from 'next/link';
import ThemeChanger from '../ThemeChanger';
import GithubIcon from '../Icons/GithubIcon';
import TwitterIcon from '../Icons/TwitterIcon';
import EmailIcon from '../Icons/EmailIcon';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

function Footer() {
  const [isMounted, setIsMounted] = useState(false);
  const { theme } = useTheme();
  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return null;
  return (
    <footer className={styles.footer}>
      <div className={styles.themeHolder}>
        <ThemeChanger />
      </div>
      <div className={styles.me}>
        <Link href='/' as={`/`} passHref>
          <a href='/'>
            <img
              src={`/images/default_avatar_dith_${theme}.png`}
              width='85'
              className={styles.avatar}
              alt='avatar image of me, Andrew'
            />
          </a>
        </Link>
        <ul>
          <li>
            <a
              href='mailto:andrewlevins@gmail.com'
              title='Email'
              target='_blank'
              rel='noopener noreferrer'
              aria-label={`Email link`}
            >
              <EmailIcon />
            </a>
          </li>
          <li>
            <a
              href='https://twitter.com/andrew_levinson'
              title='Twitter'
              target='_blank'
              rel='noopener noreferrer'
              aria-label={`Twitter link`}
            >
              <TwitterIcon />
            </a>
          </li>
          <li>
            <a
              href='https://github.com/AndrewLevinson'
              title='Github'
              target='_blank'
              rel='noopener noreferrer'
              aria-label={`Github link`}
            >
              <GithubIcon />
            </a>
          </li>
        </ul>
        <p className={styles.note}>Andrew Levinson © {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}

export default Footer;

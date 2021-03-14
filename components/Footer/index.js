import styles from './index.module.scss';
import Link from 'next/link';
import ThemeChanger from '../ThemeChanger';
import GithubIcon from '../Icons/GithubIcon';
import TwitterIcon from '../Icons/TwitterIcon';
import EmailIcon from '../Icons/EmailIcon';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.themeHolder}>
        <ThemeChanger />
      </div>
      <div className={styles.me}>
        <Link href='/' as={`/`} passHref>
          <a href='/'>
            <img
              src='/images/default_avatar.jpg'
              width='85'
              className={styles.avatar}
              alt='avatar image of me, Andrew'
            />
          </a>
        </Link>
        {/* <p>Andrew Levinson is a graphics reporter for The Wall Street Journal</p> */}
        <ul>
          <li>
            <a href='mailto:andrewlevins@gmail.com' target='_blank' rel='noopener'>
              <EmailIcon />
              <title>Email</title>
            </a>
          </li>
          <li>
            <a href='https://twitter.com/andrew_levinson' target='_blank' rel='noopener noreferrer'>
              <TwitterIcon />
              <title>Twitter</title>
            </a>
          </li>
          <li>
            <a href='https://github.com/AndrewLevinson'>
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

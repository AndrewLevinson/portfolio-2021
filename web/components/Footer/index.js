import styles from './index.module.scss';
import Link from 'next/link';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.me}>
        <Link href='/' as={`/`} passHref>
          <img src='/images/default_avatar.jpg' width='85' className={styles.avatar} alt='avatar image of me, Andrew' />
        </Link>
        <p>Andrew Levinson is a graphics reporter for The Wall Street Journal</p>
        <ul>
          <li>
            <a href='mailto:andrewlevins@gmail.com' target='_blank' rel='noopener'>
              Email
            </a>
          </li>
          <li>
            <a href='https://twitter.com/andrew_levinson' target='_blank' rel='noopener noreferrer'>
              @andrew_levinson
            </a>
          </li>
          {/* <li>
            <a href='https://github.com/AndrewLevinson'>Personal Github</a>
          </li> */}
          <li>
            <a href='https://andrewlevinson.me/AndrewLevinson_Resume.pdf' target='_blank' rel='noopener noreferrer'>
              Resume
            </a>
          </li>
        </ul>
        <p className={styles.note}>some shit about a copywrite trademark 2021 bs</p>
      </div>
    </footer>
  );
}

export default Footer;

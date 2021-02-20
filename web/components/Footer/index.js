import styles from './index.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.me}>
        <img src='/images/default.png' width='150' className={styles.avatar} />
        <p>Andrew Levinson is a graphics reporter for The Wall Street Journal</p>
      </div>
    </footer>
  );
}

export default Footer;

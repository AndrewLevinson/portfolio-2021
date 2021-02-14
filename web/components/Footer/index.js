import styles from './index.module.css';

function Footer({}) {
  console.log('footer');

  return (
    <footer className={styles.footer}>
      <div>
        <p>Andrew Levinson</p>
        <div>Links</div>
      </div>
    </footer>
  );
}

export default Footer;

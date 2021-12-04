import { forwardRef } from 'react';
import styles from './index.module.scss';

const Logo = forwardRef(({ onClick, href }, ref) => {
  return (
    <a href={href} onClick={onClick} ref={ref} className={styles.linkHolder}>
      <div className={styles.flex}>
        <div className={styles.block} />
        <div className={styles.block} />
        <div className={styles.block} />
        <div className={styles.name}>Andrew</div>
      </div>
    </a>
  );
});

export default Logo;

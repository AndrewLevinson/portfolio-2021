import { forwardRef } from 'react';
import styles from './index.module.scss';

const Logo = forwardRef(({ onClick, href }, ref) => {
  return (
    <a href={href} onClick={onClick} ref={ref}>
      <svg viewBox='0 0 36 12' xmlns='http://www.w3.org/2000/svg' className={styles.logo}>
        <g fill='none' fillRule='evenodd'>
          <text fontSize='10' letterSpacing='-.1' transform='translate(0 -2)'>
            <tspan x='2' y='11'>
              andrew
            </tspan>
          </text>
          <path d='M0 0h36v1H0zM0 11h36v1H0z' />
        </g>
      </svg>
    </a>
  );
});

export default Logo;

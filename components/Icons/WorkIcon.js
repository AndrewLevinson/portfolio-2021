import styles from './index.module.css';

export default function WorkIcon() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='18'
      height='18'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      aria-hidden='true'
      className={styles.svg}
      style={{ marginTop: '0.1em' }}
    >
      <rect x='2' y='3' width='20' height='14' rx='2' ry='2'></rect>
      <line x1='8' y1='21' x2='16' y2='21'></line>
      <line x1='12' y1='17' x2='12' y2='21'></line>
    </svg>
  );
}

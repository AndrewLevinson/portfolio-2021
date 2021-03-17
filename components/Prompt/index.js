import styles from './index.module.scss';

export default function Prompt({ children }) {
  return (
    <span className={styles.prompt}>
      <em>{children[0]}</em> Tweet to me{' '}
      <a href='https://twitter.com/andrew_levinson' target='_blank' rel='noopener noreferrer'>
        @andrew_levinson
      </a>{' '}
      and share your thoughts.
    </span>
  );
}

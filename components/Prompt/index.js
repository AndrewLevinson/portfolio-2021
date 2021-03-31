import { useState, useEffect } from 'react';
import styles from './index.module.scss';

export default function Prompt(props) {
  const [url, setUrl] = useState('https://twitter.com/andrew_levinson');
  useEffect(() => {
    setUrl(setTwitterUrl(window.location.pathname));
  }, []);

  return (
    <span className={styles.prompt}>
      <strong>{props.children}</strong>
      Tweet to me{' '}
      <a href={url} target='_blank' rel='noopener noreferrer'>
        @andrew_levinson
      </a>{' '}
      and share your thoughts.
    </span>
  );
}

function setTwitterUrl(path) {
  return `https://twitter.com/share?text=@andrew_levinson&url=https://andrewlevinson.me${path}`;
}

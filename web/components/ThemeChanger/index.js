import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

import styles from './index.module.scss';

function ThemeChanger() {
  const [isMounted, setIsMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return null;

  return (
    <button className={styles.button} onClick={() => (theme === 'dark' ? setTheme('light') : setTheme('dark'))}>
      {theme === 'dark' ? '🌆' : '🏙'}
    </button>
  );
}

export default ThemeChanger;

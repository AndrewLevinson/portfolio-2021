import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

import styles from './index.module.scss';

function ThemeChanger({ small = false }) {
  const [isMounted, setIsMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return null;

  const classes = `${styles.button} ${small && styles.small}`;

  return (
    <button
      className={classes}
      onClick={() => (theme === 'dark' ? setTheme('light') : setTheme('dark'))}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? '🌞' : '🌚'}
    </button>
  );
}

export default ThemeChanger;

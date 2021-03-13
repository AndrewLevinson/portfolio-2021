import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

import styles from './index.module.scss';

function ThemeChanger() {
  const [isMounted, setIsMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return null;

  return (
    <div className={styles.holder}>
      <button
        className={styles.button}
        onClick={() => (theme === 'dark' ? setTheme('light') : setTheme('dark'))}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      >
        {theme === 'dark' ? '🌃' : '🌇'}
      </button>
    </div>
  );
}

export default ThemeChanger;

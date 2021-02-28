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
      <button className={styles.button} onClick={() => (theme === 'dark' ? setTheme('light') : setTheme('dark'))}>
        <span className={styles.icon}>{theme === 'dark' ? '🌆' : '🏙'}</span>
        <span className={[isMounted && styles.mounted, styles.label].join(' ')}>{theme} mode</span>
      </button>
    </div>
  );
}

export default ThemeChanger;

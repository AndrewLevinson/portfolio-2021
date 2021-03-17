import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

import styles from './index.module.scss';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx';
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css';
import materialLight from 'react-syntax-highlighter/dist/cjs/styles/prism/material-light';
import tomorrow from 'react-syntax-highlighter/dist/cjs/styles/prism/tomorrow';

SyntaxHighlighter.registerLanguage('javascript', js);
SyntaxHighlighter.registerLanguage('jsx', jsx);
SyntaxHighlighter.registerLanguage('css', css);

export default function Code({ node }) {
  if (!node || !node.code) return null;
  const [isMounted, setIsMounted] = useState(false);
  const { theme } = useTheme();
  const [codeStyle, setCodeStyle] = useState(materialLight);
  useEffect(() => setIsMounted(true), []);
  useEffect(() => {
    setCodeStyle(theme === 'light' ? materialLight : tomorrow);
  }, [theme]);

  if (!isMounted) return null;
  const { language, code } = node;

  return (
    <div className={[styles.codeBlock, theme === 'light' && styles.light].join(' ')}>
      <div
        className={styles.languageDisplay}
        style={{ background: theme === 'light' ? 'rgb(250, 250, 250)' : 'rgb(45, 45, 45)' }}
      >
        <div></div>
        <p>{language}</p>
      </div>
      <SyntaxHighlighter language={language || 'text'} style={codeStyle} wrapLines={true} customStyle={{ margin: 0 }}>
        {code}
      </SyntaxHighlighter>
    </div>
  );
}

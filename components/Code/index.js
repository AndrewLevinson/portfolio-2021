import styles from './index.module.scss';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx';
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css';
import materialLight from 'react-syntax-highlighter/dist/cjs/styles/prism/material-light';
import materialDark from 'react-syntax-highlighter/dist/cjs/styles/prism/material-dark';

SyntaxHighlighter.registerLanguage('javascript', js);
SyntaxHighlighter.registerLanguage('jsx', jsx);
SyntaxHighlighter.registerLanguage('css', css);

import { useTheme } from 'next-themes';

export default function Code({ node }) {
  if (!node || !node.code) return null;
  const { theme } = useTheme();
  const { language, code } = node;
  return (
    <div className={styles.codeBlock}>
      <SyntaxHighlighter
        language={language || 'text'}
        style={theme === 'light' ? materialLight : materialDark}
        wrapLines={true}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}

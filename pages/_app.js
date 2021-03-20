import { ThemeProvider } from 'next-themes';

import '../styles/normalize.css';
import '../styles/defaults.css';
import '../styles/theme.css';
import '../styles/typography.css';
import '../styles/global.css';

import Footer from '../components/Footer';
import ThemeChanger from '../components/ThemeChanger';

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute='class' enableSystem>
      <div className='container'>
        <Component {...pageProps} />
        <ThemeChanger />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

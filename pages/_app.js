import { ThemeProvider } from 'next-themes';
import Head from 'next/head';

import '../styles/normalize.css';
import '../styles/defaults.css';
import '../styles/theme.css';
import '../styles/typography.css';
import '../styles/global.css';

import Footer from '../components/Footer';
import ThemeChanger from '../components/ThemeChanger';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <script async defer data-domain='andrewlevinson.me' src='https://stats.andrewlevinson.me/js/index.js'></script>
      </Head>
      <ThemeProvider attribute='class' enableSystem>
        <div className='container'>
          <Component {...pageProps} />
          <ThemeChanger />
          <Footer />
        </div>
      </ThemeProvider>
    </>
  );
}

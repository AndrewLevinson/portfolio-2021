import '../styles/normalize.css';
import '../styles/defaults.css';
import '../styles/typography.css';
import '../styles/global.css';

import Footer from '../components/Footer';

export default function MyApp({ Component, pageProps }) {
  return (
    <div className='container'>
      <div className='spacer' />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}

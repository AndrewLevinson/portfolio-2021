// index.js
import Head from 'next/head';
import Link from 'next/link';
import groq from 'groq';
import client from '../client';

import Footer from '../components/Footer';

const Index = props => {
  const { posts = [] } = props;

  return (
    <main className='main'>
      <div className='container'>
        <Head>
          <title>My New App</title>
          {/* <link rel='icon' href='/favicon.ico' /> */}
        </Head>
        <h1>Welcome to a blog!</h1>
        <ul className='blog-list'>
          {posts.map(
            ({ _id, title = '', slug = '', publishedAt = '', description = '' }) =>
              slug && (
                <li key={_id}>
                  <Link href='/post/[slug]' as={`/post/${slug.current}`} passHref>
                    <a>
                      {title}
                      <span className='description'>{description}</span>
                    </a>
                  </Link>
                </li>
              )
          )}
        </ul>
      </div>
      <Footer />
    </main>
  );
};

Index.getInitialProps = async () => ({
  posts: await client.fetch(groq`
      *[_type == "post" && publishedAt < now()]|order(publishedAt desc)
    `),
});

export default Index;

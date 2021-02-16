// index.js
import Head from 'next/head';
import Link from 'next/link';
import groq from 'groq';
import client from '../client';

import styles from './homepage.module.css';

const Index = props => {
  const { posts = [], projects = [] } = props;

  return (
    <main className={styles.main}>
      <Head>
        <title>My New App main page title</title>
        {/* <link rel='icon' href='/favicon.ico' /> */}
      </Head>
      <h1>Andrew Levinson</h1>
      <h3 className={styles.subhed}>Designer / Developer</h3>
      <p className={styles.intro}>
        At WSJ, I currently focus on designing and coding reader experiences that usually feature interactive data
        visualization. Additionally, I sometimes teach communication design at Parsons. Previously, I’ve been a product
        designer at a software agency, a financial consultant, and even a touring musician in a metal band.
      </p>

      <div className={styles.tree}>
        <span className={styles.category}>recent work/</span>
        <ul className={styles.blogList}>
          {projects.map(
            (
              {
                _id,
                title = '',
                slug = '',
                publishedAt = '',
                category = '',
                description = '',
                relatedPost = '',
                directLink = '',
              },
              i
            ) => {
              return (
                slug && (
                  <li key={_id}>
                    <span style={{ whiteSpace: 'nowrap', marginBottom: '2rem', display: 'block' }}>
                      <span>{i === projects.length - 1 ? '└──' : '├──'}</span>
                      <Link href={directLink}>
                        <a style={{ whiteSpace: 'normal' }}>
                          {title} <span className={styles.tag}>{`• ${category}`}</span>
                          <span className={styles.description}>{description}</span>
                        </a>
                      </Link>
                      {relatedPost && (
                        <>
                          <br /> &nbsp; &nbsp; └──
                          <Link href='/post/[slug]' as={`/post/${relatedPost.current}`} passHref>
                            <a style={{ fontSize: 16 }}>Related blog post ⟶</a>
                          </Link>
                        </>
                      )}
                    </span>
                  </li>
                )
              );
            }
          )}
        </ul>
      </div>

      <div className={styles.tree}>
        <span className={styles.category}>content & thoughts/</span>
        <ul className={styles.blogList}>
          {posts.map(
            ({ _id, title = '', slug = '', publishedAt = '', description = '', directLink = '' }, i) =>
              slug && (
                <li key={_id}>
                  <span style={{ whiteSpace: 'nowrap', marginBottom: '2rem', display: 'block' }}>
                    <span>{i === posts.length - 1 ? '└──' : '├──'}</span>
                    <Link href='/post/[slug]' as={`/post/${slug.current}`} passHref>
                      <a style={{ whiteSpace: 'normal' }}>
                        {title}
                        <span className={styles.description}>{description}</span>
                      </a>
                    </Link>
                    {directLink && (
                      <>
                        <br /> &nbsp; &nbsp; └──
                        <Link href={directLink}>
                          <a style={{ fontSize: 16 }}>Direct link ⟶</a>
                        </Link>
                      </>
                    )}
                  </span>
                </li>
              )
          )}
        </ul>
      </div>
    </main>
  );
};

export async function getStaticProps() {
  return {
    props: {
      posts: await client.fetch(groq`
      *[_type == "post" && publishedAt < now()]|order(publishedAt desc)
    `),
      projects: await client.fetch(groq`
      *[_type == "project"]{
        title,
        slug,
        description, 
        directLink,
        "category": categories[0]->title,
        "relatedPost": relatedPost->slug,
      }
    `),
    },
  };
}

export default Index;

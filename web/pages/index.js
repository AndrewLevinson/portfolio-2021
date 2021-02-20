// index.js
import Head from 'next/head';
import Link from 'next/link';
import groq from 'groq';
import client from '../client';
import imageUrlBuilder from '@sanity/image-url';

import styles from './homepage.module.scss';

function urlFor(source) {
  return imageUrlBuilder(client).image(source);
}
const Index = props => {
  const { posts = [], projects = [] } = props;

  return (
    <main className={styles.main}>
      <Head>
        <title>Andrew Levinson: Design, Code, Data</title>
        {/* <link rel='icon' href='/favicon.ico' /> */}
      </Head>
      <h1>Andrew Levinson</h1>
      <h4 className={styles.subhed}>Designer / Developer / Data Visualizer</h4>
      <p className={styles.intro}>
        Currently, I design & code visuals at The Wall Street Journal and teach Core Lab Interaction at Parsons School
        of Design. Previously, I’ve been a product designer at a software agency, a financial consultant, and even a
        touring musician in a metal band.
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
                imageSet = '',
              },
              i
            ) => {
              console.log(imageSet);
              return (
                slug && (
                  <li key={_id}>
                    <span className={styles.markers}>
                      {i === 0 ? '┌──' : i === projects.length - 1 ? '└──' : '├──'}
                    </span>
                    <span>
                      <Link href={directLink}>
                        <a>
                          {title} <span className={styles.tag}>{category && `• ${category}`}</span>
                          <span className={styles.description}>{description}</span>
                        </a>
                      </Link>
                      {imageSet && (
                        <div className={styles.imageSet}>
                          {imageSet.map(image => (
                            <img src={urlFor(image).width(500).url()} />
                          ))}
                        </div>
                      )}
                      {relatedPost && (
                        <>
                          <span className={styles.markers}>└──</span>
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
                  <span className={styles.markers}>{i === 0 ? '┌──' : i === posts.length - 1 ? '└──' : '├──'}</span>
                  <span>
                    <Link href='/post/[slug]' as={`/post/${slug.current}`} passHref>
                      <a>
                        {title}
                        <span className={styles.description}>{description}</span>
                      </a>
                    </Link>
                    {/* {directLink && (
                      <>
                        <br /> &nbsp; &nbsp; └──
                        <Link href={directLink}>
                          <a style={{ fontSize: 16 }}>Direct link ⟶</a>
                        </Link>
                      </>
                    )} */}
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
        "imageSet": imageSet[]
      }|order(category asc)
    `),
    },
  };
}

export default Index;

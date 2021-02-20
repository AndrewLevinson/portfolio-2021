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
              return (
                slug && (
                  <li key={_id}>
                    <span className={styles.markers}>
                      {i === 0 ? '┌──' : i === projects.length - 1 ? '└──' : '├──'}
                    </span>
                    <span>
                      <a href={directLink}>
                        {title} <span className={styles.tag}>{category && `• ${category}`}</span>
                        <span className={styles.description}>{description}</span>
                      </a>
                      {imageSet && (
                        <div className={styles.imageSet}>
                          {imageSet.map(image => {
                            return <img key={image._key} src={urlFor(image).width(500).url()} />;
                          })}
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
            ({ _id, title = '', slug = '', publishedAt = '', description = '' }, i) =>
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
                  </span>
                </li>
              )
          )}
        </ul>
      </div>

      <div className={styles.tree}>
        <span className={styles.category}>recognition/</span>
        <ul className={styles.blogList}>
          <li>
            <a href='https://www.storybench.org/how-the-wall-street-journal-visualized-the-2020-election-results/'>
              How the Wall Street Journal visualized the 2020 election results
              <span className={styles.description}>Storybench interview on design and development process</span>
            </a>
          </li>
          <li>
            <a href='https://www.informationisbeautifulawards.com/showcase/4279-the-united-states-water-crisis'>
              Kantar Information is Beautiful Awards 2019 Shortlist
              <span className={styles.description}>Shortlisted for my United States Water Crisis visual essay</span>
            </a>
          </li>
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
        _id,
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

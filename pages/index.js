import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import groq from 'groq';
import client from '../client';
import imageUrlBuilder from '@sanity/image-url';
import { format } from 'date-fns';

import NowPlaying from '../components/NowPlaying';
import Book from '../components/Book';
import VibeIcon from '../components/Icons/VibeIcon';
import WorkIcon from '../components/Icons/WorkIcon';
import ThoughtsIcon from '../components/Icons/ThoughtsIcon';
import AwardsIcon from '../components/Icons/AwardsIcon';
import styles from './homepage.module.scss';

function urlFor(source) {
  return imageUrlBuilder(client).image(source);
}
const Index = props => {
  const { posts = [], projects = [], book = {} } = props;
  const [showAll, setShowAll] = useState(false);

  const meta = {
    title: 'Andrew Levinson: Design, Code, Data',
    description: 'The personal portfolio website for Andrew Levinson showcasing design and data visualization projects',
    image: '/images/meta_image.jpg',
  };

  return (
    <main className={styles.main}>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta charSet='utf-8' />
        <title>{meta.title}</title>
        <meta name='description' content={meta.description} />
        <meta property='og:title' content={meta.title} key='ogtitle' />
        <meta property='og:description' content={meta.description} key='ogdesc' />
        {/* tiwtter */}
        <meta name='twitter:card' content='summary' key='twcard' />
        <meta name='twitter:creator' content='@andrew_levinson' key='twhandle' />
        {/* Open Graph */}
        <meta property='og:url' content='https://andrewlevinson.me/' key='ogurl' />
        <meta property='og:image' content={meta.image} key='ogimage' />
        <meta property='og:site_name' content={meta.title} key='ogsitename' />
        <meta property='og:title' content={meta.title} key='ogtitle' />
        <meta property='og:description' content={meta.description} key='ogdesc' />
        {/* favicon */}
        <link rel='apple-touch-icon' sizes='180x180' href='/favicon/apple-touch-icon.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='/favicon/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/favicon/favicon-16x16.png' />
        <link rel='manifest' href='/favicon/site.webmanifest' />
      </Head>
      <h1>Andrew Levinson</h1>
      <h4 className={styles.subhed}>Designer / Developer / Data Visualizer</h4>
      <p className={styles.intro}>
        Currently, I design & code visuals at{' '}
        <a href='https://graphics.wsj.com/' target='_blank' rel='noopener noreferrer'>
          The Wall Street Journal
        </a>{' '}
        and occasionally teach{' '}
        <a href='https://courses.newschool.edu/courses/PUCD2126/6770/' target='_blank' rel='noopener noreferrer'>
          Core Interaction Lab
        </a>{' '}
        at Parsons School of Design. <br />
        Previously, I’ve been a product designer at a software agency, a financial consultant, and even a touring
        musician in a metal band.
        <span className={styles.jump}>
          <a href='#recent'>
            <WorkIcon /> recent work
          </a>
          <a href='#blog'>
            <ThoughtsIcon /> thoughts
          </a>
          <a href='#awards'>
            <AwardsIcon /> recognition
          </a>
          <a href='#current'>
            <VibeIcon /> vibe
          </a>
        </span>
      </p>

      <div className={styles.tree} id='recent'>
        <span className={styles.sectionTitle}>
          <WorkIcon /> recent work/
        </span>
        <ul className={styles.projectList}>
          {projects
            .slice(0, showAll ? 100 : 3)
            .map(
              ({
                _id,
                title,
                slug,
                publishedAt,
                category,
                description,
                relatedPost,
                directLink,
                imageSet,
                mainImage,
              }) => {
                return (
                  slug && (
                    <li key={_id}>
                      {/* <span className={styles.markers}>
                        {i === 0 ? '┌──' : i === (showAll ? projects.length - 1 : 2) ? '└──' : '├──'}
                      </span> */}
                      <div>
                        <img
                          src={urlFor(mainImage).width(500).auto('format').url()}
                          width='180'
                          alt={`screenshot of project titled: ${title}`}
                          className={styles.mainImage}
                        />
                      </div>
                      <span>
                        <a href={directLink}>
                          <div>
                            <span className={styles.tag}>
                              {format(new Date(publishedAt), 'MMM. yyyy')}
                              {category && ` • ${category}`}
                              <br />
                            </span>
                          </div>
                          {title}
                          <span className={styles.description}>{description}</span>
                          {imageSet && (
                            <div className={styles.imageSet}>
                              {imageSet.map((image, i) => {
                                return (
                                  <img
                                    key={image._key}
                                    src={urlFor(image).width(500).auto('format').url()}
                                    width='120'
                                    height='60'
                                    alt={`screenshot #${i + 1} of ${imageSet.length} for project titled: ${title}`}
                                  />
                                );
                              })}
                            </div>
                          )}
                        </a>
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
        <button className={styles.button} onClick={() => (showAll ? setShowAll(false) : setShowAll(true))}>
          {showAll ? 'Collapse –' : 'Show more work +'}
        </button>
      </div>

      <div className={styles.tree} id='blog'>
        <span className={styles.sectionTitle}>
          <ThoughtsIcon /> thoughts/
        </span>
        <ul className={styles.blogList}>
          {posts.map(
            ({ _id, title, slug, publishedAt, description }, i) =>
              slug && (
                <li key={_id}>
                  {/* <span className={styles.markers}>{i === 0 ? '┌──' : i === posts.length - 1 ? '└──' : '├──'}</span> */}
                  <span>
                    <Link href='/post/[slug]' as={`/post/${slug.current}`} passHref>
                      <a>
                        <div>
                          <span className={styles.tag}>{format(new Date(publishedAt), 'MMM. yyyy')}</span>
                        </div>
                        {title}
                        <div>
                          <span className={styles.description}>{description}</span>
                        </div>
                      </a>
                    </Link>
                  </span>
                </li>
              )
          )}
        </ul>
      </div>

      <div className={styles.tree} id='awards'>
        <span className={styles.sectionTitle}>
          <AwardsIcon /> recognition/
        </span>
        <ul className={styles.blogList}>
          <li>
            <a href='https://www.storybench.org/how-the-wall-street-journal-visualized-the-2020-election-results/'>
              How the Wall Street Journal visualized the 2020 election results
              <div>
                <span className={styles.description}>Storybench interview on design and development process</span>
              </div>
            </a>
          </li>
          <li>
            <a href='https://www.informationisbeautifulawards.com/showcase/4279-the-united-states-water-crisis'>
              Kantar Information is Beautiful Awards 2019 Shortlist
              <div>
                <span className={styles.description}>Shortlisted for my United States Water Crisis visual essay</span>
              </div>
            </a>
          </li>
          <li>
            <a href='https://scimaps.org/mapdetail/united_states_water__241'>
              Places & Spaces: Mapping Science
              <div>
                <span className={styles.description}>Featured macroscape in the 2020 collection</span>
              </div>
            </a>
          </li>
        </ul>
      </div>

      <div className={styles.tree} id='current'>
        <span className={styles.sectionTitle}>
          <VibeIcon /> my vibe/
        </span>
        <NowPlaying />
        <Book {...book} />
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
        publishedAt,
        "category": categories[0]->title,
        "relatedPost": relatedPost->slug,
        "imageSet": imageSet[],
        mainImage
      }|order(publishedAt desc)
    `),

      book: await client.fetch(groq`
      *[_type == "currentRead"][0]{
        title, 
        bookAuthor,
        genre,
        coverImage 
      }
      `),
    },
  };
}

export default Index;

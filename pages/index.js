import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import groq from 'groq';
import client from '../client';
import imageUrlBuilder from '@sanity/image-url';
import { format, isFuture } from 'date-fns';

import NowPlaying from '../components/NowPlaying';
import Book from '../components/Book';
import VibeIcon from '../components/Icons/VibeIcon';
import WorkIcon from '../components/Icons/WorkIcon';
import ThoughtsIcon from '../components/Icons/ThoughtsIcon';
import AwardsIcon from '../components/Icons/AwardsIcon';
import LaunchIcon from '../components/Icons/LaunchIcon';
import styles from './homepage.module.scss';

function urlFor(source) {
  return imageUrlBuilder(client).image(source);
}
const Index = props => {
  const { posts = [], projects = [], book = {}, press = [] } = props;
  const [showAll, setShowAll] = useState(false);
  const [showAllPosts, setShowAllPosts] = useState(false);

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
        <meta name='twitter:card' content='summary_large_image' key='twcard' />
        <meta name='twitter:site' content='@andrew_levinson' key='twsite' />
        <meta name='twitter:creator' content='@andrew_levinson' key='twhandle' />
        <meta name='twitter:title' content={meta.title} key='twtitle'></meta>
        <meta name='twitter:description' content={meta.description} key='twdescription'></meta>
        <meta name='twitter:image' content={meta.image} key='twimage'></meta>
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
      <h2 className={styles.subhed}>Designer / Developer / Data Visualizer</h2>
      <p className={styles.intro}>
        Currently, I design & code visuals at <a href='https://graphics.wsj.com/'>The Wall Street Journal</a> and
        occasionally teach <a href='https://courses.newschool.edu/courses/PUCD2126/6770/'>Core Interaction Lab</a> at
        Parsons School of Design. <br />
        Previously, I’ve been a product designer at a software agency, a financial consultant, and even a touring
        musician in a metal band.
        <span className={styles.jump}>
          <a href='#blog'>
            <ThoughtsIcon /> thoughts
          </a>
          <a href='#recent'>
            <WorkIcon /> projects
          </a>
          <a href='#current'>
            <VibeIcon /> vibe
          </a>
        </span>
      </p>
      <section className={styles.tree} id='blog'>
        <h4 className={styles.sectionTitle}>
          <ThoughtsIcon /> thoughts/
        </h4>
        <div className={styles.blogList}>
          {posts.slice(0, showAllPosts ? 100 : 3).map(({ _id, title, slug, publishedAt, category, description }) => {
            const comingSoon = isFuture(new Date(publishedAt));
            return (
              <article key={_id}>
                <Link href='/post/[slug]' as={`/post/${slug.current}`} passHref>
                  <a className={comingSoon ? styles.future : null} tabIndex={comingSoon ? '-1' : null}>
                    <div>
                      <span className={styles.tag}>
                        {comingSoon ? 'coming soon' : format(new Date(publishedAt), 'MMM. yyyy')}
                        {category && ` • ${category}`}
                      </span>
                    </div>
                    {title}
                    <div>
                      <span className={styles.description}>{description}</span>
                    </div>
                  </a>
                </Link>
              </article>
            );
          })}
        </div>
        {posts && posts.length > 3 && (
          <button
            className={styles.button}
            onClick={() => (showAllPosts ? setShowAllPosts(false) : setShowAllPosts(true))}
          >
            {showAllPosts ? 'Collapse –' : 'Show more thoughts +'}
          </button>
        )}
      </section>
      <section className={styles.tree} id='recent'>
        <h4 className={styles.sectionTitle}>
          <WorkIcon /> projects/
        </h4>
        <div className={styles.projectList}>
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
                    <article key={_id}>
                      <a href={directLink} target='_blank' rel='noopener noreferrer' rel='bookmark'>
                        <div className={styles.band} />
                        <div className={styles.flex}>
                          <img
                            src={urlFor(mainImage).width(625).auto('format').url()}
                            width='180'
                            alt={`screenshot of project titled: ${title}`}
                            className={styles.mainImage}
                          />
                          <span>
                            <div>
                              <span className={styles.tag}>
                                {format(new Date(publishedAt), 'MMM. yyyy')}
                                {category && ` • ${category}`}
                                <br />
                              </span>
                            </div>{' '}
                            <h3>
                              {title}{' '}
                              <div className={styles.launch}>
                                <LaunchIcon customStyle={{ display: 'block' }} />
                              </div>
                            </h3>
                            <span className={styles.description}>{description}</span>
                            {imageSet && (
                              <div className={styles.imageSet}>
                                {imageSet.map((image, i) => {
                                  return (
                                    <img
                                      key={image._key}
                                      src={urlFor(image).width(600).auto('format').url()}
                                      width='120'
                                      height='60'
                                      alt={`screenshot #${i + 1} of ${imageSet.length} for project titled: ${title}`}
                                    />
                                  );
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
                        </div>
                      </a>
                    </article>
                  )
                );
              }
            )}
        </div>
        <button className={styles.button} onClick={() => (showAll ? setShowAll(false) : setShowAll(true))}>
          {showAll ? 'Collapse –' : 'Show more work +'}
        </button>
      </section>

      <section className={styles.tree} id='current'>
        <h4 className={styles.sectionTitle}>
          <VibeIcon /> my vibe/
        </h4>
        <NowPlaying />
        <Book {...book} />
      </section>
      <section className={styles.tree} id='awards'>
        <h4 className={styles.sectionTitle}>
          <AwardsIcon /> press/
        </h4>
        <div className={styles.awardsList}>
          {press.map(({ _id, title, tag, publishedAt, directLink }) => {
            return (
              <article key={_id}>
                <a href={directLink}>
                  <div>
                    <span className={styles.tag}>
                      {format(new Date(publishedAt), 'MMM. yyyy')}
                      {tag && ` • ${tag}`}
                    </span>
                  </div>
                  {title}
                </a>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export async function getStaticProps() {
  return {
    props: {
      posts: await client.fetch(groq`
      *[_type == "post"]{_id, title, slug, publishedAt, "category": categories[0]->title, description}|order(publishedAt desc)
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

      press: await client.fetch(groq`
      *[_type == "recognition"]|order(publishedAt desc)
      `),
    },
  };
}

export default Index;

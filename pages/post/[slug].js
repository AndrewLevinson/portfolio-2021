import styles from './post.module.scss';
import { format } from 'date-fns';
import Head from 'next/head';
import Link from 'next/link';
import groq from 'groq';
import BlockContent from '@sanity/block-content-to-react';
import client from '../../client';
import Code from '../../components/Code';
import Prompt from '../../components/Prompt';

const serializers = {
  types: {
    code: Code,
  },
  marks: { prompt: Prompt },
};

import RelatedPosts from '../../components/RelatedPosts/RelatedPosts';

const Post = props => {
  const { title, categories, description, slug, publishedAt, body = [], otherPosts } = props;

  return (
    <article className={styles.article}>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta charSet='utf-8' />
        <title>{title} by Andrew Levinson</title>
        <meta name='description' content={description} />
        <meta property='og:title' content={title} key='ogtitle' />
        <meta property='og:description' content={description} key='ogdesc' />
        {/* <link rel='canonical' href={`https://andrewlevinson.me/post/${slug}`} /> */}

        {/* tiwtter */}
        <meta name='twitter:card' content='summary' key='twcard' />
        <meta name='twitter:creator' content='@andrew_levinson' key='twhandle' />
        {/* Open Graph */}
        {/* <meta property='og:url' content={`https://andrewlevinson.me/post/${slug}`} key='ogurl' /> */}
        <meta property='og:image' content='/images/meta_image.jpg' key='ogimage' />
        <meta property='og:site_name' content={title} key='ogsitename' />
        <meta property='og:title' content={title} key='ogtitle' />
        <meta property='og:description' content={description} key='ogdesc' />

        {/* favicon */}
        <link rel='apple-touch-icon' sizes='180x180' href='/favicon/apple-touch-icon.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='/favicon/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/favicon/favicon-16x16.png' />
        <link rel='manifest' href='/favicon/site.webmanifest' />
      </Head>
      <header>
        <Link href='/' as={`/`} passHref>
          <a className='backLink'>⟵ back home/</a>
        </Link>

        <h1>{title}</h1>
        <h2 className={styles.description}>{description}</h2>
        <p className={styles.timestamp}>Published {format(new Date(publishedAt), 'MMM dd, yyyy')}</p>
        <ul className={styles.tags}>{categories && categories.map(category => <li key={category}>{category}</li>)}</ul>
      </header>
      <BlockContent
        blocks={body}
        imageOptions={{ w: 320, h: 240, fit: 'max' }}
        serializers={serializers}
        {...client.config()}
        className={styles.content}
      />
      <RelatedPosts posts={otherPosts} />
    </article>
  );
};

const query = groq`*[_type == "post" && slug.current == $slug][0]{
  title,
  "categories": categories[]->title,
  description,
  publishedAt,
  body
}`;

export async function getStaticPaths() {
  const posts = await client.fetch(groq`
      *[_type == "post" && publishedAt < now()]
    `);
  const paths = posts.map(post => ({
    params: { slug: post.slug.current },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const { slug = '' } = params;

  const posts = await client.fetch(groq`
      *[_type == "post" && publishedAt < now()]{
        title, description, "slug": slug.current
      }
    `);

  const otherPosts = posts
    .filter(post => post.slug != slug)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  return { props: { ...(await client.fetch(query, { slug })), slug, otherPosts } };
}

export default Post;

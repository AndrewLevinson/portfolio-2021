import styles from './post.module.scss';
import { format } from 'date-fns';
import Head from 'next/head';
import Link from 'next/link';
import groq from 'groq';
import BlockContent from '@sanity/block-content-to-react';
import client from '../../client';

import RelatedPosts from '../../components/RelatedPosts/RelatedPosts';

const Post = props => {
  const { title, categories, description, publishedAt, body = [], otherPosts } = props;

  return (
    <article className={styles.article}>
      <Head>
        <title>{title} by Andrew Levinson</title>
      </Head>
      <Link href='/' as={`/`} passHref>
        <a className='backLink'>⟵ back home/</a>
      </Link>

      <h1>{title}</h1>
      <h4 className={styles.description}>{description}</h4>
      <p className={styles.timestamp}>Published {format(new Date(publishedAt), 'MMM dd, yyyy')}</p>
      <ul className={styles.tags}>{categories && categories.map(category => <li key={category}>{category}</li>)}</ul>

      <BlockContent
        blocks={body}
        imageOptions={{ w: 320, h: 240, fit: 'max' }}
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
      *[_type == "post"]
    `);
  const paths = posts.map(post => ({
    params: { slug: post.slug.current },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const { slug = '' } = params;

  const posts = await client.fetch(groq`
      *[_type == "post"]{
        title, description, "slug": slug.current
      }
    `);

  const otherPosts = posts
    .filter(post => post.slug != slug)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  return { props: { ...(await client.fetch(query, { slug })), otherPosts } };
}

export default Post;

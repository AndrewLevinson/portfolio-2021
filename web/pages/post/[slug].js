import styles from './post.module.scss';
import { format } from 'date-fns';
import Head from 'next/head';
import Link from 'next/link';
import groq from 'groq';
import imageUrlBuilder from '@sanity/image-url';
import BlockContent from '@sanity/block-content-to-react';
import client from '../../client';

import Footer from '../../components/Footer';

function urlFor(source) {
  return imageUrlBuilder(client).image(source);
}

const Post = props => {
  const { title, name, categories, authorImage, description, publishedAt, body = [] } = props;

  return (
    <>
      <article className={styles.article}>
        <Head>
          <title>{title} by Andrew Levinson</title>
        </Head>
        <Link href='/' as={`/`} passHref>
          <a className='backLink'>⟵ Back home</a>
        </Link>

        <h1>{title}</h1>
        <h4 className={styles.description}>{description}</h4>
        {/* {categories && (
        <ul className={styles.tags}>
          {categories.map(category => (
            <li key={category}>{category}</li>
          ))}
        </ul>
      )} */}
        <div className={styles.author}>
          {authorImage && <img src={urlFor(authorImage).width(100).url()} />}
          <div>
            <span>{name}</span>
            <span>{format(new Date(publishedAt), 'MMM dd, yyyy')}</span>
          </div>
        </div>

        <BlockContent
          blocks={body}
          imageOptions={{ w: 320, h: 240, fit: 'max' }}
          {...client.config()}
          className={styles.content}
        />
      </article>
      <Footer />
    </>
  );
};

const query = groq`*[_type == "post" && slug.current == $slug][0]{
  title,
  "name": author->name,
  "categories": categories[]->title,
  "authorImage": author->image,
  description,
  publishedAt,
  body
}`;

Post.getInitialProps = async function (context) {
  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = '' } = context.query;
  return await client.fetch(query, { slug });
};

export default Post;

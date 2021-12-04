import client from '../../client';
import imageUrlBuilder from '@sanity/image-url';
import styles from './index.module.scss';

function urlFor(source) {
  return imageUrlBuilder(client).image(source);
}

function Book({ title, bookAuthor, genre, coverImage }) {
  return (
    <div className={styles.reading}>
      <h5>Currently reading</h5>
      <div className={styles.flex}>
        <img
          src={urlFor(coverImage).width(150).url()}
          alt={`book cover image for ${title} by ${bookAuthor}`}
          width='70'
        />
        <div className={styles.info}>
          <span>{title}</span>
          <span>{bookAuthor}</span>
          <div className={styles.genreList}>{genre}</div>
        </div>
      </div>
    </div>
  );
}

export default Book;

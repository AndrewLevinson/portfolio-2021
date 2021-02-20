import Link from 'next/link';
import styles from './index.module.scss';

function RelatedPosts({ posts }) {
  return (
    <div className={styles.container}>
      <h4>More Posts</h4>
      {posts &&
        posts.map((post, i) => {
          return (
            <div key={i} className={styles.post}>
              <Link href='/post/[slug]' as={`/post/${post.slug}`} passHref>
                <a>{post.title}</a>
              </Link>
              <h5>{post.description}</h5>
            </div>
          );
        })}
      <Link href='/' as={`/`} passHref>
        <a>⟵ Back home</a>
      </Link>
    </div>
  );
}

export default RelatedPosts;

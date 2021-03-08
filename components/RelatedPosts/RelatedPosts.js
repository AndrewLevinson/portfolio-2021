import Link from 'next/link';
import styles from './index.module.scss';

function RelatedPosts({ posts }) {
  return (
    <div className={styles.container}>
      <h4>More Posts</h4>
      {posts &&
        posts.map((post, i) => {
          return (
            <ul key={i} className={styles.post}>
              <li>
                <Link href='/post/[slug]' as={`/post/${post.slug}`} passHref>
                  <a>{post.title}</a>
                </Link>
                <p>{post.description}</p>
              </li>
            </ul>
          );
        })}
      <Link href='/' as={`/`} passHref>
        <a>⟵ back home/</a>
      </Link>
    </div>
  );
}

export default RelatedPosts;

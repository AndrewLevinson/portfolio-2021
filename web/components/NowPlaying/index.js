import { formatDistanceToNow } from 'date-fns';
import styles from './index.module.scss';
import useSWR from 'swr';
const fetcher = (...args) => fetch(...args).then(res => res.json());

function NowPlaying() {
  const { data } = useSWR('/api/spotify-track', fetcher, { refreshInterval: 15000 });

  if (!data) {
    return (
      <div className={styles.playing}>
        <h5>Loading Spotify...</h5>
        <div className={styles.flex}>
          <div className={styles.albumPlaceholder} />
          <div className={styles.info}>
            <span>Title</span>
            <span>Artist</span>
            <div className={styles.genreList}>Genres</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.playing}>
      <h5>
        Currently listening
        {data.isPlaying ? (
          <span>...yes, literally right now</span>
        ) : (
          <span>...{formatDistanceToNow(new Date(data.playedAt), { addSuffix: true })}</span>
        )}
      </h5>
      <div className={styles.flex}>
        <img src={data.albumImageUrl} alt={`album image for ${data.album} by ${data.artist}`} width={75} />
        <div className={styles.info}>
          <span>{data.title}</span>
          <span>{data.artist}</span>
          <div className={styles.genreList}>
            For fans of{' '}
            {data.genreList
              .slice(0, 3)
              .map(genre => genre)
              .join(', ')
              .replace(/, ([^,]*)$/, ', and $1')}
          </div>
        </div>
      </div>
      <div className={styles.linkToSpotify}>
        <a href={data.songUrl} target='_blank' rel='noopener noreferrer'>
          <span className={styles.icon}>
            <svg viewBox='0 0 171 171'>
              <title>Spotify Icon</title>
              <g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
                <path d='M134.562,76.472 C107.568,60.441 63.042,58.967 37.273,66.788 C33.134,68.044 28.758,65.708 27.504,61.57 C26.25,57.429 28.584,53.056 32.725,51.798 C62.306,42.819 111.481,44.553 142.557,63 C146.279,65.21 147.5,70.017 145.294,73.733 C143.086,77.455 138.275,78.682 134.562,76.472 Z M133.678,100.216 C131.784,103.289 127.766,104.253 124.697,102.366 C102.192,88.533 67.875,84.525 41.25,92.607 C37.797,93.65 34.151,91.704 33.102,88.257 C32.062,84.805 34.009,81.165 37.456,80.115 C67.871,70.885 105.682,75.355 131.53,91.24 C134.599,93.13 135.565,97.15 133.678,100.216 Z M123.431,123.019 C121.926,125.487 118.713,126.26 116.254,124.756 C96.589,112.737 71.837,110.023 42.687,116.681 C39.878,117.325 37.078,115.565 36.437,112.756 C35.794,109.948 37.548,107.148 40.363,106.507 C72.263,99.215 99.626,102.353 121.699,115.841 C124.16,117.344 124.935,120.559 123.431,123.019 Z M85.025,2.232 C38.776,2.232 1.282,39.725 1.282,85.974 C1.282,132.228 38.776,169.718 85.025,169.718 C131.276,169.718 168.768,132.228 168.768,85.974 C168.768,39.725 131.276,2.232 85.025,2.232 L85.025,2.232 Z' />
              </g>
            </svg>
          </span>
          Listen on Spotify
        </a>
      </div>
    </div>
  );
}

export default NowPlaying;

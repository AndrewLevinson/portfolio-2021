import { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import styles from './index.module.scss';
import useSWR from 'swr';
const fetcher = (...args) => fetch(...args).then(res => res.json());

function NowPlaying() {
  const [data, setData] = useState();
  const { data: nowPlaying } = useSWR('/api/now-playing', fetcher, { refreshInterval: 15000 });
  const { data: recent } = useSWR('/api/recent-tracks', fetcher);

  useEffect(() => {
    if (!nowPlaying && !recent) return;

    if (nowPlaying && nowPlaying.isPlaying) {
      return setData(nowPlaying);
    }
    if (recent) {
      return setData(recent.tracks[0]);
    }
  }, [nowPlaying, recent]);

  if (!data) return null;

  return (
    <div className={styles.playing}>
      {data.isPlaying ? (
        <h5>
          Currently playing on my Spotify <span>(literally, right now)</span>
        </h5>
      ) : (
        <h5>Last played {formatDistanceToNow(new Date(data.playedAt), { addSuffix: true })}</h5>
      )}

      <div className={styles.flex}>
        <img src={data.albumImageUrl} alt={`album image for ${data.album} by ${data.artist}`} width={75} />
        <div className={styles.info}>
          <span>{data.title}</span>
          <span>{data.artist}</span>
        </div>
      </div>
    </div>
  );
}

export default NowPlaying;

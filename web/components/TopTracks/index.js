import styles from './index.module.scss';
import useSWR from 'swr';
const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function TopTracks() {
  const { data } = useSWR('/api/top-tracks', fetcher);

  console.log(data);

  return <div>top tracks</div>;
}

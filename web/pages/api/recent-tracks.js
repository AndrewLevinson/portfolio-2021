import { getRecentlyPlayed } from '../../lib/spotify';

export default async (_, res) => {
  const response = await getRecentlyPlayed();
  const { items } = await response.json();

  const tracks = items.map(item => ({
    artist: item.track.artists.map(_artist => _artist.name).join(', '),
    album: item.track.album.name,
    albumImageUrl: item.track.album.images[0].url,
    songUrl: item.track.external_urls.spotify,
    title: item.track.name,
    playedAt: item.played_at,
  }));

  res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=30');

  return res.status(200).json({ tracks });
};

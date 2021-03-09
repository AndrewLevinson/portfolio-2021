import { getNowPlaying, getRecentlyPlayed, getCurrentArtistDetail } from '../../lib/spotify';

export default async (_, res) => {
  // first try now playing
  const nowPlayingRes = await getNowPlaying();
  // if not playing fetch most recent
  const shouldFetchRecent = nowPlayingRes.status === 204 || nowPlayingRes.status > 400;
  const recentRes = shouldFetchRecent ? await getRecentlyPlayed() : null;

  const data = recentRes ? recentRes : nowPlayingRes; // set data
  const songData = await data.json();
  // pull info out based on nowPlaying or Recent (seperate bc data structure diffs)
  const track = recentRes ? await recentTrack(songData.items[0]) : await nowTrack(songData);

  return res.status(200).json({ ...track });
};

async function nowTrack(song) {
  const artistRes = await getCurrentArtistDetail(song.item.artists[0].href);
  const artistDetail = await artistRes.json();
  const genreList = artistDetail.genres;
  const albumImageUrl = song.item.album.images.filter(item => item.width < 500)[0].url;

  return {
    title: song.item.name,
    artist: song.item.artists.map(_artist => _artist.name).join(', '),
    album: song.item.album.name,
    albumImageUrl: albumImageUrl || null,
    songUrl: song.item.external_urls.spotify,
    genreList,
    isPlaying: song.is_playing,
    playedAt: false,
  };
}

async function recentTrack(song) {
  const artistRes = await getCurrentArtistDetail(song.track.artists[0].href);
  const artistDetail = await artistRes.json();
  const genreList = artistDetail.genres;
  const albumImageUrl = song.track.album.images.filter(item => item.width < 500)[0].url;

  return {
    title: song.track.name,
    artist: song.track.artists.map(_artist => _artist.name).join(', '),
    album: song.track.album.name,
    albumImageUrl: albumImageUrl || null,
    songUrl: song.track.external_urls.spotify,
    genreList,
    isPlaying: false,
    playedAt: song.played_at,
  };
}

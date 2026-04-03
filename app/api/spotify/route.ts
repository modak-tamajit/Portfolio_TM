import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const token = process.env.SPOTIFY_TOKEN;
    if (!token) return NextResponse.json({ isPlaying: false });

    const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 30 }
    });

    if (response.status === 204 || response.status > 400) {
      const recentRes = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=1', {
        headers: { Authorization: `Bearer ${token}` },
        next: { revalidate: 60 }
      });
      if (!recentRes.ok) return NextResponse.json({ isPlaying: false });
      
      const recent = await recentRes.json();
      if (!recent.items || recent.items.length === 0) return NextResponse.json({ isPlaying: false });
      
      const track = recent.items[0].track;
      return NextResponse.json({
        isPlaying: false,
        title: track.name,
        artist: track.artists.map((a: any) => a.name).join(', '),
        albumImageUrl: track.album.images[0]?.url,
        songUrl: track.external_urls.spotify,
      });
    }

    const song = await response.json();
    return NextResponse.json({
      isPlaying: song.is_playing,
      title: song.item.name,
      artist: song.item.artists.map((a: any) => a.name).join(', '),
      albumImageUrl: song.item.album.images[0]?.url,
      songUrl: song.item.external_urls.spotify,
    });
  } catch (err) {
    return NextResponse.json({ isPlaying: false });
  }
}
